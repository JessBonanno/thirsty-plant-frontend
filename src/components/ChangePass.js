import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Input from "./Input.js";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import signUp from "./signUp.jpeg";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import { TweenMax, Power3 } from "gsap";


function ChangePass() {
    let gsapAnimationChangePass = useRef(null);
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
    const phoneRegex = RegExp(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    );
	const formSchema = Yup.object().shape({
        current: Yup.string()
            .required(
                'Please enter your current password'
            ),
            new: Yup.string()
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
                    'Must include one lowercase, one uppercase, one number & be at least 8 characters in length'
                ),
		confirm: Yup.string().oneOf([Yup.ref("new"), null], "Passwords must match"),
        phone: Yup.string().matches(phoneRegex, "Invalid phone").required("Phone is required")
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
    
    useEffect(() => {
			TweenMax.to(gsapAnimationChangePass, 5, {
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
			marginLeft: "25px",
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: '70px',
            width: 654,
            height: 500,
            outline: 'none',
            [theme.breakpoints.down('sm')]: {
                height: 550,
                width: 400,
                padding: 20,
            },
        },
        text: {
            textAlign: "center",
        }
	}));
    const classes = useStyles();
  

    const back = () => {
        window.history.back()
    }
	return (
		<div className={classes.signUpContainer}>
			<div
				className={classes.form}
				ref={(el) => {
					gsapAnimationChangePass = el;
				}}
			>
				<Paper className={classes.paper}>
					<Typography variant="h4" className={classes.text}>
						Change Your Password
					</Typography>
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
								style={{ color: "white", margin: "20px" }}
								onClick={formSubmit}
							>
								Submit
							</Button>
							<Button
								variant="contained"
								color="secondary"
								style={{ color: "white" }}
								onClick={back}
							>
								Cancel
							</Button>
						</div>
					</form>
					{/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
				</Paper>
			</div>
		</div>
	);
}

export default ChangePass;
