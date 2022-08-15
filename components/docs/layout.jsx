import Navbar from "./navbar";

export default function Layout({ children, home, bundles, featured_bundle, patchnotes, messages, status, about, retracted }) {
	return (
		<>
			<Navbar about={about} home={home} bundles={bundles} featured_bundle={featured_bundle} patchnotes={patchnotes} messages={messages} status={status} retracted={retracted} />
			<div className="mx-1/4 bg-maincolor text-white">{children}</div>
		</>
	)
}