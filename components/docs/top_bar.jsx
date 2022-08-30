import Link from "next/link"

export default function Topbar({ toggleActive, handleToggle, children }) {
	const topbarClasses = "h-16 bg-maincolor flex flex-row items-center absolute "
	return (
		<div className={toggleActive ? (topbarClasses + "w-full") : (topbarClasses + "w-full sm:w-4/6 xl:w-5/6")}>
			<div>
				<button onClick={handleToggle} className="ml-4 group docs-button docs-button">
					<img alt="Menu Toggle" className={toggleActive ? "w-10 rounded mt-2 group-hover:bg-maincolor-lightest group-hover:bg-opacity-70 p-2" : "w-9 rounded mt-2 group-hover:bg-maincolor-lightest group-hover:bg-opacity-70 p-2"} src={toggleActive ? ('/img/lines.svg') : ('/img/close.svg')}/>
				</button>
			</div>
      <div className="h-16 flex sm:hidden items-center justify-center relative top-0.5 mx-auto">
        <h1 className="text-lg text-center xl:text-2xl font-bold flex flex-row items-center cursor-pointer" onClick={() => { router.push('/') }}>
          <img src="/img/VALTracker_Logo_default.png" alt="VALTracker Logo" className="w-10 inline-block" />
          VALTracker
        </h1>
      </div>
			<div className="ml-auto relative flex flex-row">
				<div className="w-11 rounded-full mr-4 p-1 hover:bg-maincolor-lightest hover:bg-opacity-70">
					<Link href="https://discord.gg/aJfQ4yHysG"><img alt="" src="/img/discord.svg" className="w-auto h-auto cursor-pointer px-1 relative top-0.5 py-1"/></Link>
				</div>
				<div className="w-11 rounded-full mr-4 p-1 hover:bg-maincolor-lightest hover:bg-opacity-70">
					<Link href="https://twitter.com/VALTracker_gg"><img alt="" src="/img/twitter.svg" className="w-auto h-auto cursor-pointer px-1.5 py-1.5"/></Link>
				</div>
			</div>
		</div>
	)
}