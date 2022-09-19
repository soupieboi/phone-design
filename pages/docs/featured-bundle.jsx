import Layout from '../../components/docs/layout'
import Footer from '../../components/docs/footer'
import Topbar from '../../components/docs/top_bar'
import Wrapper from '../../components/docs/wrapper'
import InfoWrapper from '../../components/docs/infowrapper'
import ApiCard from '../../components/docs/api_card'
import ExecuteWrapper from '../../components/docs/ExecuteWrapper'
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

export default function FeaturedBundle({ isMobile }) {
  const [navbarOpen, setNavbarOpen] = useState(isMobile);

  const handleToggle = () => {
    setNavbarOpen(prev => !prev)
  }
  
  return (
    <Layout featured_bundle retracted={navbarOpen}>
      <SeoHandler title={'VALTracker API - Featured Bundle'} description={'All Endpoints of our API that relate to the features VALORANT Bundle.'} />
      <Wrapper expanded={navbarOpen}>
        <Topbar toggleActive={navbarOpen} handleToggle={handleToggle} />
        <InfoWrapper isNavbarShown={navbarOpen} isMobile={isMobile}>
          <div className=''>
            <ApiCard 
              method={"GET"} 
              title={"Get featured Bundle"} 
              route={"https://api.valtracker.gg/featured-bundle"} 
              desc={"Returns the current featured bundle with all prices, weapons and other collectables."}
              routeVars={[]}
            />

            <ApiCard 
              method={"GET"} 
              title={"Get the featured Bundle's weapons"} 
              route={"https://api.valtracker.gg/featured-bundle/weapons"} 
              desc={"Returns the featured Bundle's weapons using its UUID."}
              routeVars={[]}
            />

            <ApiCard 
              method={"GET"} 
              title={"Get the featured Bundle's buddies"} 
              route={"https://api.valtracker.gg/featured-bundle/buddies"} 
              desc={"Returns the featured Bundle's buddies using its UUID."}
              routeVars={[]}
            />

            <ApiCard 
              method={"GET"} 
              title={"Get the featured Bundle's cards"} 
              route={"https://api.valtracker.gg/featured-bundle/cards"} 
              desc={"Returns the featured Bundle's cards using its UUID."}
              routeVars={[]}
            />

            <ApiCard 
              method={"GET"} 
              title={"Get the featured Bundle's sprays"} 
              route={"https://api.valtracker.gg/featured-bundle/sprays"} 
              desc={"Returns the featured Bundle's sprays using its UUID."}
              routeVars={[]}
            />
          </div>
          <Footer />
        </InfoWrapper>
      </Wrapper>
    </Layout>
  )
}
