export default function InfoWrapper({ isNavbarOpen, children }) {
  return (
    <div className={'h-screen px-4 pt-20 sm:pt-24 xl:pl-0 sm:pl-8 bg-maincolor-light overflow-y-auto overflow-x-hidden ' + (isNavbarOpen ? 'hidden' : '')} id="infowrapper">{ children }</div>
  )
}