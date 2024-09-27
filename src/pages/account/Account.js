import CachedIcon from "@mui/icons-material/Cached";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import {
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../Shared/CustomCircularProgress";
import { zubgtext } from "../../Shared/color";
import cip from "../../assets/cip.png";
import card from "../../assets/images/card-payment.png";
import graph from "../../assets/images/graph (1).png";
import balance from "../../assets/images/logotred.png";
import dp1 from "../../assets/images/pr.png";
import trans from "../../assets/images/translate.png";
import edit from "../../assets/quickpay.png";
import wtd from "../../assets/rechargeIcon.png";
import sunlotteryhomebanner from "../../assets/sunlotteryhomebanner.jpg";
import s from "../../assets/wdhistory.png";
import dpt from "../../assets/withdrow.png";
import Layout from "../../component/Layout/Layout";
import { BankListDetails, walletamount } from "../../services/apicalling";
import { baseUrl, fron_end_main_domain } from "../../services/urls";
import theme from "../../utils/theme";
import CryptoJS from "crypto-js";

function Account() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transactionId = searchParams?.get("order_id");
  const client_txn_id = searchParams?.get("client_txn_id");
  const client = useQueryClient();
  const login_data =
    (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
        localStorage.getItem("logindataen"),
        "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
    null;
  const user_id = login_data && JSON.parse(login_data)?.UserID;

  const navigate = useNavigate();
  const [openDialogBoxHomeBanner, setopenDialogBoxHomeBanner] = useState(false);

  const { isLoading, data: amount } = useQuery(
    ["walletamount"],
    () => walletamount(),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    }
  );
  const wallet = amount?.data?.data;

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

  useEffect(() => {
    client.removeQueries("myprofile");
    client.refetchQueries("walletamount");
    if (transactionId || client_txn_id) {
      sendUrlCallBackToBackend(transactionId || client_txn_id);
    }
  }, []);

  const { data } = useQuery(["bank_list_details"], () => BankListDetails(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  const result = React.useMemo(() => data?.data?.data, [data]);

  return (
    <Layout>
      <Container sx={style.container}>
        <Stack direction="row" sx={style.header}>
          <Box sx={style.profileBox}>
            <Box component="img" src={dp1} sx={style.profileImage} />
          </Box>
          <Box sx={style.userInfo} className={"!flex !flex-col-reverse"}>
            <Stack direction="column" alignItems="start">
              <Typography variant="" sx={{ ml: 2, color: "white" }}>
                {wallet?.full_name}
              </Typography>
              <Box className="!ml-2">
                {wallet?.transaction_status === 1 ? (
                  <span className="!text-green-600">POSITIVE</span>
                ) : (
                  <span className="!text-red-500">NEGATIVE</span>
                )}
              </Box>
            </Stack>

            <Typography variant="body1" color="initia nl" sx={{ mt: 1 }}>
              UID | {wallet?.username || 0}{" "}
              <ContentCopyOutlinedIcon sx={{ fontSize: "15px", ml: 2 }} />
            </Typography>
            <p className="!ml-2" style={{ color: "white", marginTop: "8px" }}>
              Mobile No : {wallet?.mob_no || 0}{" "}
            </p>
          </Box>
        </Stack>
        <Box sx={style.balanceContainer} className={"!bg-white !text-gray-900"}>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Box component="img" src={balance} sx={style.cardImage} />
          </Stack>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              mt: "10px",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body1"
              color="initial"
              sx={style.balanceText}
              className={"!text-[#110738]"}
            >
              Total Balance
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={style.totalBalance}
              className={"!text-[#110738]"}
            >
              ₹
              {(
                Number(
                  Number(wallet?.winning || 0) + Number(wallet?.wallet || 0)
                ) || 0
              )?.toFixed(0)}{" "}
              <CachedIcon sx={style.cachedIcon} />
            </Typography>
          </Stack>
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Typography
              variant="body1"
              color="initial"
              sx={style.balanceText1}
              className={"!text-[#110738]"}
            >
              Yesterday total deposit
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              className={"!text-[#110738]"}
            >
              ₹{Number(wallet?.total_payin || 0)?.toFixed(0)}{" "}
              <CachedIcon sx={style.cachedIcon} />
            </Typography>
          </Stack>
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Typography
              variant="body1"
              color="initial"
              sx={style.balanceText1}
              className={"!text-[#110738]"}
            >
              Yesterday total withdrawal
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              className={"!text-[#110738]"}
            >
              ₹{Number(wallet?.total_payout || 0)?.toFixed(0)}{" "}
              <CachedIcon sx={style.cachedIcon} />
            </Typography>
          </Stack>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              mt: "10px",
            }}
          >
            <Box component="img" src={cip} sx={style.cardImage} />
            <Typography
              variant="body1"
              color="initial"
              sx={style.cardNumber}
              className={"!text-[#110738]"}
            >
              Rererral Code: {wallet?.referral_code}
            </Typography>
          </Stack>
        </Box>
        <Box sx={style.actionContainer}>
          <Box sx={style.actionBox} component={NavLink} to="/wallet">
            <Box component="img" src={s} sx={style.actionImage} />
            <Typography variant="body1" color="initial" sx={style.actionText}>
              Wallet
            </Typography>
          </Box>
          <Box sx={style.actionBox} component={NavLink} to="/wallet/Recharge">
            <Box component="img" src={dpt} sx={style.actionImage} />
            <Typography variant="body1" color="initial" sx={style.actionText}>
              Deposit
            </Typography>
          </Box>
          <Box sx={style.actionBox} component={NavLink} to="/Withdrawal">
            <Box component="img" src={wtd} sx={style.actionImage} />
            <Typography variant="body1" color="initial" sx={style.actionText}>
              Withdraw
            </Typography>
          </Box>
          {result?.length <= 0 && (
            <Box
              sx={style.actionBox}
              component={NavLink}
              to="/add-bank-details"
            >
              <Box component="img" src={edit} sx={style.actionImage} />
              <Typography variant="body1" color="initial" sx={style.actionText}>
                Add Bank
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={style.actionContainer}>
          <Box
            sx={{
              width: "100%%",
              height: "100%",
            }}
          >
            <Stack
              direction="row"
              sx={{ alignItems: "center" }}
              component={NavLink}
              to={"/account/income-main"}
            >
              <Box
                component="img"
                src={card}
                sx={{ width: "40px", height: "40px", marginRight: "20px" }}
              ></Box>
              <Box
                sx={{
                  "&>:nth-child(1)": {
                    fontSize: "15px",
                    fontWeight: "500",
                    color: zubgtext,
                  },
                  "&>:nth-child(2)": {
                    fontSize: "10px",
                    fontWeight: "500",
                    color: zubgtext,
                  },
                }}
              >
                <p className="!text-sm">Transaction</p>
                <p className="!text-[10px]">All Income</p>
              </Box>
            </Stack>
          </Box>
        </Box>
        {Number(user_id) === 1169 && (
          <Box sx={style.actionContainer}>
            <Box
              sx={{
                width: "100%%",
                height: "100%",
              }}
            >
              <Stack
                direction="row"
                sx={{ alignItems: "center" }}
                component={NavLink}
                to={"/add-fund-to-user"}
              >
                <Box
                  component="img"
                  src={card}
                  sx={{ width: "40px", height: "40px", marginRight: "20px" }}
                ></Box>
                <Box
                  sx={{
                    "&>:nth-child(1)": {
                      fontSize: "15px",
                      fontWeight: "500",
                      color: zubgtext,
                    },
                    "&>:nth-child(2)": {
                      fontSize: "10px",
                      fontWeight: "500",
                      color: zubgtext,
                    },
                  }}
                >
                  <p className="!text-sm">Add Fund</p>
                </Box>
              </Stack>
            </Box>
          </Box>
        )}
        {Number(user_id) === 1169 && (
          <Box sx={style.actionContainer}>
            <Box
              sx={{
                width: "100%%",
                height: "100%",
              }}
            >
              <Stack
                direction="row"
                sx={{ alignItems: "center" }}
                component={NavLink}
                to={"/block-user"}
              >
                <Box
                  component="img"
                  src={card}
                  sx={{ width: "40px", height: "40px", marginRight: "20px" }}
                ></Box>
                <Box
                  sx={{
                    "&>:nth-child(1)": {
                      fontSize: "15px",
                      fontWeight: "500",
                      color: zubgtext,
                    },
                    "&>:nth-child(2)": {
                      fontSize: "10px",
                      fontWeight: "500",
                      color: zubgtext,
                    },
                  }}
                >
                  <p className="!text-sm">Change Password</p>
                </Box>
              </Stack>
            </Box>
          </Box>
        )}
        <Box sx={style.actionContainertwo}>
          <Stack
            sx={{
              padding: "10px",
              width: "100%",
              borderRadius: "10px",
            }}
          >
            {/* <Stack
              component={NavLink}
              to="/gift"
              direction="row"
              sx={{
                borderBottom: `1px solid ${zubgtext}`,
                padding: " 10px 10px 10px 5px",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack direction="row" sx={{ alignItems: "center" }}>
                <Box
                  component="img"
                  src={gift}
                  sx={{ width: "30px", height: "30px", marginRight: "10px", filter: 'hue-rotate(135deg)' }}
                ></Box>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ color: 'white', fontSize: "13px", fontWeight: "600" }}
                >
                  Gifts
                </Typography>
              </Stack>
              <Box>
                <KeyboardDoubleArrowRightIcon
                  sx={{ color: 'white', fontSize: "23px", fontWeight: "600" }}
                />
              </Box>
            </Stack> */}
            <Stack
              component={NavLink}
              to="/gamestaticks"
              direction="row"
              sx={{
                borderBottom: `1px solid ${zubgtext}`,
                padding: " 10px 10px 10px 5px",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack direction="row" sx={{ alignItems: "center" }}>
                <Box
                  component="img"
                  src={graph}
                  sx={{
                    width: "25px",
                    height: "25px",
                    marginRight: "10px",
                    filter: "hue-rotate(135deg)",
                  }}
                ></Box>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ color: "white", fontSize: "13px", fontWeight: "600" }}
                >
                  Game statistics
                </Typography>
              </Stack>
              <Box>
                <KeyboardDoubleArrowRightIcon
                  sx={{ color: "white", fontSize: "23px", fontWeight: "600" }}
                />
              </Box>
            </Stack>
            <Stack
              component={NavLink}
              to="/Language"
              direction="row"
              sx={{
                borderBottom: `1px solid ${zubgtext}`,
                padding: " 10px 10px 10px 5px",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack direction="row" sx={{ alignItems: "center" }}>
                <Box
                  component="img"
                  src={trans}
                  sx={{
                    width: "25px",
                    height: "25px",
                    marginRight: "10px",
                    filter: "hue-rotate(135deg)",
                  }}
                ></Box>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ color: "white", fontSize: "13px", fontWeight: "600" }}
                >
                  Language
                </Typography>
              </Stack>
              <Box>
                <Typography
                  sx={{ color: "white", fontSize: "13px", fontWeight: "500" }}
                >
                  English
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
        {/* <Box
          sx={{
            width: "95%",
            marginLeft: "2.5%",
            borderRadius: "10px",
            background: zubgmid,
            padding: "10px",
            mt: "20px",
            "&>:nth-child(1)": {
              color: "white",
              fontSize: "15px",
              fontWeight: "600",
              mb: "25px",
            },
          }}
        >
          <Typography variant="body1" color="initial">
            Service center
          </Typography>

          <div className="!w-full !grid !grid-cols-3 !place-items-center">
            {[
             
              {
                 to: "/SettingCenter",
                 name: "Setting", 
                 logo: setting 
                },
              {
                to: "/gameNotification",
                name: "Notification",
                logo: notification1,
              },
              {
                to: "/SettingCenter/LoginPassword",
                name: "Change Password",
                logo: user2,
              },
              {
                to: "/customerLine/",
                name: "Customer service",
                logo: customer,
              },
              { to: "/feedback", name: "Feedback", logo: hand },
            ]?.map((i) => {
              return (
                <Box
                  component={NavLink}
                  to={i.to}
                  sx={{
                    width: "30%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: "10px",
                    "&>p": {
                      color: "white",
                      fontSize: "14px",
                      fontWeight: "500",
                      mt: "5px",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={i.logo}
                    sx={{ width: "30px", height: "30px" }}
                  ></Box>
                  <Typography>{i.name}</Typography>
                </Box>
              );
            })}
          </div>
        </Box> */}
        <Box
          sx={{
            width: "95%",
            marginLeft: "2.5%",
            borderRadius: "10px",
            mt: "20px",
            pb: 5,
          }}
        >
          <Button
            className="goldborderbtn"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            Logout
          </Button>
        </Box>
        {openDialogBoxHomeBanner && (
          <Dialog
            PaperProps={{ width: "500px", height: "500px" }}
            open={openDialogBoxHomeBanner}
          >
            <div>
              <p>
                <IconButton onClick={() => setopenDialogBoxHomeBanner(false)}>
                  <CloseIcon />
                </IconButton>
              </p>
              <p>
                <img src={sunlotteryhomebanner} />
              </p>
            </div>
          </Dialog>
        )}
        <CustomCircularProgress isLoading={isLoading} />
      </Container>
    </Layout>
  );
}

export default Account;

const style = {
  container: { background: theme.palette.secondary.main, mb: "64px" },
  header: {
    alignItems: "center",
    paddingTop: "20px",
    width: "95%",
    margin: "auto",
    mb: 2,
  },
  profileBox: {
    width: "60px",
    height: "60px",
    borderRadius: "20px",
    overflow: "hidden",
  },
  profileImage: { width: "100%", height: "100%", borderRadius: "20px" },
  userInfo: {
    ml: 3,
    "& > :nth-child(1)": {
      fontSize: "18px",
      fontWeight: "600",
      color: zubgtext,
    },
    "& > :nth-child(2)": {
      fontSize: "14px",
      fontWeight: "400",
      color: "white",
      padding: "0px 20px",
      background: zubgtext,
      borderRadius: "20px",
    },
  },
  rankImage: { width: "100px", height: "100px" },
  balanceContainer: {
    // backgroundImage: `url(${bgms})`,
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "100% 100%",
    background: zubgtext,
    borderRadius: "10px",
    padding: "20px",
    width: "95%",
    margin: "auto",
    marginTop: "2px",
  },
  balanceText: {
    fontSize: "16px",
    fontWeight: "500",
    color: "white",
  },
  balanceText1: {
    fontSize: "13px",
    fontWeight: "500",
    color: "white",
  },
  totalBalance: {
    fontSize: "30px",
    fontWeight: "600",
    color: "white",
    marginRight: "10px",
  },
  cachedIcon: { color: "white", ml: 1 },
  cardImage: { width: "50px" },
  cardNumber: { fontSize: "14px", color: "white", marginLeft: "10px" },
  actionContainer: {
    borderRadius: "10px",
    padding: "10px",
    width: "95%",
    margin: "auto",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: theme.palette.secondary.light,
  },
  actionBox: { width: "20%" },
  actionImage: {
    width: "30px",
    height: "30px",
    margin: "auto",
    filter: "hue-rotate(45deg)",
  },
  actionText: {
    color: "white",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "500",
    mt: "4px",
  },
  actionContainertwo: {
    flexDirection: "column",
    borderRadius: "10px",
    width: "95%",
    margin: "auto",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
};
