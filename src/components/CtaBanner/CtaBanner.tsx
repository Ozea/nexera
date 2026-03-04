'use-client'

import { GradientButton } from '../Button/Gradient'

export function CtaBanner() {
  return (
    <div className="bg-white max-w-6xl mx-auto px-6 py-16 md:py-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-gray-700 mb-6">
            Let&apos;s work together{' '}
            <span className="whitespace-nowrap font-normal">
              with <span className="text-gradient">me</span>
            </span>
          </h2>

          <p className="text-lg text-gray-600 mb-8">
            Based in Dublin, Ireland, I help businesses create impactful brands and social media strategies. Let&apos;s bring your vision to life with
            designs and content that make a lasting impression!
          </p>
        </div>

        <div className="w-full md:w-auto">
          <GradientButton linkProps={{ href: '/contact-us/' }}>Get Started</GradientButton>
        </div>
      </div>
    </div>
  )
}
