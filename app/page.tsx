import Link from 'next/link'

const benefits = [
  { icon: '◎', title: 'Amplify your AI roadmap', desc: 'Unlock data-driven decisions with a prioritised, executable AI strategy grounded in your actual constraints — not a wishlist.' },
  { icon: '⬡', title: 'Senior attention, always', desc: 'You work directly with us, not a sub-contracted junior team. Every call, every deliverable, every decision.' },
  { icon: '◈', title: 'No lock-in by design', desc: 'We build your team\'s capability alongside anything we build for you. The goal is to make ourselves unnecessary.' },
  { icon: '◻', title: 'Startup-native thinking', desc: 'The right solution is the one that ships — not the architecturally perfect one that sits in a backlog.' },
]

const steps = [
  { num: '01', title: 'Book a call', desc: 'A 30-minute conversation to understand your situation — no pitch, no obligation.' },
  { num: '02', title: 'We scope together', desc: 'You tell us where you are. We tell you what we think you actually need, even if it\'s not us.' },
  { num: '03', title: 'We get to work', desc: 'Embedded, hands-on, and accountable. We stay until your team owns it.' },
]

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="container">
          <div className="hero__tag">AI Consulting for Startups</div>
          <h1 className="hero__h1">
            We help startups ship <em>AI that works.</em>
          </h1>
          <p className="hero__sub">
            Strategy, implementation, and team enablement for Series A–C companies
            moving faster than their AI roadmap.
          </p>
          <div className="hero__actions">
            <Link href="/contact" className="btn btn-dark">Book a free strategy call →</Link>
            <Link href="/services" className="btn btn-outline">See how we work</Link>
          </div>

          <div className="hero__image">
            <div className="hero__image-inner">
              <p className="hero__image-text">AsleepTurtle × AI Strategy</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOGOS ── */}
      <div className="logos">
        <div className="container">
          <p className="logos__label">Trusted by ambitious teams at</p>
          <div className="logos__row">
            {['Acme Labs', 'Vanta', 'Northstar', 'Deepflow', 'Orbital'].map((l) => (
              <span key={l} className="logo-item">{l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── BENEFITS ── */}
      <section className="section section--white">
        <div className="container">
          <div className="section-header">
            <p className="section-header__label">Benefits</p>
            <h2 className="section-header__h2">We have cracked the code.</h2>
            <p className="section-header__sub">
              AsleepTurtle gives you senior AI expertise without the enterprise consulting overhead.
            </p>
          </div>
          <div className="benefits__grid">
            {benefits.map((b) => (
              <div key={b.title} className="benefit-card">
                <div className="benefit-card__icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE ── */}
      <section className="section section--warm">
        <div className="container">
          <div className="feature">
            <div className="feature__image">
              <div className="feature__image-placeholder" />
            </div>
            <div>
              <p className="feature__label">Why it matters</p>
              <h2 className="feature__h2">See the full picture before you build.</h2>
              <p className="feature__text">
                Most AI projects fail before a single model runs. We help you avoid the
                six-month detour — by getting the strategy, scope, and team alignment
                right from day one.
              </p>
              <ul className="feature__list">
                {[
                  'Spot the highest-leverage opportunity in your stack',
                  'Define success before engineering starts',
                  'Ship a working system — not a prototype in a drawer',
                  'Leave your team better than we found them',
                ].map((item, i) => (
                  <li key={i}>
                    <span>0{i + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/services" className="btn btn-outline" style={{ marginTop: '2rem' }}>
                See our services →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES TABLE ── */}
      <section className="section section--white">
        <div className="container">
          <div className="section-header">
            <p className="section-header__label">Specifications</p>
            <h2 className="section-header__h2">Why choose AsleepTurtle?</h2>
            <p className="section-header__sub">
              A boutique practice built for the speed and constraints of fast-growing startups.
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="services-table">
              <thead>
                <tr>
                  <th></th>
                  <th className="highlight">AsleepTurtle</th>
                  <th>Large Consultancy</th>
                  <th>Freelancer</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Senior practitioner on every call',     '✓','–','✓'],
                  ['Startup-speed delivery',                '✓','–','✓'],
                  ['End-to-end strategy + build',           '✓','✓','–'],
                  ['Team enablement included',              '✓','–','–'],
                  ['No lock-in, full IP handover',          '✓','–','✓'],
                  ['Dedicated account management',          '✓','✓','–'],
                ].map(([label, ...vals]) => (
                  <tr key={label as string}>
                    <td>{label}</td>
                    {vals.map((v, i) => (
                      <td key={i} className={i === 0 ? 'highlight' : ''}>
                        <span className={v === '✓' ? 'check' : 'dash'}>{v}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="section">
        <div className="container">
          <div className="testimonial">
            <p className="testimonial__quote">
              "They restructured how we thought about the problem entirely — and cut
              our evaluation timeline from weeks to days."
            </p>
            <p className="testimonial__attr">
              <strong>Sarah K.</strong> · CTO, Series B SaaS · Amsterdam
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW TO ── */}
      <section className="section section--white">
        <div className="container">
          <div className="section-header">
            <p className="section-header__label">How it works</p>
            <h2 className="section-header__h2">Up and running in days, not months.</h2>
          </div>
          <div className="howto__grid">
            {steps.map((s) => (
              <div key={s.num} className="howto-step">
                <p className="howto-step__num">{s.num}</p>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <p className="cta-band__label">Book a call</p>
            <h2 className="cta-band__h2">Connect with us.</h2>
            <p className="cta-band__sub">
              Schedule a quick 30-minute call to learn how AsleepTurtle can turn
              your AI ambition into a working product advantage.
            </p>
            <Link href="/contact" className="btn btn-white">
              Book a free strategy call →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
