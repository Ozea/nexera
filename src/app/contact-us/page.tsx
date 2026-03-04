import { ContactUs } from '@/containers/ContactUs/ContactUs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Loki',
  description: 'Get in touch for branding, web or graphic design work. Remote available.',
}

export default function ContactPage() {
  return <ContactUs />
}
