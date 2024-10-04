import { Box, Container, Typography } from "@mui/material";
import CryptoJS from "crypto-js";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import logo from "../../../assets/fun.27036251210ce8ec4ad4.png";
import custom from "../../../assets/custom.png";
// import logo from "../../../assets/loginlogo.png";
import logo from "../../../assets/anandloginlogo.png";
import logbg from "../../../assets/output-onlinepngtools.50540bff27e35c7a58dd.png";
import LoginWithMobile from "../login/LoginWithMobile";

function Login() {
  const navigate = useNavigate();
  const logindata =
    (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
        localStorage.getItem("logindataen"),
        "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
    null;

  useEffect(() => {
    logindata && navigate("/dashboard");
  }, []);

  return (
    <Container
      sx={{
        background: "#0D0335",
        height: "100vh",
        backgroundImage: `url(${logbg})`,
        backgroundSize: "100% 100%",
      }}
    >
      <Box
        sx={{
          width: "95%",
          marginLeft: "2.5%",
          borderRadius: "10px",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box component="img" className="!w-[120%] !h-[120%]" src={logo} sx={style.logocss}></Box>
        </Box>
        {/* <Tab value="two" sx={{ width: "100% !important", }} label={
                <Box sx={{ ...style.flexcoloumcenter, ...style.tabs, }}>
                  <Typography variant="body1" sx={{ color: value === 'two' ? lightyellow : lightblue, fontSize: '14px', }}>Log in with phone</Typography>
                </Box>
              }
              /> */}
        {/* <Box sx={style.authform} component='form'>
          <Box sx={{ width: "100%" }}>
            <Tabs value={value} onChange={handleChange} sx={{ width: "100%", }}>
              <Tab value="two" sx={{ width: "50% !important", }} label={
                <Box sx={{ ...style.flexcoloumcenter, ...style.tabs, }}>
                  <Typography variant="body1" sx={{ color: value === 'two' ? lightyellow : lightblue, fontSize: '14px', }}>Log in with phone</Typography>
                </Box>
              }
              />

              <Tab value="one" sx={{ width: "50% !important" }} label={
                <Box sx={{ ...style.flexcoloumcenter, ...style.tabs, }}>
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
        </Box> */}
        <LoginWithMobile />
      </Box>
      <Box
        sx={{ width: "80%", margin: "auto" }}
        component={NavLink}
        to="/CustomerService"
      >
        <Box
          component="img"
          src={custom}
          sx={{
            width: "50px",
            height: "50px",
            margin: "auto",
            filter: "hue-rotate(60deg)",
          }}
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
  authheader: { background: "#0D0335", py: 1 },
  logocss: { width: "200px", margin: "auto", borderRadius: "5px" },
  flagcss: { width: "30px" },
  icon: { fontSize: "18px", color: "white" },
  authform: { width: "100%" },
  tabs: { width: "100%", "&>p": { textTransform: "none" } },
  checkbox: {
    mt: 1,
    "&>span>svg": { color: "red" },
  },
  loginfooter: { width: "90%", margin: "auto", mt: 5 },
  footericon: { color: "red", fontSize: "30px", mb: 1 },
  flexbetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between;",
  },
  flexcenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  flexcoloumcenter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};
