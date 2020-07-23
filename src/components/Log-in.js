import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./Input.js";
import * as Yup from "yup";

function Login() {
	const defaultState = { username: "", password: "" };
	const [formState, setFormState] = useState(defaultState);
	const [errors, setErrors] = useState({
		username: "",
		password: "",
	});
	const formSchema = Yup.object().shape({
        username: Yup.string()
			.min(2, "must include more then 2 characters")
			.required("must include at least 2 characters"),
		password: Yup.string()
			.min(2, "must include more then 2 characters")
			.required("must include at least 2 characters"),
	});
	const validateChange = (e) => {
		e.persist();
		Yup.reach(formSchema, e.target.name)
			.validate(e.target.value)
			.then((valid) =>
				setErrors({
					...errors,
					[e.target.name]: "",
				})
			)
			.catch((error) =>
				setErrors({
					...errors,
					[e.target.name]: error.errors[0],
				})
			);
	};
	const formSubmit = (e) => {
		const value =
			e.target.type === "checkbox" ? e.target.checked : e.target.value;
		setFormState({
			...formState,
			[e.target.name]: value,
		});
		validateChange(e);
	};

	const changeHandler = (event) => {
		setFormState(event.target.value);
	};
	return (
		<div className="App">
			<form onSubmit={formSubmit}>
				<label>
					Username:
					<Input
						type="text"
						onChange={changeHandler}
						name="username"
                        value={formState.username}
                        errors={errors}
					/>
				</label>
				<label>
					Password:
					<Input
						type="text"
                        onChange={changeHandler}
                        name="password"
						value={formState.password}
                        errors={errors}
                    />
				</label>
				<Link to="/">
					<p>Having trouble logging in?</p>
				</Link>

				<Link to="/">
					<button>Sign In</button>
				</Link>
			</form>
		</div>
	);
}

export default Login;
