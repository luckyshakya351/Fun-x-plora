import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Typography, FormLabel, FormGroup, FormHelperText,
  FilledInput,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import CryptoJS from "crypto-js";
import { storeCookies } from "../../../Shared/CookieStorage";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { LoginEmailSchemaValidaton } from "../../../Shared/Validation";
import { lightblue, zubgtext } from "../../../Shared/color";
import { endpoint } from "../../../services/urls";
import inputfield from '../../../assets/inputfield.a3159d8d15fb018d06f4.png'
import HowToRegIcon from '@mui/icons-material/HowToReg';


function LoginWithEmail() {
  const [loding, setloding] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    // Using a free IP API service
    axios.get('https://api.ipify.org?format=json')
      .then(response => {
        setIpAddress(response.data.ip);
      })
      .catch(error => {
        console.error('Error fetching IP address:', error);
      });
  }, []);


  const initialValue = {
    email: "",
    pass: "",
    isAllowCheckBox: false,
  };
  const fk = useFormik({
    initialValues: initialValue,
    validationSchema: LoginEmailSchemaValidaton,
    onSubmit: () => {
      if (fk.values.pass && (fk.values.mob || fk.values.email)) {
        const reqbody = {
          username: fk.values.email || fk.values.mob,
          password: fk.values.pass,
          ipAddress: ipAddress
        };
        console.log(reqbody);
        loginFunction(reqbody);
      } else return toast("Please fill all details");
    },
  });

  const loginFunction = async (reqbody) => {
    setloding(true);
    try {
      const response = await axios.post(endpoint.login, reqbody, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      toast.success(response?.data?.msg);
      if (response?.data?.msg === "Login Successfully") {
        const value = CryptoJS.AES.encrypt(JSON.stringify(response?.data), "anand")?.toString();
        localStorage.setItem("logindataen", value);
        sessionStorage.setItem("isAvailableUser", true);
        sessionStorage.setItem("isAvailableCricketUser", true);
        setloding(false);
        storeCookies();
        navigate("/dashboard");
        window.location.reload();
      }
    } catch (e) {
      toast.error(e?.message);
      console.error(e);
    }
    setloding(false);
  };

  useEffect(() => {
    try {
      const res = axios.get(
        "https://vpayout.com/Upi_controllercallback/check_transaction_status"
      );
      console.log(res, "response of new API");
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <Box
      // component="form"
      sx={{
        width: "95%",
        marginLeft: "2.5%",
        transition: "0.3s",
      }}
      onSubmit={fk.handleSubmit}
    >
      <Box mt={5} >
        <FormControl sx={style.inputfield2} fullWidth>
          <MarkEmailReadOutlinedIcon sx={style.inputimg2} />
          <TextField
            placeholder='please input your email'
            id="email"
            type="email"
            name="email"
            value={fk.values.email}
            onChange={fk.handleChange}
            onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
          />
        </FormControl>
        <br />


      </Box>
      {fk.touched.email && fk.errors.email && (
        <div className="error" style={{ textAlign: 'center' }}>{fk.errors.email}</div>
      )}
      <Box mt={3} mb={3}>
        <FormControl fullWidth sx={style.passwordfield2}>
          <HttpsOutlinedIcon sx={style.inputimg2} />
          <OutlinedInput
            id="pass"
            name="pass"
            value={fk.values.pass}
            onChange={fk.handleChange}
            placeholder="Enter password"
            onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff sx={{ color: '#fff2f2' }} /> : <Visibility sx={{ color: '#fff2f2' }} />}
                </IconButton>
              </InputAdornment>
            }
          />

        </FormControl>
        {fk.touched.pass && fk.errors.pass && (
          <div className="error" style={{ textAlign: 'center' }}>{fk.errors.pass}</div>
        )}
      </Box>

      <Stack direction='row' justifyContent={'space-between'}>
        <Box
          component={NavLink}
          to='/register'
          sx={{
            width: '48%',
          }} >
          <a class="playstore-button" href="#">
            <HowToRegIcon />
            <span class="texts">
              <span class="text-1">Register ON</span>
              <span class="text-2">FunXplora</span>
            </span>
          </a>
        </Box>
        <button class="cssbuttons-io-button" onClick={fk.handleSubmit} >
          Login
          <div class="icon">
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </button>
      </Stack >
      <CustomCircularProgress isLoading={loding} />
    </Box >
  );
}

export default LoginWithEmail;

const style = {
  inputfield2: {
    width: '100%', position: 'relative', mb: '10px', filter: 'hue-rotate(100deg)',
    backgroundImage: `url(${inputfield})`,
    backgroundSize: '100% 100%',
    '&>div': { padding: '12px', border: 'none' },
    '&>div>div>input': { width: '80%', color: 'white', padding: '20px 10px', paddingLeft: '24%', },
    '&>div>div>input::placeholder': { color: 'white' },
    '&>div>div>fieldset': { border: 'none' },
    '&>div>div>button>svg': { mr: '20px' },
    '@media (min-width: 320px)': {
      '&>div': { padding: '5px', },
    },
    '@media (min-width: 360px)': {
      '&>div': { padding: '8px', },
    },
    '@media (min-width: 400px)': {
      '&>div': { padding: '12px', },
    },
    '@media (min-width: 425px)': {
      '&>div': { padding: '15px', },
    },
  },
  passwordfield2: {
    width: '100%', position: 'relative', mb: '10px', filter: 'hue-rotate(100deg)',
    backgroundImage: `url(${inputfield})`,
    backgroundSize: '100% 100%',
    '&>div': { padding: '12px', background: '#ff000000' },
    '&>div>input': { color: 'white', padding: '20px', paddingLeft: '24%' },
    '&>div>div>button>svg': { mr: '20px' },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '@media (min-width: 320px)': {
      '&>div': { padding: '5px', },
    },
    '@media (min-width: 360px)': {
      '&>div': { padding: '8px', },
    },
    '@media (min-width: 400px)': {
      '&>div': { padding: '12px', },
    },
    '@media (min-width: 425px)': {
      '&>div': { padding: '15px', },
    },
  },
  inputimg2: {
    position: 'absolute',
    zIndex: 10,
    width: '30px',
    top: '30%',
    left: '7%',
    fontSize: '35px',
    color: '#bb00006b',
    '@media (min-width: 320px)': {
      left: '6%',
    },
    '@media (min-width: 360px)': {
      left: '7%',
    },
    '@media (min-width: 425px)': {
      left: '7.5%',
      top: '31.5%',
    },
  },
  flexcenterstart: {
    display: 'flex',
    alignItems: 'center',
  },
  flexbetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between;',
  },
  icon: { color: 'red' },
}