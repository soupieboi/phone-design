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

export async function getServerSideProps() {
  var data = JSON.parse(fs.readFileSync('./json/data.json'));

  if(Date.now() > data.refreshDate) {
    const gh = new GithubStats('VALTracker', 'DesktopClient', process.env.GIT_TOKEN);
    var data = await gh.getTotalDownloads();
  
    var val_version = (await(await fetch('https://api.valtracker.gg/all-versions/latest')).json()).data;

    var downloadURL = `https://github.com/VALTracker/DesktopClient/releases/download/${val_version}/VALTracker-Setup-${val_version.split("v").pop()}.exe`;
    
    fs.writeFileSync('./json/data.json', JSON.stringify({
      "downloads": data,
      "href": downloadURL,
      "refreshDate": Date.now() + 600000
    }));

    return {
      props: {
        downloadCount: data,
        downloadURL: downloadURL
      },
    }
  } else {
    return {
      props: {
        downloadCount: data.downloads,
        downloadURL: data.href
      },
    }
  }
}

export default function Home({ downloadCount, downloadURL }) {
  const router = useRouter();

  return (
    <>
      <SeoHandler title={'VALTracker'} description={'The only VALORANT Stats Tracker you\'ll ever need. Download now - it\'s free.'} />
      <div className="bg-maincolor-lightest w-full h-screen text-white relative">
        <Navbar />
        <div className="absolute w-full h-full flex items-center z-10 overflow-hidden">
          <video src="./img/Wallpaper.mp4" muted loop autoPlay className="relative w-full h-full object-cover transform scale-150" />
        </div>
        <div className="h-full w-full z-10 relative top-0 left-0 bg-black bg-opacity-60">
          <div className="w-full h-full flex flex-col items-center justify-center relative bottom-16">
            <h1 className='mb-4 text-5xl sm:text-7xl'>VALTracker.gg</h1>
            <p className="content-subheader text-lg sm:text-2xl text-center mb-4">
              The only VALORANT Stats Tracker you'll ever need.
              <br /> 
              <span className='hidden lg:inline-block'>Download now - it's free.</span>
              <span className='lg:hidden inline-block'>Download now - available on Windows.</span>
            </p>
            <div className="buttons">
              <button 
                className="mb-2 mr-2 flex-row items-center relative bottom-px w-40 hidden lg:inline-flex"
                onClick={() => { router.push(downloadURL) }}
              >
                <img alt="" src='/img/download.svg' className='w-6 mr-2 relative right-0.5' /> 
                <span className='relative right-0.5'>Download</span>
              </button>
              <button 
                className='mb-2 lg:mr-4 inline-flex flex-row items-center w-44 lg:w-40' 
                onClick={() => { router.push('https://github.com/valtracker/desktopclient'); }}
              >
                <img alt="" src='/img/github.svg' className='w-6 mr-2 ml-5 lg:ml-2' /> 
                <span className='relative top-0.5'>Source</span>
              </button>
            </div>
            <KofiButton color="#bc0233" title="Support us on Ko-Fi" kofiID="J3J2BUBT8" className="" />
            <span className="text-xl mt-4">
              <CountUp 
                end={downloadCount} 
                duration={3}
                separator=","
                useEasing={true}
                className={'text-gray-400'}
              /> 
              <span className='text-gray-400'> Downloads</span>
            </span>
            <div className="absolute -bottom-10">
              <div className="flex flex-col justify-center items-center">
                <span className='text-gray-500'>Or scroll down to learn more!</span>
                <img alt="" src='/img/arrow_down.svg' className='w-6 mt-2' />
              </div>
            </div>
          </div>
        </div>
        <div className='z-10 relative w-full bg-maincolor-light min-h-full flex flex-col items-center p-4'>
          <h3 className='mb-4'>Features</h3>
          <div className='w-5/6 xl:w-3/5 border-2 border-maincolor-lightest rounded-sm p-2'>
            <span className='text-xl'>Custom Discord Rich Presence</span>
            <hr className='bg-gray-500 border-0 h-px' />
            <div className='w-full flex flex-col base:flex-row pt-4'>
              <div className='base:w-1/2 base:h-auto h-1/2 w-full base:mr-2 base:mb-0 mb-2'>
                <div id='DiscordCloneThingy' className='bg-maincolor-lightest p-2 pt-3 pb-6 pl-4 rounded-sm w-full'>
                  <span className='font-bold text-gray-300 text-lg'>PLAYING A GAME</span>
                  
                  <div className='flex flex-row mt-1'>
                    <div className='w-24 h-24 relative'>
                      <img alt="Ascent" className='rounded' src='/img/Ascent.png' />
                      <img alt="Jett" className='w-9 bg-maincolor-lightest p-0.5 rounded-full absolute -bottom-2 -right-2' src='/img/Jett.png' />
                    </div>
                    <div className='h-20 ml-4 flex flex-col'>
                      <span className='font-bold text-gray-300 text-lg'>VALORANT</span>
                      <span className='relative bottom-1.5 font-light text-lg'>
                        <span className='text-gray-300 hidden mini:inline-block'>Competitive -</span> 
                        <span className='text-gray-300'> In Match</span>
                      </span>
                      <span className='relative bottom-2.5 font-light text-gray-300 text-lg'>12 - 0</span>
                      <span className='relative bottom-3.5 font-light text-gray-300 text-lg'>04:20 elapsed</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='base:w-1/2 w-full base:text-left text-center p-2'>
                <span className='text-lg'>
                  Gain access to a custom Discord Rich Presence that updates accordingly to where you are in game, be an Agent Select or a Comp Match. 
                  <br />
                  Just leave the app running in the background while playing.
                  </span>
              </div>
            </div>
          </div>
          <div className='w-5/6 xl:w-3/5 border-2 border-maincolor-lightest rounded-sm p-2 mt-4 overflow-hidden'>
            <span className='text-xl'>Built-in Shop Checker</span>
            <hr className='bg-gray-500 border-0 h-px' />
            <div className='w-full flex flex-col base:flex-row'>
              <div className='base:w-1/2 base:h-auto h-1/2 w-full base:mr-2 base:mb-0 mb-2'>
                <StoreItem />
              </div>
              <div className='base:w-1/2 w-full base:text-left text-center p-2'>
                <span className='text-lg'>Quickly check your Daily Store and Night Market with the built-in Store Checker. 
                <br />
                You can even wishlist skins to get a Desktop Notification when they are in your Daily Store! 
                <br />
                Come on, we all know you want that Reaver Vandal.</span>
              </div>
            </div>
          </div>
          <div className='w-5/6 xl:w-3/5 border-2 border-maincolor-lightest rounded-sm p-2 mt-4 overflow-hidden'>
            <span className='text-xl'>Favorite Matches</span>
            <hr className='bg-gray-500 border-0 h-px' />
            <div className='w-full flex flex-col base:flex-row pt-4'>
              <div className='base:w-1/2 base:h-auto h-1/2 w-full base:mr-2'>
                <Match />
              </div>
              <div className='base:w-1/2 w-full base:text-left text-center p-2'>
                <span className='text-lg'>Mark any of your Matches as favorites to check on them at any time, even if that's in a year!</span>
              </div>
            </div>
          </div>
          <h4 className='mt-4 text-center'>And so much more!</h4>
          <div className='w-5/6 xl:w-3/5 border-2 border-maincolor-lightest rounded-sm p-2 mt-4 overflow-hidden'>
            <div className='flex flex-col base:flex-row base2:mb-2'>
              <SmallPromoCard isLast={false} icon={'home'} title={'The Hub'} desc={'Instantly see your most recent Matches, Stats, Agent Contract and Battle Pass Progress!'} />
              <SmallPromoCard isLast={false} icon={'user'} title={'Inventory'} desc={'View all skins and manage your inventory from within the app using presets!'} />
              <SmallPromoCard isLast={true} icon={'swap'} title={'Accounts'} desc={'Switch Accounts to see multiple Shops and Match Histories!'} />
            </div>
            <div className='flex flex-col base:flex-row base2:mb-2'>
              <SmallPromoCard isLast={false} icon={'search'} title={'Search'} desc={'Search for any player to quickly see their match history!'} />
              <SmallPromoCard isLast={false} icon={'coffee'} title={'Ko-Fi'} desc={'Like what you\'re seeing? Supports us by buying us a coffee on '} hasLink link={'Ko-Fi!'} href={'https://ko-fi.com/valtrackergg'} />
              <SmallPromoCard isLast={true} icon={'crosshair'} title={'Matchview'} desc={'Gain information about any of your matches with a detailed overview!'} />
            </div>
            <div className='flex base2:flex-row flex-col'>
              <div className={"base2:w-1/2 w-full base2:mb-0 mb-2 md:h-48 flex flex-col items-center justify-center bg-maincolor-lightest rounded-sm p-2 mr-2"}>
                <div className="flex flex-row items-center text-center justify-center">
                  <img alt="" src={'/img/discord_blurple.svg'} className='w-10 relative bottom-px' />
                  <span className="text-3xl font-semibold ml-2">Discord</span>
                </div>
                <span className="mt-4 text-center">Join our Discord to get help and support for VALTracker, converse with the community or just to chill out!</span>
                <button 
                  className='special-button mt-2 border-2 border-blurple-dark py-2 px-4 rounded hover:rounded-none hover:border-blurple transition-all duration-100 ease-linear w-28'
                  onClick={() => {
                    router.push('https://discord.gg/aJfQ4yHysG');
                  }}
                >
                  Join
                </button>
              </div>

              <div className={"base2:w-1/2 w-full base2:mb-0 md:h-48 flex flex-col items-center justify-center bg-maincolor-lightest rounded-sm p-2"}>
                <div className="flex flex-row items-center text-center justify-center">
                  <img alt="" src={'/img/share.svg'} className='w-6 relative bottom-px' />
                  <span className="text-3xl font-semibold ml-2">API</span>
                </div>
                <span className="mt-4 text-center">VALTracker has it's own API for the app, but we also have some VALORANT specific Endpoints! Wanna check them out?</span>
                <button 
                  className='special-button mt-2 border-2 border-button-color py-2 px-4 rounded hover:rounded-none hover:border-button-color-hover transition-all duration-100 ease-linear w-28'
                  onClick={() => {
                    router.push('/docs');
                  }}
                >
                  API Docs
                </button>
              </div>
            </div>
          </div>
          <span className='my-8 text-xl'>Interested in how we store data? Check out our <Link href={'/privacy'}>Privacy Policy</Link>.</span>
        </div>
        <Footer />
      </div>
    </>
  )
}
