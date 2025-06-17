import { client } from "./sanity";
import { Seo } from "./sanity.types";

export async function getMetadata(lang: string, pageType: string): Promise<Seo> {
  const metadata = await client.fetch<Seo>(
    `*[_type == "page" && language == $lang && pageType == $pageType][0]{
      "metaTitle": seo.metaTitle,
      "metaDescription": seo.metaDescription
    }`,
    { lang, pageType }
  );

  return metadata;
}