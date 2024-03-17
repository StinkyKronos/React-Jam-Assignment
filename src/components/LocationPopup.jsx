export default function LocationPopup({ autocomplete, autocompleteData, getWeather }) {
    let suggestion_list = "Search the location.";
    if(!autocompleteData.error || autocompleteData.length > 0){
        suggestion_list = autocompleteData.map((data, index) => <h1 className="hover:bg-gray-500/80 rounded-md duration-200 my-2 cursor-pointer" onClick={getWeather} data-name={data.name} key={index}>{data.name + ", " + data.region}</h1>);
    }

	return (
		<div className="absolute w-screen h-screen top-0 left-0 bg-black/60 flex items-center justify-center z-10">
			<div className="flex flex-col rounded-3xl bg-gray-400 w-80 px-4 py-2 focus:outline-none focus:scale-105 duration-200 text-lg shadow-gray-700 relative">
				<span className="flex gap-2 py-1">
					<img className="w-6 h-6" src="search.svg" alt="" />
					<input type="text" onChange={autocomplete} onKeyDown={getWeather} className="bg-transparent px-1 focus:outline-none w-full poppins" />
				</span>
				<div className="text-center poppins border-t-2 pt-1 border-gray-500">{suggestion_list}</div>
			</div>
		</div>
	);
}
