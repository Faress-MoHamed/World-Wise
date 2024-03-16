import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
	user: null,
	isAuth: false,
};
function reducer(prevState, action) {
	switch (action.type) {
		case "login":
			return { ...prevState, user: action.payload, isAuth: true };
		case "logout":
			return { ...prevState, user: null, isAuth: false };
		default:
			throw new Error("unKnown error");
	}
}
const FAKE_USER = {
	name: "Jack",
	email: "jack@example.com",
	password: "qwerty",
	avatar: "https://i.pravatar.cc/100?u=zz",
};
function AuthProvider({ children }) {
	const [{ user, isAuth }, dispatch] = useReducer(reducer, initialState);

	function login(email, password) {
		if (email === FAKE_USER.email && password === FAKE_USER.password) {
			dispatch({ type: "login", payload: FAKE_USER });
		}
	}

	function logout() {
		dispatch({ type: "logout" });
	}

	return (
		<AuthContext.Provider value={{ user, isAuth, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined)
		throw new Error("Authcontexet was used outside authProvider");
	return context
}

export { AuthProvider, useAuth };
