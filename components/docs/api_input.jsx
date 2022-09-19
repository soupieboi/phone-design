export default function ApiCardInput({ InputName, Placeholder, StrToReplace, Desc, isHeader, isRequired, headerName }) {
	return (
		<>
			{
				isHeader === true ? 
				<div className="mb-2 w-full">
					<span className="block mb-1 text-lg">{InputName}</span>
					<div className="flex flex-row items-center w-5/6 xs:w-4/5 lg:w-3/5 xl:w-2/5">
						<div className="bg-black bg-opacity-40 w-1/2 rounded-l border-r border-gray-500 outline-none focus:outline-button-color px-2 py-1">
							{headerName}
						</div>
						<input type={"text"} className="bg-black bg-opacity-40 w-1/2 rounded-r outline-none focus:outline-button-color px-2 py-1" placeholder={Placeholder} maxLength={36} data-text={StrToReplace} />
					</div>
					<span className="block mt-1 text-base text-gray-500">{Desc}</span>
				</div>
				: 
				<div className="mb-2">
					<span className="block mb-1 text-lg">{InputName}</span>
					<input type={"text"} className="bg-black bg-opacity-40 w-5/6 xs:w-4/5 lg:w-3/5 xl:w-2/5 rounded outline-none focus:outline-button-color px-2 py-1" placeholder={Placeholder} maxLength={36} data-text={StrToReplace} />
					<span className="block mt-1 text-base text-gray-500">{Desc}</span>
				</div>
			}
		</>
	)
}