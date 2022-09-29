import KofiButton from 'kofi-button';
import { useRouter } from 'next/router';
import CountUp from 'react-countup';
import React from 'react';
import { GithubStats } from 'github-release-stats';
import fetch from 'node-fetch';
import StoreItem from '../components/StoreItem';
import Match from '../components/Match';
import SmallPromoCard from '../components/SmallPromoCard';
import SeoHandler from '../components/SeoHandler';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import fs from 'fs';
import Sparkles from '../components/Sparkles';
import { motion } from 'framer-motion';
import AnimationCoverUp from '../components/AnimationCoverUp';
import Head from 'next/head';

export async function getServerSideProps(context) {
  const UA = context.req.headers['user-agent'];
  const isMobile = Boolean(UA.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  ));

  var pageContent = require(`../locales/${context.locale.split("-")[0]}/index.json`);

  var data = JSON.parse(fs.readFileSync('./json/data.json'));
  var downloadURL = data.href;

  if(Date.now() > data.refreshDate) {
    const gh = new GithubStats('VALTracker', 'DesktopClient', process.env.GIT_TOKEN);
    var downloads = await gh.getTotalDownloads();
  
    var val_version = (await(await fetch('https://api.valtracker.gg/all-versions/latest')).json()).data;

    downloadURL = `https://github.com/VALTracker/DesktopClient/releases/download/${val_version}/VALTracker-Setup-${val_version.split("v").pop()}.exe`;
    data = {
      "downloads": downloads,
      "href": downloadURL,
      "refreshDate": Date.now() + 600000
    }

    fs.writeFileSync('./json/data.json', JSON.stringify(data));
  }

  return {
    props: {
      downloadCount: data.downloads,
      downloadURL: data.href,
      isMobile: isMobile,
      localContent: pageContent,
    },
  }
}

