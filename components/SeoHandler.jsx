import { NextSeo } from "next-seo";

export default function SeoHandler({ title, description }) {
  return <NextSeo title={title} description={description} openGraph={{ title, description }} />
}