import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './components/ui/Theme';
import { Route } from 'react-router-dom';
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
import PrivateRoute from './utils/PrivateRoute';
import Terms from './components/Terms';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Hidden smDown>
        <AppBar style={{ margin: 0 }} />
      </Hidden>
      <flexbox flexDirection="column">
        <div className="App">
          <Route path="/login" component={Login} />
          <Route path="/Signup" component={Signup} />
          <Route path="/ChangePass" component={ChangePass} />
          <Route path="/AddPlant" component={AddPlant} />
          <Route path="/dashboard" component={Dashboard} />
        </div>
      </flexbox>
      <Hidden mdUp>
        <Footer />
      </Hidden>
    </ThemeProvider>
  );
}

export default App;
