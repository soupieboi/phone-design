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
        setMatchTeam2Score(matchTeam2Score+1);
      } else if((matchTeam2Score - matchTeam1Score) >= 1) {
        setMatchTeam1Score(matchTeam1Score+1);
      } else if((matchTeam1Score - matchTeam2Score) === 0) {
        setMatchTeam1Score(matchTeam1Score+1);
      }
    }
  }, [timerSeconds]);

  return (
    <>
      <SeoHandler 
        title={'VALTracker'} 
        keywords={localContent.seo.keywords} 
        description={localContent.seo.desc} 
        locale={localContent.lang} 
      />
      <div className="bg-maincolor-lightest w-full h-screen text-white relative">
        <Navbar downloadURL={downloadURL} />
        <div className="absolute w-full h-full flex items-center z-10 overflow-hidden">
          <video src="./img/Wallpaper.mp4" muted loop autoPlay className="relative w-full h-full object-cover transform scale-150" />
        </div>
        <div className="h-full w-full z-10 relative top-0 left-0 bg-black bg-opacity-60">
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
                <img alt="" src='/img/arrow_down.svg' className='w-6 mt-2 floaty fast' />
              </div>
            </div>
          </div>
        </div>
        <div className='z-10 relative w-full bg-maincolor-light min-h-full flex flex-col items-center p-4'>
          <h3 className='mb-4'>{localContent.features.header}</h3>
          <div className='w-5/6 xl:w-3/5 border-2 border-maincolor-lightest rounded p-2'>
            <span className='text-xl'>{localContent.features.item_1.header}</span>
            <hr className='bg-gray-500 border-0 h-px' />
            <div className='w-full flex flex-col base:flex-row pt-4 lg:items-start items-center'>
              <div className='base:w-1/2 base:h-auto h-1/2 w-full base:mr-2 base:mb-0 mb-2'>
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
              </div>
              <div className='base:w-1/2 w-full base:text-left text-center p-2 pt-0'>
                <span className='text-lg'>
                  {localContent.features.item_1.desc}
                  </span>
              </div>
            </div>
          </div>
          <div className='w-5/6 xl:w-3/5 border-2 border-maincolor-lightest rounded p-2 mt-4 overflow-hidden'>
            <span className='text-xl'>{localContent.features.item_2.header}</span>
            <hr className='bg-gray-500 border-0 h-px' />
            <div className='w-full flex flex-col base:flex-row'>
              <div className='base:w-1/2 base:h-auto h-1/2 w-full base:mr-2 base:mb-0 mb-2'>
                <StoreItem itemName={localContent.features.item_2.promo_item.skin_name} />
              </div>
              <div className='base:w-1/2 w-full base:text-left text-center p-2 pt-3'>
                <span className='text-lg'>{localContent.features.item_2.desc}</span>
              </div>
            </div>
          </div>
          <div className='w-5/6 xl:w-3/5 border-2 border-maincolor-lightest rounded p-2 mt-4 overflow-hidden'>
            <span className='text-xl'>{localContent.features.item_3.header}</span>
            <hr className='bg-gray-500 border-0 h-px' />
            <div className='w-full flex flex-col base:flex-row pt-4 lg:items-start items-center'>
              <div className='base:w-1/2 base:h-auto h-1/2 w-full base:mr-2'>
                <Match localContent={localContent} />
              </div>
              <div className='base:w-1/2 w-full base:text-left text-center p-2 pt-0'>
                <span className='text-lg'>{localContent.features.item_3.desc}</span>
              </div>
            </div>
          </div>
          <h4 className='mt-4 text-center'>{localContent.other_features.header}</h4>
          <div className='w-5/6 xl:w-3/5 border-2 border-maincolor-lightest rounded p-2 mt-4 overflow-hidden'>
            <div className='flex flex-col base:flex-row base2:mb-2'>
              <SmallPromoCard isLast={false} icon={'home'} title={localContent.other_features.item_1.header} desc={localContent.other_features.item_1.desc} />
              <SmallPromoCard isLast={false} icon={'user'} title={localContent.other_features.item_2.header} desc={localContent.other_features.item_2.desc} />
              <SmallPromoCard isLast={true} icon={'swap'} title={localContent.other_features.item_3.header} desc={localContent.other_features.item_3.desc} />
            </div>
            <div className='flex flex-col base:flex-row base2:mb-2'>
              <SmallPromoCard isLast={false} icon={'search'} title={localContent.other_features.item_4.header} desc={localContent.other_features.item_4.desc} />
              <SmallPromoCard isLast={false} icon={'coffee'} title={localContent.other_features.item_5.header} desc={localContent.other_features.item_5.desc} hasLink link={localContent.other_features.item_5.link_text} href={'https://ko-fi.com/valtrackergg'} />
              <SmallPromoCard isLast={true} icon={'crosshair'} title={localContent.other_features.item_6.header} desc={localContent.other_features.item_6.desc} />
            </div>
            <div className='flex base2:flex-row flex-col'>
              <div className={"base2:w-1/2 w-full base2:mb-0 mb-2 md:h-48 flex flex-col items-center justify-center bg-maincolor-lightest  p-2 mr-2"}>
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
              </div>

              <div className={"base2:w-1/2 w-full base2:mb-0 md:h-48 flex flex-col items-center justify-center bg-maincolor-lightest rounded p-2"}>
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
              </div>
            </div>
          </div>
          <span className='my-8 text-xl text-center'>{localContent.priv_info.desc} <Link href={'/privacy'}>{localContent.priv_info.link_text}</Link>{localContent.priv_info.desc2 === '.' ? '.' : ` ${localContent.priv_info.desc2}`}</span>
        </div>
        <Footer />
      </div>
    </>
  )
}
