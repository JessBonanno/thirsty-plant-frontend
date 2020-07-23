import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Input from "./Input.js";
import * as Yup from "yup";

function ChangePass() {
	const defaultState = { current: "", new: "", confirm: "", phone: "" };
	const [formState, setFormState] = useState(defaultState);
	const [post, setPost] = useState([]);
	const [errors, setErrors] = useState({
		current: "",
		new: "",
		confirm: "",
		phoneNumber: "",
	});
	const formSchema = Yup.object().shape({
		current: Yup.string()
			.min(2, "must include more then 2 characters")
			.required("must include at least 2 characters"),
		new: Yup.string()
			.min(2, "must include more then 2 characters")
			.required("must include at least 2 characters"),
		confirm: Yup.string()
			.min(2, "must include more then 2 characters")
			.required("must include at least 2 characters"),
		phone: Yup.string()
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
		axios
			.post("https://reqres.in/api/users", formState)
			.then((res) => {
				setPost(res.data);
				console.log("success", res);
			})
			.catch((err) => console.log(err.response));
	};

	const changeHandler = (event) => {
		setFormState(event.target.value);
	};
	return (
		<div className="App">
			<form onSubmit={formSubmit}>
				<label>
					Current Password:
					<Input
						type="text"
						onChange={changeHandler}
						name="current"
						value={formState.current}
						errors={errors}
					/>
				</label>
				<label>
					New Password:
					<Input
						type="text"
						onChange={changeHandler}
						name="new"
						value={formState.new}
						errors={errors}
					/>
				</label>
				<label>
					Confirm Password:
					<Input
						type="text"
						onChange={changeHandler}
						name="confirm"
						value={formState.confirm}
						errors={errors}
					/>
				</label>
				<label>
					Phone Number:
					<Input
						type="text"
						onChange={changeHandler}
						name="phone"
						value={formState.phoneNumber}
						errors={errors}
					/>
				</label>
				<Link to="/">
					<button>Cancel</button>
				</Link>
				<Link to="/">
					<button>Submit</button>
				</Link>
			</form>
			<pre>{JSON.stringify(post, null, 2)}</pre>
		</div>
	);
}

export default ChangePass;
