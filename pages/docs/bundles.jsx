import Layout from '../../components/docs/layout'
import Footer from '../../components/docs/footer'
import Topbar from '../../components/docs/top_bar'
import Wrapper from '../../components/docs/wrapper'
import InfoWrapper from '../../components/docs/infowrapper'
import ApiCard from '../../components/docs/api_card'
import ExecuteWrapper from '../../components/docs/ExecuteWrapper'
import ApiCardInput from '../../components/docs/api_input'
import { useState, useEffect } from 'react'
import SeoHandler from '../../components/SeoHandler'

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

export default function Bundles({ isMobile }) {
  const [navbarOpen, setNavbarOpen] = useState(isMobile);

  const handleToggle = () => {
    setNavbarOpen(prev => !prev)
  }
  
  return (
    <Layout bundles retracted={navbarOpen}>
      <SeoHandler title={'VALTracker API - Bundles'} description={'All Endpoints of our API that relate to VALORANT Bundles.'} />
      <Wrapper expanded={navbarOpen}>
        <Topbar toggleActive={navbarOpen} handleToggle={handleToggle} />
        <InfoWrapper isNavbarShown={navbarOpen} isMobile={isMobile}>
          <div className='px-4 sm:py-0'>
            <ApiCard 
              method={"GET"} 
              title={"Get all Bundles"} 
              route={"https://api.valtracker.gg/bundles"} 
              desc={"Returns all Bundles that were in the game since launch, including their prices, weapons and collectables."}
              routeVars={[]}
            />

            <ApiCard 
              method={"GET"} 
              title={"Get a specific Bundle"} 
              route={"https://api.valtracker.gg/bundles/{BundleUUID}"} 
              desc={"Returns a specific Bundle using its UUID."}
              routeVars={[
                {inputName:"Bundle UUID",value:"d958b181-4e7b-dc60-7c3c-e3a3a376a8d2",str:"{BundleUUID}",desc:"The Bundle's UUID. Has to be included in the URL itself.",isRequired:true}
              ]}
            />

            <ApiCard 
              method={"GET"} 
              title={"Get a specific Bundle's weapons"} 
              route={"https://api.valtracker.gg/bundles/{BundleUUID}/weapons"} 
              desc={"Returns a specific Bundle's weapons using its UUID."}
              routeVars={[
                {inputName:"Bundle UUID",value:"d958b181-4e7b-dc60-7c3c-e3a3a376a8d2",str:"{BundleUUID}",desc:"The Bundle's UUID. Has to be included in the URL itself.",isRequired:true}
              ]}
            />

            <ApiCard 
              method={"GET"} 
              title={"Get a specific Bundle's buddies"} 
              route={"https://api.valtracker.gg/bundles/{BundleUUID}/buddies"} 
              desc={"Returns a specific Bundle's buddies using its UUID."}
              routeVars={[
                {inputName:"Bundle UUID",value:"d958b181-4e7b-dc60-7c3c-e3a3a376a8d2",str:"{BundleUUID}",desc:"The Bundle's UUID. Has to be included in the URL itself.",isRequired:true}
              ]}
            />

            <ApiCard 
              method={"GET"} 
              title={"Get a specific Bundle's cards"} 
              route={"https://api.valtracker.gg/bundles/{BundleUUID}/cards"} 
              desc={"Returns a specific Bundle's cards using its UUID."}
              routeVars={[
                {inputName:"Bundle UUID",value:"d958b181-4e7b-dc60-7c3c-e3a3a376a8d2",str:"{BundleUUID}",desc:"The Bundle's UUID. Has to be included in the URL itself.",isRequired:true}
              ]}
            />

            <ApiCard 
              method={"GET"} 
              title={"Get a specific Bundle's sprays"} 
              route={"https://api.valtracker.gg/bundles/{BundleUUID}/sprays"} 
              desc={"Returns a specific Bundle's sprays using its UUID."}
              routeVars={[
                {inputName:"Bundle UUID",value:"d958b181-4e7b-dc60-7c3c-e3a3a376a8d2",str:"{BundleUUID}",desc:"The Bundle's UUID. Has to be included in the URL itself.",isRequired:true}
              ]}
            />
          </div>

          <Footer />
        </InfoWrapper>
      </Wrapper>
    </Layout>
  )
}
