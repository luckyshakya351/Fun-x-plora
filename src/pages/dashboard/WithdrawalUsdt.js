import CachedIcon from "@mui/icons-material/Cached";
import HistoryIcon from "@mui/icons-material/History";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Button,
  Container,
  Dialog,
  FormControl,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useFormik } from "formik";
import * as React from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../Shared/CustomCircularProgress";
import {
  zubgback,
  zubgbackgrad,
  zubgmid,
  zubgshadow,
  zubgtext,
} from "../../Shared/color";
import payment from "../../assets/check.png";
import cip from "../../assets/cip.png";
import balance from "../../assets/images/send.png";
import audiovoice from "../../assets/images/withdrawol_voice.mp3";
import Layout from "../../component/Layout/Layout";
import { AddressListDetails, NeedToBet } from "../../services/apicalling";
import { endpoint, rupees } from "../../services/urls";
import theme from "../../utils/theme";
function WithdrawalUsdt() {
  const location = useLocation();
  // const dispatch = useDispatch();
  // const aviator_login_data = useSelector(
  //   (state) => state.aviator.aviator_login_data
  // );
  const { type } = location.state || {};
  const login_data =
    (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
        localStorage.getItem("logindataen"),
        "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
    null;
  const user_id = login_data && JSON.parse(login_data)?.UserID;
  const [amount, setAmount] = React.useState({
    wallet: 0,
    winning: 0,
    cricket_wallet: 0,
  });
  const [lodint, setloding] = React.useState(false);
  const audioRefMusic = React.useRef(null);
  const [openDialogBox, setOpenDialogBox] = React.useState(false);
  const [msg, setMsg] = React.useState(
    "Your withdrawl amount will be add in your bank account within 24 Hrs."
  );

  // React.useEffect(() => {
  //   !aviator_login_data && get_user_data_fn(dispatch);
  // }, []);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const { isLoading: loding, data: need_to_bet } = useQuery(
    ["need_to_bet"],
    () => NeedToBet(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const walletamountFn = async () => {
    try {
      const response = await axios.get(
        `${endpoint.userwallet}?userid=${user_id}`
      );

      setAmount(response?.data?.data);
      // console.log(response,"response")
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };

  React.useEffect(() => {
    walletamountFn();
  }, []);
  const { isLoading, data } = useQuery(
    ["address_list_details"],
    () => AddressListDetails(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const result = React.useMemo(() => data?.data?.data, [data]);

  const initialValues = {
    amount: 920,
    withdrawal_add: "Select Address",
    select_wallet: "Select Wallet",
  };

  const fk = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: () => {
      if (fk.values.withdrawal_add === "Select Address")
        return toast("Select Address ");
      if (
        Number(fk.values.amount) < 92 * 10 ||
        Number(fk.values.amount) > 500 * 92
      )
        return toast("Amount shoulb be minimum $10 and maximum $500");

      if (fk.values.select_wallet === "Select Wallet")
        return toast("Select Wallet ");

      const reqbody = {
        m_u_id: user_id,
        withdrawal_add: fk.values.withdrawal_add,
        m_w_amount: fk.values.amount,
        select_wallet: fk.values.select_wallet,
      };
      // console.log(reqbody)
      withdraw_payment_Function(reqbody);
    },
  });

  const withdraw_payment_Function = async (reqbody) => {
    setloding(true);
    try {
      const response = await axios.post(
        `${endpoint.withdrawal_request_usdt}`,
        reqbody
      );
      if (response?.data?.msg === "Record save successfully") {
        walletamountFn();
        fk.handleReset();
        setOpenDialogBox(true);
      } else {
        fk.handleReset();
        setOpenDialogBox(true);
        setMsg(response?.data?.msg);
      }
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
    setloding(false);
  };

  return (
    <Layout>
      {React.useMemo(() => {
        return (
          <audio ref={audioRefMusic} hidden>
            <source src={`${audiovoice}`} type="audio/mp3" />
          </audio>
        );
      }, [])}

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
        <CustomCircularProgress isLoading={isLoading || lodint} />
        <Box sx={style.header}>
          <Box component={NavLink} onClick={goBack}>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1">Withdrawal</Typography>
          <Box component={NavLink} to="/Withdrawalusdthistory">
            <HistoryIcon />
          </Box>
        </Box>
        <Box
          sx={{
            borderRadius: "10px",
            padding: "30px 20px",
            width: "95%",
            margin: "auto",
            position: "relative",
            background: theme.palette.secondary.light,
            mt: 3,
          }}
        >
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              position: "relative",
              zIndex: 10,
            }}
          >
            <Box component="img" src={balance} width={50}></Box>
            <Typography
              variant="body1"
              sx={{
                fontSize: "16px ",
                fontWeight: 500,
                color: "white",
                ml: "10px",
              }}
            >
              {" "}
              Balance
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ alignItems: "center", mt: "10px" }}>
            <Typography
              variant="body1"
              sx={{
                fontSize: "30px ",
                fontWeight: "600",
                color: "white",
                mr: "10px",
                position: "relative",
                zIndex: 10,
              }}
            >
              ₹{" "}
              {type
                ? Number(amount?.cricket_wallet || 0).toFixed(2)
                : Number(
                    Number(amount?.wallet || 0) + Number(amount?.winning || 0)
                  )?.toFixed(2)}
            </Typography>
            <CachedIcon
              sx={{
                color: "white",
                position: "relative",
                zIndex: 10,
              }}
            />
          </Stack>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              mt: "20px",
              position: "relative",
              zIndex: 10,
            }}
          >
            <Box
              component="img"
              src={cip}
              width={50}
              sx={{
                position: "relative",
                zIndex: 10,
              }}
            ></Box>
            <Typography
              variant="body1"
              sx={{
                fontSize: "14px ",
                color: "white",
                ml: "10px",
                position: "relative",
                zIndex: 10,
              }}
            >
              **** **** **** ****
            </Typography>
          </Stack>
        </Box>
        <Box>
          <Box
            sx={{
              padding: "10px",
              width: "95%",
              margin: "auto",
              mt: "20px",
              background: theme.palette.secondary.light,
              boxShadow: zubgshadow,
              borderRadius: "10px",
              mb: 5,
            }}
          >
            <Box mt={2}>
              <div className="  my-2 mb-4">
                <p
                  style={{ color: theme.palette.primary.main }}
                  className="!text-center !p-4  cursor-pointer  border border-dashed border-gray-400"
                  onClick={() => navigate("/addadressusdt")}
                >
                  {" "}
                  + Add Address
                </p>
              </div>
              <Stack direction="row" sx={{ alignItems: "center", mb: "20px" }}>
                <Box component="img" src={payment} width={30}></Box>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "15px ", color: "white", ml: "10px" }}
                >
                  Select Amount of USDT
                </Typography>
              </Stack>

              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3" sx={{ color: "white" }}>
                    Select address <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  select
                  id="withdrawal_add"
                  name="withdrawal_add"
                  value={fk.values.withdrawal_add}
                  onChange={fk.handleChange}
                  className="withdrawalfield"
                  placeholder="abcd"
                  InputProps={{
                    style: {
                      color: "white",
                      background: "#605A7A",
                      borderRadius: "10px",
                    },
                  }}
                >
                  <MenuItem value={"Select Address"}>Select Address</MenuItem>
                  {result?.map((i, index) => {
                    return (
                      <MenuItem value={i?.usdt_address}>
                        {i?.usdt_address}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </FormControl>
              <Box>
                <FormControl fullWidth sx={{ mt: "10px" }}>
                  <Stack direction="row" className="loginlabel">
                    <Typography variant="h3" sx={{ color: "white" }}>
                      Select Wallet <span className="!text-red-600">*</span>
                    </Typography>
                  </Stack>
                  <TextField
                    select
                    id="select_wallet"
                    name="select_wallet"
                    value={fk.values.select_wallet}
                    onChange={fk.handleChange}
                    className="withdrawalfield"
                    //   onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                    InputProps={{
                      style: {
                        color: "white",
                        background: "#605A7A",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <MenuItem value={"Select Wallet"}>Select Wallet</MenuItem>
                    <MenuItem value="Working Wallet">Working Wallet</MenuItem>
                    <MenuItem value="Main Wallet">Main Wallet</MenuItem>
                  </TextField>
                </FormControl>
              </Box>
              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3" sx={{ color: "white" }}>
                    Enter amount <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  id="amount"
                  name="amount"
                  type="number"
                  value={fk.values.amount}
                  onChange={fk.handleChange}
                  placeholder="Enter amount *"
                  className="withdrawalfield"
                  //   onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3" sx={{ color: "white" }}>
                    Enter USDT <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  type="number"
                  value={Number(Number(fk.values.amount) / 92)?.toFixed(4)}
                  placeholder=" 00000 "
                  className="withdrawalfield"
                />
              </FormControl>

              <Button
                sx={style.paytmbtntwo}
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  fk.handleSubmit();
                }}
              >
                Withdrawal{" "}
              </Button>
            </Box>
          </Box>
          <Box
            mt={3}
            sx={{
              padding: "10px",
              width: "95%",
              margin: "auto",
              mt: "20px",
              background: "#605A7A",
              boxShadow: zubgshadow,
              borderRadius: "10px",
              mb: 5,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              mt={1}
              className="!text-bold "
            >
              {fk.values.select_wallet === "Working Wallet" && (
                <Typography
                  variant="body1"
                  sx={{ color: "white" }}
                  className="!text-xs"
                >
                  * Maximum Amount{" "}
                  <span className="!text-green-500">
                    {rupees} {Number(need_to_bet?.data?.Remening_Amount) || 0}
                  </span>{" "}
                  can be withdrawl from working wallet.
                </Typography>
              )}
              {fk.values.select_wallet === "Main Wallet" && (
                <Typography
                  variant="body1"
                  sx={{ color: "white" }}
                  className="!text-xs"
                >
                  * You need to bet{" "}
                  <span className="!text-green-500">
                    {rupees} {need_to_bet?.data?.Remening_Amount || 0}
                  </span>{" "}
                  for withdrawal.
                </Typography>
              )}
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              mt={1}
              className="!text-bold !text-xl"
            >
              <Typography
                variant="body1"
                className="!text-xs"
                sx={{ color: "white" }}
              >
                * Withdraw time{" "}
              </Typography>
              <Typography
                className=" !text-xs"
                variant="body1"
                sx={{
                  mx: 0.5,
                  color: "#62B90E !important",
                }}
              >
                00:00-23:50.{" "}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              mt={1}
              className="!text-bold !text-xl"
            >
              <Typography
                variant="body1"
                sx={{ color: "white" }}
                className="!text-xs"
              >
                * Withdraw Amount
              </Typography>
              <Typography
                className=" !text-xs"
                variant="body1"
                sx={{
                  color: "#62B90E !important",
                  mx: 0.5,
                }}
              >
                $10.00 - $500.00 .{" "}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" mt={1}>
              <Typography
                variant="body1"
                sx={{ color: "white" }}
                className="!text-xs"
              >
                * Please confirm your beneficial account information before
                withdrawing.
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" mt={1}>
              <Typography
                variant="body1"
                sx={{ color: "white" }}
                className="!text-xs"
              >
                * If your information is incorrect, our company will not be
                liable for the amount of loss .{" "}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              mt={1}
              className="!text-bold "
            >
              <Typography
                variant="body1"
                sx={{ color: "white" }}
                className="!text-xs"
              >
                * If your beneficial information is incorrect, please contact
                customer service.
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Dialog open={openDialogBox}>
          <div className="!p-5 !max-w-[300px]">
            <p className="!font-bold text-center flex-col">
              <span className="!text-lg">{msg}</span>
              <p className="!text-green-500">Thank You!</p>
              <Button
                onClick={() => setOpenDialogBox(false)}
                className="!mt-1"
                variant="contained"
              >
                OK
              </Button>
            </p>
          </div>
        </Dialog>
      </Container>
    </Layout>
  );
}

export default WithdrawalUsdt;

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
    "&:hover": { background: zubgtext, border: "1px solid transparent" },
  },
  rechargeinstext: {
    mb: "10px",
    alignItems: "center",
    justifyContent: "start",
    "&>p": { marginLeft: "10px", color: "white !important", fontSize: "14px" },
  },
};
