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
        <Topbar toggleActive={navbarOpen} handleToggle={handleToggle} />
        <InfoWrapper>
          <div className=''>
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
