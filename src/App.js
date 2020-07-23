import React from 'react';
import { Route, Link } from 'react-router-dom';
import Login from './components/Log-in.js'
import Signup from './components/Sign-up.js'
import AddPlant from './components/AddPlant.js'
import ChangePass from './components/ChangePass.js'

function App() {
  return (
    <div className="App">
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/Signup">
        <button>Signup</button>
      </Link>
      <Link to="/ChangePass">
        <button>Change Password</button>
      </Link>
      <Link to="/AddPlant">
        <button>Add Plant</button>
      </Link>
      <Route exact path="/" component={Login} />
      <Route path="/Signup" component={Signup} />
      <Route path="/ChangePass" component={ChangePass} />
      <Route path="/AddPlant" component={AddPlant} />
    </div>
  );
}

export default App;
