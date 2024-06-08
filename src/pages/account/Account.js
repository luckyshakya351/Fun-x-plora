import CachedIcon from "@mui/icons-material/Cached";
import CloseIcon from "@mui/icons-material/Close";
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
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../Shared/CustomCircularProgress";
import {
  zubgback,
  zubgbackgrad,
  zubggray,
  zubgmid,
  zubgshadow,
  zubgtext,
  zubgwhite,
} from "../../Shared/color";
import cip from "../../assets/cip.png";
import dp1 from "../../assets/images/pr.png";
import dp2 from "../../assets/dp2.png";
import dp3 from "../../assets/dp3.png";
import dp4 from "../../assets/dp4.png";
import card from "../../assets/images/card-payment.png";
import wtd from "../../assets/images/withdraw.png";
import casino from "../../assets/images/casino.png";
import customer from "../../assets/images/customer-service.png";
import dpt from "../../assets/images/wallet (3).png";
import edit from "../../assets/images/banking.png";
import gift from "../../assets/images/gift-box-with-a-bow.png";
import graph from "../../assets/images/graph (1).png";
import hand from "../../assets/images/hand.png";
import notification from "../../assets/images/notification (1).png";
import notification1 from "../../assets/images/notification.png";
import user2 from "../../assets/images/password (1).png";
import Rank from "../../assets/images/rank.png";
import namer from "../../assets/images/namer.png";
import balance from "../../assets/images/send.png";
import setting from "../../assets/images/settings (1).png";
import trans from "../../assets/images/translate.png";
import s from "../../assets/images/wallet (1).png";
import sunlotteryhomebanner from "../../assets/sunlotteryhomebanner.jpg";
import Layout from "../../component/Layout/Layout";
import { MyProfileDataFn } from "../../services/apicalling";
import axios from "axios";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import bgms from "../../assets/images/playgame.jpg";
import { baseUrl, fron_end_main_domain } from "../../services/urls";

