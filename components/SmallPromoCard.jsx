import Link from 'next/link';

export default function SmallPromoCard({ icon, title, desc, isLast, hasLink, link, href }) {
  return (
    <div className={"base2:w-1/3 w-full base2:mb-0 mb-2 h-36 flex flex-col items-center justify-center bg-maincolor-lightest rounded p-2 " + (isLast ? '' : 'mr-2')}>
      <div className="flex flex-row items-center text-center justify-center">
        <img alt='' src={'/img/' + icon + '.svg'} className='w-8' />
        <span className="text-3xl font-semibold ml-2">{title}</span>
      </div>
      <span className="mt-4 text-center">{desc} {hasLink ? <Link href={href}><span className='text-button-color hover:text-button-color-hover hover:underline transition-all duration-100 ease-in bg-opacity-100 cursor-pointer'>{link}</span></Link> : null}</span>
    </div>
  )
}