'use client'

import Image from 'next/image'
import { Easing, motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const works = [
  { id: 1, src: '/works/1.png', alt: 'MyBook mobile app design' },
  { id: 2, src: '/works/2.png', alt: 'Travel app UI design' },
  { id: 3, src: '/works/3.png', alt: 'Doggy Paradise app screens' },
  { id: 4, src: '/works/4.png', alt: 'UI/UX prototype mockup' },
  { id: 5, src: '/works/5.png', alt: 'Mobile app onboarding screen' },
  { id: 6, src: '/works/6.png', alt: 'Lumo admin app screens' },
  { id: 7, src: '/works/7.png', alt: 'GagaMuller website design' },
  { id: 8, src: '/works/8.png', alt: 'S&R Paint business cards' },
  { id: 9, src: '/works/9.png', alt: 'Tetra social media posts' },
  { id: 10, src: '/works/10.png', alt: 'PS5 magazine design' },
  { id: 11, src: '/works/11.png', alt: 'S&R Paint van wrap' },
  { id: 12, src: '/works/12.png', alt: 'Lumo billboard campaign' },
]

// 4-col layout: cols 1 & 3 are offset down; cols 2 & 4 start at the top
const fourColLayout = [
  { items: [works[0], works[4], works[8]], offset: true },
  { items: [works[1], works[5], works[9]], offset: false },
  { items: [works[2], works[6], works[10]], offset: true },
  { items: [works[3], works[7], works[11]], offset: false },
]

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as Easing },
  },
}

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, ease: 'easeOut' as Easing, delay: 0.2 },
  },
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: 'easeOut' as Easing },
  },
}

function WorkImage({ work }: { work: typeof works[0] }) {
  return (
    <motion.div className="overflow-hidden" variants={itemVariants}>
      <Image
        src={work.src}
        alt={work.alt}
        width={400}
        height={400}
        className="w-full h-auto object-cover block"
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
    </motion.div>
  )
}

export function Works() {
  const gridRef = useRef(null)
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' })
  const gridAnimate = gridInView ? 'visible' : 'hidden'

  return (
    <section className="bg-white pb-20 mb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center mb-12"
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.span
            className="gradient-background block h-[5px] w-[70px] mb-4"
            style={{ originX: 0.5 }}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            variants={lineVariants}
          />
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            variants={headerVariants}
          >
            Our Beautiful <span className="text-gradient font-bold">Works</span>
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-md mb-8"
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            variants={headerVariants}
          >
            We help our clients grow their bottom-line with clear and professional websites.
          </motion.p>
        </motion.div>

        {/* Shared ref for single-fire animation across all breakpoint grids */}
        <div ref={gridRef} />

        {/* 4-col staggered layout (lg+): cols 1 & 3 offset down */}
        <motion.div className="hidden lg:flex gap-4 items-start" animate={gridAnimate} initial="hidden" variants={containerVariants}>
          {fourColLayout.map((col, colIdx) => (
            <div key={colIdx} className={`flex flex-col gap-4 flex-1${col.offset ? ' mt-14' : ''}`}>
              {col.items.map((work) => (
                <WorkImage key={work.id} work={work} />
              ))}
            </div>
          ))}
        </motion.div>

        {/* 3-col layout (md) */}
        <motion.div className="hidden md:flex lg:hidden gap-4 items-start" animate={gridAnimate} initial="hidden" variants={containerVariants}>
          {[
            [works[0], works[3], works[6], works[9]],
            [works[1], works[4], works[7], works[10]],
            [works[2], works[5], works[8], works[11]],
          ].map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4 flex-1">
              {col.map((work) => (
                <WorkImage key={work.id} work={work} />
              ))}
            </div>
          ))}
        </motion.div>

        {/* 2-col layout (sm) */}
        <motion.div className="hidden sm:flex md:hidden gap-4 items-start" animate={gridAnimate} initial="hidden" variants={containerVariants}>
          {[works.filter((_, i) => i % 2 === 0), works.filter((_, i) => i % 2 === 1)].map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4 flex-1">
              {col.map((work) => (
                <WorkImage key={work.id} work={work} />
              ))}
            </div>
          ))}
        </motion.div>

        {/* 1-col layout (xs) */}
        <motion.div className="flex sm:hidden flex-col gap-4" animate={gridAnimate} initial="hidden" variants={containerVariants}>
          {works.map((work) => (
            <WorkImage key={work.id} work={work} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
