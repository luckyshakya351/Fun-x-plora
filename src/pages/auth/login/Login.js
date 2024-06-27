import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailReadOutlined';
import NoEncryptionIcon from '@mui/icons-material/NoEncryption';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Tab,
  Tabs,
  Typography
} from "@mui/material";
import CryptoJS from 'crypto-js';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logored.jpg";
import LoginWithEmail from '../login/LoginWithEmail'
import LoginWithMobile from '../login/LoginWithMobile'
import { zubgtext } from '../../../Shared/color';


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
    <Container >
      <Box sx={style.authheader}>
        <Box
          sx={{
            width: "95%",
            marginLeft: "2.5%",
            borderRadius: "10px",
          }}
        >
          <Box sx={style.flexbetween}>
            <Box component={NavLink} sx={{ width: '20%' }}>

            </Box>
            <Box sx={{ width: '60%' }}>
              <Box component='img' src={logo} sx={style.logocss}></Box>
            </Box>
            <Box component={NavLink} sx={{ width: '20%' }}>
              <Box sx={{ ...style.flexcenter, float: 'right' }}>
              </Box>
            </Box>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: '600', fontSize: '18px', color: 'white' }}  > Log in </Typography>
          <Typography variant="body2" sx={{ fontWeight: '400', fontSize: '12px', color: 'white' }}>Please log in with your phone number or email</Typography>
          <Typography variant="body2" mb={2} sx={{ fontWeight: '400', fontSize: '12px', color: 'white' }}>If you forget your password, please contact customer service</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          my: 2,
          width: "95%",
          marginLeft: "2.5%",
          borderRadius: "10px",
        }}
      >


        <Box sx={style.authform} component='form'>
          <Box sx={{ width: "100%" }}>
            <Tabs value={value} onChange={handleChange} sx={{ width: "100%" }}>
              <Tab value="two" sx={{ width: "50% !important" }} label={
                <Box sx={{ ...style.flexcoloumcenter, ...style.tabs, }}>
                  <PhoneAndroidIcon sx={{ color: value === 'two' ? 'red' : 'gray', }} />

                  <Typography variant="body1" sx={{ color: value === 'two' ? 'red' : 'gray', fontSize: '14px', }}>Log in with phone</Typography>
                </Box>
              }
              />

              <Tab value="one" sx={{ width: "50% !important" }} label={
                <Box sx={{ ...style.flexcoloumcenter, ...style.tabs, }}>
                  <MarkEmailReadIcon sx={{ color: value === 'one' ? 'red' : 'gray', }} />
                  <Typography variant="body1" sx={{ color: value === 'one' ? 'red' : 'gray', fontSize: '14px', }}>Log in with email</Typography>
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
        <Box sx={{ ...style.loginfooter, ...style.flexbetween, }}>
          <Box sx={{ ...style.flexcoloumcenter, }} onClick={() => navigate("/forget-password")}>
            <NoEncryptionIcon sx={style.footericon} />
            <Typography variant="body2" >Forgot password</Typography>
          </Box>
          <Box sx={{ ...style.flexcoloumcenter, }}>
            <SupportAgentIcon sx={style.footericon} />
            <Typography variant="body2" >Customer Service</Typography>
          </Box>
        </Box>
      </Box>

    </Container>
  );
}

export default Login;

const style = {
  authheader: { background: zubgtext, py: 1, },
  logocss: { width: '120px', margin: 'auto', },
  flagcss: { width: '30px' },
  icon: { fontSize: "18px", color: 'white' },
  authform: { width: '100%' },
  tabs: { width: "100%", '&>p': { textTransform: 'none', } },
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

