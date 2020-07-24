import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./Input.js";
import axios from "axios";
import * as Yup from "yup";
// eslint-disable-next-line
import theme from "../components/ui/Theme";
// eslint-disable-next-line
import Typography from "@material-ui/core/Typography";
// eslint-disable-next-line
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
// eslint-disable-next-line
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import signUp from "./signUp.jpeg"

function Login() {
	const defaultState = { username: "", password: "" };
	const [formState, setFormState] = useState(defaultState);
	// eslint-disable-next-line
	const [post, setPost] = useState([]);
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
            backgroundImage: {signUp},
            position: "fixed",
            minWidth: "100%",
            minHeight: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
		},
	}));
	const classes = useStyles();
	return (
		<div className={classes.form}>
			<form onSubmit={formSubmit}>
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
						name="password"
						value={formState.password}
						errors={errors}
					/>
				</label>
				<Link to="/">
					<p>Having trouble logging in?</p>
				</Link>
				
					<Button
						variant="contained"
						color="secondary"
						style={{ color: "white" }}
					>
						Login
					</Button>
				
			</form>
			{/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
		</div>
	);
}

export default Login;
