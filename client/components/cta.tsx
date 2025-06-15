import React from 'react'
import { CTAProps } from '@/lib/types'
import Link from 'next/link'
import { generateId } from '@/lib/utils'

const CTA = ({ cta }: { cta: CTAProps }) => {
  return (
    <section className="w-full h-auto overflow-hidden py-10 relative px-4 md:px-8">
      <div className="w-full max-w-7xl mx-auto h-auto overflow-hidden relative flex flex-col">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-balance text-center">
          {cta.title}
        </h1>
        <p className="font-sans text-lg md:text-xl lg:text-2xl font-medium text-balance text-center">
          {cta.description}
        </p>
        <div className="flex flex-col md:flex-row gap-4 mt-12">
          {cta.ctaBtns.map((btn) => (
            <Link href={btn.internalPage?.slug || ""} key={generateId()}>
              {btn.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CTA