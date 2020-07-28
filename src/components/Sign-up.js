import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import Input from "./Input.js";
import { makeStyles } from "@material-ui/core/styles";
import signUp from "./signUp.jpeg";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Login from "./Log-in";
import { TweenMax, Power3 } from "gsap";

function Signup() {
	const defaultState = {
		email: "",
		username: "",
		password: "",
		confirm: "",
		phonenumber: "",
		terms: false,
	};
	const [formState, setFormState] = useState(defaultState);
	const [buttonDisabled, setButtonDisabled] = useState(false);
	console.log(setFormState);
	// eslint-disable-next-line
	const [postState, setPost] = useState([]);
	const [errors, setErrors] = useState({
		email: "",
		username: "",
		password: "",
		confirm: "",
		phonenumber: "",
		terms: "",
	});
	const phoneRegex = RegExp(
		/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
	);
	const formSchema = Yup.object().shape({
		email: Yup.string()
			.required("Please provide a email.")
			.email("This is not a valid email."),
		username: Yup.string()
			.min(5, "must include more then 5 characters")
			.required("must include at least 5 characters"),
		password: Yup.string().matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
			"Must include one lowercase, one uppercase, one number & be at least 8 characters in length"
		),
		confirm: Yup.string().oneOf(
			[Yup.ref("password"), null],
			"Passwords must match"
		),
		terms: Yup.boolean().oneOf(
			[true],
			"You must accept the terms and conditions"
		),
		phone: Yup.string()
			.matches(phoneRegex, "Invalid phone")
			.required("Phone is required"),
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
			[e.target.name]: value,
		});
		validateChange(e);
	};

	useEffect(() => {
		formSchema.isValid(formState).then((valid) => {
			setButtonDisabled(!valid);
		});
	}, [formState]);

	useEffect(() => {
		TweenMax.to(gsapAnimationForm, 5, {
			opacity: 1,
			ease: Power3.easeOut,
		});
	}, []);

	const useStyles = makeStyles((theme) => ({
		signUpContainer: {
			backgroundImage: `url(${signUp})`,
			position: "fixed",
			minWidth: "100%",
			height: "100vh",
			// minHeight: "100%",
			backgroundSize: "cover",
			backgroundPosition: "center",
		},
		form: {
			marginTop: "3em",
			display: "flex",
            justifyContent: "center",
            opacity: "0",
		},
		buttons: {
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			justifyItems: "space-between",
			marginLeft: "0px",
			marginBottom: "20px",
		},
		paper: {
			backgroundColor: theme.palette.background.paper,
			padding: "25px",
			boxShadow: theme.shadows[5],
			width: 654,
			outline: "none",
			[theme.breakpoints.down("sm")]: {
				height: 800,
				width: 400,
				padding: 20,
			},
		},
		text: {
			textAlign: "center",
		},
	}));
	const classes = useStyles();
	return (
		<div className={classes.signUpContainer}>
			<div
				className={classes.form}
				ref={(el) => {
					gsapAnimationForm = el;
				}}
			>
				<Paper className={classes.paper}>
					<form onSubmit={formSubmit}>
						<Typography variant="h2" className={classes.text}>
							Sign Up
						</Typography>
						<label>
							<Input
								placeholder="Email"
								type="text"
								onChange={changeHandler}
								name="email"
								value={formState.email}
								errors={errors}
							/>
						</label>
						<label>
							<Input
								placeholder="Username"
								type="text"
								onChange={changeHandler}
								name="username"
								value={formState.username}
								errors={errors}
							/>
						</label>
						<label>
							<Input
								placeholder="Password"
								type="text"
								onChange={changeHandler}
								value={formState.password}
								name="password"
								errors={errors}
							/>
						</label>
						<label>
							<Input
								placeholder="Confirm Password"
								type="text"
								onChange={changeHandler}
								value={formState.confirm}
								name="confirm"
								errors={errors}
							/>
						</label>
						<Input
							placeholder="Phone Number"
							type="text"
							onChange={changeHandler}
							name="phone"
							value={formState.phoneNumber}
							errors={errors}
						/>
						<br />
						<label htmlFor="terms">
							<input
								name="terms"
								type="checkbox"
								checked={formState.terms}
								onChange={changeHandler}
								errors={errors}
								className={classes.text}
							/>
							Terms & Conditions
						</label>
						<br />
						<br />

						<br />
						<div className={classes.buttons}>
							<Button
								variant="contained"
								color="secondary"
								style={{ color: "white" }}
								onClick={formSubmit}
								disabled={buttonDisabled}
							>
								Sign Up
							</Button>
						</div>
						<Typography variant="h6" className={classes.text}>
							Already have an account?{" "}
							<Button
								variant="contained"
								color="secondary"
								style={{ color: "white" }}
								component={Link}
								to="/login"
							>
								Login
							</Button>
						</Typography>
					</form>
				</Paper>
			</div>
		</div>
	);
}

export default Signup;
