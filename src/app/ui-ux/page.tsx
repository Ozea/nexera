import { CtaBanner } from '@/components/CtaBanner/CtaBanner'
import UiUx from '@/containers/UiUx'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UI/UX Designer in Ireland | Product Design & Web-Templates',
  description:
    'Explore real-world UI/UX design projects, prototypes, and templates. Based in Ireland, open to freelance work locally and remotely if needed.',
}

export default function UiUxPage() {
  return (
    <main className="bg-white text-black pt-15 md:pt-40">
      <UiUx />
      <CtaBanner />
    </main>
  )
}
