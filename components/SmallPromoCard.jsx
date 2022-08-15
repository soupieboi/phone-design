export default function SmallPromoCard({ icon, title, desc, isLast }) {
  return (
    <div className={"base2:w-1/3 w-full base2:mb-0 mb-2 h-36 flex flex-col items-center justify-center bg-maincolor-lightest rounded-sm p-2 " + (isLast ? '' : 'mr-2')}>
      <div className="flex flex-row items-center text-center justify-center">
        <img src={'/img/' + icon + '.svg'} className='w-8' />
        <span className="text-3xl font-semibold ml-2">{title}</span>
      </div>
      <span className="mt-4 text-center">{desc}</span>
    </div>
  )
}