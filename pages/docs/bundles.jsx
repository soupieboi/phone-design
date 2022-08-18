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
    <Layout bundles retracted={navbarOpen}>
      <Wrapper expanded={navbarOpen}>
        <Topbar toggleActive={navbarOpen}>
          <div>
            <button onClick={handleToggle} className="ml-4 group docs-button">
              <img alt="Menu Toggle" className={navbarOpen ? "w-10 rounded mt-2 group-hover:bg-maincolor-lightest group-hover:bg-opacity-70 p-2" : "w-9 rounded mt-2 group-hover:bg-maincolor-lightest group-hover:bg-opacity-70 p-2"} src={navbarOpen ? ('/img/lines.svg') : ('/img/close.svg')}/>
            </button>
          </div>
        </Topbar>
        <InfoWrapper>
          <div className='xl:mt-12'>
            <ApiCard 
              method={"GET"} 
              title={"Get all Bundles"} 
              route={"https://api.valtracker.gg/bundles"} 
              desc={"Returns all Bundles that were in the game since launch, including their prices, weapons and collectables."}
            >
              <ExecuteWrapper URL={"https://api.valtracker.gg/bundles"}/>
            </ApiCard>

            <ApiCard 
              method={"GET"} 
              title={"Get a specific Bundle"} 
              route={"https://api.valtracker.gg/bundles/{BundleUUID}"} 
              desc={"Returns a specific Bundle using its UUID."}
            >
              <ExecuteWrapper
                URL={"https://api.valtracker.gg/bundles/{BundleUUID}"}
                
              >
                <ApiCardInput InputName={"Bundle UUID"} StrToReplace={"{BundleUUID}"} Placeholder={"d958b181-4e7b-dc60-7c3c-e3a3a376a8d2"}></ApiCardInput>
              </ExecuteWrapper>
            </ApiCard>

            <ApiCard 
              method={"GET"} 
              title={"Get a specific Bundle's weapons"} 
              route={"https://api.valtracker.gg/bundles/{BundleUUID}/weapons"} 
              desc={"Returns a specific Bundle's weapons using its UUID."}
            >
              <ExecuteWrapper
                URL={"https://api.valtracker.gg/bundles/{BundleUUID}/weapons"}
                
              >
                <ApiCardInput InputName={"Bundle UUID"} StrToReplace={"{BundleUUID}"} Placeholder={"d958b181-4e7b-dc60-7c3c-e3a3a376a8d2"}></ApiCardInput>
              </ExecuteWrapper>
            </ApiCard>

            <ApiCard 
              method={"GET"} 
              title={"Get a specific Bundle's buddies"} 
              route={"https://api.valtracker.gg/bundles/{BundleUUID}/buddies"} 
              desc={"Returns a specific Bundle's buddies using its UUID."}
            >
              <ExecuteWrapper
                URL={"https://api.valtracker.gg/bundles/{BundleUUID}/buddies"}
                
              >
                <ApiCardInput InputName={"Bundle UUID"} StrToReplace={"{BundleUUID}"} Placeholder={"d958b181-4e7b-dc60-7c3c-e3a3a376a8d2"}></ApiCardInput>
              </ExecuteWrapper>
            </ApiCard>

            <ApiCard 
              method={"GET"} 
              title={"Get a specific Bundle's cards"} 
              route={"https://api.valtracker.gg/bundles/{BundleUUID}/cards"} 
              desc={"Returns a specific Bundle's cards using its UUID."}
            >
              <ExecuteWrapper
                URL={"https://api.valtracker.gg/bundles/{BundleUUID}/cards"}
                
              >
                <ApiCardInput InputName={"Bundle UUID"} StrToReplace={"{BundleUUID}"} Placeholder={"d958b181-4e7b-dc60-7c3c-e3a3a376a8d2"}></ApiCardInput>
              </ExecuteWrapper>
            </ApiCard>

            <ApiCard 
              method={"GET"} 
              title={"Get a specific Bundle's sprays"} 
              route={"https://api.valtracker.gg/bundles/{BundleUUID}/sprays"} 
              desc={"Returns a specific Bundle's sprays using its UUID."}
            >
              <ExecuteWrapper
                URL={"https://api.valtracker.gg/bundles/{BundleUUID}/sprays"}
                
              >
                <ApiCardInput InputName={"Bundle UUID"} StrToReplace={"{BundleUUID}"} Placeholder={"d958b181-4e7b-dc60-7c3c-e3a3a376a8d2"}></ApiCardInput>
              </ExecuteWrapper>
            </ApiCard>
          </div>

          <Footer />
        </InfoWrapper>
      </Wrapper>
    </Layout>
  )
}
