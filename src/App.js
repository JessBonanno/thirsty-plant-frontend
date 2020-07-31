import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './components/ui/Theme';
import { Route } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import './App.css';

// * local imports
import Login from './components/Log-in.js';
import Signup from './components/Sign-up.js';
import Dashboard from './components/containers/Dashboard';
import EditUser from './components/EditUser.js';
import AppBar from './components/ui/AppBar';
import Footer from './components/ui/Footer';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Hidden smDown>
        <AppBar style={{ margin: 0 }} />
      </Hidden>
      <div className='App'>
        <Route path='/login' component={Login} />
        <Route path='/Signup' component={Signup} />
        <PrivateRoute path='/settings' component={EditUser} />
        <PrivateRoute
          path='/dashboard'
          component={localStorage.getItem('userId') && Dashboard}
        />
      </div>
      <Hidden mdUp>
        <Footer />
      </Hidden>
    </ThemeProvider>
  );
}

export default App;
