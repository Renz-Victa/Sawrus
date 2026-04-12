import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__logo">AsleepTurtle</div>
          <ul className="footer__links">
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/insights">Insights</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
          <p className="footer__copy">© {new Date().getFullYear()} AsleepTurtle. Rotterdam, NL.</p>
        </div>
      </div>
    </footer>
  )
}
