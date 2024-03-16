import  { useEffect } from "react";
import { useAuth } from "../contexts/FakeAuthCotext";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
	const { isAuth } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuth) navigate("/");
	}, [isAuth, navigate]);
	return isAuth ? children : null;
};

export default ProtectedRoute;
