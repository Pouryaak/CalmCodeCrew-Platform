import { Toaster } from 'react-hot-toast';

function App({ children }: any) {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div>{children}</div>
    </>
  );
}

export default App;
