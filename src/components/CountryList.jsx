import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
function CountryList() {
	const { cities, isLoading } = useCities();
	if (isLoading) return <Spinner></Spinner>;
	if (!cities.length)
		return (
			<Message message="add your first city by clciking on a city on the map"></Message>
		);
	const countries = cities.reduce((arr, city) => {
		if (!arr.map((el) => el.country).includes(city.country))
			return [...arr, { country: city.country, emoji: city.emoji }];
		else return arr;
	}, []);
	return (
		<ul className={styles.countryList}>
			{countries.map((country) => (
				<CountryItem country={country} key={country.country} />
			))}
		</ul>
	);
}

export default CountryList;
