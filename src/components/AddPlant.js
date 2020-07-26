import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Input from "./Input.js";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import signUp from "./signUp.jpeg";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';

function AddPlant() {
	const defaultState = {
		plantName: "",
		species: "",
		every: "",
		days: "",
		specialInstructions: "",
	};
	const [formState, setFormState] = useState(defaultState);
	// eslint-disable-next-line
	const [post, setPost] = useState([]);
	const [errors, setErrors] = useState({
		plantName: "",
		species: "",
		every: "",
		days: "",
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

		axios
			.post("https://reqres.in/api/users", formState)
			.then((res) => {
				setPost(res.data);
				console.log("success", res);
			})
			.catch((err) => console.log(err.response));
	};

	const changeHandler = (e) => {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormState({
            ...formState,
            [e.target.name]: value
        });
        validateChange(e);
	};
	const useStyles = makeStyles((theme) => ({
		form: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			height: "100vh",
			backgroundImage: `url(${signUp})`,
			position: "fixed",
			minWidth: "100%",
			minHeight: "100%",
			backgroundSize: "cover",
			backgroundPosition: "center",
		},
		select: {
			width: "100 %",
			padding: "10px",
			borderRadius: "10px",
			margin: "10px 0px 0px 20px",
		},
		buttons: {
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            justifyItems: "space-between",
            marginLeft: "20px",
        },
        title: {
            
        }
	}));
	const classes = useStyles();
	return (
		<div className={classes.form}>
			<form onSubmit={formSubmit}>
                <Typography variant="h2" className={classes.title}>Add a Plant</Typography>
				<label>
					<Input
						placeholder="Plant Name"
						type="text"
						onChange={changeHandler}
						name="plantName"
						value={formState.plantName}
						errors={errors}
					/>
				</label>
				<label>
					<Input
						placeholder="Species"
						type="text"
						onChange={changeHandler}
						name="plantName"
						value={formState.species}
						errors={errors}
					/>
				</label>
				Watering Frequency:
				<br />
				<br />
				<label>
					<select
						className={classes.select}
						id="everyInput"
						name="every"
						value={formState.every}
						onChange={changeHandler}
						errors={errors}
					>
						<option value="1">every day</option>
						<option value="2">every 2 days</option>
						<option value="3">every 3 days</option>
						<option value="4">every 4 days</option>
						<option value="5">every 5 days</option>
						<option value="6">every 6 days</option>
						<option value="7">every 7 days</option>
					</select>
				</label>
				<label>
					<select
						className={classes.select}
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
				<br />
				<br />
				<label className="input">
					<Input
						name="specialInstructions"
						type="textarea"
						placeholder="Special Instructions"
						onChange={changeHandler}
						value={formState.specialInstructions}
						errors={errors}
					/>
				</label>
				<div className={classes.buttons}>
					<Button
						variant="contained"
						color="secondary"
						style={{ color: "white", display: "flex", margin: "20px", }}
						onClick={formSubmit}
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						color="secondary"
						style={{ color: "white" }}
						onClick={formSubmit}
					>
						Submit
					</Button>
				</div>
			</form>
			{/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
		</div>
	);
}

export default AddPlant;
