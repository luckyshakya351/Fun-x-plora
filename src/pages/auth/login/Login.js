import MarkEmailReadIcon from '@mui/icons-material/MarkEmailReadOutlined';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import {
  Box,
  Container,
  Tab,
  Tabs,
  Typography
} from "@mui/material";
import CryptoJS from 'crypto-js';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { lightblue, lightyellow } from '../../../Shared/color';
// import logo from "../../../assets/fun.27036251210ce8ec4ad4.png";
import logo from "../../../assets/—Pngtree—ink splash pattern_6020336 (1).png";
import LoginWithEmail from '../login/LoginWithEmail';
import LoginWithMobile from '../login/LoginWithMobile';
import logbg from '../../../assets/output-onlinepngtools.50540bff27e35c7a58dd.png';
import custom from "../../../assets/custom.png";

function Login() {


  const navigate = useNavigate()
  const [Nav, setNav] = useState(1);

  const dispatch = useDispatch()
  const aviator_login_data = useSelector(
    (state) => state.aviator.aviator_login_data
  );


  const logindata = localStorage.getItem("logindataen") && CryptoJS.AES.decrypt(localStorage.getItem("logindataen"), "anand")?.toString(CryptoJS.enc.Utf8) || null

  useEffect(() => {
    (logindata) && navigate('/dashboard')
  }, [])


  const [value, setValue] = React.useState('two');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container sx={{
      background: '#0D0335', height: '100vh',
      backgroundImage: `url(${logbg})`, backgroundSize: '100% 100%',
    }}>

      <Box
        sx={{

          width: "95%",
          marginLeft: "2.5%",
          borderRadius: "10px",
        }}
      >
        <Box sx={{ width: '100%', }}>
          <Box component='img' src={logo} sx={style.logocss}></Box>
        </Box>

        <Box sx={style.authform} component='form'>
          <Box sx={{ width: "100%" }}>
            <Tabs value={value} onChange={handleChange} sx={{ width: "100%", }}>
              <Tab value="two" sx={{ width: "50% !important", }} label={
                <Box sx={{ ...style.flexcoloumcenter, ...style.tabs, }}>
                  {/* <PhoneAndroidIcon sx={{ color: value === 'two' ? lightblue : lightyellow, }} /> */}
                  <Typography variant="body1" sx={{ color: value === 'two' ? lightyellow : lightblue, fontSize: '14px', }}>Log in with phone</Typography>
                </Box>
              }
              />

              <Tab value="one" sx={{ width: "50% !important" }} label={
                <Box sx={{ ...style.flexcoloumcenter, ...style.tabs, }}>
                  {/* <MarkEmailReadIcon sx={{ color: value === 'one' ? lightblue : lightyellow, }} /> */}
                  <Typography variant="body1" sx={{ color: value === 'one' ? lightyellow : lightblue, fontSize: '14px', }}>Log in with email</Typography>
                </Box>
              }
              />
            </Tabs>
          </Box>
          {
            value == 'one' && (
              <LoginWithEmail />
            )
          }
          {
            value == 'two' && (
              <LoginWithMobile />
            )
          }
        </Box>
      </Box>
      <Box
        sx={{ width: "80%", margin: "auto", mt: 3 }}
        component={NavLink}
        to="/CustomerService"
      >
        <Box
          component="img"
          src={custom}
          sx={{ width: "50px", margin: "auto", filter: 'hue-rotate(60deg)', }}
        ></Box>
        <Typography
          variant="body1"
          color="white"
          sx={{ textAlign: "center", mt: 1 }}
        >
          Customer Service
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;

const style = {
  authheader: { background: '#0D0335', py: 1, },
  logocss: { width: '200px', margin: 'auto', borderRadius: '5px' },
  flagcss: { width: '30px' },
  icon: { fontSize: "18px", color: 'white' },
  authform: { width: '100%' },
  tabs: { width: "100%", '&>p': { textTransform: 'none', }, },
  checkbox: {
    mt: 1, '&>span>svg': { color: 'red' }
  },
  loginfooter: { width: '90%', margin: 'auto', mt: 5 },
  footericon: { color: 'red', fontSize: '30px', mb: 1, },
  flexbetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between;',
  },
  flexcenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexcoloumcenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

