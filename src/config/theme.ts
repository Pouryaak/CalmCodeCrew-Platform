import { createTheme } from '@mui/material/styles';
import { COLORS } from './colors';
import { darken } from '@mui/system';

const theme = createTheme({
  palette: {
    mode: 'dark', // This sets the dark mode
    background: {
      default: COLORS.DARK_BG,
    },
    primary: {
      main: COLORS.PRIMARY,
      contrastText: COLORS.DARK_BG
    },
  },
  typography: {
    h1: {
      fontWeight: 'bold',
    },
    h2: {
      fontWeight: 'bold',
    },
    h3: {
      fontWeight: 'bold',
    },
    h4: {
      fontWeight: 'bold',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25, // set your desired border-radius value for buttons
        },
        containedPrimary: {
          backgroundColor: COLORS.SECONDARY, // Primary button background color
          '&:hover': {
            backgroundColor: darken(COLORS.SECONDARY, 0.2), // Darkens the color by 20% on hover
          },
        },
        outlinedPrimary: {
          borderColor: COLORS.SECONDARY,
          color: COLORS.SECONDARY,
          '&:hover': {
            backgroundColor: darken(COLORS.SECONDARY, 0.1), // You can adjust this value as needed
            color: COLORS.DARK_BG,
            borderColor: COLORS.SECONDARY,
          },
        },
      },
    }

  },
});

export default theme;
