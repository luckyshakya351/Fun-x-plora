import CachedIcon from "@mui/icons-material/Cached";
import CloseIcon from "@mui/icons-material/Close";
import HistoryIcon from "@mui/icons-material/History";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useFormik } from "formik";
import * as React from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { cashDepositRequestValidationSchema } from "../../../Shared/Validation";
import { zubgmid, zubgshadow, zubgtext } from "../../../Shared/color";
import audiovoice from "../../../assets/bankvoice.mp3";
import user from "../../../assets/check.png";
import dot from "../../../assets/images/circle-arrow.png";
import logo1 from "../../../assets/images/logotred.png";
import balance from "../../../assets/images/send.png";
import pay from "../../../assets/images/wallet.png";
import usdt from "../../../assets/payNameIcon1.png";
import payNameIcon2 from "../../../assets/payNameIcon2.png";
import Layout from "../../../component/Layout/Layout";
import copy from "clipboard-copy";
import {
  baseUrl,
  endpoint,
  fron_end_main_domain,
} from "../../../services/urls";
import theme from "../../../utils/theme";
import UsdtQR from "./UsdtQR";
import { getQraddress } from "../../../services/apicalling";
// payment 2000 or 2000 se upr hoga to indian pay, or moon lottery par jayega, accorgin to akash sir --> THAT MEANS PYT-PAY

