import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from 'axios';
import Input from "./Input.js";

function Signup() {
	const defaultState = {
		email: "",
		username: "",
		password: "",
		confirm: "",
		terms: false,
	};
    const [formState, setFormState] = useState(defaultState);
    const [post, setPost] = useState([]);
	const [errors, setErrors] = useState({
        email: "",
        username: "",
        password: "",
        confirm: "",
        terms: false
	});
	const formSchema = Yup.object().shape({
		email: Yup.string()
			.min(2, "must include more then 2 characters")
			.required("must include at least 2 characters"),
		username: Yup.string()
			.min(2, "must include more then 2 characters")
            .required("must include at least 2 characters"),
        password: Yup.string()
            .min(2, "must include more then 2 characters")
            .required("must include at least 2 characters"),
		confirm: Yup.string()
			.min(2, "must include more then 2 characters")
			.required("must include at least 2 characters"),
		terms: Yup.boolean().oneOf(
			[true],
			"Please agree to the terms and conditions"
		),
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
        axios
            .post("https://reqres.in/api/users", formState)
            .then(res => {
                setPost(res.data); 
                console.log("success", res);
            })
            .catch(err => console.log(err.response));
	};

	const changeHandler = (event) => {
		setFormState(event.target.value);
	};

	return (
		<div className="App">
			<form onSubmit={formSubmit}>
				<label>
					Email:
					<Input
						type="text"
						onChange={changeHandler}
						name="email"
						value={formState.email}
						errors={errors}
					/>
				</label>
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
						value={formState.password}
						name="password"
						errors={errors}
					/>
				</label>
				<label>
					Confirm Password:
					<Input
						type="text"
						onChange={changeHandler}
						value={formState.confirm}
						name="confirm"
						errors={errors}
					/>
				</label>
				<label className="terms" htmlFor="terms">
                    <input name="terms" type="checkbox" onChange={changeHandler} errors={errors}/>
					Terms & Conditions
				</label>
				<p>Already have an account?</p>
                <Link to="/">
                    <button>Sign Up</button>
                </Link>
			</form>
            <pre>{JSON.stringify(post, null, 2)}</pre>
		</div>
	);
}

export default Signup;
