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

export default function Status({ isMobile }) {
  const [navbarOpen, setNavbarOpen] = useState(isMobile);

  const handleToggle = () => {
    setNavbarOpen(prev => !prev)
  }
  
  return (
    <Layout status retracted={navbarOpen}>
      <Wrapper expanded={navbarOpen}>
        <Topbar toggleActive={navbarOpen} handleToggle={handleToggle} />
        <InfoWrapper>
          <div className=''>
            <ApiCard 
              method={"GET"} 
              title={"Get app status"} 
              route={"https://api.valtracker.gg/status/app"} 
              desc={"Returns the status of VALTracker."}
            >
              <ExecuteWrapper URL={"https://api.valtracker.gg/status/app"} header={'v1.0.0'}/>
            </ApiCard>

            <ApiCard 
              method={"GET"} 
              title={"Get app status"} 
              route={"https://api.valtracker.gg/status/features"} 
              desc={"Returns the status for all features of VALTracker."}
            >
              <ExecuteWrapper URL={"https://api.valtracker.gg/status/features"} header={'v1.0.0'}/>
            </ApiCard>

            <ApiCard 
              method={"GET"} 
              title={"Get app status"} 
              route={"https://api.valtracker.gg/status/features/main_process"} 
              desc={"Returns the status for all features in the main process of VALTracker."}
            >
              <ExecuteWrapper URL={"https://api.valtracker.gg/status/features/main_process"} header={'v1.0.0'}/>
            </ApiCard>

            <ApiCard 
              method={"GET"} 
              title={"Get app status"} 
              route={"https://api.valtracker.gg/status/features/pages"} 
              desc={"Returns the status for all of VALTracker's pages."}
            >
              <ExecuteWrapper URL={"https://api.valtracker.gg/status/features/pages"} header={'v1.0.0'}/>
            </ApiCard>
          </div>

          <Footer />
        </InfoWrapper>
      </Wrapper>
    </Layout>
  )
}
