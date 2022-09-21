import '../styles/globals.css'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AnimatePresence } from 'framer-motion';

export async function getServerSideProps(context) {
  return {
    props: { locale: context.locale }
  }
}

function MyApp({ Component, pageProps, locale }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="theme-color" content="#bc0233" data-react-helmet="true" />
      </Head>
      <AnimatePresence
        mode='wait'
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component key={router.pathname} {...pageProps} />
      </AnimatePresence>
    </>
  )
}

export default MyApp
