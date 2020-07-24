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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
        },
        text: {
            margin: "10px 0",
            border: "0",
            boxShadow: theme.shadows[5],
            borderRadius: "10px",
            width: "100%",
            padding: theme.spacing(2, 4, 3),
        }
    }));
    const classes = useStyles();
    return (
        <div className={classes.form}>
        <label htmlFor="name">
            {props.label}
                <input  {...props} className={classes.text}/>
            <p>{props.errors[props.name]}</p>
        </label>
        </div>
    );
}

export default Input;