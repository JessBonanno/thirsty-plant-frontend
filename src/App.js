import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import theme from './components/ui/Theme';
import DeleteDialog from './components/DeleteDialog';
import { Route } from 'react-router-dom';
import Dashboard from './components/containers/Dashboard';

// * local imports

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Route exact path="/">
        <>
          <h1>water my plants!</h1>
        </>
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </ThemeProvider>
  );
}

export default App;
