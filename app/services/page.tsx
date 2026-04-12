import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title: 'Services', description: 'AI Strategy, Implementation, and Team Enablement for startups.' }

const services = [
  { id: 'strategy', tag: 'Engagement 01', title: 'AI Strategy Sprint', ideal: 'Best for startups that know AI matters but have not found their footing.',
    what: 'A focused 2–3 week engagement to audit your current state, identify your highest-value AI opportunities, and produce a prioritised roadmap your team can execute — with or without us.',
    why: 'Most teams waste months evaluating the wrong things. We compress that into a structured sprint that ends with clear decisions, not more optionality.',
    deliverables: ['AI readiness audit across data, team, and tooling','High-value use-case shortlist with ROI framing','Build / buy / partner recommendation per use-case','90-day execution plan with ownership assigned'],
    timing: '2–3 weeks · Fixed fee' },
  { id: 'implementation', tag: 'Engagement 02', title: 'Implementation Partnership', ideal: 'Best for startups with a defined use case that need hands-on help shipping it.',
    what: 'Embedded advisory and build support — working alongside your team, not in a silo. From architecture decisions and vendor selection through to production handover.',
    why: 'Consultants who disappear after the deck leave you holding a prototype no one knows how to maintain. We stay through to the moment your team owns it.',
    deliverables: ['Architecture design and technical decision log','Vendor / model evaluation and selection','Prototype to production support','Full documentation and team handover session'],
    timing: '6–16 weeks · Retainer or milestone-based' },
  { id: 'enablement', tag: 'Engagement 03', title: 'Team Enablement', ideal: 'Best for startups that want to build internal AI capability, not dependency.',
    what: 'Structured coaching and workshops for your engineering and product teams — how to evaluate models, design AI-native features, run evals, and make good build/buy decisions independently.',
    why: 'The most durable competitive advantage is the team that knows how to keep improving the system.',
    deliverables: ['Tailored workshop series (4–8 sessions)','Evaluation and prompting reference frameworks','Model comparison and selection methodology','Ongoing office hours'],
    timing: '4–8 weeks · Fixed fee' },
]

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero"><div className="container">
        <p className="page-hero__label">Services</p>
        <h1 className="page-hero__h1">Three ways we work with startups</h1>
        <p className="page-hero__sub">Every engagement starts with a conversation — not a proposal. We scope together so you pay for what you actually need.</p>
      </div></section>

      <section className="section section--white"><div className="container">
        <p className="svc-intro">We work with a small number of clients at any given time. That is not a sales line — it is how we ensure senior attention on every project.</p>
        {services.map((s) => (
          <div key={s.id} id={s.id} className="svc-block">
            <span className="svc-block__tag">{s.tag}</span>
            <h2 className="svc-block__h2">{s.title}</h2>
            <p className="svc-block__ideal">{s.ideal}</p>
            <p>{s.what}</p>
            <p>{s.why}</p>
            <div className="deliverables"><h4>What you get</h4><ul>{s.deliverables.map(d=><li key={d}>{d}</li>)}</ul></div>
            <p className="svc-timing">{s.timing}</p>
          </div>
        ))}
      </div></section>

      <section className="section"><div className="container">
        <div className="cta-band">
          <p className="cta-band__label">Not sure which fits?</p>
          <h2 className="cta-band__h2">Let us figure it out together.</h2>
          <p className="cta-band__sub">Most clients start with a 30-minute call. We will tell you honestly what you need — even if it is not us.</p>
          <Link href="/contact" className="btn btn-white">Book a call →</Link>
        </div>
      </div></section>
    </>
  )
}
