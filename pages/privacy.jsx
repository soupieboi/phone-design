import SeoHandler from "../components/SeoHandler"

export default function Privacy() {
  return (
    <>
      <SeoHandler title={'VALTracker'} description={'The only VALORANT Stats Tracker you\'ll ever need. Download now - it\'s free.'} />
      <div className="bg-maincolor-light w-full h-screen text-white relative">
        <nav className='w-full h-16 z-20 fixed top-0 left-0 bg-maincolor-lightest flex flex-row items-center py-8 justify-around'>
          <div className='flex flex-row items-center'>
            <img alt="VALTracker Logo" src='/img/VALTracker_Logo_default.png' className='w-16' />
            <h6 className='font-normal hidden sm:inline'>VALTracker.gg</h6>
          </div>
          <div className='flex flex-row items-center'>
            <button 
              className="mr-4 inline-flex flex-row items-center w-40 py-1.5 nav-button"
              onClick={() => { router.push(downloadURL) }}
            >
              <img alt="" src='/img/discord.svg' className='w-8 mr-2 relative left-0.5' /> 
              <span className='relative top-px left-0.5'>Discord</span>
            </button>
            <button 
              className="mr-4 hidden sm:inline-flex flex-row items-center w-40 py-1.5 nav-button"
              onClick={() => { router.push('/docs') }}
            >
              <img alt="" src='/img/share.svg' className='w-5 mr-2 relative bottom-px ' /> 
              <span className=''>API Docs</span>
            </button>
            <button 
              className="mr-2 flex-row items-center w-40 py-1.5 hidden lg:inline-flex"
              onClick={() => { router.push(downloadURL) }}
            >
              <img alt="" src='/img/download.svg' className='w-6 mr-2 relative right-0.5 bottom-px' /> 
              <span className='relative right-0.5'>Download</span>
            </button>
          </div>
        </nav>
        <div className="mt-16 pt-4 mb-6 text-center bg-maincolor-light">
          <h3>Privacy Policy</h3>
          <span>Changed last 2022/04/03</span>
          <div className="mx-auto w-1/2 text-left">
            <h6 className="mt-4 mb-4">VALTracker ("we", "us") is managed by Spirit#6996 (Discord) / @SpiritLetsPlays (Twitter) and is responsible for the website and Program VALTracker.</h6>
            <h5 className="mb-4">What data is saved by VALTracker?</h5>
            <ul className="mb-4">
              <li>- Settings for the App</li>
              <li>- Tokens used for Riot Logins (if used)</li>
            </ul>
            <h5 className="mb-4">How is this data collected?</h5>
            <span className="mb-4">All Riot Games data is collected using Riot's Website and their API they provide. All settings for the app are first auto-generated and then stored locally on the user's PC.</span>
            <h5 className="mb-4 mt-4">How is this data saved?</h5>
            <span>All data by Riot Games is saved in form of Tokens on the users PC that neither contain Username nor password. All settings are also stored on the user's system in form of .json files. All data can be accessed here: <br />C:\Users\&#123;USERNAME_HERE&#125;\AppData\Roaming\VALTracker\user_data</span>
            <h5 className="mb-4 mt-4">How is this data used?</h5>
            <span>All data is only used by the app itself. At no point does the app send any data to a server that collects it. Riot Games' Tokens are used for authentication with their servers, and their servers only.</span>
            <h5 className="mb-4 mt-4">Sharing/Saving of data</h5>
            <span>All data is stored on the users PC and is not available to anyone else.</span>
            <h5 className="mb-4 mt-4">How can I delete my data?</h5>
            <span>If you want to delete all your data that is stored by the App, uninstall it and delete this folder on your PC:<br />C:\Users\&#123;USERNAME_HERE&#125;\AppData\Roaming\VALTracker\user_data<br /></span>
            <h5 className="mb-4 mt-4">Contact</h5>
            <span>If you want to contact us because of questions, join our Discord, DM us on Twitter or write us a Mail:</span>
            <ul>
              <li>- Discord Server: <a href="https://discord.gg/aJfQ4yHysG">Our Discord Server</a></li>
              <li>- Twitter: <a href="https://twitter.com/VALTracker_gg">@VALTracker_gg</a></li>
              <li>- Mail: <a href="mailto:support@valtracker.gg">support@valtracker.gg</a></li>
            </ul>
          </div>
          <footer className="mt-8">
            <div className="footer-bottom p-4 bg-maincolor-lightest w-full flex flex-row justify-center items-center h-fit base:h-20 text-center">
              <span>VALTracker was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot Games. Riot Games does not endorse or sponsor this project.</span>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}