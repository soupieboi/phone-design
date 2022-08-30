import React from "react";

export default function InfoWrapper({ isNavbarShown, isMobile, children }) {
  React.useEffect(() => {
    console.log("Navbar ", isNavbarShown)
    console.log("isMobile ", isMobile)
  }, [])
  return (
    <div 
      className={
        'h-screen px-4 pt-20 sm:pt-24 xl:pl-0 sm:pl-8 bg-maincolor-light overflow-y-auto overflow-x-hidden ' 
        + (!isNavbarShown ? (isMobile ? 'hidden' : '') : '')
      } 
      id="infowrapper"
    >
      { children }
    </div>
  )
}