export default function Home({ downloadCount, downloadURL, isMobile, localContent }) {
  const router = useRouter();

  const [ animatePageContent, setAnimatePageContent ] = React.useState(true);
  const [ timerSeconds, setTimerSeconds ] = React.useState(260);
  const [ matchTeam1Score, setMatchTeam1Score ] = React.useState(0);
  const [ matchTeam2Score, setMatchTeam2Score ] = React.useState(0);

  const featuresHeaderRef = React.useRef(null);
  const moreFeaturesHeaderRef = React.useRef(null);
  const featureCard1Ref = React.useRef(null);
  const featureCard2Ref = React.useRef(null);
  const featureCard3Ref = React.useRef(null);
  const otherFeaturesRef = React.useRef(null);

  React.useEffect(() => {
    setTimeout(async () => {
      var el = document.getElementsByClassName('arrow-down')[0];
      if(el !== undefined) {
        el.classList.remove('arrow-down');
        el.classList.add('floaty','fast');
      }
    }, 800);
  }, []);

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function isInt(n) {
    return n % 1 === 0;
  }
  
  function pad(val) {
    var valString = val + "";
    if(valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }

  React.useEffect(() => {
    setMatchTeam1Score(randomIntFromInterval(12, 0));
    setMatchTeam2Score(randomIntFromInterval(12, 0));
    setAnimatePageContent(false);
  }, []);
  
  React.useEffect(() => {
    var timer = 261;
    var counterInterval = setInterval(async () => {
      timer++;
      setTimerSeconds(timer);
    }, 1000);

    return () => clearInterval(counterInterval);
  }, [])

  React.useEffect(() => {
    if(isInt(timerSeconds/30)) {
      if((matchTeam1Score - matchTeam2Score) >= 1) {
        setTimeout(() => setMatchTeam2Score(matchTeam2Score+1), 500);
      } else if((matchTeam2Score - matchTeam1Score) >= 1) {
        setTimeout(() => setMatchTeam1Score(matchTeam1Score+1), 500);
      } else if((matchTeam1Score - matchTeam2Score) === 0) {
        setTimeout(() => setMatchTeam1Score(matchTeam1Score+1), 500);
      }
    }
  }, [timerSeconds]);

  const addJsonLd = () => {
    return {
      _html: `
        {
          "@context": "http://schema.org/",
          "@type": "Product",
          "name": "VALTracker",
          "image": [
            "https://valtracker.gg/img/VALTracker_Logo_default.png",
          ],
          "description": "VALTracker is the only VALORANT Stats Tracker you'll ever need. Download now - it's free on Windows."
        }
      `
    }
  }

  return (
    <>
      <Head>
        
      </Head>
      <SeoHandler 
        title={'VALTracker'} 
        keywords={localContent.seo.keywords} 
        description={localContent.seo.desc} 
        locale={localContent.lang} 
      />
      <div className="bg-maincolor-lightest w-full h-screen text-white relative overflow-x-hidden">
        <header><Navbar downloadURL={downloadURL} /></header>
        <div className="absolute w-full h-full flex items-center z-20 overflow-hidden">
          <video src="./img/Wallpaper.mp4" muted loop autoPlay className="relative w-full h-full object-cover transform scale-150 z-20" />
        </div>
        <section className="h-full w-full z-20 relative top-0 left-0 bg-black bg-opacity-60">
          <div className="w-full h-full flex flex-col items-center justify-center relative bottom-16">
            <h1 className='mb-4 text-5xl sm:text-7xl'>VALTracker.gg</h1>
            <p className="content-subheader text-lg sm:text-2xl text-center mb-4">
              {localContent.desc}
              <br />
              {
                isMobile ? 
                <span className='inline-block'>{localContent.download_desc_mobile}</span>
                :
                <span className='inline-block'>{localContent.download_desc_pc}</span>
              }
            </p>
            <div className="buttons">
              {
                isMobile ? null : 
                <Link href={downloadURL}>
                  <button 
                    className={"mb-2 mr-2 flex-row items-center relative bottom-px w-40 inline-flex button-2 " + (animatePageContent ? 'animate' : '')}
                  >
                    <img alt="" src='/img/download.svg' className={'w-6 mr-2 relative right-0.5 '} /> 
                    <span className='relative right-0.5'>{localContent.buttons.download}</span>
                  </button>
                </Link>
              }
              <Link href={'https://github.com/valtracker/desktopclient'}>
                <button 
                  className={'mb-2 inline-flex flex-row items-center button-1 lg:w-40 ' + (isMobile ? 'w-44 ' : 'w-40 ') + (animatePageContent ? 'animate' : '')}
                >
                  <img alt="" src='/img/github.svg' className={'w-6 mr-2 relative ' + (isMobile ? 'ml-5 lg:ml-2 ' : 'ml-2 ') + (localContent.lang === 'de' ? 'right-2' : 'right-0.5')} /> 
                  <span className={'relative top-0.5 ' + (localContent.lang === 'de' ? 'right-2' : '')}>{localContent.buttons.src}</span>
                </button>
              </Link>
            </div>
            <div className={'button-3-container ' + (animatePageContent ? 'animate' : '')}>
              <KofiButton color="#bc0233" title={localContent.buttons.kofi} kofiID="J3J2BUBT8" />
            </div>
            <span className={"text-xl mt-4"}>
              <CountUp 
                end={downloadCount} 
                duration={3}
                separator=","
                useEasing={true}
                className={'text-gray-400'}
              /> 
              <span className={'text-gray-400 z-30 scroll-down-arrow'}> {localContent.downloads_desc}</span>
            </span>
            <div className={"absolute scroll-info " + (isMobile ? '-bottom-20 ' : '-bottom-10 ') + (animatePageContent ? 'animate' : '')}>
              <div className="flex flex-col justify-center items-center">
                <Sparkles color='#ababab' intervalNums={[50, 1000]}><span className='text-gray-500'>{localContent.scroll_text}</span></Sparkles>
                <img alt="" src='/img/arrow_down.svg' className='w-6 mt-2 arrow-down' />
              </div>
            </div>
          </div>
        </section>
        <section className='z-10 relative w-full bg-maincolor-light min-h-full flex flex-col items-center px-4'>
          <div className='mb-4 pt-4' ref={featuresHeaderRef}>
            <motion.h3 
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9], delay: 0.3, type: "spring" }}
              viewport={{ root: featuresHeaderRef.current, amount: 1, margin: "-2px 0px 0px 0px" }}
              className='z-10'
            >
              {localContent.features.header}
            </motion.h3>
          </div>
          <motion.div 
            initial={{ opacity: 0  }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9], delay: 0.3 }}
            viewport={{ amount: 0.8, margin: "-2px 0px 0px 0px", once: true }}
            className='w-full sm:w-5/6 xl:w-3/5 border-2 border-maincolor-lightest rounded p-2 z-20 bg-maincolor-light relative'
            ref={featureCard1Ref}
          >
            <span className='text-xl'>{localContent.features.item_1.header}</span>
            <AnimationCoverUp />
            <motion.div
              initial={{ x: -500, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9], delay: 1.1 }}
              viewport={{ root: featureCard1Ref.current, margin: "-2px 0px 0px 0px", once: true }} 
              className='bg-maincolor-lightest border-0 h-0.5 w-1/2 z-0' 
            />
            
            <motion.div
              initial={{ x: 500, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9], delay: 1.1 }}
              viewport={{ root: featureCard1Ref.current, margin: "-2px 0px 0px 0px", once: true }} 
              className='bg-maincolor-lightest border-0 h-0.5 w-1/2 relative bottom-0.5 ml-auto' 
            />
            <div className='w-full flex flex-col base:flex-row pt-4 lg:items-start items-center'>
              <motion.div 
                className='base:w-1/2 base:h-auto h-1/2 w-full base:mr-2 base:mb-0 mb-2 drop-shadow-2xl'
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9], delay: 0.3, type: "spring", damping: 8 }}
                viewport={{ root: featureCard1Ref.current, margin: "-2px 0px 0px 0px", once: true }}
              >
                <div id='DiscordCloneThingy' className='bg-maincolor-lightest p-2 pt-3 pb-6 pl-4 rounded w-full'>
                  <span className='font-bold text-gray-300 text-lg'>{localContent.features.item_1.promo_item.playing_a_game}</span>
                  <div className='flex flex-row mt-1'>
                    <div className='w-24 h-24 relative'>
                      <img alt="Ascent" className='rounded' src='/img/Ascent.png' />
                      <img alt="Jett" className='w-9 bg-maincolor-lightest p-0.5 rounded-full absolute -bottom-2 -right-2' src='/img/Jett.png' />
                    </div>
                    <div className='h-20 ml-4 flex flex-col'>
                      <span className='font-bold text-gray-300 text-lg'>VALORANT</span>
                      <span className='relative bottom-1.5 font-light text-lg'>
                        <span className='text-gray-300 hidden mini:inline-block'>{localContent.features.item_1.promo_item.status}</span> 
                        <span className='text-gray-300'> {localContent.features.item_1.promo_item.status2}</span>
                      </span>
                      <span className='relative bottom-2.5 font-light text-gray-300 text-lg'>{matchTeam1Score} - {matchTeam2Score}</span>
                      <span className='relative bottom-3.5 font-light text-gray-300 text-lg'>{pad(parseInt(timerSeconds/60))}:{pad(timerSeconds%60)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                className='base:w-1/2 w-full base:text-left text-center p-2 pt-0'
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9], delay: 0.3, type: "spring" }}
                viewport={{ root: featureCard1Ref.current, margin: "-2px 0px 0px 0px", once: true }}
              >
                <span className='text-lg'>
                  {localContent.features.item_1.desc}
                </span>
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            className='w-full sm:w-5/6 xl:w-3/5 border-2 border-maincolor-lightest rounded p-2 z-20 bg-maincolor-light relative mt-4'
            initial={{ y: -100, opacity: 0  }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9], delay: 0.3 }}
            viewport={{ amount: 0.8, margin: "-2px 0px 0px 0px", once: true }}
            ref={featureCard2Ref}
          >
            <span className='text-xl'>{localContent.features.item_2.header}</span>
            <AnimationCoverUp />
            <motion.div
              initial={{ x: -500, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9], delay: 1.1 }}
              viewport={{ root: featureCard2Ref.current, margin: "-2px 0px 0px 0px", once: true }} 
              className='bg-maincolor-lightest border-0 h-0.5 w-1/2 z-0' 
            />
            
            <motion.div
              initial={{ x: 500, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9], delay: 1.1 }}
              viewport={{ root: featureCard2Ref.current, margin: "-2px 0px 0px 0px", once: true }} 
              className='bg-maincolor-lightest border-0 h-0.5 w-1/2 relative bottom-0.5 ml-auto' 
            />
            <div className='w-full flex flex-col base:flex-row'>
              <motion.div 
                className='base:w-1/2 base:h-auto h-1/2 w-full base:mr-2 base:mb-0 mb-2'
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9], delay: 0.3, type: "spring", damping: 8 }}
                viewport={{ root: featureCard2Ref.current, margin: "-2px 0px 0px 0px", once: true }}
              >
                <StoreItem itemName={localContent.features.item_2.promo_item.skin_name} />
              </motion.div>
              <motion.div 
                className='base:w-1/2 w-full base:text-left text-center p-2 pt-3'
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9], delay: 0.3, type: "spring", damping: 8 }}
                viewport={{ root: featureCard2Ref.current, margin: "-2px 0px 0px 0px", once: true }}
              >
                <span className='text-lg'>{localContent.features.item_2.desc}</span>
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            className='w-full sm:w-5/6 xl:w-3/5 border-2 border-maincolor-lightest rounded p-2 z-20 bg-maincolor-light relative mt-4'
            initial={{ y: -100, opacity: 0  }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9], delay: 0.3 }}
            viewport={{ amount: 0.8, margin: "-2px 0px 0px 0px", once: true }}
            ref={featureCard3Ref}
          >
            <span className='text-xl'>{localContent.features.item_3.header}</span>
            <AnimationCoverUp />
            <motion.div
              initial={{ x: -500, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9], delay: 1.1 }}
              viewport={{ root: featureCard3Ref.current, margin: "-2px 0px 0px 0px", once: true }} 
              className='bg-maincolor-lightest border-0 h-0.5 w-1/2 z-0' 
            />
            
            <motion.div
              initial={{ x: 500, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9], delay: 1.1 }}
              viewport={{ root: featureCard3Ref.current, margin: "-2px 0px 0px 0px", once: true }} 
              className='bg-maincolor-lightest border-0 h-0.5 w-1/2 relative bottom-0.5 ml-auto' 
            />
            <div className='w-full flex flex-col base:flex-row pt-4 lg:items-start items-center'>
              <motion.div 
                className='base:w-1/2 base:h-auto h-1/2 w-full base:mr-2'
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9], delay: 0.3, type: "spring", damping: 8 }}
                viewport={{ root: featureCard3Ref.current, margin: "-2px 0px 0px 0px", once: true }}
              >
                <Match localContent={localContent} />
              </motion.div>
              <motion.div 
                className='base:w-1/2 w-full base:text-left text-center p-2 pt-0'
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9], delay: 0.3, type: "spring", damping: 8 }}
                viewport={{ root: featureCard3Ref.current, margin: "-2px 0px 0px 0px", once: true }}
              >
                <span className='text-lg'>{localContent.features.item_3.desc}</span>
              </motion.div>
            </div>
          </motion.div>
          <div className='mt-4' ref={moreFeaturesHeaderRef}>
            <motion.h4 
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9], delay: 0.3, type: "spring" }}
              viewport={{ root: moreFeaturesHeaderRef.current, amount: 1, margin: "-2px 0px 0px 0px" }}
              className='z-10 text-center'
            >
              {localContent.other_features.header}
            </motion.h4>
          </div>
          <div className='w-full sm:w-5/6 xl:w-3/5 border-2 border-maincolor-lightest rounded p-2 mt-4 overflow-hidden' ref={otherFeaturesRef}>
            <div className='flex flex-col base:flex-row base2:mb-2'>
              <SmallPromoCard passRef={otherFeaturesRef} animDelay={0.2} isLast={false} icon={'home'} title={localContent.other_features.item_1.header} desc={localContent.other_features.item_1.desc} />
              <SmallPromoCard passRef={otherFeaturesRef} animDelay={0.4} isLast={false} icon={'user'} title={localContent.other_features.item_2.header} desc={localContent.other_features.item_2.desc} />
              <SmallPromoCard passRef={otherFeaturesRef} animDelay={0.6} isLast={true} icon={'swap'} title={localContent.other_features.item_3.header} desc={localContent.other_features.item_3.desc} />
            </div>
            <div className='flex flex-col base:flex-row base2:mb-2'>
              <SmallPromoCard passRef={otherFeaturesRef} animDelay={0.8} isLast={false} icon={'search'} title={localContent.other_features.item_4.header} desc={localContent.other_features.item_4.desc} />
              <SmallPromoCard passRef={otherFeaturesRef} animDelay={1.0} isLast={false} icon={'coffee'} title={localContent.other_features.item_5.header} desc={localContent.other_features.item_5.desc} hasLink link={localContent.other_features.item_5.link_text} href={'https://ko-fi.com/valtrackergg'} />
              <SmallPromoCard passRef={otherFeaturesRef} animDelay={1.2} isLast={true} icon={'crosshair'} title={localContent.other_features.item_6.header} desc={localContent.other_features.item_6.desc} />
            </div>
            <div className='flex base2:flex-row flex-col'>
              <motion.div 
                className={"base2:w-1/2 w-full base2:mb-0 md:h-48 flex flex-col items-center justify-center bg-maincolor-lightest rounded p-2 mr-2 mb-2"}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "linear", delay: 1.4, type: "tween" }}
                viewport={{ root: otherFeaturesRef.current, margin: "-2px 0px 0px 0px", once: true }} 
              >
                <div className="flex flex-row items-center text-center justify-center">
                  <img alt="" src={'/img/discord_blurple.svg'} className='w-10 relative bottom-px' />
                  <span className="text-3xl font-semibold ml-2">{localContent.other_features.item_7.header}</span>
                </div>
                <span className="mt-4 text-center">{localContent.other_features.item_7.desc}</span>
                <button 
                  className='special-button mt-2 border-2 border-blurple-dark py-2 px-4 rounded hover:rounded-none hover:border-blurple transition-all duration-100 ease-linear w-28'
                  onClick={() => {
                    router.push('https://discord.gg/aJfQ4yHysG');
                  }}
                >
                  {localContent.other_features.item_7.button_text}
                </button>
              </motion.div>

              <motion.div 
                className={"base2:w-1/2 w-full base2:mb-0 md:h-48 flex flex-col items-center justify-center bg-maincolor-lightest rounded p-2"}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "linear", delay: 1.6, type: "tween" }}
                viewport={{ root: otherFeaturesRef.current, margin: "-2px 0px 0px 0px", once: true }} 
              >
                <div className="flex flex-row items-center text-center justify-center">
                  <img alt="" src={'/img/share.svg'} className='w-6 relative bottom-px' />
                  <span className="text-3xl font-semibold ml-2">{localContent.other_features.item_8.header}</span>
                </div>
                <span className="mt-4 text-center">{localContent.other_features.item_8.desc}</span>
                <button 
                  className='special-button mt-2 border-2 border-button-color py-2 px-4 rounded hover:rounded-none hover:border-button-color-hover transition-all duration-100 ease-linear w-28'
                  onClick={() => {
                    router.push('/docs');
                  }}
                >
                  {localContent.other_features.item_8.button_text}
                </button>
              </motion.div>
            </div>
          </div>
          <span className='my-8 text-xl text-center'>{localContent.priv_info.desc} <Link href={'/privacy'}>{localContent.priv_info.link_text}</Link>{localContent.priv_info.desc2 === '.' ? '.' : ` ${localContent.priv_info.desc2}`}</span>
        </section>
        <Footer />
      </div>
    </>
  )
}
