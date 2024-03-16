import {
	createContext,
	useEffect,
	useContext,
	useReducer,
} from "react";

const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();
const initialSatte = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: "",
};
function reducer(prevState, action) {
	switch (action.type) {
		case "loading":
			return { ...prevState, isLoading: true };
		case "cities/loaded":
			return { ...prevState, isLoading: false, cities: action.payload };
		case "city/loaded":
			return { ...prevState, isLoading: false, currentCity: action.payload };
		case "city/created":
			return {
				...prevState,
				isLoading: false,
				cities: [...prevState.cities, action.payload],
				currentCity: action.payload,
			};
		case "cities/deleted":
			return {
				...prevState,
				isLoading: false,
				cities: prevState.cities.filter((city) => city.id !== action.payload),
				currentCity: {},
			};
		case "rejected":
			return {
				...prevState,
				isLoading: false,
				error: action.payload,
			};
		default:
			throw new Error("Unknown action type");
	}
}
function CitiesProvider({ children }) {
	const [{ cities, isLoading, currentCity,error }, dispatch] = useReducer(
		reducer,
		initialSatte
	);
	useEffect(() => {
		dispatch({ type: "loading" });
		async function fetchCities() {
			try {
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				dispatch({ type: "cities/loaded", payload: data });
			} catch {
				dispatch({ type: "rejected", payload: "un expected error" });
			}
		}
		fetchCities();
	}, []);
	async function getCity(id) {
		console.log(id, currentCity.id);
		if (id === currentCity.id) return;
		dispatch({ type: "loading" });

		try {
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();
			dispatch({ type: "city/loaded", payload: data });
		} catch (err) {
			dispatch({ type: "rejected", payload: "un expected error" });
		}
	}
	async function createCity(newCity) {
		dispatch({ type: "loading" });

		try {
			const res = await fetch(`${BASE_URL}/cities`, {
				method: "POST",
				body: JSON.stringify(newCity),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			dispatch({ type: "city/created", payload: data });
		} catch (err) {
			dispatch({ type: "rejected", payload: "un expected error" });
		}
	}
	async function deleteCity(id) {
		dispatch({ type: "loading" });

		try {
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: "DELETE",
			});
			dispatch({ type: "cities/deleted", payload: id });
		} catch (err) {
			dispatch({ type: "rejected", payload: "un expected error" });
		}
		dispatch({ type: "loading" });
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				getCity,
				error,
				createCity,
				deleteCity,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}
function useCities() {
	const context = useContext(CitiesContext);
	if (context === undefined) throw new Error("unexpected error");
	return context;
}
export { CitiesProvider, useCities };
