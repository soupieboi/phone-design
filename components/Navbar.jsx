import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  
  return (
    <nav className='w-full h-16 z-20 fixed top-0 left-0 bg-maincolor-lightest flex flex-row items-center py-8 pr-2 base:pr-8 justify-around'>
      <div className='flex flex-row items-center'>
        <img src='/img/VALTracker_Logo_default.png' alt="VALTracker Logo" className='w-16' />
        <h6 className='font-normal hidden sm:inline'>VALTracker.gg</h6>
      </div>
      <div className='flex flex-row items-center'>
        <button 
          className="mr-4 inline-flex flex-row items-center w-40 py-1.5 nav-button"
          onClick={() => { router.push(downloadURL) }}
        >
          <img alt="" src='/img/discord.svg' className='w-8 mr-2 relative left-0.5' /> 
          <span className='relative top-px left-0.5'>Discord</span>
        </button>
        <button 
          className="mr-4 hidden sm:inline-flex flex-row items-center w-40 py-1.5 nav-button"
          onClick={() => { router.push('/docs') }}
        >
          <img alt="" src='/img/share.svg' className='w-5 mr-2 relative bottom-px ' /> 
          <span className=''>API Docs</span>
        </button>
        <button 
          className="mr-2 flex-row items-center w-40 py-1.5 hidden lg:inline-flex"
          onClick={() => { router.push(downloadURL) }}
        >
          <img alt="" src='/img/download.svg' className='w-6 mr-2 relative right-0.5 bottom-px' /> 
          <span className='relative right-0.5'>Download</span>
        </button>
      </div>
    </nav>
  )
}