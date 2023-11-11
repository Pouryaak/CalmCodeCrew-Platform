import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import theme from './config/theme.js';
import './index.css';
import DefaultRoutes from './routes/index';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App>{DefaultRoutes}</App>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  // </React.StrictMode>,
);
