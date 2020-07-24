import React from "react";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import theme from "./components/ui/Theme";
import { Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";


// * local imports
import Login from "./components/Log-in.js";
import Signup from "./components/Sign-up.js";
import AddPlant from "./components/AddPlant.js";
import Dashboard from "./components/containers/Dashboard";
import ChangePass from "./components/ChangePass.js";
import TransitionsModal from "./components/EditPlantModal.js";

function App() {




  
	return (
		<ThemeProvider theme={theme}>

				<div className="App">
					<Link to="/">
						<Button variant="outlined" color="primary" href="#outlined-buttons">
							Home
						</Button>
					</Link>
					<Link to="/dashboard">
						<Button variant="outlined" color="primary" href="#outlined-buttons">
							Dashboard
						</Button>
					</Link>
					<Link to="/transition">
						<Button variant="outlined" color="primary" href="#outlined-buttons">
							Transition
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
					<Route path="/dashboard" component={Dashboard}>
						<Route path="/transition" component={TransitionsModal} />
						<Dashboard />
					</Route>
				</div>

		</ThemeProvider>
	);
}

export default App;
