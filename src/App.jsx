import { useState } from "react";
import LocationPopup from "./components/LocationPopup";

function App() {
	const [autocomplete, setAutocomplete] = useState([]);
	const [weather, setWeather] = useState({ location: { name: "London", country: "United Kingdom" }, current: { temp_c: 10, wind_kph: 2, humidity: "69" } });
	const [isOpen, setIsOpen] = useState(true);

	const autocompleteLocation = async (event) => {
		const response = await fetch(`http://api.weatherapi.com/v1/search.json?key=c51fd6ac6c42402e9b2195653241603&q=${event.currentTarget.value}`);
		const respJson = await response.json();
		try {
			setAutocomplete(respJson);
		} catch (TypeError) {
			console.log(TypeError);
		}
	};

	const getWeather = async (event) => {
		if (event.key == "Enter" || event.type == "click") {
			if (event.currentTarget.value == undefined) {
				const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=c51fd6ac6c42402e9b2195653241603&q=${event.currentTarget.dataset.name}&aqi=no`);
				const respJson = await response.json();
				console.log(respJson.current);
				setWeather(respJson);
				setIsOpen(false);
			} else {
				const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=c51fd6ac6c42402e9b2195653241603&q=${event.currentTarget.value}&aqi=no`);
				const respJson = await response.json();
				console.log(respJson.current);
				setWeather(respJson);
				setIsOpen(false);
			}
		}
	};

	const inputOpen = () => {
		setIsOpen(!isOpen);
	};

	return (
		<main className="w-screen h-screen px-[25%] py-[8%]">
			{isOpen && <LocationPopup autocomplete={autocompleteLocation} autocompleteData={autocomplete} getWeather={getWeather} />}
			<div className="w-full h-full bg-[#2E2E38] rounded-2xl px-[5%] py-[7%]">
				<div className={"flex justify-between " + `${isOpen ? "blur-sm" : ""}`}>
					<div onClick={inputOpen} className="flex gap-5 items-center justify-center cursor-pointer p-2 box-border hover:bg-gray-700 hover:scale-95 rounded-xl duration-200">
						<img src="map-pin.svg" className="invert h-8" alt="" />
						<span>
							<div className="text-white poppins tracking-wider text-3xl">
								{weather.location.name}
								<p className="text-base opacity-70 -mt-1.5">{weather.location.country}</p>
							</div>
						</span>
					</div>
					<div className="flex gap-5 items-center justify-center">
						<div className="text-white text-center poppins tracking-wider text-3xl after:content-['Temperature'] after:block after:relative after:bottom-1 after:text-base after:left-1 after:opacity-70">
							{weather.current.temp_c}°<span className="text-base">c</span>
						</div>
					</div>
					<div className="flex gap-5 items-center justify-center">
						<div className="text-white text-center poppins tracking-wider text-3xl after:content-['Humidity'] after:block after:relative after:bottom-1 after:text-base after:left-1 after:opacity-70">
							{weather.current.humidity}
							<span className="text-base">%</span>
						</div>
					</div>
					<div className="flex gap-5 items-center justify-center">
						<div className="text-white text-center poppins tracking-wider text-3xl after:content-['Wind_Speed'] after:block after:relative after:bottom-1 after:text-base after:left-1 after:opacity-70">
							{weather.current.wind_kph}
							<span className="text-base">km/h</span>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default App;
