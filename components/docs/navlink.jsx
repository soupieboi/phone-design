import Link from "next/link";

export default function NavLink({ passedHref, children, extraClasses, active, passedHrefClasses }) {
	var navlink_classes = `h-12 flex items-center justify-start hover:bg-maincolor-lightest m-4 pl-4 rounded-sm transition-all duration-100 ease-linear ${extraClasses}`
	var navlink_classes_active = `h-12 flex cursor-default items-center justify-start bg-maincolor-lightest m-4 pl-4 rounded-sm transition-all duration-100 ease-linear ${extraClasses}`
	if(passedHrefClasses == undefined) passedHrefClasses = ""
	return (
		<div className={'cursor-pointer ' + passedHrefClasses}>
			<Link href={passedHref}>
				<span className={active ? (navlink_classes_active) : (navlink_classes)}>
					{children}
				</span>
			</Link>
		</div>
	)
}