function Account() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transactionId = searchParams?.get("orderid");
  const client = useQueryClient();
  const navigate = useNavigate();
  const profile_data = localStorage.getItem("profile_data");
  const [openDialogBoxHomeBanner, setopenDialogBoxHomeBanner] = useState(false);
  const [imageNumber, setImageNumber] = useState(profile_data || "1");
  const { isLoading, data } = useQuery(["myprofile"], () => MyProfileDataFn(), {
    refetchOnMount: false,
    refetchOnReconnect: true,
  });
  const result = data?.data?.data;

  const imge_array = [
    { id: 1, img: dp1 },
    { id: 2, img: dp2 },
    { id: 3, img: dp3 },
    { id: 4, img: dp4 },
  ];

  async function sendUrlCallBackToBackend(transactionId) {
    try {
      const res = await axios.get(
        `${baseUrl}/api/deposit-collback?orderid=${transactionId}`
      );
      if (res?.data?.status === "200") {
        window.location.href = `${fron_end_main_domain}/account`;
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
    client.removeQueries("myprofile");
  }

  useEffect(() => {
    if (transactionId) {
      sendUrlCallBackToBackend(transactionId);
    }
  }, []);

  return (
    <Layout>
      <Container sx={style.container}>
        <Stack direction="row" sx={style.header}>
          <Box sx={style.profileBox}>
            <Box
              component="img"
              src={imge_array[Number(Number(imageNumber) - 1 || 0)]?.img}
              sx={style.profileImage}
            />
          </Box>
          <Box sx={style.userInfo}>
            <Stack direction="row" alignItems="center">
              <Typography variant="" color="initial" sx={{ mr: 2 }}>
                {result?.full_name}
              </Typography>
              <Box component="img" src={namer} sx={{ width: "50px" }} />
            </Stack>

            <Typography variant="body1" color="initial" sx={{ mt: 1 }}>
              UID | {result?.custid || 0}{" "}
              <ContentCopyOutlinedIcon sx={{ fontSize: "15px", ml: 2 }} />
            </Typography>
          </Box>
        </Stack>
        <Box sx={style.balanceContainer}>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Box component="img" src={balance} sx={style.cardImage} />
            <Typography variant="body1" color="initial" sx={style.balanceText}>
              Total Balance
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ alignItems: "center", mt: "10px" }}>
            <Typography variant="body1" color="initial" sx={style.totalBalance}>
              ₹
              {(
                Number(
                  Number(result?.winning_wallet || 0) +
                    Number(result?.wallet || 0)
                ) || 0
              )?.toFixed(0)}
            </Typography>
            <CachedIcon sx={style.cachedIcon} />
          </Stack>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              mt: "20px",
            }}
          >
            <Box component="img" src={cip} sx={style.cardImage} />
            <Typography variant="body1" color="initial" sx={style.cardNumber}>
              Rererral Code: {result?.referral_code}
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
          <Box sx={style.actionBox} component={NavLink} to="/add-bank-details">
            <Box component="img" src={edit} sx={style.actionImage} />
            <Typography variant="body1" color="initial" sx={style.actionText}>
              Add Bank
            </Typography>
          </Box>
        </Box>
        <Box sx={style.actionContainer} component={NavLink} to={"/bathistory"}>
          <Box
            sx={{
              width: "50%",
              height: "100%",
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Box
                component="img"
                src={casino}
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
                    fontSize: "12px",
                    fontWeight: "500",
                    color: zubgtext,
                  },
                }}
              >
                <p className="!text-sm">Bet</p>
                <p className="!text-[10px]">My betting history</p>
              </Box>
            </Stack>
          </Box>
          <Box
            sx={{
              width: "50%",
              height: "100%",
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center" }}>
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
                <p className="!text-[10px]">My Transaction history</p>
              </Box>
            </Stack>
          </Box>
        </Box>
        <Box sx={style.actionContainertwo}>
          <Stack
            sx={{
              padding: "10px",
              width: "100%",
              borderRadius: "10px",
            }}
          >
            <Stack
              component={NavLink}
              to="/notification"
              direction="row"
              sx={{
                borderBottom: `1px solid ${zubgtext}`,
                padding: "10px",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack direction="row" sx={{ alignItems: "center" }}>
                <Box
                  component="img"
                  src={notification}
                  sx={{ width: "20px", height: "20px", marginRight: "10px" }}
                ></Box>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ color: zubgtext, fontSize: "13px", fontWeight: "600" }}
                >
                  Notification
                </Typography>
              </Stack>
              <Box>
                <KeyboardDoubleArrowRightIcon
                  sx={{ color: zubgtext, fontSize: "23px", fontWeight: "600" }}
                />
              </Box>
            </Stack>
            <Stack
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
                  sx={{ width: "30px", height: "30px", marginRight: "10px" }}
                ></Box>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ color: zubgtext, fontSize: "13px", fontWeight: "600" }}
                >
                  Gifts
                </Typography>
              </Stack>
              <Box>
                <KeyboardDoubleArrowRightIcon
                  sx={{ color: zubgtext, fontSize: "23px", fontWeight: "600" }}
                />
              </Box>
            </Stack>
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
                  sx={{ width: "25px", height: "25px", marginRight: "10px" }}
                ></Box>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ color: zubgtext, fontSize: "13px", fontWeight: "600" }}
                >
                  Game statistics
                </Typography>
              </Stack>
              <Box>
                <KeyboardDoubleArrowRightIcon
                  sx={{ color: zubgtext, fontSize: "23px", fontWeight: "600" }}
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
                  sx={{ width: "25px", height: "25px", marginRight: "10px" }}
                ></Box>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ color: zubgtext, fontSize: "13px", fontWeight: "600" }}
                >
                  Language
                </Typography>
              </Stack>
              <Box>
                <Typography
                  sx={{ color: zubgtext, fontSize: "13px", fontWeight: "500" }}
                >
                  English
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
        <Box
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
                to: "/account/income-main",
                name: "Income",
                logo: balance,
              },
              { to: "/SettingCenter", name: "Setting", logo: setting },
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
                to: "/promotion/customerLine/",
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
        </Box>
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
            sx={{
              background: zubgtext,
              width: "100%",
              color: "white",
              borderRadius: "10px",
              padding: 1.5,
            }}
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
  container: { background: zubgback, mb: "64px" },
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
      background: zubgmid,
      borderRadius: "20px",
    },
  },
  rankImage: { width: "100px", height: "100px" },
  balanceContainer: {
    backgroundImage: `url(${bgms})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
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
    marginLeft: "10px",
  },
  totalBalance: {
    fontSize: "30px",
    fontWeight: "600",
    color: "white",
    marginRight: "10px",
  },
  cachedIcon: { color: "white" },
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
  },
  actionBox: { width: "20%" },
  actionImage: { width: "30px", height: "30px", margin: "auto" },
  actionText: {
    color: zubgtext,
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "500",
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
