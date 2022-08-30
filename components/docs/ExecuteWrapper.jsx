import React from "react";

export default function ExecuteWrapper({ URL, header, children }) {
	const [ showResponseContainer, setShowResponseContainer ] = React.useState(false);

	const aFunction = async (data) => {
		var prevUrl = URL
		var input = data.target.parentElement.firstChild.firstChild
		if(input) {
			var value = input.lastChild.value;
			if(value == "") {
				URL = URL.replace(input.lastChild.dataset.text, input.lastChild.placeholder)
			} else {
				URL = URL.replace(input.lastChild.dataset.text, value)
			}
		}
		var fetchedData = await (await fetch(URL, { headers: { auth: header } })).json();
		data.target.parentElement.lastChild.textContent = JSON.stringify(fetchedData, null, "    ");
		URL = prevUrl;
	}

	return(
		<div>
			<div>{children}</div>
			<button 
				className="small-text bg-gray-600 px-4 py-2 rounded-sm hover:bg-gray-700 transition-all duration-100 ease-linear" 
				onClick={(e) => {
					aFunction(e);
					setShowResponseContainer(true);
				}}
			>
				Execute
			</button>
			<div className={"mt-4 h-64 bg-maincolor-lightest p-2 mr-4 rounded-sm overflow-auto whitespace-pre " + (showResponseContainer ? '' : 'hidden')}></div>
		</div>
	)
}