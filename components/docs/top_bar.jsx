import Link from "next/link"

export default function Topbar({ toggleActive, children }) {
	const topbarClasses = "h-16 bg-maincolor flex flex-row items-center absolute "
	return (
		<div className={toggleActive ? (topbarClasses + "w-full") : (topbarClasses + "w-4/6 xl:w-5/6")}>
			{children}
			<div className="ml-auto relative flex flex-row">
				<div className="w-11 rounded-full mr-4 p-1 hover:bg-maincolor-lightest hover:bg-opacity-70">
					<Link href="https://discord.gg/aJfQ4yHysG"><img src="/img/discord.svg" className="w-auto h-auto cursor-pointer px-1 relative top-0.5 py-1"/></Link>
				</div>
				<div className="w-11 rounded-full mr-4 p-1 hover:bg-maincolor-lightest hover:bg-opacity-70">
					<Link href="https://twitter.com/VALTracker_gg"><img src="/img/twitter.svg" className="w-auto h-auto cursor-pointer px-1.5 py-1.5"/></Link>
				</div>
			</div>
		</div>
	)
}