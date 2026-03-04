import { CtaBanner } from '@/components/CtaBanner/CtaBanner'
import VisualDesign from '@/containers/VisualDesign'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Visual Design Portfolio | Posters & Social Media | Ireland',
  description:
    'Showcasing social media designs, posters, and billboards for brands. Based in Ireland with freelance visual design services available remotely.',
}

export default function VisualDesignPage() {
  return (
    <main className="bg-white text-black pt-15 md:pt-40">
      <VisualDesign />
      <CtaBanner />
    </main>
  )
}
