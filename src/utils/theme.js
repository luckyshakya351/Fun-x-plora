import { createTheme, } from "@mui/material";


const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '450px !important',
          padding: '0px !important',
        }
      },
    }
  },
  palette: {
    primary: {
      main: '#63BA0E',
    },
    secondary: {
      main: '#160D3D',
    }
  }
});

export default theme;
