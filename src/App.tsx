import { BrowserRouter } from 'react-router-dom';
import DefaultRoutes from './routes';

function App() {
  return (
    <>
      <BrowserRouter>
        <DefaultRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
