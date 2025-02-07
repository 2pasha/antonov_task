import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import './styles/App.css';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
