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

export default function Patchnotes({ isMobile }) {
  const [navbarOpen, setNavbarOpen] = useState(isMobile);

  const handleToggle = () => {
    setNavbarOpen(prev => !prev)
  }
  
  return (
    <Layout patchnotes retracted={navbarOpen}>
      <SeoHandler title={'VALTracker API - Patchnotes'} description={'All Endpoints of our API that relate to VALTracker\'s Patchnotes.'} />
      <Wrapper expanded={navbarOpen}>
        <Topbar toggleActive={navbarOpen} handleToggle={handleToggle} />
        <InfoWrapper isNavbarShown={navbarOpen} isMobile={isMobile}>
          <div className=''>
            <ApiCard 
              method={"GET"} 
              title={"Get latest Patchnotes"}
              route={"https://api.valtracker.gg/patchnotes"}
              desc={"Returns the newest Patchnotes for VALTracker.gg, aswell as the shortened version used for the popup after an update. All text is written in Markdown."}
              routeVars={[]}
            />

            <ApiCard 
              method={"GET"} 
              title={"Get version-specific Patchnotes"} 
              route={"https://api.valtracker.gg/patchnotes/{PatchnoteVersion}"} 
              desc={"Returns a specific Version's Patchnotes, aswell as the shortened version used for the popup after the update. All text is written in Markdown."}
              routeVars={[
                {inputName:"VALTracker Version",value:"v1.2.0",str:"{PatchnoteVersion}",desc:"A valid VALTracker Version. Has to be included in the URL itself.",isRequired:true}
              ]}
            />

            <ApiCard 
              method={"GET"} 
              title={"Get latest \"What's new\""}
              route={"https://api.valtracker.gg/whats-new"}
              desc={"Returns the newest what's new for VALTracker.gg, a small summary of the latest update. All text is written in Markdown."}
              routeVars={[]}
            />
          </div>

          <Footer />
        </InfoWrapper>
      </Wrapper>
    </Layout>
  )
}
