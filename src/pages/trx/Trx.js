import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import { Box, Button, Container, Dialog, Stack, Typography } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useQueryClient } from 'react-query';
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { zubgback, zubgshadow, zubgtext } from "../../Shared/color";
import refresh from "../../assets/images/refresh.png";
import { default as Timeactive, default as Timeinactive } from "../../assets/images/time-.png";
import Layout from "../../component/Layout/Layout";
import WinFiveMin from "./component/WinOneMin/WinFiveMin";
import WinLossPopup from "./component/WinOneMin/WinLossPopup";
import WinOneMin from "./component/WinOneMin/WinOneMin";
import WinThreeMin from "./component/WinOneMin/WinThreeMin";
import Jackpot from './component/WinOneMin/Jackpot';

function Win() {
  const navigate = useNavigate();
  const client = useQueryClient();
  const [Tab, setTab] = useState(1);
  const [opendialogbox, setOpenDialogBox] = useState(false);
  const isAppliedbet = localStorage.getItem("betApplied");
  const dummycounter = useSelector((state) => state.aviator.dummycounter);
  const net_wallet_amount = useSelector(
    (state) => state.aviator.net_wallet_amount
  );
  React.useEffect(() => {
    setTimeout(() => {
      if (isAppliedbet?.split("_")?.[1] === String(true)) {
        setOpenDialogBox(true);
        setTimeout(() => {
          setOpenDialogBox(false);
          localStorage.setItem("betApplied", false);
        }, 5000);
      }
    }, 1000);
  }, [dummycounter]);


  function refreshFunctionForRotation() {
    client.refetchQueries("walletamount");
    const item = document.getElementsByClassName("rotate_refresh_image")?.[0];

    const element = document.getElementById("refresh_button");
    if (!item) {
      element.classList.add("rotate_refresh_image");
    }
    setTimeout(() => {
      element.classList.remove("rotate_refresh_image");
    }, 2000);
  }
  React.useEffect(() => {
    const element = document.getElementById("refresh_button");
    const item = document.getElementsByClassName("rotate_refresh_image")?.[0];
    if (item) {
      element.classList.remove("rotate_refresh_image");
    }
  }, []);

  return (
    <Layout header={true} footer={true}>
      <Container sx={styles.root}>
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <Box className="wingosx"></Box>
          <Box sx={{ padding: 2, position: 'relative' }}>
            <Box sx={{ padding: '25px 10px', background: '#fff', borderRadius: '20px', my: 2, display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Box display='flex' alignItems='center' ml={5}>
                <Typography variant="body1" color="initial" className="b-val" sx={{ color: zubgtext }}>
                  ₹{" "}
                  {Number(
                    Number(net_wallet_amount?.wallet || 0) + Number(net_wallet_amount?.winning || 0) ||
                    0
                  )?.toFixed(2)}
                </Typography>
                <div className="mx-1 rotate_refresh_image" id="refresh_button">
                  <img
                    src={refresh}
                    className='!w-6'
                    ml={2}
                    onClick={() => {
                      refreshFunctionForRotation();
                    }}
                  />
                </div>
                {/* <CachedOutlinedIcon sx={{ ml: 3, color: 'gray' }} /> */}
              </Box>
              <Box display='flex' alignItems='center' mr={5}>
                <WalletOutlinedIcon sx={{ mr: 1, color: 'gray' }} />
                <Typography variant="body1" color="initial" className="b-val2" sx={{ color: zubgtext }}>
                  Walllet balance
                </Typography>
              </Box>
              <Box display='flex' alignItems='center' justifyContent='space-between' sx={{ width: '100%' }}>
                <Button variant="text" color="primary" className="greenbtn" onClick={() => navigate("/wallet/Recharge")}>
                  Deposit
                </Button>
                <Button variant="text" color="primary" className="yellowbtn" onClick={() => navigate("/Withdrawal")}>
                  Withdraw
                </Button>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              background: 'linear-gradient(90deg, #dd2224 0%, #ff504a 100%) !important',
              boxShadow: zubgshadow,
              width: "95%",
              marginLeft: "2.5%",
              borderRadius: "10px",
              position: 'relative'
            }}
          >
            <Stack direction="row">
              <Box
                component={NavLink}
                onClick={() => setTab(1)}
                className={Tab === 1 ? "activewinNav Winnav" : "Winnav"}
              >
                {Tab === 1 ? (
                  <Box component="img" src={Timeinactive} width={50}></Box>
                ) : (
                  <Box component="img" src={Timeactive} width={50}></Box>
                )}
                <Typography variant="h3" color="initial">
                  TRX     <br />1Min
                </Typography>
              </Box>
              <Box
                component={NavLink}
                onClick={() => setTab(2)}
                className={Tab === 2 ? "activewinNav Winnav" : " Winnav"}
              >
                {Tab === 2 ? (
                  <Box component="img" src={Timeinactive} width={50}></Box>
                ) : (
                  <Box component="img" src={Timeactive} width={50}></Box>
                )}
                <Typography variant="h3" color="initial">
                  TRX    <br /> 3Min
                </Typography>
              </Box>
              <Box
                component={NavLink}
                onClick={() => setTab(3)}
                className={Tab === 3 ? "activewinNav Winnav" : " Winnav"}
              >
                {Tab === 3 ? (
                  <Box component="img" src={Timeinactive} width={50}></Box>
                ) : (
                  <Box component="img" src={Timeactive} width={50}></Box>
                )}
                <Typography variant="h3" color="initial">
                  TRX   <br /> 5Min
                </Typography>
              </Box>
              <Box
                component={NavLink}
                onClick={() => setTab(4)}
                className={Tab === 4 ? "activewinNav Winnav" : " Winnav"}
              >
                {Tab === 4 ? (
                  <Box component="img" src={Timeinactive} width={50}></Box>
                ) : (
                  <Box component="img" src={Timeactive} width={50}></Box>
                )}
                <Typography variant="h3" color="initial">
                  Jackpot
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
        {Tab === 1 && <WinOneMin gid="1" />}
        {Tab === 2 && <WinThreeMin gid="2" />}
        {Tab === 3 && <WinFiveMin gid="3" />}
        {Tab === 4 && <Jackpot gid="4" />}
        {/* opendialogbox */}
        {opendialogbox && (
          <Dialog
            open={opendialogbox}
            PaperProps={{
              style: {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
            }}
          >
            <WinLossPopup gid={isAppliedbet?.split("_")?.[0]} />
          </Dialog>
        )}
        {/* <CustomCircularProgress isLoading={isLoading} /> */}
      </Container>
    </Layout>
  );
}

export default Win;

const styles = {
  root: { background: zubgback, my: '74px' },
  dashboardTitle: {
    textAlign: "center",
    color: "white !important",
    fontSize: "21px",
    fontWeight: "500",
  },
  swiperImage: { width: "100%", height: "auto" },
  depositWithdrawContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    mt: 2,
  },
  depositWithdrawIcon: { width: "30px", height: "30px" },
  referralLinkContainer: {
    background: "#3A3A3A",
    padding: "15px 15px",
    borderRadius: "5px",
    mt: 4,
  },
  referralLinkTitle: {
    color: "white !important",
    fontSize: "14px",
    fontWeight: "500 !important",
  },
  referralLinkInputContainer: { alignItems: "center" },
  referralLinkInput: { width: "100%" },
  referralLinkButton: { marginLeft: 2 },
  socialButtonsContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    mt: 4,
  },
  telegramButton: {
    fontSize: "14px",
    color: "white !important",
    textTransform: "capitalize",
    fontWeight: "400",
  },
  supportButton: {
    fontSize: "14px",
    color: "white !important",
    textTransform: "capitalize",
    fontWeight: "400",
  },
  socialButtonIcon: {
    margin: "auto",
    background: "white",
    borderRadius: "50%",
    width: "25px",
    height: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  socialIcon: { fontSize: "20px", "&>path": { color: "#6da7f4 !important" } },
  socialIconinfo: {
    fontSize: "20px",
    margin: "auto",
    "&>path": { color: "white !important" },
  },
  socialButtonText: {
    color: "white !important",
    textTransform: "capitalize",
    fontWeight: "400",
    fontSize: "14px",
  },
  gameImage: {
    width: "90px",
    height: "80px",
    position: "absolute",
    top: "-20px",
    right: "0px",
  },
  gameTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "white !important",
    transition: "all 0.3s",
  },
  gameDescription: {
    fontSize: "15px",
    fontWeight: "400",
    color: "white !important",
    mt: 2,
    transition: "all 0.3s",
  },
  userImage: { width: "50px", height: "50px" },
};
