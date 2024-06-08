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
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
// import * as uuid from "uuid";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { LoginEmailSchemaValidaton } from "../../../Shared/Validation";
import { zubgmid, zubgtext } from "../../../Shared/color";
import { endpoint } from "../../../services/urls";
import { storeCookies } from "../../../Shared/CookieStorage";
import MarkunreadIcon from '@mui/icons-material/Markunread';
import CryptoJS from "crypto-js";
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';


function LoginWithEmail() {
  // const device_id = uuid.v4();
  const [loding, setloding] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const initialValue = {
    email: "",
    pass: "",
    isAllowCheckBox: false,
    // device_id: device_id || uuid.v4(),
  };

  const fk = useFormik({
    initialValues: initialValue,
    validationSchema: LoginEmailSchemaValidaton,
    onSubmit: () => {
      if (fk.values.pass && (fk.values.mob || fk.values.email)) {
        const reqbody = {
          username: fk.values.email || fk.values.mob,
          password: fk.values.pass,
          // device_id: device_id,
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
      console.log(response);
      if (response?.data?.error === "200") {
        const value = CryptoJS.AES.encrypt(JSON.stringify(response?.data), "anand")?.toString();
        localStorage.setItem("logindataen", value);
        // localStorage.setItem("logindata", JSON.stringify(response?.data));
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

  // const get_user_data = async (id) => {
  //   console.log(id);
  //   try {
  //     const response = await axios.get(
  //       `${endpoint.get_data_by_user_id}?id=${id}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Access-Control-Allow-Origin": "*",
  //         },
  //       }
  //     );
  //     console.log(response, "This is response");
  //     if (response?.data?.error === "200") {
  //       localStorage.setItem(
  //         "aviator_data",
  //         JSON.stringify(response?.data?.data)
  //       );
  //     }
  //     sessionStorage.setItem("isAvailableUser", true);
  //     window.location.reload();
  //   } catch (e) {
  //     toast(e?.message);
  //     console.error(e);
  //   }
  // };

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
      component="form"
      sx={{
        width: "95%",
        marginLeft: "2.5%",
        transition: "0.3s",
      }}
      onSubmit={fk.handleSubmit}
    >
      <Box mt={2}>
        <Box sx={{ ...style.flexcenterstart, my: 1, }}>
          <MarkEmailReadOutlinedIcon sx={style.icon} /> <Typography variant="body1" ml={1} sx={{ color: 'gray' }}>Email </Typography>
        </Box>
        <Box sx={{ ...style.flexbetween, }}>

          <TextField
            sx={{ ...style.normalinput, width: '100%', }}
            ml={2}
            placeholder='please input your email'
            id="email"
            type="email"
            name="email"
            value={fk.values.email}
            onChange={fk.handleChange}
            onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
          />
          <br />
          {fk.touched.email && fk.errors.email && (
            <div className="error">{fk.errors.email}</div>
          )}
        </Box>
      </Box>
      <Box mt={3}>
        <FormControl fullWidth>
          <Box sx={{ ...style.flexcenterstart, mb: 1, }}>
            <HttpsOutlinedIcon sx={style.icon} /> <Typography variant="body1" ml={1}> Password</Typography>
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
                    <VisibilityOff sx={{ color: 'red', fontSize: "25px !important" }} />
                  ) : (
                    <Visibility sx={{ color: 'red', fontSize: "25px !important" }} />
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
      <Stack >
        <NavLink to='/' >
          <Button className='goldbtn' onClick={fk.handleSubmit}>Log in</Button>
        </NavLink>
        <NavLink to='/register'>
          <Button className='goldborderbtn'>Register</Button>
        </NavLink>
      </Stack>
      <CustomCircularProgress isLoading={loding} />
    </Box>
  );
}

export default LoginWithEmail;

const style = {
  flexcenterstart: {
    display: 'flex',
    alignItems: 'center',
  },
  normalinput: {
    borderRadius: '10px',
    backgroundColor: '#ffe5e5',
    '&>div': {
      border: 'none',
      borderRadius: '10px',
      color: 'red',

    },
    '&>div': {
      border: 'none',
      borderRadius: '10px',
      color: 'red'
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
    backgroundColor: '#ffe5e5',
    '&>input': { padding: '10px', color: 'red' },
    '&>fieldset': { border: 'none' },
    // '&>div>button>svg': { padding: '10px', color: 'red' },
    // '&>div>button': { padding: '0px', },
    '&>:hover': {
      backgroundColor: '#ffe5e5', borderRadius: '10px 0px 0px 10px'
    },
  },
  icon: { color: zubgtext },
}