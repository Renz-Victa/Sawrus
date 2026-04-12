import type { Metadata } from 'next'
import ContactClient from './ContactClient'
export const metadata: Metadata = {
  title: 'Book a Call',
  description: 'Schedule a free 30-minute strategy call with AsleepTurtle.',
}
export default function ContactPage() { return <ContactClient /> }
