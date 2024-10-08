import MarkEmailReadIcon from "@mui/icons-material/MarkEmailReadOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PhonelinkLockIcon from "@mui/icons-material/PhonelinkLock";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Checkbox,
  Container,
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
import CryptoJS from "crypto-js";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { storeCookies } from "../../../Shared/CookieStorage";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { signupSchemaValidataon } from "../../../Shared/Validation";
import { lightblue, zubgtext } from "../../../Shared/color";
// import logo from "../../../assets/images/fun.jpg";
import logo from "../../../assets/loginlogo.png";
import { CandidateNameFn } from "../../../services/apicalling";
import { endpoint } from "../../../services/urls";
import logbg from "../../../assets/output-onlinepngtools.50540bff27e35c7a58dd.png";
import HowToRegIcon from "@mui/icons-material/HowToReg";

function Register() {
  const url = new URL(window.location.href);
  const [refParam, setrefParam] = useState(url.searchParams.get("ref") || "");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [show_confirm_password, set_show_confirm_password] =
    React.useState(false);
  const [loding, setloding] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handle_confirm_ClickShowPassword = () =>
    set_show_confirm_password(!show_confirm_password);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // useEffect(() => {
  //   const value =
  //     url.searchParams.get("ref") &&
  //     crypto.AES.decrypt(
  //       url.searchParams.get("ref")?.split(" ")?.join("+"),
  //       "anand"
  //     )?.toString(crypto.enc.Utf8);
  //   setrefParam(value);
  // }, [url.searchParams.get("ref")]);

  const initialValue = {
    email: "",
    mobile: "",
    name: "",
    password: "",
    confirmed_password: "",
    // referral_code: refParam?.substring(1, refParam.length - 1) || "",
    referral_code: refParam,
  };

  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    validationSchema: signupSchemaValidataon,
    onSubmit: () => {
      if (fk.values.password !== fk.values.confirmed_password)
        return toast("Password and confirm password should be same.");
      if (!fk.values.privacy_policy)
        return toast("Please confirm the privacy policy.");
      const reqbody = {
        email: fk.values.email || "",
        mobile: String(fk.values.mobile) || "",
        password: fk.values.password,
        confirmed_password: fk.values.confirmed_password,
        referral_code: fk.values.referral_code,
        name: fk.values.name,
        privacy_policy: false,
      };

      signupFunction(reqbody);
    },
  });

  const signupFunction = async (reqbody) => {
    // setloding(true);
    const fd = new FormData();
    fd.append("email", reqbody.email);
    fd.append("mobile", reqbody.mobile);
    fd.append("name", reqbody.name);
    fd.append("password", reqbody.password);
    fd.append("confirmed_password", reqbody.confirmed_password);
    fd.append("referral_code", reqbody.referral_code);

    try {
      const response = await axios.post(endpoint.signup, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          // Add any other headers you may need, such as authorization
        },
      });
      if (response?.data?.status === "200") {
        const value = CryptoJS.AES.encrypt(
          JSON.stringify(response?.data),
          "anand"
        ).toString();
        localStorage.setItem("logindataen", value);
        sessionStorage.setItem("isAvailableUser", true);
        sessionStorage.setItem("isAvailableCricketUser", true);
        storeCookies();
        swal({
          title: "Registration Successfully",
          text: ` 
          Mobile : ${fk?.values?.mobile}
          Password : ${fk?.values?.password} `,
          // title: response?.data?.msg,
          icon: "success",
          button: "OK",
        }).then(() => {
          navigate("/dashboard");
          document.location.reload();
        });
      } else {
        swal({
          title: "Registration Failed",
          text: response?.data?.msg,
          icon: "error",
          button: "OK",
        });
        setloding(false);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const { isLoading, data } = useQuery(
    ["getname", fk.values.referral_code],
    () => CandidateNameFn({ reffral_id: fk.values.referral_code }),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const result = data?.data?.data;

  return (
    <Container
      sx={{
        background: "#0D0335",
        height: "100%",
        backgroundImage: `url(${logbg})`,
        backgroundSize: "100% 100%",
      }}
    >
      <Box sx={style.authheader}>
        <Box
          sx={{
            width: "90%",
            marginLeft: "5%",
            borderRadius: "10px",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box component="img" src={logo} sx={style.logocss}></Box>
          </Box>
        </Box>
      </Box>
      <Box sx={style.authform} component="form">
        <Box sx={{ ...style.flexcoloumcenter, ...style.registerheader }}>
          <PhoneAndroidIcon sx={{ color: zubgtext }} />
          <Typography variant="body1" sx={{ color: zubgtext }}>
            Register your phone
          </Typography>
        </Box>
      </Box>
      <Box
        component="form"
        sx={{
          width: "90%",
          marginLeft: "5%",
          pb: 5,
          transition: "0.3s",
        }}
        onSubmit={fk.handleSubmit}
      >
        <Box mt={0}>
          <FormControl fullWidth>
            <Box sx={{ ...style.flexcenterstart, mb: 1 }}>
              <PersonOutlineIcon sx={style.icon} />{" "}
              <Typography variant="body1" ml={1} sx={{ color: "#63BA0E" }}>
                Name
              </Typography>
            </Box>
            <TextField
              id="name"
              placeholder="Enter Name"
              sx={{ ...style.normalinput }}
              name="name"
              type="text"
              value={fk.values.name}
              onChange={fk.handleChange}
              onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
            />
            {fk.touched.name && fk.errors.name && (
              <div className="error">{fk.errors.name}</div>
            )}
          </FormControl>
        </Box>

        <FormControl fullWidth>
          <Box sx={{ ...style.flexcenterstart, mt: 2, mb: 1 }}>
            <PhoneAndroidIcon sx={style.icon} />{" "}
            <Typography variant="body1" ml={1} sx={{ color: "#63BA0E" }}>
              {" "}
              Phone number
            </Typography>
          </Box>
          <Box sx={{ ...style.flexbetween }}>
            <TextField
              sx={{ ...style.normalinput, width: "100%" }}
              ml={2}
              id="mob"
              name="mobile"
              type="number"
              value={fk.values.mobile}
              onChange={fk.handleChange}
              onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
              placeholder="Enter Phone Number"
            />
          </Box>
          {fk.touched.mobile && fk.errors.mobile && (
            <div className="error">{fk.errors.mobile}</div>
          )}
        </FormControl>

        {/* <Box>
          <FormControl fullWidth>
            <Box sx={{ ...style.flexcenterstart, mt: 2, mb: 1 }}>
              <MarkEmailReadIcon sx={style.icon} />{" "}
              <Typography variant="body1" ml={1} sx={{ color: "#63BA0E" }}>
                E-mail
              </Typography>
            </Box>
            <TextField
              id="fullWidth"
              type="email"
              placeholder="Enter email"
              sx={{ ...style.normalinput }}
              name="email"
              value={fk.values.email}
              onChange={fk.handleChange}
              onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
            />
            {fk.touched.email && fk.errors.email && (
              <div className="error">{fk.errors.email}</div>
            )}
          </FormControl>
        </Box> */}
        <Box mt={2}>
          <FormControl fullWidth>
            <Box sx={{ ...style.flexcenterstart, mt: 2, mb: 1 }}>
              <PhonelinkLockIcon sx={style.icon} />{" "}
              <Typography variant="body1" ml={1} sx={{ color: "#63BA0E" }}>
                Set password
              </Typography>
            </Box>
            <OutlinedInput
              placeholder="Enter password"
              name="password"
              sx={{ ...style.passwordinput }}
              value={fk.values.password}
              onChange={fk.handleChange}
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
                    {showPassword ? (
                      <VisibilityOff sx={{ color: zubgtext }} />
                    ) : (
                      <Visibility sx={{ color: zubgtext }} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            {fk.touched.password && fk.errors.password && (
              <div className="error">{fk.errors.password}</div>
            )}
          </FormControl>
        </Box>
        <Box mt={2}>
          <FormControl fullWidth>
            <Box sx={{ ...style.flexcenterstart, mt: 2, mb: 1 }}>
              <PhonelinkLockIcon sx={style.icon} />{" "}
              <Typography variant="body1" ml={1} sx={{ color: "#63BA0E" }}>
                Confirm password
              </Typography>
            </Box>
            <OutlinedInput
              sx={{ ...style.passwordinput }}
              name="confirmed_password"
              id="confirmed_password"
              value={fk.values.confirmed_password}
              onChange={fk.handleChange}
              onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
              placeholder="Enter confirm password"
              type={show_confirm_password ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handle_confirm_ClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {show_confirm_password ? (
                      <VisibilityOff sx={{ color: zubgtext }} />
                    ) : (
                      <Visibility sx={{ color: zubgtext }} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            {fk.touched.confirmed_password && fk.errors.confirmed_password && (
              <div className="error">{fk.errors.confirmed_password}</div>
            )}
          </FormControl>
        </Box>
        <Box mt={2}>
          <FormControl fullWidth>
            <Box sx={{ ...style.flexcenterstart, mt: 2, mb: 1 }}>
              <ReceiptIcon sx={style.icon} />{" "}
              <Typography variant="body1" ml={1} sx={{ color: "#63BA0E" }}>
                Referral Code
              </Typography>
            </Box>
            <TextField
              id="referral_code"
              placeholder="Enter Referral Code"
              sx={{ ...style.normalinput }}
              name="referral_code"
              value={fk.values.referral_code}
              onChange={fk.handleChange}
              onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
            />
            {fk.touched.referral_code && fk.errors.referral_code ? (
              <div className="error">{fk.errors.referral_code}</div>
            ) : fk.values.referral_code ? (
              result ? (
                <div className="no-error">Referral From: {result}</div>
              ) : (
                <div className="error">Invalid Referral Id</div>
              )
            ) : null}
          </FormControl>
        </Box>
        <Box mt={1}>
          <FormControl fullWidth>
            <FormControlLabel
              required
              control={
                <Checkbox
                  checked={fk.values.privacy_policy}
                  sx={{
                    color: "white !important",
                    fontSize: "12px",
                    fontWeight: "500",
                    "&>label>div>span": { color: "white !important" },
                  }}
                  onClick={() =>
                    fk.setFieldValue(
                      "privacy_policy",
                      !fk.values.privacy_policy
                    )
                  }
                />
              }
              label={
                <span style={{ color: "white", fontSize: "12px" }}>
                  I have read and agree to the{" "}
                  <a
                    rel="noopener noreferrer"
                    style={{ color: "white", textDecoration: "underline" }}
                  >
                    Privacy Agreement
                  </a>
                </span>
              }
            />
          </FormControl>
        </Box>
        <Stack direction="row" justifyContent={"space-between"} mt={2}>
          <Box
            component={NavLink}
            to="/"
            sx={{
              width: "48%",
            }}
          >
            <a class="playstore-button" href="#">
              <HowToRegIcon />
              <span class="texts">
                <span class="text-1">Back to</span>
                <span class="text-2">Login </span>
              </span>
            </a>
          </Box>
          <button class="cssbuttons-io-button" onClick={fk.handleSubmit}>
            Register
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
        </Stack>
      </Box>
      <CustomCircularProgress isLoading={loding} />
    </Container>
  );
}

export default Register;

const style = {
  flexcenterstart: {
    display: "flex",
    alignItems: "center",
  },
  normalinput: {
    borderRadius: "10px",
    backgroundColor: "#fff",
    "&>div": {
      border: "none",
      borderRadius: "10px",
      color: "red",
    },
    "&>div": {
      border: "none",
      borderRadius: "10px",
      color: "#63BA0E",
    },
    "&>div>input": {
      padding: "10px !important",
    },
    "&>div>fieldset": {
      border: "none !important",
      borderRadius: "10px",
      marginLeft: "20px",
    },
  },
  flexbetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between;",
  },
  passwordinput: {
    borderRadius: "10px",
    backgroundColor: "#fff",
    "&>input": { padding: "10px", color: lightblue },
    "&>fieldset": { border: "none" },
    // '&>div>button>svg': { padding: '10px', color: 'red' },
    // '&>div>button': { padding: '0px', },
    "&>:hover": {
      backgroundColor: "#fff",
      borderRadius: "10px 0px 0px 10px",
    },
  },
  icon: { color: zubgtext },
  logocss: { width: "200px", margin: "auto", borderRadius: "5px" },
  flexcoloumcenter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  authform: { width: "100%", pb: 2 },
  registerheader: { borderBottom: `2px solid ${zubgtext}` },
  "&>p": { color: `${zubgtext} !important`, fontSize: "18px", mt: 1 },
  selectinput: {
    width: "18%",
    borderRadius: "10px",
    backgroundColor: "#fff",
    "&>div": {
      border: "none",
      borderRadius: "10px",
      color: "#63BA0E",
      padding: "10px 0px 10px 5px !important",
    },
    "&>fieldset": {
      border: "none !important",
      borderRadius: "10px",
      marginLeft: "20px",
    },
  },
  passwordinput: {
    borderRadius: "10px",
    backgroundColor: "#fff",
    "&>input": { padding: "10px", color: "#63BA0E" },
    "&>fieldset": { border: "none" },
    "&>:hover": {
      backgroundColor: "#fff",
      borderRadius: "10px 0px 0px 10px",
    },
  },
};
