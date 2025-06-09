import { MetadataRoute } from 'next'

import { SUPPORTED_LANGUAGES } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: SUPPORTED_LANGUAGES.map((lang) => `/${lang}/test/`),
    },
  }
} 