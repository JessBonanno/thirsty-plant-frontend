import React from "react";
// eslint-disable-next-line
import theme from "../components/ui/Theme";
// eslint-disable-next-line
import Typography from "@material-ui/core/Typography";
// eslint-disable-next-line
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
// eslint-disable-next-line
import TextField from "@material-ui/core/TextField";

function Input(props) {
	const useStyles = makeStyles((theme) => ({
		form: {
			margin: "10px 50px 0px 0px",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		text: {
			margin: "-10px 50px 0px 0px",
			padding: "-100px",
			boxShadow: theme.shadows[5],
			borderRadius: "10px",
			width: "90%",
			height: "2px",
			padding: theme.spacing(2, 4, 3),
			[theme.breakpoints.down("md")]: {
				border: "2px solid red",
				margin: "-5px 50px 0px 0px",
			},
			[theme.breakpoints.down("sm")]: {
				marginLeft: "40px",
			},
		},
		errors: {
			fontSize: "0.8rem",
			color: "red",
		},
	}));
	const classes = useStyles();
	return (
		<div className={classes.form}>
			<label htmlFor="name">
				{props.label}
				<input {...props} className={classes.text} />
				<p className={classes.errors}>{props.errors[props.name]}</p>
			</label>
		</div>
	);
}

export default Input;
