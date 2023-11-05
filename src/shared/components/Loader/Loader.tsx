import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="300px"
    >
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default Loader;
