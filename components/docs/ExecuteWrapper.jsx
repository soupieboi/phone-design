import React from "react";
import ApiCardInput from "./api_input";

var library = {};

library.json = {
	replacer: function(match, pIndent, pKey, pVal, pEnd) {
		var key = '<span class=json-key>';
		var val = '<span class=json-value>';
		var str = '<span class=json-string>';
		var r = pIndent || '';
		if (pKey)
			r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
		if (pVal)
			r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
		return r + (pEnd || '');
	},
	prettyPrint: function(obj) {
		var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
		return JSON.stringify(obj, null, 2)
			.replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
			.replace(/</g, '&lt;').replace(/>/g, '&gt;')
			.replace(jsonLine, library.json.replacer);
	}
};

export default function ExecuteWrapper({ URL, variables }) {
	const [ showResponseContainer, setShowResponseContainer ] = React.useState(false);

	const aFunction = async (data) => {
		var inputs = document.getElementById(URL + '-inputs');
		for(var i = 0; i < inputs.children.length; i++) {
			var input = inputs.children[i].children[1];
			var value = input.value;

			if(value === "") {
				URL = URL.replace(input.dataset.text, input.getAttribute("placeholder"));
			} else {
				URL = URL.replace(input.dataset.text, value);
			}
		}
		var headers = {};
		variables.forEach(variable => {
			if(variable.isHeader === true) {
				headers[variable.headerName] = variable.value;
			}
		});
		var fetchedData = await (await fetch(URL, { headers: headers })).json();
		var prettyPrintedJSON = library.json.prettyPrint(fetchedData);
		data.target.parentElement.lastChild.innerHTML = prettyPrintedJSON;
	}

	return(
		<>
			<div id={URL + "-inputs"} className='w-full'>
				{variables.map((variable) => {
					return (
						<ApiCardInput 
							id={variable.str} 
							InputName={variable.inputName} 
							Placeholder={variable.value} 
							StrToReplace={variable.str} 
							Desc={variable.desc} 
							isHeader={variable.isHeader} 
							isRequired={variable.isRequired}
							headerName={variable.headerName}
							key={index}
						/>
					)
				})}
			</div>
			<button 
				className="small-text bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 transition-all duration-100 ease-linear" 
				onClick={(e) => {
					aFunction(e);
					setShowResponseContainer(true);
				}}
			>
				Execute
			</button>
			<div className={"mt-4 h-64 bg-maincolor-lightest p-2 text-sm mr-4 rounded overflow-auto whitespace-pre code-font " + (showResponseContainer ? '' : 'hidden')} />
		</>
	)
}