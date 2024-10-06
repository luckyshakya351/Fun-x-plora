import { Edit } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HistoryIcon from "@mui/icons-material/History";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import PagesIcon from "@mui/icons-material/Pages";
import { Box, Container, IconButton, Typography } from "@mui/material";
import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import {
  zubgback,
  zubgbackgrad,
  zubgmid,
  zubgtext,
} from "../../../Shared/color";
import Layout from "../../../component/Layout/Layout";
import theme from "../../../utils/theme";
function UserUpdates() {
  const navigate = useNavigate();
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
        {/* <CustomCircularProgress isLoading={loding} /> */}
        <Box sx={style.header}>
          <Box component={NavLink} onClick={() => navigate(-1)}>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1" sx={{ color: "white" }}>
            User Updates
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
            className={"!grid !grid-cols-4 !place-items-center !gap-y-2"}
          >
            <div className="!flex flex-col !w-[40px] items-center">
              <IconButton
                className="!bg-blue-500"
                onClick={() => navigate("/block-user")}
              >
                <Edit className="!text-white" />
              </IconButton>
              <span className="!text-white !text-[12px]">Password</span>
            </div>
            <div className="!flex flex-col !w-[40px] items-center">
              <IconButton
                className="!bg-blue-500"
                onClick={() => navigate("/add-fund-to-user")}
              >
                <AddCircleOutlineIcon className="!text-white" />
              </IconButton>
              <span className="!text-white !text-[12px]">Fund</span>
            </div>
            <div className="!flex flex-col !w-[40px] items-center">
              <IconButton
                className="!bg-blue-500"
                onClick={() => navigate("/get-details")}
              >
                <PagesIcon className="!text-white" />
              </IconButton>
              <span className="!text-white !text-[12px]">Details</span>
            </div>
            <div className="!flex flex-col !w-[40px] items-center">
              <IconButton
                className="!bg-blue-500"
                onClick={() => navigate("/user-tickets-rep")}
              >
                <ConfirmationNumberIcon className="!text-white" />
              </IconButton>
              <span className="!text-white !text-[12px]">Tickets</span>
            </div>
            <div className="!flex flex-col !w-[40px] items-center">
              <IconButton
                className="!bg-blue-500"
                onClick={() => navigate("/usdt-payin-req-admin")}
              >
                <CurrencyExchangeIcon className="!text-white" />
              </IconButton>
              <span className="!text-white !text-[12px]">USDT Deposit</span>
            </div>
            <div className="!flex flex-col !w-[40px] items-center">
              <IconButton
                className="!bg-blue-500"
                onClick={() => navigate("/usdt-payout-req-admin")}
              >
                <CurrencyExchangeIcon className="!text-white" />
              </IconButton>
              <span className="!text-white !text-[12px]">USDT Withdrawal</span>
            </div>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export default UserUpdates;

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
