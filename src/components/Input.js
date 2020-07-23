import React from "react";

function Input(props) {
    return (
        <label htmlFor="name">
            {props.label}
            <input  {...props} />
            <p>{props.errors[props.name]}</p>
        </label>
    );
}

export default Input;