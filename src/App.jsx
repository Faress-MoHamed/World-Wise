import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Product from "./pages/product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";
import CountriesList from "./components/CountryList";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthCotext";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<BrowserRouter>
					<Routes>
						<Route index element={<HomePage></HomePage>}></Route>
						<Route path="product" element={<Product></Product>}></Route>
						<Route path="pricing" element={<Pricing></Pricing>}></Route>
						<Route path="login" element={<Login></Login>}></Route>
						<Route
							path="app"
							element={
								<ProtectedRoute>
									<AppLayout></AppLayout>
								</ProtectedRoute>
							}
						>
							<Route
								index
								element={<Navigate replace to={"cities"}></Navigate>}
							></Route>
							<Route path="cities" element={<CityList />}></Route>
							<Route path="cities/:id" element={<City></City>}></Route>
							<Route path="countries" element={<CountriesList />}></Route>
							<Route path="form" element={<Form></Form>}></Route>
						</Route>
						<Route path="*" element={<PageNotFound></PageNotFound>}></Route>
					</Routes>
				</BrowserRouter>
			</CitiesProvider>
		</AuthProvider>
	);
}

export default App;
