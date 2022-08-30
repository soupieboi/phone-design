import Layout from '../../components/docs/layout'
import Footer from '../../components/docs/footer'
import Topbar from '../../components/docs/top_bar'
import Wrapper from '../../components/docs/wrapper'
import InfoWrapper from '../../components/docs/infowrapper'
import ApiCard from '../../components/docs/api_card'
import ExecuteWrapper from '../../components/docs/ExecuteWrapper'
import ApiCardInput from '../../components/docs/api_input'
import { useState } from 'react'

export default function FeaturedBundle() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen(prev => !prev)
  }
  
  return (
    <Layout featured_bundle retracted={navbarOpen}>
      <Wrapper expanded={navbarOpen}>
        <Topbar toggleActive={navbarOpen} handleToggle={handleToggle} />
        <InfoWrapper>
          <div className=''>
            <ApiCard 
              method={"GET"} 
              title={"Get featured Bundle"} 
              route={"https://api.valtracker.gg/featured-bundle"} 
              desc={"Returns the current featured bundle with all prices, weapons and other collectables."}
            >
              <ExecuteWrapper URL={"https://api.valtracker.gg/featured-bundle"} />
            </ApiCard>

            <ApiCard 
              method={"GET"} 
              title={"Get the featured Bundle's weapons"} 
              route={"https://api.valtracker.gg/featured-bundle/weapons"} 
              desc={"Returns the featured Bundle's weapons using its UUID."}
            >
              <ExecuteWrapper URL={"https://api.valtracker.gg/featured-bundle/weapons"} />
            </ApiCard>

            <ApiCard 
              method={"GET"} 
              title={"Get the featured Bundle's buddies"} 
              route={"https://api.valtracker.gg/featured-bundle/buddies"} 
              desc={"Returns the featured Bundle's buddies using its UUID."}
            >
              <ExecuteWrapper URL={"https://api.valtracker.gg/featured-bundle/buddies"} />
            </ApiCard>

            <ApiCard 
              method={"GET"} 
              title={"Get the featured Bundle's cards"} 
              route={"https://api.valtracker.gg/featured-bundle/cards"} 
              desc={"Returns the featured Bundle's cards using its UUID."}
            >
              <ExecuteWrapper URL={"https://api.valtracker.gg/featured-bundle/cards"} />
            </ApiCard>

            <ApiCard 
              method={"GET"} 
              title={"Get the featured Bundle's sprays"} 
              route={"https://api.valtracker.gg/featured-bundle/sprays"} 
              desc={"Returns the featured Bundle's sprays using its UUID."}
            >
              <ExecuteWrapper URL={"https://api.valtracker.gg/featured-bundle/sprays"} />
            </ApiCard>
          </div>
          <Footer />
        </InfoWrapper>
      </Wrapper>
    </Layout>
  )
}
