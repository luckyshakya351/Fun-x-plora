import { createTheme, } from "@mui/material";


const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '400px !important',
          padding: '0px !important',
          background: '#0E0435',
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
