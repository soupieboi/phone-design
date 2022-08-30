import Layout from '../../components/docs/layout'
import Footer from '../../components/docs/footer'
import Topbar from '../../components/docs/top_bar'
import Wrapper from '../../components/docs/wrapper'
import InfoWrapper from '../../components/docs/infowrapper'
import ApiCard from '../../components/docs/api_card'
import ExecuteWrapper from '../../components/docs/ExecuteWrapper'
import { useState } from 'react'

export async function getServerSideProps(context) {
  const UA = context.req.headers['user-agent'];
  const isMobile = Boolean(UA.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  ))
  
  return {
    props: {
      isMobile: isMobile
    }
  }
}

export default function Messages({ isMobile }) {
  const [navbarOpen, setNavbarOpen] = useState(isMobile);

  const handleToggle = () => {
    setNavbarOpen(prev => !prev)
  }
  
  return (
    <Layout messages retracted={navbarOpen}>
      <Wrapper expanded={navbarOpen}>
        <Topbar toggleActive={navbarOpen} handleToggle={handleToggle} />
        <InfoWrapper isNavbarShown={navbarOpen}>
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
