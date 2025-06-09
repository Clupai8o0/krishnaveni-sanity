## Generating Static Params for page slugs

Generating static params for page slugs that are language specific and SEO friendly

```tsx
// app/[lang]/[[...slug]]/page.tsx
import {sanityClient} from '@/lib/sanity'

type Params = { lang: string; slug?: string[] }

export async function generateStaticParams(): Promise<Params[]> {
  const locales = ['en','es']
  const allParams: Params[] = []

  for (const lang of locales) {
    // fetch all slugs for this language
    const slugs: string[] = await sanityClient.fetch(
      `*[_type=='page' && language==$lang].slug.current`, 
      { lang }
    )
    // map to params objects (split paths if nested)
    slugs.forEach((s) => {
      allParams.push({ lang, slug: s === '' ? undefined : s.split('/') })
    })
    // include the root page
    allParams.push({ lang })
  }

  return allParams
}
```