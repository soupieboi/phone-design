import Layout from '../../components/docs/layout'
import Footer from '../../components/docs/footer'
import Topbar from '../../components/docs/top_bar'
import Wrapper from '../../components/docs/wrapper'
import InfoWrapper from '../../components/docs/infowrapper'
import ApiCard from '../../components/docs/api_card'
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

export default function Status({ isMobile }) {
  const [navbarOpen, setNavbarOpen] = useState(isMobile);

  const handleToggle = () => {
    setNavbarOpen(prev => !prev)
  }
  
  return (
    <Layout status retracted={navbarOpen}>
      <SeoHandler title={'VALTracker API - Status'} description={'All Endpoints of our API that relate to VALTracker\'s Status.'} />
      <Wrapper expanded={navbarOpen}>
        <Topbar toggleActive={navbarOpen} handleToggle={handleToggle} />
        <InfoWrapper isNavbarShown={navbarOpen} isMobile={isMobile}>
          <div className=''>
            <ApiCard 
              method={"GET"} 
              title={"Get App Status"} 
              route={"https://api.valtracker.gg/status/app"} 
              desc={"Returns the status of VALTracker."}
              routeVars={[
                {inputName:"VALTracker Version",value:"v1.2.0",desc:"A valid VALTracker Version. Must be used in the 'auth' header of the request.",isHeader:true,headerName:"auth",isRequired:true}
              ]}
            />

            <ApiCard 
              method={"GET"} 
              title={"Get Feature Status"} 
              route={"https://api.valtracker.gg/status/features"} 
              desc={"Returns the status for all features of VALTracker."}
              routeVars={[
                {inputName:"VALTracker Version",value:"v1.2.0",desc:"A valid VALTracker Version. Must be used in the 'auth' header of the request.",isHeader:true,headerName:"auth",isRequired:true}
              ]}
            />

            <ApiCard 
              method={"GET"} 
              title={"Get Main Process Status"} 
              route={"https://api.valtracker.gg/status/features/main_process"} 
              desc={"Returns the status for all features in the main process of VALTracker."}
              routeVars={[
                {inputName:"VALTracker Version",value:"v1.2.0",desc:"A valid VALTracker Version. Must be used in the 'auth' header of the request.",isHeader:true,headerName:"auth",isRequired:true}
              ]}
            />

            <ApiCard 
              method={"GET"} 
              title={"Get Page Status"} 
              route={"https://api.valtracker.gg/status/features/pages"} 
              desc={"Returns the status for all of VALTracker's pages."}
              routeVars={[
                {inputName:"VALTracker Version",value:"v1.2.0",desc:"A valid VALTracker Version. Must be used in the 'auth' header of the request.",isHeader:true,headerName:"auth",isRequired:true}
              ]}
            />
          </div>

          <Footer />
        </InfoWrapper>
      </Wrapper>
    </Layout>
  )
}
