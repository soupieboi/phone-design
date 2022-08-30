import Link from "next/link";

export default function ApiCard({ method, route, title, desc, children }) {
  return(
    <div className="min-h-80 h-auto bg-maincolor-lighter pb-4 rounded-sm mb-8 w-full sm:w-5/6 mx-auto overflow-x-hidden">
      <div className="flex flex-row pl-4 pt-4 items-center">
        <div className="p-1 text-gradient-right rounded-sm text-xl font-semibold">{method}</div>
        <div className="text-xl ml-4 font-bold">{title}</div>
      </div>
      <div className="pl-4 pt-2 text-button-color hover:underline inline-block"><Link href={route}>{route.split("https://").pop()}</Link></div>
      <div className="pl-4 pt-4 text-gray-400">{desc}</div>
      <div className="pl-4 pt-4">{children}</div>
    </div>
  )
}