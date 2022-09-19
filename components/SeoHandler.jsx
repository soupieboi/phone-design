import { NextSeo } from "next-seo";

export default function SeoHandler({ title, description, locale, keywords }) {
  const locales = [
    {code: 'de', url: 'https://valtracker.gg/de'}, {code: 'en', url: 'https://valtracker.gg/en'}
  ];

  var data = locales.map((obj, index) => {
    if(obj.code !== locale) {
      return {
        hrefLang: obj.code,
        href: obj.url,
      }
    }
  });

  const langAlts = data.filter(element => {
    return element !== undefined;
  });

  return (
    <NextSeo 
      title={title} 
      description={description}
      openGraph={{
        type: 'website',
        locale: 'en',
        title: title,
        description: description,
        site_name: 'VALORANT Shop Checker, Stats Tracker and more - VALTracker',
        url: `https://valtracker.gg/`,
      }}
      canonical="https://valtracker.gg"
      languageAlternates={langAlts}
      additionalMetaTags={[{
        property: 'keywords',
        content: keywords
      }]}
    />
  )
}