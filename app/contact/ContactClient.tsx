'use client'
import Link from 'next/link'

export default function ContactClient() {
  return (
    <>
      <section className="section" style={{ paddingTop: '10rem', textAlign: 'center' }}>
        <div className="container">
          <p className="page-hero__label">Contact</p>
          <h1 className="page-hero__h1">Book a strategy call.</h1>
          <p className="page-hero__sub" style={{ marginBottom: '3rem' }}>
            A 30-minute conversation. No pitch, no obligation — just an honest
            discussion about where you are and whether we can help.
          </p>
          <Link href="https://calendly.com" target="_blank" rel="noopener" className="btn btn-dark" style={{ fontSize: '1rem', padding: '16px 36px' }}>
            Schedule 30 minutes →
          </Link>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', marginTop: '5rem', flexWrap: 'wrap' }}>
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

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="cta-band">
            <p className="cta-band__label">Or just send us a note</p>
            <h2 className="cta-band__h2">Connect with us.</h2>
            <p className="cta-band__sub">
              Not ready for a call? Drop us a line at{' '}
              <a href="mailto:hello@asleepturtle.com" style={{ color: 'rgba(247,244,239,0.8)', textDecoration: 'underline' }}>
                hello@asleepturtle.com
              </a>
              {' '}and we will get back to you within a day.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
