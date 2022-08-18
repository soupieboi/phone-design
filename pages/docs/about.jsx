import Layout from '../../components/docs/layout'
import Footer from '../../components/docs/footer'
import Topbar from '../../components/docs/top_bar'
import Wrapper from '../../components/docs/wrapper'
import InfoWrapper from '../../components/docs/infowrapper'
import { useState } from 'react'
import Link from 'next/link'

export default function About() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen(prev => !prev)
  }
  
  return (
    <Layout about retracted={navbarOpen}>
      <Wrapper expanded={navbarOpen}>
        <Topbar toggleActive={navbarOpen}>
          <div>
            <button onClick={handleToggle} className="ml-4 group docs-button">
              <img alt="Menu Toggle" className={navbarOpen ? "w-10 rounded mt-2 group-hover:bg-maincolor-lightest group-hover:bg-opacity-70 p-2" : "w-9 rounded mt-2 group-hover:bg-maincolor-lightest group-hover:bg-opacity-70 p-2"} src={navbarOpen ? ('/img/lines.svg') : ('/img/close.svg')}/>
            </button>
          </div>
        </Topbar>
        <InfoWrapper>
          <div className='xl:ml-24 xl:mt-12 w-5/6 xl:3/4'>
            <span className='font-bold text-4xl block'>About</span><br/>
            <div className='mb-4'>
              <span className='text-lg'>The VALTracker API is a non-official API and not endorsed by Riot Games in any way. <br/>Riot Games, Valorant, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.</span>
            </div>
            <div className='mb-4'>
              <span className='text-2xl font-semibold'>Contact</span><br/>
              <ul className='text-lg'>
                <li className='ml-4 mt-2'><Link href='https://discord.gg/aJfQ4yHysG' className="text-button-color hover:underline">Discord</Link></li>
                <li className='ml-4 mt-2'><Link href='https://twitter.com/valtracker_gg' className="text-button-color hover:underline">Twitter</Link></li>
              </ul>
            </div>
            <div className='mb-4'>
              <span className='text-2xl font-semibold'>Honorable Mentions</span><br/>
              <span className='text-lg'>A huge thanks to Officer, the developer of the <Link href='https://valorant-api.com' className="text-button-color hover:underline">valorant-api</Link> for letting me use the images that he is hosting.</span>
            </div>
          </div>
        </InfoWrapper>
      </Wrapper>
      <Footer />
    </Layout>
  )
}