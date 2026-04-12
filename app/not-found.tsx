import Link from 'next/link'
export default function NotFound() {
  return (
    <section style={{ padding: '12rem 0 8rem', textAlign: 'center' }}>
      <div className="container">
        <p style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(5rem,15vw,12rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1, color: 'var(--border)', letterSpacing: '-0.05em', marginBottom: '1.5rem' }}>404</p>
        <h1 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.5rem,3vw,2.5rem)', fontWeight: 400, fontStyle: 'italic', marginBottom: '1rem' }}>This page does not exist.</h1>
        <p style={{ fontSize: '15px', color: 'var(--text-mid)', marginBottom: '2.5rem' }}>Even the slowest turtle has to be somewhere. This one is not here.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-dark">Back to home →</Link>
          <Link href="/insights" className="btn btn-outline">Read the blog</Link>
        </div>
      </div>
    </section>
  )
}
