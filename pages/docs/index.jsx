import Layout from '../../components/docs/layout'
import Footer from '../../components/docs/footer'
import Topbar from '../../components/docs/top_bar'
import Wrapper from '../../components/docs/wrapper'
import InfoWrapper from '../../components/docs/infowrapper'
import { useState } from 'react'

export default function Home() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen(prev => !prev)
  }
  return (
    <Layout home retracted={navbarOpen}>
      <Wrapper expanded={navbarOpen}>
        <Topbar toggleActive={navbarOpen}>
          <div>
            <button onClick={handleToggle} className="ml-4 group docs-button docs-button">
              <img alt="Menu Toggle" className={navbarOpen ? "w-10 rounded mt-2 group-hover:bg-maincolor-lightest group-hover:bg-opacity-70 p-2" : "w-9 rounded mt-2 group-hover:bg-maincolor-lightest group-hover:bg-opacity-70 p-2"} src={navbarOpen ? ('/img/lines.svg') : ('/img/close.svg')}/>
            </button>
          </div>
        </Topbar>
        <InfoWrapper>
          <div className='xl:ml-24 xl:mt-12 w-5/6 xl:3/4'>
            <span className='font-bold text-2xl sm:text-4xl block'>Welcome to VALTracker.gg's official API Documentation!</span><br/>
            <div className='mb-4'>
              <span className='text-xl sm:text-2xl font-semibold'>Base URL:</span><br/>
              <span className='text-sm sm:text-lg'><code className='bg-maincolor-lightest p-1 rounded-sm'>https://api.valtracker.gg</code></span>
            </div>
            <div className='mb-4'>
              <span className='text-xl sm:text-2xl font-semibold'>Rate Limits:</span><br/>
              <span className='text-sm sm:text-lg'>You have 100 Request every minute for the whole API. Rate Limits are based on your IP, so you don't have to worry about an API Key. If you exceed your Rate Limit, the server will return a <code className='bg-maincolor-lightest px-1 rounded-sm'>429</code> Status Code.</span>
            </div>
            <div className='mb-4'>
              <span className='text-xl sm:text-2xl font-semibold'>Endpoints:</span><br/>
              <span className='text-sm sm:text-lg'>All endpoints can be found in the Navbar on the left side of the page.</span>
            </div>
          </div>
        </InfoWrapper>
      </Wrapper>
      <Footer />
    </Layout>
  )
}
