import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./Input.js";
import axios from "axios";
import * as Yup from "yup";
import theme from "../components/ui/Theme";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

function Login() {
	const defaultState = { username: "", password: "" };
	const [formState, setFormState] = useState(defaultState);
	const [post, setPost] = useState([]);
	const [errors, setErrors] = useState({
		username: "",
		password: "",
	});
	console.log(errors);
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
		},
		login: {
			backgroundColor: theme.palette.background.paper,
			border: "2px solid #000",
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		},
	}));
	const classes = useStyles();

	return (
		<div>
			<Typography variant="h4">Login</Typography>

			<form onSubmit={formSubmit}>
				<label>
					<Typography variant="h6">username</Typography>
					<Input
						className={classes.login}
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
			<pre>{JSON.stringify(post, null, 2)}</pre>
		</div>
	);
}

export default Login;
