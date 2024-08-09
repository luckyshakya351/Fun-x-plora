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
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
// import * as uuid from "uuid";
import CryptoJS from 'crypto-js';
import { storeCookies } from "../../../Shared/CookieStorage";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { LoginMobileSchemaValidaton } from "../../../Shared/Validation";
import { lightblue, zubgmid, zubgtext } from "../../../Shared/color";
import { endpoint } from "../../../services/urls";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';


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
        ipAddress:ipAddress
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

      toast.success(response?.data?.msg);
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
      <Box mt={2}>
        <FormControl fullWidth>
          <Box sx={{ ...style.flexcenterstart, my: 1, }}>
            <PhoneAndroidIcon sx={style.icon} /> <Typography variant="body1" ml={1} sx={{ color: 'red' }}> Phone number</Typography>
          </Box>
          <Box sx={{ ...style.flexbetween, }}>
            <Select
              sx={{ ...style.selectinput }}
              mr={2}
              value={CountryCode}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="+91" selected> + 91</MenuItem>
            </Select>

            <TextField
              ml={2}
              id="mob"
              name="mob"
              type="number"
              value={fk.values.mob}
              onChange={fk.handleChange}
              onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
              placeholder='Enter Phone Number'
              sx={{ ...style.normalinput, width: '80%', }}
            />
          </Box>
          {fk.touched.mob && fk.errors.mob ? (
            <div className="error">{fk.errors.mob}</div>
          ) : (
            String(fk.values.mob)?.includes(".") && (
              <div className="error">Dot not allowed in mob no</div>
            )
          )}
        </FormControl>
      </Box>
      <Box mt={3}>
        <FormControl fullWidth>
          <Box sx={{ ...style.flexcenterstart, mb: 1, }}>
            <HttpsOutlinedIcon sx={style.icon} /> <Typography variant="body1" ml={1} sx={{ color: 'red' }}> Password</Typography>
          </Box>
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
          {fk.touched.pass && fk.errors.pass && (
            <div className="error">{fk.errors.pass}</div>
          )}
        </FormControl>
      </Box>
      <Box mt={1}>
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
      </Box>
      <Stack mt={0}>
        <Stack >
          <NavLink to='/' >
            <Button className='goldbtn' onClick={fk.handleSubmit}>Log in</Button>
          </NavLink>
          <NavLink to='/register'>
            <Button className='goldborderbtn'>Register</Button>
          </NavLink>
        </Stack>
      </Stack>
      <CustomCircularProgress isLoading={loding} />
    </Box>
  );
}

export default LoginWithMobile;


const style = {
  flexcenterstart: {
    display: 'flex',
    alignItems: 'center',
  },
  normalinput: {
    borderRadius: '10px',
    backgroundColor: '#fff',
    '&>div': {
      border: 'none',
      borderRadius: '10px',
      color: 'red',

    },
    '&>div': {
      border: 'none',
      borderRadius: '10px',
      color: lightblue
    },
    '&>div>input': {
      padding: '10px !important'
    },
    '&>div>fieldset': {
      border: 'none !important',
      borderRadius: '10px',
      marginLeft: '20px',
    },

  },
  flexbetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between;',
  },
  passwordinput: {
    borderRadius: '10px',
    backgroundColor: '#fff',
    '&>input': { padding: '10px', color: lightblue },
    '&>fieldset': { border: 'none' },
    // '&>div>button>svg': { padding: '10px', color: 'red' },
    // '&>div>button': { padding: '0px', },
    '&>:hover': {
      backgroundColor: '#fff', borderRadius: '10px 0px 0px 10px'
    },
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