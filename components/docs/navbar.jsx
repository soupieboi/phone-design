import NavLink from "./navlink";
import NavAbout from "./nav_about";
import { useRouter } from 'next/router';

export default function Navbar({ home, bundles, featured_bundle, patchnotes, messages, status, about, retracted }) {
  const router = useRouter();

  const navbarClasses = "h-screen bg-maincolor w-2/6 xl:w-1/6 absolute flex flex-col grow";
  
  return (
    <div className={retracted ? ("hidden") : (navbarClasses)}>
      <div className="h-16 flex items-center justify-center">
        <h1 className="text-lg text-center xl:text-2xl font-bold flex flex-row items-center cursor-pointer" onClick={() => { router.push('/') }}>
          <img src="/img/VALTracker_Logo_default.png" className="w-16 hidden xl:inline-block" />
          VALTracker
        </h1>
      </div>
      <NavLink passedHref={"/docs"} active={home ? (true) : (false)} passedHrefClasses="mx-4 border-b border-b-button-color" extraClasses="mx-0 mb-4">
        <img className="w-6 mr-2 sm:block hidden" src="/img/home-white.svg" />
        Home
      </NavLink>
      <NavLink passedHref={"/docs/patchnotes"} active={patchnotes ? (true) : (false)} extraClasses="">
        <img className="w-6 mr-2 sm:block hidden" src="/img/clipboard-white.svg" />
        VALTracker Patchnotes
      </NavLink>
      <NavLink passedHref={"/docs/messages"} active={messages ? (true) : (false)} extraClasses="">
          <img className="w-6 mr-2 sm:block hidden" src="/img/message.svg" />
          VALTracker Messages
      </NavLink>
      <NavLink passedHref={"/docs/status"} active={status ? (true) : (false)} extraClasses="">
          <img className="w-6 mr-2 sm:block hidden" src="/img/status.svg" />
          VALTracker Status
      </NavLink>
      <NavLink passedHref={"/docs/bundles"} active={bundles ? (true) : (false)} extraClasses="">
        <img className="w-6 mr-2 sm:block hidden" src="/img/files.svg" />
        VALORANT Bundles
      </NavLink>
      <NavLink passedHref={"/docs/featured-bundle"} active={featured_bundle ? (true) : (false)} extraClasses="">
        <img className="w-6 mr-2 sm:block hidden" src="/img/file.svg" />
        Featured Bundle
      </NavLink>
      <NavAbout active={about ? (true) : (false)} extraClasses={""}/>
    </div>
  )
}