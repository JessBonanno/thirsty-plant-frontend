import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './components/ui/Theme';
import { Route, Switch } from 'react-router-dom';
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
import AddEditModal from './components/AddEditModal';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Hidden smDown>
        <AppBar style={{ margin: 0 }} />
      </Hidden>
      <div className="App" style={{ padding: '0 0 100px' }}>
        <Switch>
          <Route
            exact
            path="/"
            component={() => {
              window.location.href =
                'https://watermyplantsjuly2020.netlify.app/';
              return null;
            }}
          ></Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/settings" component={EditUser} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/add-plant" component={AddEditModal} />
          <PrivateRoute path="/edit-plant/:id" component={AddEditModal} />
          <Route path="/find-my-plant" component={FindMyPlant} />
        </Switch>
      </div>
      <Hidden mdUp>
        <Footer />
      </Hidden>
    </ThemeProvider>
  );
}

export default App;
