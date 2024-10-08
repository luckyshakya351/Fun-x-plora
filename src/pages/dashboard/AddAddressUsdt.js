import HistoryIcon from "@mui/icons-material/History";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Button,
  Container,
  FormControl,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as React from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import {
  zubgback,
  zubgbackgrad,
  zubgmid,
  zubgshadow,
  zubgtext,
} from "../../Shared/color";
import Layout from "../../component/Layout/Layout";
import { endpoint } from "../../services/urls";
import CryptoJS from "crypto-js";
import { useQueryClient } from "react-query";
import theme from "../../utils/theme";

function AddAddressUsdt() {
  const login_data =
    (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
        localStorage.getItem("logindataen"),
        "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
    null;

  const user_id = login_data && JSON.parse(login_data)?.UserID;
  const client = useQueryClient();
  const [lodint, setloding] = React.useState(false);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const initialValues = {
    address: "",
    coin_type: 1,
  };
  const fk = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      if (!fk.values.address) {
        toast.error("Please Enter Address field");
        return;
      }
      const reqbody = {
        address: fk.values.address,
        m_u_id: user_id,
        coin_type: fk.values.coin_type,
      };
      withdraw_request_Function(reqbody);
    },
  });
  const withdraw_request_Function = async (reqbody) => {
    setloding(true);
    try {
      const response = await axios.post(
        `${endpoint.withdrawal_address_usdt}`,
        reqbody
      );
      if (response) {
        toast.success(response?.data?.msg);
        fk.handleReset();
        client.refetchQueries("address_list_details");
        navigate("/Withdrawalusdt");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      console.error(error);
    }
    setloding(false);
  };
  return (
    <Layout>
      <Container
        className="no-scrollbar"
        sx={{
          background: zubgback,
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 4,
        }}
      >
        {/* <CustomCircularProgress isLoading={isLoading || lodint} /> */}
        <Box sx={style.header}>
          <Box component={NavLink} onClick={goBack}>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1" color="initial">
            Add USDT Address
          </Typography>
          <Box component={NavLink} to="/withdravalHistory">
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
              background: theme.palette.secondary.dark,
              boxShadow: zubgshadow,
              borderRadius: "10px",
              mb: 5,
            }}
          >
            <Box mt={2}>
              <Stack direction="row" sx={{ alignItems: "center", mb: "20px" }}>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "15px ", ml: "10px", color: "white" }}
                >
                  To Ensure the safety of your funds , please link your wallet
                </Typography>
              </Stack>

              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3" sx={{ color: zubgtext }}>
                    Select Main Network <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  id="coin_type"
                  name="coin_type"
                  value={fk.values.coin_type}
                  onChange={fk.handleChange}
                  placeholder="Select Coin Type"
                  className="!w-[100%] !bg-white !text-black !mt-5"
                  select
                  size="small"
                >
                  <MenuItem className="!text-[#8f5206] " key={1} value={1}>
                    USDT BEP20
                  </MenuItem>
                  <MenuItem className="!text-[#8f5206] " key={2} value={2}>
                    USDT TRC20
                  </MenuItem>
                </TextField>
              </FormControl>

              <FormControl fullWidth sx={{ mt: "10px" }} className="!mt-10">
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3" sx={{ color: zubgtext }}>
                    USDT Address <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  id="address"
                  name="address"
                  type="text"
                  value={fk.values.address}
                  onChange={fk.handleChange}
                  placeholder="Please Enter the USDT Address *"
                  className="withdrawalfield"
                />
              </FormControl>
              <Button
                className="!mt-10"
                sx={style.paytmbtntwo}
                type="submit"
                onClick={(e) => {
                  fk.handleSubmit();
                }}
              >
                Save{" "}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export default AddAddressUsdt;

const style = {
  header: {
    padding: "15px 8px",
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
      color: "white",
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
    "&:hover": { background: zubgbackgrad, border: "1px solid transparent" },
  },
  rechargeinstext: {
    mb: "10px",
    alignItems: "center",
    justifyContent: "start",
    "&>p": { marginLeft: "10px", color: "white !important", fontSize: "14px" },
  },
};
