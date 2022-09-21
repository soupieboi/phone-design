export default function AnimationCoverUp() {
  return (
    <>
      <div className='absolute w-4 sm:w-1/6 xl:w-2/5 left-full ml-0.5 h-20 z-10 bg-maincolor-light' />
      <div className='absolute w-4 sm:w-1/6 xl:w-2/5 right-full mr-0.5 h-20 z-10 bg-maincolor-light' />
      <div className='absolute w-2 left-0 mr-0.5 h-10 bg-maincolor-light z-10' />
      <div className='absolute w-2 right-0 ml-0.5 h-10 bg-maincolor-light z-10' />
    </>
  )
}