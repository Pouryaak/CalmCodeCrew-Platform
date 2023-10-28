import CssBaseline from '@mui/material/CssBaseline';
import Menubar from './shared/Menubar/Menubar.jsx';
import { Toaster } from 'react-hot-toast';

function App({ children }: any) {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <CssBaseline />
      <Menubar />
      <div>{children}</div>
    </>
  );
}

export default App;
