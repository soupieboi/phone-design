import Link from "next/link";

export default function ApiCard({ method, route, title, desc, children }) {
  return(
    <div className="min-h-80 h-auto bg-maincolor-lightest pb-4 rounded-sm mb-16 w-5/6 md:w-3/4 mx-auto overflow-x-hidden">
      <div className="flex flex-row pl-4 pt-4 items-center">
        <div className="px-4 py-2 bg-button-color rounded-sm text-lg">{method}</div>
        <div className="text-xl ml-4 font-bold">{title}</div>
      </div>
      <div className="pl-4 pt-2 text-button-color hover:underline inline-block"><Link href={route}><a className="">{route.split("https://").pop()}</a></Link></div>
      <div className="pl-4 pt-4 text-gray-400">{desc}</div>
      <div className="pl-4 pt-4">{children}</div>
    </div>
  )
}