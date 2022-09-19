import SeoHandler from "../components/SeoHandler"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import fs from 'fs'

export async function getServerSideProps(context) {
  var pageContent = require(`../locales/${context.locale.split("-")[0]}/privacy.json`);

  var data = JSON.parse(fs.readFileSync('./json/data.json'));
  var downloadURL = data.href;

  return {
    props: {
      localContent: pageContent,
      downloadURL
    },
  }
}

export default function Privacy({ localContent, downloadURL }) {
  return (
    <>
      <SeoHandler 
        title={'VALTracker - Privacy Policy'} 
        description={localContent.seo.desc} 
        keywords={localContent.seo.keywords}
        locale={localContent.lang} 
      />
      <div className="bg-maincolor-light w-full h-screen text-white relative">
        <Navbar downloadURL={downloadURL} />
        <div className="mt-16 pt-4 mb-6 text-center bg-maincolor-light">
          <h3>{localContent.header}</h3>
          <span>{localContent.changed_last} 2022/04/03</span>
          <div className="mx-auto w-5/6 lg:w-4/6 text-left">
            <h6 className="mt-4 mb-4">{localContent.desc}</h6>
            <h5 className="mb-4">{localContent.q_1.header}</h5>
            <ul className="mb-4 ml-4">
              <li>{localContent.q_1.bullet_points.bp_1}</li>
              <li>{localContent.q_1.bullet_points.bp_2}</li>
            </ul>
            <h5 className="mb-4">{localContent.q_2.header}</h5>
            <span className="mb-4">{localContent.q_2.desc}</span>
            <h5 className="mb-4 mt-4">{localContent.q_3.header}</h5>
            <span>{localContent.q_3.desc}<br /><code>{localContent.q_3.path}</code></span>
            <h5 className="mb-4 mt-4">{localContent.q_4.header}</h5>
            <span>{localContent.q_4.desc}</span>
            <h5 className="mb-4 mt-4">{localContent.q_5.header}</h5>
            <span>{localContent.q_5.desc}</span>
            <h5 className="mb-4 mt-4">{localContent.q_6.header}</h5>
            <span>{localContent.q_6.desc}<br /><code>{localContent.q_6.path}</code></span>
            <h5 className="mb-4 mt-4">{localContent.q_7.header}</h5>
            <span>{localContent.q_7.desc}</span>
            <ul className="ml-4">
              <li>{localContent.q_7.bullet_points.bp_1.bp_info}<a href="https://discord.gg/aJfQ4yHysG">{localContent.q_7.bullet_points.bp_1.bp_content}</a></li>
              <li>{localContent.q_7.bullet_points.bp_2.bp_info}<a href="https://twitter.com/VALTracker_gg">{localContent.q_7.bullet_points.bp_2.bp_content}</a></li>
              <li>{localContent.q_7.bullet_points.bp_3.bp_info}<a href="mailto:support@valtracker.gg">{localContent.q_7.bullet_points.bp_3.bp_content}</a></li>
            </ul>
          </div>
          <Footer privacy />
        </div>
      </div>
    </>
  )
}