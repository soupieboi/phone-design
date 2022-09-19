import Link from "next/link"

export default function NavAbout({ extraClasses, active }) {
	var navlink_classes = `justify-self-end cursor-pointer h-12 flex items-center justify-start hover:bg-maincolor-lightest mt-4 pl-4 rounded transition-all duration-100 ease-linear ${extraClasses}`
	var navlink_classes_active = `h-12 flex cursor-default items-center justify-start bg-maincolor-lightest pl-4 mt-4 rounded transition-all duration-100 ease-linear ${extraClasses}`
	return (
		<div className="mt-auto border-t border-t-button-color m-4">
			<Link href={"/docs/about"}>
				<span className={active ? (navlink_classes_active) : (navlink_classes)}>
					<img className="w-6 mr-2 block" src="/img/info.svg" alt="Info Icon" />
					About
				</span>
			</Link>
		</div>
	)
}