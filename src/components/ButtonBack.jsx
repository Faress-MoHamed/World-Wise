import { useNavigate } from "react-router-dom";
import Button from "./Button";

function ButtonBack() {
	const navigat = useNavigate();

	return (
		<Button
			type={"back"}
			onClick={(e) => {
				e.preventDefault();
				navigat(-1);
			}}
		>
			&larr; Back
		</Button>
	);
}

export default ButtonBack;
