import { Diversity2Outlined } from "@mui/icons-material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import RedeemIcon from "@mui/icons-material/Redeem";
import StoreIcon from "@mui/icons-material/Store";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import * as React from "react";
import { NavLink } from "react-router-dom";
import { zubgback, zubgbackgrad, zubgmid, zubgtext } from "../../Shared/color";
import Layout from "../../component/Layout/Layout";

function MainPageOFIncome() {
  const data_array = [
    {
      to: "/account/income-main/deposit-bonus",
      name: "Deposit Self Income",
      logo: <PriceCheckIcon className="!w-[40px] !h-[40px] !text-white" color="#8f5206" />,
    },
    {
      to: "/account/income-main/referral-bonus",
      name: "Sponsor Income",
      logo: <RedeemIcon className="!w-[40px] !h-[40px] !text-white" color="#8f5206" />,
    },
    {
      to: "/account/income-main/daily-salary-bonus",
      name: "Daily Salary",
      logo: <AccountBalanceIcon className="!w-[40px] !h-[40px] !text-white" color="#8f5206" />,
    },
    {
      to: "/account/income-main/self-trading-bonus",
      name: "Self Trade Income",
      logo: <StoreIcon className="!w-[40px] !h-[40px] !text-white" color="#8f5206" />,
    },
    {
      to: "/account/income-main/weekly-bonus",
      name: "Weekly Salary Income",
      logo: <Diversity2Outlined className="!w-[40px] !h-[40px] !text-white" color="#8f5206" />,
    },
    {
      to: "/account/income-main/team-trading-bonus",
      name: "Level Income",
      logo: <CardGiftcardIcon className="!w-[40px] !h-[40px] !text-white" color="#8f5206" />,
    },
  ];

  return (
    <Layout>
      <Container
        sx={{
          background: zubgback,
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 5,
        }}
      >
        <Box
          sx={{
            width: "100%",
            borderRadius: "10px",
            // background: zubgtext,
          
          }}
        >
         <Typography className="!bg-red-600 p-3 "
          variant="body1" color="initial" sx={{ color: "white", fontSize: "20px", fontWeight: "600" }}>
            Income
          </Typography>
        

          <TableContainer  className="!bg-blue-400">
            <Table >
              <TableHead>
                <TableRow>
                <TableCell className="!border !text-xs !border-r !border-white  !text-center" sx={{ color: "white", fontWeight: "600" }}>S.No</TableCell>
                  <TableCell className="!border !text-xs !border-r !border-white  !text-center" sx={{ color: "white", fontWeight: "600" }}>Icon</TableCell>
                  <TableCell className="!border !text-xs !border-r !border-white  !text-center"  sx={{ color: "white", fontWeight: "600" }}>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data_array.map((item ,index) => (
                  <TableRow key={item.name}>
                    <TableCell className="!border !text-xs !border-r !border-white  !text-center">
                      <NavLink style={{ textDecoration: 'none', color: 'white' }}>
                        {index+1}
                      </NavLink>
                    </TableCell>
                    <TableCell className="!border !text-xs !border-r !border-white  !text-center">
                      <NavLink to={item.to} style={{ textDecoration: '', color: 'white' }}>
                        {item.name}
                      </NavLink>
                    </TableCell>
                    <TableCell className="!border !text-xs !border-r !border-white  !text-center">
                      <NavLink to={item.to}>
                        {item.logo}
                      </NavLink>
                    </TableCell>
                  
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Layout>
  );
}

export default MainPageOFIncome;


const style = {
  header: {
    padding: "15px 8px",
    background: zubgback,
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
    background: zubgbackgrad,
    color: "white !important",
    width: "100%",
    mt: 2,
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
