import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import theme from './components/ui/Theme';

// * local imports
import DeleteModal from './components/DeleteModal';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <h1>water my plants!</h1>
      {/* DeleteModal component here for dev only will be moved */}
      <DeleteModal />
    </ThemeProvider>
  );
}

export default App;
