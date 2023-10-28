import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // This sets the dark mode
    background: {
      default: '#0b0f16',
    },
    primary: {
      main: '#5d78e7',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#85ed5a', // Primary button background color
        },
      },
    },
  },
});

export default theme;
