'use client'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

type FormData = {
  name: string
  email: string
  company: string
  stage: string
  challenge: string
}

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setServerError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      setServerError('Something went wrong — please email us at hello@asleepturtle.com')
    }
  }

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ paddingTop: '9rem', paddingBottom: '5rem', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <p className="page-hero__label">Contact</p>
          <h1 className="page-hero__h1">Book a strategy call.</h1>
          <p className="page-hero__sub">
            A 30-minute conversation. No pitch, no obligation — just an honest
            discussion about where you are and whether we can help.
          </p>
        </div>
      </section>

      {/* ── Details row ── */}
      <section style={{ padding: '4rem 0', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2rem,5vw,5rem)', flexWrap: 'wrap' }}>
            {[
              { label: 'Response time', value: 'Within 1 business day' },
              { label: 'Format', value: 'Video or phone — your choice' },
              { label: 'Location', value: 'Rotterdam, NL · Working globally' },
              { label: 'Email', value: 'hello@asleepturtle.com' },
            ].map((d) => (
              <div key={d.label} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-soft)', marginBottom: '0.4rem' }}>{d.label}</p>
                <p style={{ fontSize: '14px', color: 'var(--text-mid)', margin: 0 }}>{d.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form ── */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-warm)' }}>
        <div className="container">
          <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-soft)', marginBottom: '1rem' }}>
              Send us a note
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: '0.75rem' }}>
              Or fill in the form below.
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-mid)', marginBottom: '2.5rem' }}>
              Prefer to write it down? We read every submission and reply within one business day.
            </p>

            {submitted ? (
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '3.5rem 2rem' }}>
                <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>✓</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontStyle: 'italic', fontWeight: 400, marginBottom: '0.75rem' }}>
                  Got it — thanks.
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-mid)' }}>
                  We will be in touch within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '2.5rem', textAlign: 'left' }}>

                {serverError && (
                  <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', padding: '12px 16px', marginBottom: '1.5rem', fontSize: '13px', color: '#DC2626' }}>
                    {serverError}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Your name</label>
                    <input style={inputStyle} type="text" placeholder="Alex Chen"
                      {...register('name', { required: 'Required' })} />
                    {errors.name && <p style={errStyle}>{errors.name.message}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Work email</label>
                    <input style={inputStyle} type="email" placeholder="alex@company.com"
                      {...register('email', { required: 'Required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })} />
                    {errors.email && <p style={errStyle}>{errors.email.message}</p>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Company</label>
                    <input style={inputStyle} type="text" placeholder="Acme Inc."
                      {...register('company', { required: 'Required' })} />
                    {errors.company && <p style={errStyle}>{errors.company.message}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Stage</label>
                    <select style={{ ...inputStyle, appearance: 'none' as const }} {...register('stage')}>
                      <option value="">Select…</option>
                      <option value="pre-seed">Pre-seed</option>
                      <option value="seed">Seed</option>
                      <option value="series-a">Series A</option>
                      <option value="series-b">Series B</option>
                      <option value="series-c">Series C+</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={labelStyle}>What is the main challenge?</label>
                  <textarea style={{ ...inputStyle, minHeight: '110px', resize: 'vertical' as const }}
                    placeholder="Tell us briefly where you are with AI and what you are trying to figure out…"
                    {...register('challenge', { required: 'Required' })} />
                  {errors.challenge && <p style={errStyle}>{errors.challenge.message}</p>}
                </div>

                <button type="submit" disabled={isSubmitting}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 24px', borderRadius: '100px', background: 'var(--accent)', color: 'var(--accent-inv)', fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 500, cursor: 'pointer', border: 'none', transition: 'opacity .2s', opacity: isSubmitting ? 0.6 : 1 }}>
                  {isSubmitting ? 'Sending…' : 'Send message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--text-soft)',
  marginBottom: '0.5rem',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--bg)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  padding: '10px 14px',
  color: 'var(--text)',
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  outline: 'none',
}

const errStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#DC2626',
  marginTop: '0.3rem',
}
