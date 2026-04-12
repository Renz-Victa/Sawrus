import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title: 'About', description: 'The story and beliefs behind AsleepTurtle.' }

const beliefs = [
  { title: 'The best AI system is the one that ships', body: 'Perfect architecture that never reaches users creates zero value. We bias toward working software over elegant diagrams.' },
  { title: 'Your team should own what we build', body: 'We document obsessively and train as we go. Handover is baked in from day one, not treated as an afterthought.' },
  { title: 'Honest scoping beats optimistic proposals', body: 'We would rather tell you twelve weeks than win with a six-week estimate and disappoint you.' },
  { title: 'Startups need different thinking', body: 'Nine-month timelines that work at large firms will kill a startup. We think from your constraints, not ours.' },
]

export default function AboutPage() {
  return (
    <>
      <section className="page-hero"><div className="container">
        <p className="page-hero__label">About</p>
        <h1 className="page-hero__h1">Built by practitioners, not advisors</h1>
        <p className="page-hero__sub">We have worked inside fast-moving companies. We know what AI adoption actually looks like when the board deck meets engineering reality.</p>
      </div></section>

      <section className="section section--white"><div className="container">
        <div className="about-body">
          <h2>The story behind the name</h2>
          <p>AsleepTurtle started from a simple observation: most AI consulting is either too slow (large firms) or too shallow (freelancers). Startups need something in between — senior practitioners who think at speed.</p>
          <p>The name is a reminder that even the slowest-moving things get there eventually, as long as they do not stop. We help startups keep moving — methodically, without wasted steps.</p>
          <p>We work with a deliberately small roster of clients at any one time. Not because we cannot grow — because quality of engagement matters more than volume.</p>

          <div className="stats-row">
            {[{num:'A–C',label:'Series focus'},{num:'3',label:'Max active clients'},{num:'NL',label:'Based in Rotterdam'}].map(s=>(
              <div key={s.label} className="stat">
                <p className="stat__num">{s.num}</p>
                <p className="stat__label">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="beliefs">
            <h3>What we believe</h3>
            {beliefs.map(b=>(
              <div key={b.title} className="belief">
                <h4>{b.title}</h4>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div></section>

      <section className="section"><div className="container">
        <div className="cta-band">
          <p className="cta-band__label">Let us talk</p>
          <h2 className="cta-band__h2">No pitch. Just a real conversation.</h2>
          <p className="cta-band__sub">30 minutes to understand your situation and whether we are the right fit.</p>
          <Link href="/contact" className="btn btn-white">Book a call →</Link>
        </div>
      </div></section>
    </>
  )
}
