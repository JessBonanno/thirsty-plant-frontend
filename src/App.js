import React from 'react';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './components/ui/Theme';
import {Route, Switch} from 'react-router-dom';
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
import FindMyPlant from './components/FindMyPlant';
import AddEditPlants from './components/AddEditPlants';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Hidden smDown>
        <AppBar style={{margin: 0}}/>
      </Hidden>
      <div
        className="App"
        style={{
          padding: '0 0 100px',
          // overflowX: 'hidden'
        }}
      >
        <Switch>
          <Route
            exact
            path="/"
            component={Login}
          />
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
          <PrivateRoute exact path="/settings" component={EditUser}/>
          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
          <PrivateRoute path="/add-plant" component={AddEditPlants}/>
          <PrivateRoute path="/edit-plant/:id" component={AddEditPlants}/>
          <Route path="/find-my-plant" component={FindMyPlant}/>
        </Switch>
      </div>
      <Hidden mdUp>
        <Footer/>
      </Hidden>
    </ThemeProvider>
  );
}

export default App;
