import '../styles/globals.css'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="keywords" content="VALORANT, Stats, Statistics, valtracker, valoranttracker, tracker, valorant, rich presence, richpresence, discord presence, skin changer, shop checker, daily shop checker" />
        <meta name="theme-color" content="#bc0233" data-react-helmet="true" />
      </Head>
      <NextSeo
        titleTemplate="%s"
        openGraph={{
          type: 'website',
          locale: 'en_US',
          description: `VALTracker is the only VALORANT Stats Tracker that you'll need. It's completely free, no ads, no subscription!`,
          site_name: 'VALORANT Shop Checker, Stats Tracker and more - VALTracker',
          url: `https://valtracker.gg${router.route}`,
        }}
      />
      <AnimatePresence
        exitBeforeEnter={true}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component key={router.pathname} {...pageProps} />
      </AnimatePresence>
    </>
  )
}

export default MyApp
