import Layout from '../../components/docs/layout'
import Footer from '../../components/docs/footer'
import Topbar from '../../components/docs/top_bar'
import Wrapper from '../../components/docs/wrapper'
import InfoWrapper from '../../components/docs/infowrapper'
import ApiCard from '../../components/docs/api_card'
import ExecuteWrapper from '../../components/docs/ExecuteWrapper'
import ApiCardInput from '../../components/docs/api_input'
import { useState } from 'react'

export default function Bundles() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen(prev => !prev)
  }
  
  return (
    <Layout messages retracted={navbarOpen}>
      <Wrapper expanded={navbarOpen}>
        <Topbar toggleActive={navbarOpen}>
          <div>
            <button onClick={handleToggle} className="ml-4 group docs-button">
              <img className={navbarOpen ? "w-10 rounded mt-2 group-hover:bg-maincolor-lightest group-hover:bg-opacity-70 p-2" : "w-9 rounded mt-2 group-hover:bg-maincolor-lightest group-hover:bg-opacity-70 p-2"} src={navbarOpen ? ('/img/lines.svg') : ('/img/close.svg')}/>
            </button>
          </div>
        </Topbar>
        <InfoWrapper>
          <div className='xl:mt-12'>
            <ApiCard 
              method={"GET"} 
              title={"Get all messages"} 
              route={"https://api.valtracker.gg/messages"} 
              desc={"Returns the last 5 Messages for VALTracker. Messages are sorted by release date, lowest to highest. Each message contains the date it was published on in the Unix Time Format (in ms). All text is written in markdown."}
            >
              <ExecuteWrapper URL={"https://api.valtracker.gg/messages"}/>
            </ApiCard>
          </div>

          <Footer />
        </InfoWrapper>
      </Wrapper>
    </Layout>
  )
}
