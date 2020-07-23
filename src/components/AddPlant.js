import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./Input.js";
import * as Yup from "yup";

function AddPlant() {
	const defaultState = {
		plantName: "",
		species: "",
        every: "",
        days: "",
		specialInstructions: "",
	};
	const [formState, setFormState] = useState(defaultState);
	const [errors, setErrors] = useState({
		username: "",
		password: "",
	});

	const formSchema = Yup.object().shape({
		plantName: Yup.string()
			.min(2, "must include more then 2 characters")
			.required("must include at least 2 characters"),
		species: Yup.string()
			.min(2, "must include more then 2 characters")
			.required("must include at least 2 characters"),
		every: Yup.string()
			.min(2, "must include more then 2 characters")
			.required("must include at least 2 characters"),
		days: Yup.string()
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
					PlantName:
					<Input
						type="text"
						onChange={changeHandler}
						name="plantName"
						value={formState.plantName}
					/>
				</label>
				<label>
					Species:
					<Input
						type="text"
						onChange={changeHandler}
						value={formState.species}
					/>
				</label>
                Watering Frequency:
				<label>
					Every:
					<select
						id="everyInput"
						name="every"
						value={formState.every}
						onChange={changeHandler}
						errors={errors}		
					>
						<option value="Select Freq">Select Freq</option>
						<option value="0">0</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
					</select>
				</label>
                <label>
                    Day(s):
                    <select
                        id="daysInput"
                        name="days"
                        value={formState.days}
                        onChange={changeHandler}
                        errors={errors}
                    >
                        <option value="Times Per Day">Select times per day</option>
                        <option value="Small">Once</option>
                        <option value="Medium">Twice</option>
                        <option value="Large">Thrice</option>
                    </select>
                </label>
				<label className="input">
					Special Instructions
					<Input
						name="specialInstructions"
						type="text"
						placeholder="Special Instructions"
						onChange={changeHandler}
						value={formState.specialInstructions}
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
		</div>
	);
}

export default AddPlant;
