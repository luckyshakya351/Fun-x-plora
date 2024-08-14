import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Container,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../Shared/CustomCircularProgress";
import {
  zubgback,
  zubggray,
  zubgtext
} from "../../Shared/color";
import bgms from "../../assets/images/bgs.jpg";
import rechargeIcon from "../../assets/images/new/download (8).png";
import wdhistory from "../../assets/images/new/download (9).png";
import deposite from "../../assets/images/new/download (10).png";
import wallet from "../../assets/images/new/download (11).png";
import logo from "../../assets/funXplora-8-13-2024 (1).png";
import withdrow from "../../assets/images/withdraw.png";
import wallettransfer from "../../assets/images/new/download (12).png";
import wallettransfer1 from "../../assets/images/new/download (13).png";
import d14 from "../../assets/images/new/download (14).png";

import sunlotteryhomebanner from "../../assets/sunlotteryhomebanner.jpg";
import Layout from "../../component/Layout/Layout";
import { walletamount } from "../../services/apicalling";
import theme from "../../utils/theme";

function Wallet() {

  const net_wallet_amount = useSelector(
    (state) => state.aviator.net_wallet_amount
  );
  const navigate = useNavigate();

  const [openDialogBoxHomeBanner, setopenDialogBoxHomeBanner] =
    React.useState(false);

  const { isLoading, data } = useQuery(["walletamount"], () => walletamount(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    retryOnMount: false,
    refetchOnWindowFocus: false
  });
  const amount = data?.data?.data || 0;

  const series = [(Number(Number(amount?.wallet || 0) % 100) || 0)?.toFixed(2),]
  const series2 = [(Number(Number(amount?.winning || 0) % 100) || 0)?.toFixed(2),];
  const series1 = [(Number(Number(amount?.working_wallet || 0) % 100) || 0)?.toFixed(2),];

  const [options] = React.useState({
    colors: ["#E71D1E", "red", "green"],
    chart: {
      height: 150,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "11px",
          },
          value: {
            fontSize: "16px",
          },
        },
        stroke: {
          colors: ["#E71D1E"],
        },
      },
      radialBar: {
        dataLabels: {
          show: false,
        },
      },
    },
    labels: ["0.40%", "B", "C", "D"],
  });

  return (
    <Layout>
      <Container
        className="no-scrollbar"
        sx={{
          background: '#0D0335',
          width: "100%",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Box sx={style.header}>
          <Box component={NavLink} onClick={() => navigate(-1)}>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Box
            component="img"
            src={logo}
            sx={{ width: "45%", height: "100%", mt: 1 }}
          ></Box>
          <Box component={NavLink} onClick={() => navigate(-1)}></Box>
        </Box>

        {/*  */}
        <Box
          sx={{
            pt: 2,
            width: "95%",
            marginLeft: "2.5%",
            marginTop: "20px",
            borderRadius: "10px ",
            background: '#63BA0E',
            border: '1px solid #63BA0E',
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: '100%',
            }}
          >
            {/* <div class="container">
              <div class="circles">
                <div class="circle circle-1"></div>
                <div class="circle circle-2"></div>
              </div>

              <div class="card">
                <div class="visa_logo">
                  <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png" alt="" />
                </div>
                <div class="visa_info">
                  <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png" alt="" />
                  <p>4586 7985 9271 6388</p>
                </div>
                <div class="visa_crinfo">
                  <p>02/12</p>
                  <p>Nikhil Bobade</p>
                </div>
              </div>
            </div> */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: '100%'
              }}
              className="walletBox"
            >
              <Box component="img" src={wallet} width={50} sx={{ filter: 'brightness(0.1)' }}></Box>
              <Typography variant="h2" color="initial" sx={{ color: 'white' }}>
                ₹ {Number(
                  Number(amount?.wallet || 0) + Number(amount?.winning || 0)
                )?.toFixed(2)}

              </Typography>
              <Typography
                variant="body1"
                color="initial"
                sx={{ color: 'white' }}
              >
                Total balance
              </Typography>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ width: '100%', padding: 2 }}>
                <div class="visa_info">
                  <img style={{ width: '50px' }} src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png" alt="" />
                </div>
                <div class="visa_logo">
                  <img style={{ width: '50px' }} src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png" alt="" />
                </div>
              </Stack>
            </Box>
          </Box>
        </Box>
        {/*  */}

        <Box className="wallet-track-box">
          <Stack
            direction="row"
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "10px",
            }}
          >

            <Stack
              direction="row"
              sx={{
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                background: theme.palette.secondary.light,
                pb: 2,
                borderRadius: '10px',
              }}
            >
              <Box sx={{ width: "50%", position: "relative" }}>

                <Typography

                  variant="body1"
                  color="initial"
                  sx={{
                    position: "absolute",
                    left: "39%",
                    top: "32%",
                    fontSize: "15px",
                    fontWeight: "400",
                    color: "white",
                    textAlign: 'center !important',
                    ml: '-3%',
                    mt: '5%',
                  }}
                >
                  {series}%
                </Typography>

                <ReactApexChart
                  options={options}
                  series={series}
                  type="radialBar"
                  height={150}

                />
                <Box
                  sx={{
                    textAlign: "center",
                    "&>p": { fontSize: "13px", fontWeight: 500 },
                  }}
                >
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ color: "white", fontWeight: "600" }}
                  >
                    {amount?.wallet}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ color: "white", fontWeight: "600" }}
                  >
                    Bonus Amount
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ width: "50%", position: "relative" }}>
                <Typography

                  variant="body1"
                  color="initial"
                  sx={{
                    position: "absolute",
                    left: "39%",
                    top: "32%",
                    fontSize: "15px",
                    fontWeight: "400",
                    color: "white",
                    ml: '-3%',
                    mt: '5%',
                  }}
                >
                  {series1}%
                </Typography>
                <ReactApexChart
                  options={options}
                  series={series1}
                  type="radialBar"
                  height={150}

                />
                <Box
                  sx={{
                    textAlign: "center",
                    "&>p": { fontSize: "13px", fontWeight: 500 },
                  }}
                >
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ color: "white", fontWeight: "600" }}
                  >
                    {amount?.working_wallet}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ color: "white", fontWeight: "600" }}
                  >
                    Working Amount
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ width: "50%", position: "relative" }}>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{
                    position: "absolute",
                    color: "white",
                    left: "40%",
                    top: "32%",
                    fontSize: "15px",
                    fontWeight: "400",
                    ml: '-3%',
                    mt: '5%',
                  }}
                >
                  {series2}%
                </Typography>
                <ReactApexChart
                  options={options}
                  series={series2}
                  type="radialBar"
                  height={150}
                />
                <Box
                  sx={{
                    textAlign: "center",
                    "&>p": { fontSize: "13px", fontWeight: 500 },
                  }}
                >
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ color: "white", fontWeight: "600" }}
                  >
                    {amount?.winning}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ color: "white", fontWeight: "600", fontSize: '11px' }}
                  >
                    Winning Amount
                  </Typography>
                </Box>
              </Box>
            </Stack>

          </Stack>

          <div className="!mb-20" style={{ background: theme.palette.secondary.light, padding: '5px', borderRadius: '10px', marginTop: '16px' }}>
            <Box sx={{
              display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', '&>a': { width: '33%', },
              '&>a>div': { display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', alignItems: 'center', padding: '5px' },
              'a>div>p': { textAlign: 'center', fontSize: '13px', color: 'white' },
              '&>a>div>img': { width: '30px', filter: 'hue-rotate(45deg)' },
            }}>
              <NavLink to="/wallet/Recharge">
                <div className=" " >
                  <p className=" mt-4">Deposit</p>
                  <Box component="img" src={rechargeIcon} width={50}></Box>
                </div>
              </NavLink>
              <NavLink to="/Withdrawal">
                <div className=" " >
                  <p className=" mt-4">Withdrawal</p>
                  <Box component="img" src={wallettransfer1} className="!text-blue-600" width={50}></Box>
                </div>
              </NavLink>
              <NavLink to="/transfer">
                <div className=" " >
                  <p className=" mt-4">W to M Wallet Transfer </p>
                  <Box component="img" src={wallettransfer} width={50}></Box>
                </div>
              </NavLink>
              <NavLink to="/transferhistory">
                <div className=" " >
                  <p className=" mt-4">W to M Wallet Transfer History </p>
                  <Box component="img" src={wallettransfer1} width={50}></Box>
                </div>
              </NavLink>
              <NavLink to="/depositHistory">
                <div className=" " >
                  <p className=" mt-4">Deposit history</p>
                  <Box component="img" src={d14} width={50}></Box>
                </div>
              </NavLink>
              <NavLink to="/withdravalHistory">
                <div className=" " >
                  <p className=" mt-4">Withdrawal history</p>
                  <Box component="img" src={deposite} width={50}></Box>
                </div>
              </NavLink>
              <NavLink to="/depositusdt">
                <div className=" " >
                  <p className=" mt-4">Deposit USDT history</p>
                  <Box component="img" src={d14} width={50}></Box>
                </div>
              </NavLink>
            </Box>
          </div>
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

export default Wallet;

const style = {
  header: {
    padding: "5px 8px",
    background: theme.palette.primary.light,
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
    width: "31%",
    minHeight: "15vh",
    background: zubggray,
    borderRadius: "10px",
    mb: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&>div>p": { color: "white", fontWeight: 600 },
  },
};
