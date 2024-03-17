import { useState } from "react";
import LocationPopup from "./components/LocationPopup";

function App() {
	const [autocomplete, setAutocomplete] = useState([]);
	const [weather, setWeather] = useState({ location: { name: "Kerala" }, current: { temp_c: 30, wind_kph: 2, humidity: "69", feelslike_c: 12, condition: { text: "Sunny", icon: "//cdn.weatherapi.com/weather/64x64/day/113.png" } } });
	const [isOpen, setIsOpen] = useState(true);

	const autocompleteLocation = async (event) => {
		const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=c51fd6ac6c42402e9b2195653241603&q=${event.currentTarget.value}`);
		const respJson = await response.json();
		try {
			setAutocomplete(respJson);
		} catch (TypeError) {
			console.log(TypeError);
		}
	};

	const getWeather = async (event) => {
		if (event.key == "Enter" || event.type == "click") {
			if (event.key == "Enter" && event.currentTarget.value != "") {
				const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c51fd6ac6c42402e9b2195653241603&q=${event.currentTarget.value}&aqi=no`);
				const respJson = await response.json();
				setWeather(respJson);
				setIsOpen(false);
				console.log(weather);
			} else if (event.currentTarget.value == undefined) {
				const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c51fd6ac6c42402e9b2195653241603&q=${event.currentTarget.dataset.name}&aqi=no`);
				const respJson = await response.json();
				setWeather(respJson);
				setIsOpen(false);
				console.log(weather);
			}
		}
	};

	const inputOpen = () => {
		setIsOpen(!isOpen);
	};

	return (
		<main className="w-screen h-screen flex items-center justify-center">
			{isOpen && <LocationPopup autocomplete={autocompleteLocation} autocompleteData={autocomplete} getWeather={getWeather} />}
			<div className={"w-[450px] h-[600px] flex flex-col justify-between items-center bg-[#2E2E38] rounded-2xl px-10 py-10 text-white poppins z-0 " + `${isOpen?"blur-md":""}`}>
				<div className="flex justify-center w-full relative">
					<img onClick={inputOpen} className="absolute left-2 cursor-pointer duration-300 hover:scale-105" src="search.svg" alt="" />
					<h1 className="text-4xl tracking-wider">{weather.location.name}</h1>
				</div>
				<div className="flex">
					<img className="w-16 h-16" src={weather.current.condition.icon} alt="" />
					<span>
						<h1 className="text-6xl">{Math.round(weather.current.temp_c) + "°c"}</h1>
						<p className="text-gray-300 text-lg ml-1">{weather.current.condition.text}</p>
					</span>
				</div>
				<div className="w-full flex justify-around">
					<div className="flex flex-col justify-center items-center">
						<h1 className="text-3xl">{weather.current.humidity}<span className="text-base">%</span></h1>
						<p className="text-gray-300">Humidity</p>
					</div>
					<div className="flex flex-col justify-center items-center">
						<h1 className="text-3xl">{Math.round(weather.current.feelslike_c)}<span className="text-base">°c</span></h1>
						<p className="text-gray-300">Real Feel</p>
					</div>
					<div className="flex flex-col justify-center items-center">
						<h1 className="text-3xl">{Math.round(weather.current.wind_kph)}<span className="text-base">km/h</span></h1>
						<p className="text-gray-300">Wind Speed</p>
					</div>
				</div>
			</div>
		</main>
	);
}

export default App;