function WalletRecharge() {
  const aviator_login_data = useSelector(
    (state) => state.aviator.aviator_login_data
  );
  const [receipt, setReceipt] = React.useState();
  const [paymentType, setPaymentType] = React.useState("UPI");
  const deposit_amount = localStorage.getItem("amount_set");
  const Deposit_type = localStorage.getItem("Deposit_type");
  const server_provider = localStorage.getItem("server_provider");

  const audioRefMusic = React.useRef(null);
  const login_data =
    (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
        localStorage.getItem("logindataen"),
        "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
    null;
  const user_name =
    aviator_login_data && JSON.parse(aviator_login_data)?.username;
  const user_id = login_data && JSON.parse(login_data)?.UserID;
  const [deposit_req_data, setDeposit_req_data] = React.useState();
  const [loding, setloding] = React.useState(false);
  const [deposit_req_data_usdt, setDeposit_req_data_usdt] = React.useState();
  const [address, setAddress] = React.useState("");
  const [selectedGateway, setSelectedGateway] = React.useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transactionId = searchParams?.get("order_id");
  const client = useQueryClient();
  const [amount, setAmount] = React.useState({
    wallet: 0,
    winning: 0,
    cricket_wallet: 0,
  });

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  React.useEffect(() => {
    handlePlaySound();
  }, []);

  const { data } = useQuery(["qr"], () => getQraddress(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  const res = data?.data?.data || 0;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceipt(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const functionTOCopy = (value) => {
    copy(value);
    toast.success("Copied to clipboard!");
  };

  const handlePlaySound = async () => {
    try {
      if (audioRefMusic?.current?.pause) {
        await audioRefMusic?.current?.play();
      } else {
        await audioRefMusic?.current?.pause();
      }
    } catch (error) {
      console.error("Error during play:", error);
    }
  };

  const walletamountFn = async () => {
    try {
      const response = await axios.get(
        `${endpoint.userwallet}?userid=${user_id}`
      );

      setAmount(response?.data?.data);
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };

  React.useEffect(() => {
    walletamountFn();
  }, []);

  const initialValues = {
    amount: deposit_amount || 0,
    all_data: { t_id: "", amount: "", date: "" },
  };

  const fk = useFormik({
    initialValues: initialValues,
    validationSchema: cashDepositRequestValidationSchema,
    onSubmit: () => {
      const transaction_id = `${Date.now()}${user_id}`;
      // setT_id(transaction_id);
      const fd = new FormData();
      fd.append("UserID", "7704002732");
      fd.append("Email", "mailto:sunlottery@gmail.com");
      fd.append("txtamt", fk.values.amount);
      fd.append("Name", user_name);
      fd.append("TransactionID", transaction_id);

      // return toast("We are upgrading for smooth and fast payin please wait...");

      paymentRequest(fd, fk.values.amount);
      fk.setFieldValue("all_data", {
        t_id: fd.get("TransactionID") || "",
        amount: fk.values.amount,
        date: new Date(),
      });
      localStorage.removeItem("amount_set");
    },
  });

  // sajid api
  async function paymentRequest(fd, amnt) {
    if (!amnt) {
      toast("Please Enter the amount");
      return;
    }
    const reqbody = {
      user_id: user_id,
      amount: amnt || 1000,
      transection_id: fd.get("TransactionID"),
    };
    const fdata = new FormData();
    fdata.append("user_id", reqbody.user_id);
    // fdata.append("type_gateway", "1");
    fdata.append("type_gateway", selectedGateway === "Gateway1" ? "1" : "3");
    fdata.append("amount", reqbody.amount);
    fdata.append("transection_id", reqbody.transection_id);
    fdata.append("Deposit_type", deposit_amount ? Deposit_type : "Null");
    fdata.append("server_provider", deposit_amount ? server_provider : "Null");
    fdata.append("game_type", "1");
    // if (deposit_amount) {
    //   fdata.append("game_type", "1");
    // } else {
    //   fdata.append("game_type", "2");
    // }
    try {
      const res = await axios.post(`${endpoint.payment_request}`, fdata);
      const qr_url =
        (res?.data?.data && JSON.parse(res?.data?.data)?.upi_deep_link) || "";
      // const qr_url = JSON.parse(res?.data?.data) || "";
      // console.log(qr_url);
      if (qr_url) {
        setDeposit_req_data(qr_url);
      } else {
        res?.data?.msg ? toast(res?.data?.msg) : toast("Something went wrong");
      }
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  }

  // const initialValuesss = {
  //   amount: deposit_amount || 10,
  // };

  // const formik = useFormik({
  //   initialValues: initialValuesss,
  //   onSubmit: () => {
  //     const fd = new FormData();
  //     payment(formik.values.amount);
  //   },
  // });
  // async function payment(amnt) {
  //   setloding(true);
  //   if (!amnt) {
  //     toast("Please Enter the amount");
  //     return;
  //   }
  //   const formdata = {
  //     userid: Number(user_id),
  //     amount: Number(amnt),
  //   };
  //   const response = await axios.post(`${endpoint.payment}`, formdata);
  //   setDeposit_req_data_usdt(response?.data?.data?.qrcode_url);
  //   setAddress(response?.data?.data?.address);
  //   setAmount(response?.data?.data?.amount);
  //   // console.log(response?.data?.data?.amount)
  //   setloding(false);
  // }
  const initialValuess = {
    deposit_type: 1,
    req_amount: "",
    bank_upi_table_id: "",
    receipt_image: "",
    utr_no: "",
  };
  const fkk = useFormik({
    initialValues: initialValuess,
    enableReinitialize: true,
    onSubmit: () => {
      const reqBody = {
        userid: user_id,
        deposit_type: fkk.values.deposit_type,
        req_amount: fkk.values.req_amount,
        bank_upi_table_id: fkk.values.deposit_type,
        receipt_image: receipt,
        utr_no: fkk.values.utr_no,
      };
      insertFundFn(reqBody);
    },
  });
  async function insertFundFn(reqBody) {
    setloding(true);
    try {
      const res = await axios.post(endpoint?.payment_deposite, reqBody);
      toast(res?.data?.msg);
      setloding(false);
      if ("Request Successfully Accepted." === res?.data?.msg) {
        fkk.handleReset();
        setReceipt(null);
        client.refetchQueries("deposit_history_usdt");
      }
    } catch (e) {
      console.log(e);
    }
    // client.refetchQueries("wallet_amount");
    // client.refetchQueries("withdrawl_history");
  }
  const audio = React.useMemo(() => {
    return (
      <audio ref={audioRefMusic} hidden>
        <source src={`${audiovoice}`} type="audio/mp3" />
      </audio>
    );
  }, []);
  const selectedUPIDetails = Array.isArray(res)
    ? res.find((item) => item?.id === fkk.values.deposit_type)
    : null;
  const rechargeInstruction = React.useMemo(() => {
    return (
      <Box
        sx={{
          padding: "10px",
          width: "95%",
          margin: "auto",
          mt: "20px",
          background: theme.palette.primary.main,
          borderRadius: "10px",
          mb: 5,
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center", mb: "20px" }}>
          <Box component="img" src={user} width={30}></Box>
          <Typography
            variant="body1"
            color="initial"
            sx={{ fontSize: "15px ", color: "white !important", ml: "10px" }}
          >
            {" "}
            Recharge instructions
          </Typography>
        </Stack>
        <Box
          sx={{
            border: "1px solid white",
            padding: 2,
            borderRadius: "10px",
          }}
        >
          <Stack direction="row" sx={style.rechargeinstext}>
            <Box
              component="img"
              src={dot}
              width={15}
              sx={{ filter: "grayscale(1)" }}
            ></Box>
            <Typography
              variant="body1"
              sx={{ color: "white !important", fontSize: "12px" }}
            >
              If the transfer time is up, please fill out the deposit form
              again.
            </Typography>
          </Stack>
          <Stack direction="row" sx={style.rechargeinstext}>
            <Box
              component="img"
              src={dot}
              width={15}
              sx={{ filter: "grayscale(1)" }}
            ></Box>
            <Typography
              variant="body1"
              sx={{ color: "white !important", fontSize: "12px" }}
            >
              The transfer amount must match the order you created, otherwise
              the money cannot be credited successfully.
            </Typography>
          </Stack>
          <Stack direction="row" sx={style.rechargeinstext}>
            <Box
              component="img"
              src={dot}
              width={15}
              sx={{ filter: "grayscale(1)" }}
            ></Box>
            <Typography
              variant="body1"
              sx={{ color: "white !important", fontSize: "12px" }}
            >
              If you transfer the wrong amount, our company will not be
              responsible for the lost amount!
            </Typography>
          </Stack>
          <Stack direction="row" sx={style.rechargeinstext}>
            <Box
              component="img"
              src={dot}
              width={15}
              sx={{ filter: "grayscale(1)" }}
            ></Box>
            <Typography
              variant="body1"
              sx={{ color: "white !important", fontSize: "12px" }}
            >
              Note: do not cancel the deposit order after the money has been
              transferred.
            </Typography>
          </Stack>
        </Box>
      </Box>
    );
  }, []);

  const payment_button = React.useMemo(() => {
    return (
      <>
        <Stack direction="row" sx={{ alignItems: "center", mb: "20px" }}>
          <Box
            component="img"
            src={pay}
            width={30}
            sx={{ filter: "saturate(-1)" }}
          ></Box>
          <Typography
            variant="body1"
            sx={{ fontSize: "15px ", color: "white !important", ml: "10px" }}
          >
            Deposit amount
          </Typography>
        </Stack>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            mt: "10px",
          }}
        >
          <Button
            sx={style.paytmbtn}
            onClick={() => {
              setDeposit_req_data(null);
              fk.setFieldValue("amount", 500);
            }}
          >
            {" "}
            ₹ 500
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => {
              setDeposit_req_data(null);
              fk.setFieldValue("amount", 1000);
            }}
          >
            {" "}
            ₹ 1K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => {
              setDeposit_req_data(null);
              fk.setFieldValue("amount", 5000);
            }}
          >
            {" "}
            ₹ 5K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => {
              setDeposit_req_data(null);
              fk.setFieldValue("amount", 10000);
            }}
          >
            {" "}
            ₹ 10K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => {
              setDeposit_req_data(null);
              fk.setFieldValue("amount", 15000);
            }}
          >
            {" "}
            ₹ 15K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => {
              setDeposit_req_data(null);
              fk.setFieldValue("amount", 20000);
            }}
          >
            {" "}
            ₹ 20K
          </Button>
        </Stack>
      </>
    );
  }, []);
  const payment_button2 = React.useMemo(() => {
    return (
      <>
        <Stack direction="row" sx={{ alignItems: "center", mb: "20px" }}>
          <Box component="img" src={pay} width={30} sx={{}}></Box>
          <Typography
            variant="body1"
            color="initial"
            sx={{ fontSize: "15px ", color: "white", ml: "10px" }}
          >
            Select amount of USDT
          </Typography>
        </Stack>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            mt: "10px",
          }}
        >
          <Button
            sx={style.paytmbtn}
            onClick={() => fkk.setFieldValue("amount", 10)}
          >
            {" "}
            $ 10
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fkk.setFieldValue("amount", 50)}
          >
            {" "}
            $ 50
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fkk.setFieldValue("amount", 100)}
          >
            {" "}
            $ 100
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fkk.setFieldValue("amount", 500)}
          >
            {" "}
            $ 500
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fkk.setFieldValue("amount", 1000)}
          >
            {" "}
            $ 1K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fkk.setFieldValue("amount", 5000)}
          >
            $ 5K
          </Button>
        </Stack>
      </>
    );
  }, []);

  async function sendUrlCallBackToBackend(transactionId) {
    try {
      const res = await axios.get(
        `${baseUrl}/api/deposit-collback?order_id=${transactionId}`
      );
      if (res?.data?.status === "200") {
        window.location.href = `${fron_end_main_domain}/account`;
      }
    } catch (e) {
      console.log(e);
    }
  }
  React.useEffect(() => {
    client.removeQueries("myprofile");
    client.refetchQueries("walletamount");
    if (transactionId) {
      sendUrlCallBackToBackend(transactionId);
    }
  }, []);

  if (deposit_req_data) {
    window.open(deposit_req_data);
    // return (
    //   <QRScreen
    //     callBackResponse={callBackResponse}
    //     deposit_req_data={deposit_req_data}
    //     show_time={show_time}
    //   />
    // );
  }
  // React.useEffect(() => {
  //   if (paymentType === "UPI" && fk.values.amount > 1000) {
  //     setSelectedGateway("Gateway1");
  //   } else {
  //     setSelectedGateway("Gateway2");
  //   }
  // }, [fk.values.amount, paymentType]);

  if (paymentType !== "UPI" && deposit_req_data_usdt && address) {
    return (
      <UsdtQR
        deposit_req_data={deposit_req_data_usdt}
        address={address}
        amount={amount}
      />
    );
  }
  return (
    <Layout>
      {audio}
      <Container
        className="no-scrollbar"
        sx={{
          background: "#0E0435",
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 4,
        }}
      >
        <Box sx={style.header}>
          <Box component={NavLink} onClick={goBack}>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1" color="initial">
            Deposit
          </Typography>
          <Box component={NavLink} to="/depositHistory">
            <HistoryIcon />
          </Box>
        </Box>
        <Box
          sx={{
            borderRadius: "10px",
            padding: "15px 15px",
            width: "95%",
            margin: "auto",
            position: "relative",
            background: "white",
          }}
        >
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Box
              component="img"
              src={balance}
              width={50}
              sx={{
                position: "relative",
                zIndex: 10,
                filter: "invert(1)",
              }}
            ></Box>
            <Typography
              variant="body1"
              color="initial"
              sx={{
                fontSize: "16px ",
                fontWeight: 500,
                color: "black",
                ml: "10px",
                position: "relative",
                zIndex: 10,
              }}
            >
              {" "}
              Balance
            </Typography>
          </Stack>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              mt: "10px",
              position: "relative",
              zIndex: 10,
            }}
          >
            <Typography
              variant="body1"
              color="initial"
              sx={{
                fontSize: "30px ",
                fontWeight: "600",
                color: "#63BA0E",
                mr: "10px",
                position: "relative",
                zIndex: 10,
              }}
            >
              {" "}
              ₹{" "}
              {deposit_amount
                ? Number(amount?.cricket_wallet || 0)?.toFixed(2)
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
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{ width: "100%", padding: "10px 0px 0px 0px" }}
          >
            <div class="visa_info">
              <img
                style={{ width: "50px" }}
                src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
                alt=""
              />
            </div>
            <div class="visa_logo">
              <Box
                component={"img"}
                src={logo1}
                sx={{ width: "100px", height: "10vh" }}
              ></Box>
            </div>
          </Stack>
        </Box>

        <Box className="!flex !justify-start !mx-5 gap-5  !-my-5">
          <Box
            sx={{
              background: zubgtext,
              border: zubgtext,
            }}
            className="!cursor-pointer px-8 py-3 !rounded-lg !my-10 "
            onClick={() => setPaymentType("UPI")}
            variant={paymentType === "UPI" ? "contained" : "outlined"}
          >
            <Box component={NavLink}>
              <Box
                component="img"
                src={payNameIcon2}
                sx={{ width: "100px", height: "80px", borderRadius: "10px" }}
              ></Box>
              <Typography className="!text-center !text-white !text-sm" mt={1}>
                UPI
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              background: zubgtext,
              border: zubgtext,
            }}
            className="!cursor-pointer px-8  py-3 !rounded-lg !my-10 "
            onClick={() => setPaymentType("USDT")}
            variant={paymentType === "USDT" ? "contained" : "outlined"}
          >
            <Box>
              <Box
                className="!bg-white !border !border-white !rounded-lg"
                component="img"
                src={usdt}
                sx={{ width: "100px", height: "80px", borderRadius: "10px" }}
              ></Box>
              <Typography className="!text-center !text-white !text-sm" mt={1}>
                USDT
              </Typography>
            </Box>
          </Box>
        </Box>
        {paymentType === "UPI" ? (
          <Box sx={{ display: "flex", justifyContent: "start" }}>
            <Box
              className="!text-black"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mx: 2,
                background: theme.palette.secondary.light,
                borderRadius: "10px",
                width: "100%",
              }}
            >
              <RadioGroup
                row
                value={selectedGateway}
                onChange={(e) => {
                  setDeposit_req_data(null);
                  setSelectedGateway(e.target.value);
                }}
              >
                <Typography
                  className="!mt-2 !mr-5  !font-bold"
                  sx={{ color: "white !important" }}
                >
                  Select :
                </Typography>
                <FormControlLabel
                  sx={{ color: "white !important" }}
                  value="Gateway1"
                  control={<Radio sx={{ color: "white !important" }} />}
                  label="Flex"
                />

                <FormControlLabel
                  sx={{ color: "white !important" }}
                  value="Gateway2"
                  control={<Radio sx={{ color: "white !important" }} />}
                  label="JIO PAY"
                />
              </RadioGroup>
            </Box>
          </Box>
        ) : (
          ""
        )}
        {paymentType === "UPI" ? (
          <Box>
            <Box
              sx={{
                padding: "10px",
                width: "95%",
                margin: "auto",
                mt: "10px",
                background: theme.palette.secondary.light,
                boxShadow: zubgshadow,
                borderRadius: "10px",
                mb: 2,
              }}
            >
              {payment_button}
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  mt: "10px",
                }}
              >
                <OutlinedInput
                  fullWidth
                  placeholder="Enter amount"
                  className="wallet-textfield"
                  type="number"
                  id="amount"
                  name="amount"
                  value={fk.values.amount}
                  onChange={fk.handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {fk.touched.amount && fk.errors.amount && (
                  <div className="error">{fk.errors.amount}</div>
                )}

                <Button sx={style.paytmbtntwo} onClick={fk.handleSubmit}>
                  Deposit
                </Button>
              </Stack>
            </Box>
            {rechargeInstruction}
          </Box>
        ) : (
          <Box>
            <Box
              sx={{
                padding: "10px",
                width: "95%",
                margin: "auto",
                mt: "20px",
                background: theme.palette.primary.main,
                boxShadow: zubgshadow,
                borderRadius: "10px",
                mb: 2,
              }}
            >
              {payment_button2}
              <FormControl fullWidth sx={{ my: "10px" }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3" sx={{ color: "white" }}>
                    Select Network
                  </Typography>
                </Stack>
                <TextField
                  id="deposit_type"
                  name="deposit_type"
                  value={fkk.values.deposit_type}
                  onChange={fkk.handleChange}
                  placeholder="Select UPI"
                  className="!w-[100%] !bg-white !text-black !mt-5"
                  select
                  size="small"
                >
                  {Array.isArray(res) &&
                    res.map((i) => (
                      <MenuItem
                        className="!text-[#8f5206] "
                        key={i.id}
                        value={i.id}
                      >
                        {i.usdt_type === "USDT.BEP20"
                          ? "USDT Bep20"
                          : "USDT Trc20"}
                      </MenuItem>
                    ))}
                </TextField>
                {selectedUPIDetails && (
                  <div className="col-span-2 !h-full !w-full flex items-center mt-10 flex-col">
                    <div className="w-72">
                      <img src={selectedUPIDetails?.qr_code} alt="" />
                    </div>
                    <div className="pt-4 gap-2">
                      <p className="!bg-white !text-xs font-bold px-1 !text-[#8f5206]">
                        {selectedUPIDetails?.usdt_address}
                      </p>
                      <div className="w-full flex justify-center mt-5">
                        <Button
                          size="small !py-1"
                          className="!bg-[#8f5206]  !text-white place-items-center"
                          onClick={() =>
                            functionTOCopy(selectedUPIDetails?.usdt_address)
                          }
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </FormControl>
              <span className="!text-white !text-lg ">Receipt*</span>
              <input
                type="file"
                id="file"
                name="file"
                className="!text-xl !my-2 !text-[#8f5206]"
                onChange={handleFileChange}
                required
              />
              <span className="text-white text-lg !mt-5">
                Transaction hash{" "}
              </span>
              <TextField
                id="utr_no"
                name="utr_no"
                value={fkk.values.utr_no}
                onChange={fkk.handleChange}
                placeholder="Enter Transaction hash"
                className="!w-[100%] !bg-white !text-[#8f5206] !mt-2"
                size="small"
              ></TextField>
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  mt: "10px",
                }}
              >
                <OutlinedInput
                  fullWidth
                  placeholder="Enter USDT "
                  className="wallet-textfield"
                  type="number"
                  id="req_amount"
                  name="req_amount"
                  value={fkk.values.req_amount}
                  onChange={fkk.handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <div style={{ display: "flex", alignItems: "right" }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "white",
                            mr: 1,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          USDT
                        </Typography>
                        <IconButton edge="end">
                          <CloseIcon style={{ color: "white" }} />
                        </IconButton>
                      </div>
                    </InputAdornment>
                  }
                />
                <OutlinedInput
                  fullWidth
                  placeholder="Enter Amount "
                  className="wallet-textfield   mt-4"
                  type="number"
                  id="req_amount"
                  name="req_amount"
                  value={Number(fkk.values.req_amount || 0) * 92}
                  endAdornment={
                    <InputAdornment position="end">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "white",
                            mr: 1,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          INR
                        </Typography>
                        <IconButton edge="end">
                          <CloseIcon style={{ color: "white" }} />
                        </IconButton>
                      </div>
                    </InputAdornment>
                  }
                />
                <Button sx={style.paytmbtntwo} onClick={fkk.handleSubmit}>
                  Deposit
                </Button>
              </Stack>
            </Box>
            {rechargeInstruction}
          </Box>
        )}

        <CustomCircularProgress isLoading={loding} />
      </Container>
    </Layout>
  );
}

