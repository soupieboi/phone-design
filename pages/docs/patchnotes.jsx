import Layout from '../../components/docs/layout'
import Footer from '../../components/docs/footer'
import Topbar from '../../components/docs/top_bar'
import Wrapper from '../../components/docs/wrapper'
import InfoWrapper from '../../components/docs/infowrapper'
import ApiCard from '../../components/docs/api_card'
import ExecuteWrapper from '../../components/docs/ExecuteWrapper'
import ApiCardInput from '../../components/docs/api_input'
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

export default function Patchnotes({ isMobile }) {
  const [navbarOpen, setNavbarOpen] = useState(isMobile);

  const handleToggle = () => {
    setNavbarOpen(prev => !prev)
  }
  
  return (
    <Layout patchnotes retracted={navbarOpen}>
      <Wrapper expanded={navbarOpen}>
        <Topbar toggleActive={navbarOpen} handleToggle={handleToggle} />
        <InfoWrapper isNavbarShown={navbarOpen}>
          <div className=''>
            <ApiCard 
              method={"GET"} 
              title={"Get newest Patchnotes"}
              route={"https://api.valtracker.gg/patchnotes"}
              desc={"Returns the newest Patchnotes for VALTracker.gg, aswell as the shortened version used for the popup after an update. All text is written in Markdown."}
            >
              <ExecuteWrapper URL={"https://api.valtracker.gg/patchnotes"}/>
            </ApiCard>

            <ApiCard 
              method={"GET"} 
              title={"Get version-specific Patchnotes"} 
              route={"https://api.valtracker.gg/patchnotes/{PatchnoteVersion}"} 
              desc={"Returns a specific Version's Patchnotes, aswell as the shortened version used for the popup after the update. All text is written in Markdown."}
            >
              <ExecuteWrapper
                URL={"https://api.valtracker.gg/patchnotes/{PatchnoteVersion}"}
              >
                <ApiCardInput InputName={"VALTracker Version"} StrToReplace={"{PatchnoteVersion}"} Placeholder={"v0.8.29-alpha"}></ApiCardInput>
              </ExecuteWrapper>
            </ApiCard>

            <ApiCard 
              method={"GET"} 
              title={"Get newest what's new"}
              route={"https://api.valtracker.gg/whats-new"}
              desc={"Returns the newest what's new for VALTracker.gg, a small summary of the latest update. All text is written in Markdown."}
            >
              <ExecuteWrapper URL={"https://api.valtracker.gg/whats-new"}/>
            </ApiCard>
          </div>

          <Footer />
        </InfoWrapper>
      </Wrapper>
    </Layout>
  )
}
