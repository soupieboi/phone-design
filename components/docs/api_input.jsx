export default function ApiCardInput({InputName, Placeholder, StrToReplace}) {
	return(
		<div className="mb-4" id="input">
			<span className="block mb-1 text-lg">{InputName}</span>
			<input type={"text"} className="bg-black bg-opacity-40 w-4/5 lg:w-3/5 xl:w-2/5 rounded-sm outline-none focus:outline-button-color px-2 py-1" placeholder={Placeholder} maxLength={36} data-text={StrToReplace}></input>
		</div>
	)
}