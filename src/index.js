import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { PlantProvider } from './contexts/PlantContext';

ReactDOM.render(
  <PlantProvider>
    <Router>
      <App />
    </Router>
  </PlantProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
