/**
 * Sawrus — Contact Form API
 * ──────────────────────────────────────────────────────────────
 * Stack : Node.js · Express · better-sqlite3 · express-rate-limit · hCaptcha · CORS
 *
 * Setup:
 *   copy env.example .env  <- fill in HCAPTCHA_SECRET + ALLOWED_ORIGINS
 *   npm install
 *   node server.js
 */
'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const https = require('https');

// ── Config ────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET || '';
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:5500,http://127.0.0.1:5500')
  .split(',').map(o => o.trim());
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'data', 'contacts.db');

if (!HCAPTCHA_SECRET) {
  console.error('[ERROR] HCAPTCHA_SECRET is not set. Copy env.example to .env and add your hCaptcha secret key.');
  process.exit(1);
}

// ── Database ──────────────────────────────────────────────────
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name    TEXT    NOT NULL,
    last_name     TEXT    NOT NULL,
    email         TEXT    NOT NULL,
    company       TEXT    NOT NULL,
    stage         TEXT    NOT NULL,
    service       TEXT,
    message       TEXT    NOT NULL,
    ip_address    TEXT,
    user_agent    TEXT,
    submitted_at  DATETIME DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  );
`);

const insertContact = db.prepare(`
  INSERT INTO contacts (first_name,last_name,email,company,stage,service,message,ip_address,user_agent)
  VALUES (@firstName,@lastName,@email,@company,@stage,@service,@message,@ipAddress,@userAgent)
`);

// ── hCaptcha verification ─────────────────────────────────────
function verifyHCaptcha(token, remoteIp) {
  return new Promise((resolve) => {
    const body = new URLSearchParams({ secret: HCAPTCHA_SECRET, response: token, remoteip: remoteIp || '' }).toString();
    const opts = {
      hostname: 'hcaptcha.com', path: '/siteverify', method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(body) },
    };
    const req = https.request(opts, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => { try { resolve(JSON.parse(d).success === true); } catch { resolve(false); } });
    });
    req.on('error', () => resolve(false));
    req.write(body); req.end();
  });
}

// ── Validation ────────────────────────────────────────────────
const VALID_STAGES = ['pre-seed', 'seed', 'series-a', 'series-b', 'series-c-plus', 'bootstrapped'];
const VALID_SERVICES = ['essentials', 'growth', 'enterprise', 'unsure', ''];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body) {
  const { firstName, lastName, email, company, stage, service, message, captchaToken } = body;
  const err = [];
  if (!firstName?.trim()) err.push('firstName required');
  if (!lastName?.trim()) err.push('lastName required');
  if (!EMAIL_RE.test(email)) err.push('valid email required');
  if (!company?.trim()) err.push('company required');
  if (!VALID_STAGES.includes(stage)) err.push('invalid stage');
  if (service && !VALID_SERVICES.includes(service)) err.push('invalid service');
  if (!message || message.trim().length < 10) err.push('message must be ≥10 chars');
  if (!captchaToken) err.push('captchaToken required');
  return err;
}

// ── App ───────────────────────────────────────────────────────
const app = express();

// Security headers
app.use((_, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// ── CORS ──────────────────────────────────────────────────────
// Only origins in ALLOWED_ORIGINS may make cross-origin requests.
app.use(cors({
  origin(origin, cb) {
    if (!origin) {
      return process.env.NODE_ENV === 'production'
        ? cb(new Error('Missing Origin'), false)
        : cb(null, true);
    }
    if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    console.warn(`[CORS] Blocked: ${origin}`);
    cb(new Error(`Origin ${origin} not allowed`), false);
  },
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 204,
  maxAge: 3600,
}));

app.use(express.json({ limit: '16kb' }));

// Global rate limiter: 100 req / 15 min per IP
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, max: 100,
  standardHeaders: true, legacyHeaders: false,
  message: { error: 'Too many requests.' },
}));

// Contact route rate limiter: 5 submissions / hour per IP
const contactLimit = rateLimit({
  windowMs: 60 * 60 * 1000, max: 5,
  standardHeaders: true, legacyHeaders: false,
  message: { error: 'Too many submissions. Please wait before trying again.' },
  keyGenerator: req => req.ip,
});

// ── Routes ────────────────────────────────────────────────────
app.get('/health', (_, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));

app.post('/contact', contactLimit, async (req, res) => {
  try {
    const errors = validate(req.body);
    if (errors.length) return res.status(400).json({ error: 'Validation failed', details: errors });

    const { firstName, lastName, email, company, stage, service, message, captchaToken } = req.body;
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip;

    if (!await verifyHCaptcha(captchaToken, clientIp))
      return res.status(422).json({ error: 'CAPTCHA verification failed.' });

    insertContact.run({
      firstName: firstName.trim().slice(0, 100),
      lastName: lastName.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 254),
      company: company.trim().slice(0, 200),
      stage,
      service: (service || '').slice(0, 50),
      message: message.trim().slice(0, 5000),
      ipAddress: clientIp,
      userAgent: (req.headers['user-agent'] || '').slice(0, 500),
    });

    console.log(`[CONTACT] ${email} — ${company} (${stage})`);
    return res.status(201).json({ message: 'Request received. We will be in touch within one business day.' });

  } catch (err) {
    console.error('[CONTACT ERROR]', err);
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
});

// CORS error handler
app.use((err, req, res, next) => {
  if (err.message?.includes('not allowed')) return res.status(403).json({ error: 'CORS policy violation.' });
  next(err);
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`[Sawrus API] http://localhost:${PORT}`);
  console.log(`[Sawrus API] Allowed origins: ${ALLOWED_ORIGINS.join(', ')}`);
  console.log(`[Sawrus API] DB: ${DB_PATH}`);
});

process.on('SIGTERM', () => { db.close(); process.exit(0); });
