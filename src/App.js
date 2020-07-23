import React from "react";
import { Route, Link } from "react-router-dom";
import Login from "./components/Log-in.js";
import Signup from "./components/Sign-up.js";
import AddPlant from "./components/AddPlant.js";
import ChangePass from "./components/ChangePass.js";
import Button from "@material-ui/core/Button";
import { flexbox } from '@material-ui/system';

function App() {
	return (
    <flexbox flexDirection="column">
		<div className="App">
			<Link to="/">
				<Button variant="outlined" color="primary" href="#outlined-buttons">
					Home
				</Button>
			</Link>
			<Link to="/Signup">
				<Button variant="outlined" color="primary" href="#outlined-buttons">
					Sign-up
				</Button>
			</Link>
			<Link to="/ChangePass">
				<Button variant="outlined" color="primary" href="#outlined-buttons">
					Change Password
				</Button>
			</Link>
			<Link to="/AddPlant">
        <Button variant="outlined" color="primary" href="#outlined-buttons">
          Add Plant
				</Button>
			</Link>
			<Route exact path="/" component={Login} />
			<Route path="/Signup" component={Signup} />
			<Route path="/ChangePass" component={ChangePass} />
			<Route path="/AddPlant" component={AddPlant} />
		</div>
    </flexbox>
	);
}

export default App;
