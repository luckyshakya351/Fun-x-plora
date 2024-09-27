import HistoryIcon from "@mui/icons-material/History";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Button,
  Container,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as React from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import {
  zubgback,
  zubgbackgrad,
  zubgmid,
  zubgtext,
} from "../../../Shared/color";
import payment from "../../../assets/images/banking.png";
import Layout from "../../../component/Layout/Layout";
import { endpoint } from "../../../services/urls";
import theme from "../../../utils/theme";
function BlockUser() {
  const [user_data, setUser_Data] = React.useState({
    password: "",
  });
  const [loding, setloding] = React.useState(false);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const initialValues = {
    new_pass: "",
  };
  const fk = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      const reqbody = {
        pass: fk.values.new_pass,
        user_id: user_data?.id,
      };
      if (reqbody.user_id === "" || reqbody.user_id === 0) {
        return toast("user not fount");
      } else addbankDetailsFunction(reqbody);
    },
  });

  const addbankDetailsFunction = async (fd) => {
    setloding(true);
    try {
      const response = await axios.post(`${endpoint.change_user_pass}`, fd);
      toast(response?.data?.msg);
      setUser_Data(0);
      fk.handleReset();
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
    setloding(false);
  };
  const getUserId = async (mob) => {
    setloding(true);

    try {
      const response = await axios.post(`${endpoint.get_user_id}`, mob);
      setUser_Data(response?.data?.msg);
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
    setloding(false);
  };
  return (
    <Layout>
      <Container
        className="no-scrollbar"
        sx={{
          background: theme.palette.secondary.main,
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 4,
        }}
      >
        <CustomCircularProgress isLoading={loding} />
        <Box sx={style.header}>
          <Box component={NavLink} onClick={goBack}>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1" sx={{ color: "white" }}>
            Change Password
          </Typography>
          <Box
            component={NavLink}
            to="/add-bank-details/pre-added-bank-details"
          >
            <HistoryIcon />
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              padding: "10px",
              width: "95%",
              margin: "auto",
              mt: "20px",
              borderRadius: "10px",
              mb: 5,
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center", mb: "20px" }}>
              <Box
                component="img"
                src={payment}
                width={30}
                sx={{ filter: "hue-rotate(136deg)" }}
              ></Box>
              <Typography
                variant="body1"
                color="initial"
                sx={{ fontSize: "15px ", color: "white", ml: "10px" }}
              >
                Enter User Details
              </Typography>
            </Stack>
            <Box mt={2}>
              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3" sx={{ color: "white" }}>
                    Enter Mobile No <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  id="mobile_no"
                  name="mobile_no"
                  type="number"
                  value={fk.values.mobile_no}
                  onChange={fk.handleChange}
                  placeholder="Enter Mobile No *"
                  className="withdrawalfield2"
                />
              </FormControl>
              <Button
                className="!mt-2 w-full  !bg-green-400 !text-white"
                onClick={() =>
                  getUserId({
                    mobile_no: fk.values.mobile_no,
                  })
                }
              >
                View Details
              </Button>
              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3" sx={{ color: "white" }}>
                    Current Password <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <p className="withdrawalfield2 !text-white ">
                  {user_data?.password}
                </p>
              </FormControl>

              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3" sx={{ color: "white" }}>
                    Enter New Password <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  id="new_pass"
                  name="new_pass"
                  type="text"
                  value={fk.values.new_pass}
                  onChange={fk.handleChange}
                  placeholder="Enter New Password"
                  className="withdrawalfield2"
                />
              </FormControl>
              <Button sx={style.paytmbtntwo} onClick={fk.handleSubmit}>
                Submit{" "}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export default BlockUser;

const style = {
  header: {
    padding: "10px 8px",
    background: zubgtext,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "20px",
      fontWeight: "600",
      textAlign: "center",
      color: "white",
    },
    "& > a > svg": {
      color: "white",
      fontSize: "35px",
    },
  },
  wthui: {
    textAlign: "center",
    width: "32%",
    minHeight: "15vh",
    background: zubgmid,
    borderRadius: "10px",
    mb: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&>div>p": { color: "white" },
  },
  paymentlink: {
    width: "32%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "15vh",
    background: zubgmid,
    borderRadius: "10px",
    mb: "10px",
    "&>p": {
      color: zubgtext,
      fontSize: "12px",
      fontWeight: "500",
      textAlign: "center",
      mt: "5px",
    },
  },
  paymentBoxOuter: {
    width: "95%",
    margin: "auto",
    my: "10px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paytmbtn: {
    mb: 2,
    background: zubgback,
    color: "white !important",
    width: "31%",
    border: "1px solid white",
    padding: "10px",
    "&:hover": { background: zubgbackgrad, border: "1px solid transparent" },
  },
  paytmbtntwo: {
    borderRadius: "5px",
    textTransform: "capitalize",
    mb: 2,
    background: zubgtext,
    color: "white !important",
    width: "100%",
    mt: "20px",
    border: "1px solid white",
    padding: "10px",
    "&:hover": { background: zubgtext, border: "1px solid transparent" },
  },
  rechargeinstext: {
    mb: "10px",
    alignItems: "center",
    justifyContent: "start",
    "&>p": { marginLeft: "10px", color: "white !important", fontSize: "14px" },
  },
};
