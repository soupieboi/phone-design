import Layout from '../../components/docs/layout'
import Footer from '../../components/docs/footer'
import Topbar from '../../components/docs/top_bar'
import Wrapper from '../../components/docs/wrapper'
import InfoWrapper from '../../components/docs/infowrapper'
import ApiCard from '../../components/docs/api_card'
import ExecuteWrapper from '../../components/docs/ExecuteWrapper'
import ApiCardInput from '../../components/docs/api_input'
import { useState } from 'react'

export default function Status() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen(prev => !prev)
  }
  
  return (
    <Layout status retracted={navbarOpen}>
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