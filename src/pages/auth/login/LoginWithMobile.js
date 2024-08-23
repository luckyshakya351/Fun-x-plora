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
  Typography
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
// import * as uuid from "uuid";
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CryptoJS from 'crypto-js';
import { storeCookies } from "../../../Shared/CookieStorage";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { LoginMobileSchemaValidaton } from "../../../Shared/Validation";
import { lightblue, zubgtext } from "../../../Shared/color";
import inputfield from '../../../assets/inputfield.a3159d8d15fb018d06f4.png';
import { endpoint } from "../../../services/urls";
import HowToRegIcon from '@mui/icons-material/HowToReg';


function LoginWithMobile() {
  // const device_id = uuid.v4();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loding, setloding] = useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [ipAddress, setIpAddress] = useState('');
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
    mob: "",
    pass: "",
    isAllowCheckBox: false,
    // device_id: device_id || uuid.v4(),
  };

  const fk = useFormik({
    initialValues: initialValue,
    validationSchema: LoginMobileSchemaValidaton,
    onSubmit: () => {
      const reqbody = {
        username: fk.values.mob,
        password: fk.values.pass,
        ipAddress: ipAddress
        // device_id: device_id,
      };
      loginFunction(reqbody);
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

      toast.success(response?.data?.msg,{
        id:1
      });
      if (response?.data?.msg === "Login Successfully") {
        const value = CryptoJS.AES.encrypt(JSON.stringify(response?.data), "anand")?.toString();
        localStorage.setItem("logindataen", value);
        sessionStorage.setItem("isAvailableUser", true);
        sessionStorage.setItem("isAvailableCricketUser", true);
        // get_user_data(response?.data?.UserID);
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


  const [CountryCode, setCountryCode] = React.useState('+91');


  const handleChange = (event) => {
    setCountryCode(event.target.value);
  };


  const get_user_data = async (id) => {
    try {
      const response = await axios.get(
        `${endpoint.get_data_by_user_id}?id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response?.data?.error === "200") {
        localStorage.setItem(
          "aviator_data",
          JSON.stringify(response?.data?.data)
        );
        sessionStorage.setItem("isAvailableUser", true);
      }
    } catch (e) {
      toast(e?.message);
      console.error(e);
    }


  };

  return (
    <Box
      component="form"
      sx={{
        width: "95%",
        marginLeft: "2.5%",
        transition: "0.3s",
      }}
      onSubmit={fk.handleSubmit}
    >
      <Box mt={5} mb={3}>
        <FormControl fullWidth>

          <Box sx={{ ...style.flexbetween, }}>
            <FormControl sx={style.inputfield2} fullWidth>
              <PhoneAndroidIcon sx={style.inputimg2} />
              <TextField
                ml={2}
                id="mob"
                name="mob"
                type="number"
                value={fk.values.mob}
                onChange={fk.handleChange}
                onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                placeholder='Enter Phone Number'
              />
            </FormControl>
          </Box>
          {fk.touched.mob && fk.errors.mob ? (
            <div className="error" style={{ textAlign: 'center' }}>{fk.errors.mob}</div>
          ) : (
            String(fk.values.mob)?.includes(".") && (
              <div className="error" style={{ textAlign: 'center' }}>Dot not allowed in mob no</div>
            )
          )}
        </FormControl>
      </Box>
      <Box mt={3} >
        <FormControl fullWidth sx={style.passwordfield2}>
          <HttpsOutlinedIcon sx={style.inputimg2} />
          <OutlinedInput
            id="pass"
            name="pass"
            value={fk.values.pass}
            onChange={fk.handleChange}
            placeholder="Enter password"
            onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
            sx={{ ...style.passwordinput, width: '100%', }}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ color: lightblue }} />
                  ) : (
                    <Visibility sx={{ color: lightblue }} />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      {fk.touched.pass && fk.errors.pass && (
        <div className="error" style={{ textAlign: 'center' }}>{fk.errors.pass}</div>
      )}
      {/* <Box mt={1}>
        <FormControl fullWidth>
          <FormControlLabel
            required
            onClick={() =>
              fk.setFieldValue("isAllowCheckBox", !fk.values.isAllowCheckBox)
            }
            control={
              <Checkbox
                checked={fk.values.isAllowCheckBox}
                sx={{ color: zubgtext }}
              />
            }
            label="Remember password"
            sx={{ color: zubgtext, fontSize: '12px', fontWeight: '500' }}
          />
        </FormControl>
      </Box> */}
      <Stack direction='row' justifyContent={'space-between'} mt={3}>
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
    </Box>
  );
}

export default LoginWithMobile;


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
  icon: { color: zubgtext },
  selectinput: {
    width: '18%',
    borderRadius: '10px',
    backgroundColor: '#fff',
    '&>div': {
      border: 'none',
      borderRadius: '10px',
      color: lightblue,
      padding: '10px 0px 10px 5px !important'
    },
    '&>fieldset': {
      border: 'none !important',
      borderRadius: '10px',
      marginLeft: '20px',
    },

  },
}