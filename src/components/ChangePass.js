import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Input from "./Input.js";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import signUp from "./signUp.jpeg";
import Button from "@material-ui/core/Button";

function ChangePass() {
	const defaultState = { current: "", new: "", confirm: "", phone: "" };
	const [formState, setFormState] = useState(defaultState);
	// eslint-disable-next-line
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
		validateChange(event);
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
		buttons: {
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			justifyItems: "space-between",
			marginLeft: "25px",
		},
	}));
	const classes = useStyles();
	return (
		<div className={classes.form}>
			<form onSubmit={formSubmit}>
				<label>
					<Input
						placeholder="Current Password"
						type="text"
						onChange={changeHandler}
						name="current"
						value={formState.current}
						errors={errors}
					/>
				</label>
				<label>
					<Input
						placeholder="New Password"
						type="text"
						onChange={changeHandler}
						name="new"
						value={formState.new}
						errors={errors}
					/>
				</label>
				<label>
					<Input
						placeholder="Confirm Password"
						type="text"
						onChange={changeHandler}
						name="confirm"
						value={formState.confirm}
						errors={errors}
					/>
				</label>
				<label>
					<Input
						placeholder="Phone Number"
						type="text"
						onChange={changeHandler}
						name="phone"
						value={formState.phoneNumber}
						errors={errors}
					/>
				</label>
				<div className={classes.buttons}>
					<Button
						variant="contained"
						color="secondary"
                        style={{ color: "white", margin: "20px", }}
						onClick={formSubmit}
					>
						Submit
					</Button>
					<Button
						variant="contained"
						color="secondary"
						style={{ color: "white" }}
						onClick={formSubmit}
					>
						Cancel
					</Button>
				</div>
			</form>
			{/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
		</div>
	);
}

export default ChangePass;
