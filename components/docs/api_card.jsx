import Link from "next/link";
import ExecuteWrapper from "./ExecuteWrapper";

export default function ApiCard({ method, route, title, desc, routeVars }) {
  return(
    <div className="min-h-80 h-auto bg-maincolor-lighter pb-4 rounded mb-8 w-full sm:w-5/6 mx-auto overflow-x-hidden">
      <div className="flex flex-row pl-4 pt-4 items-center">
        <div className="p-1 text-gradient-right  text-xl font-semibold">{method}</div>
        <div className="text-xl ml-4 font-bold">{title}</div>
      </div>
      <div className="pl-4 pt-2 text-button-color hover:underline inline-block"><Link href={route} target="_blank">{route.split("https://").pop()}</Link></div>
      <div className="pl-4 pt-4 text-gray-400">{desc}</div>
      <div className="pl-4 pt-4 w-full">
        <ExecuteWrapper URL={route} variables={routeVars} />
      </div>
    </div>
  )
}