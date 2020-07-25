import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './components/ui/Theme';
import { Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import { flexbox } from '@material-ui/system';
import './App.css';

// * local imports
import Login from './components/Log-in.js';
import Signup from './components/Sign-up.js';
import AddPlant from './components/AddPlant.js';
import Dashboard from './components/containers/Dashboard';
import ChangePass from './components/ChangePass.js';
import AppBar from './components/ui/AppBar';
import Footer from './components/ui/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Hidden smDown>
        <AppBar style={{ margin: 0 }} />
      </Hidden>
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
          <Route path="/login" component={Login} />
          <Route path="/Signup" component={Signup} />
          <Route path="/ChangePass" component={ChangePass} />
          <Route path="/AddPlant" component={AddPlant} />
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </div>
      </flexbox>
      <Hidden mdUp>
        <Footer />
      </Hidden>
    </ThemeProvider>
  );
}

export default App;