export default WalletRecharge;

const style = {
  header: {
    padding: "15px 8px",
    background: zubgtext,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 3,
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
    height: "auto",
    background: zubgtext,
    boxShadow: zubgshadow,
    padding: "10px 0px",
    borderRadius: "10px",
    "&>p": {
      color: "white",
      fontSize: "12px",
      fontWeight: "500",
      textAlign: "center",
      mt: "5px",
    },
  },
  paymentBoxOuter: {
    // width: "50%",
    // marginLeft: "5%",
    my: "20px",
    // display: "flex",
    // flexWrap: "wrap",
    // alignItems: "center",
    // justifyContent: "space-between",
  },
  paytmbtn: {
    mb: 2,
    background: theme.palette.secondary.main,
    color: "white !important",
    width: "31%",
    // border: "1px solid white",
    padding: "10px",
    "&:hover": { background: theme.palette.primary.dark },
  },
  paytmbtntwo: {
    borderRadius: "5px",
    textTransform: "capitalize",
    mb: 2,
    background: theme.palette.secondary.main,
    color: "white !important",
    width: "100%",
    mt: "20px",
    // border: "1px solid white",
    padding: "10px",
    "&:hover": { background: theme.palette.secondary.dark },
  },
  rechargeinstext: {
    mb: "10px",
    alignItems: "center",
    justifyContent: "start",
    "&>p": {
      marginLeft: "10px",
      color: zubgtext,
      fontSize: "12px",
    },
  },
};
