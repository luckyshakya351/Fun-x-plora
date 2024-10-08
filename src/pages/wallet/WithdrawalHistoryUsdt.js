import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import * as React from "react";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../Shared/CustomCircularProgress";
import { zubgback, zubgbackgrad, zubgmid } from "../../Shared/color";
import deposit from "../../assets/check.png";
import Layout from "../../component/Layout/Layout";
import { withdrawlHistoryUSdtFunction } from "../../services/apicalling";
import theme from "../../utils/theme";
let zubgtext = "#546476";
function WithdrawalHistoryUSdt() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const { isLoading, data } = useQuery(
    ["withdrwal_history"],
    () => withdrawlHistoryUSdtFunction(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const res = data?.data?.data || [];

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
        className="no-scrollbar"
      >
        <CustomCircularProgress isLoading={isLoading} />
        <Box sx={style.header}>
          <Box component={NavLink} onClick={goBack}>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1" sx={{ color: "white" }}>
            Withdrawal USDT history
          </Typography>
          <Box></Box>
        </Box>

        <Box>
          <Box
            sx={{
              padding: "5px",
              // background: zubgwhite,
              // boxShadow: zubgshadow,
              borderRadius: "5px",
              mb: 5,
              mt: 3,
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center", mb: "20px" }}>
              <Box component="img" src={deposit} width={30}></Box>
              <Typography
                variant="body1"
                color="initial"
                sx={{ fontSize: "15px ", color: zubgtext, ml: "5px" }}
              >
                Withdrawal USDT history
              </Typography>
            </Stack>
            {res?.map((i) => {
              return (
                <Box
                  sx={{
                    mb: 2,
                    padding: "15px",
                    borderRadius: "5px",

                    // background: theme.palette.secondary.light,
                    background: "white",
                    // boxShadow: zubgshadow,
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{
                      paddingBottom: "5px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: "1px solid white",
                    }}
                  >
                    <Box></Box>
                    <Box>
                      <Button
                        sx={{ color: "green", textTransform: "capitalize" }}
                        className={`${
                          i?.m_w_status === "Approve"
                            ? "!text-green-500 !text-[13px]"
                            : "!text-rose-500 !text-[13px]"
                        }`}
                      >
                        {i?.m_w_status}
                      </Button>
                      <IconButton>
                        <ArrowForwardIcon sx={{ color: zubgtext }} />
                      </IconButton>
                    </Box>
                  </Stack>
                  <Stack
                    direction="row"
                    sx={{
                      mb: "5px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: zubgtext },
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="initial"
                      className="!text-[13px]"
                    >
                      Status
                    </Typography>
                    <Typography
                      variant="body1"
                      color="initial"
                      className={`!text-[13px] ${
                        i?.m_w_crypto_status === "Complete" && "!text-green-400"
                      }`}
                    >
                      {i?.m_w_crypto_status}{" "}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    sx={{
                      mb: "5px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: zubgtext },
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="initial"
                      className="!text-[13px]"
                    >
                      Balance
                    </Typography>
                    <Typography
                      variant="body1"
                      color="initial"
                      className="!text-[13px] !text-yellow-500"
                    >
                      {/* ₹  */}
                      {i?.m_w_amount}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    sx={{
                      mb: "5px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: zubgtext },
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="initial"
                      className="!text-[13px]"
                    >
                      Date/Time
                    </Typography>
                    <Typography
                      variant="body1"
                      color="initial"
                      className="!text-[13px]"
                    >
                      {moment(i?.m_w_reqdate)?.format("DD-MM-YYYY")}{" "}
                      {moment(i?.m_w_reqdate)?.format("HH:mm:ss")}
                    </Typography>
                  </Stack>

                  {i?.success_date !== null && i?.success_date !== "" && (
                    <Stack
                      direction="row"
                      sx={{
                        mb: "5px",
                        alignItems: "center",
                        justifyContent: "space-between",
                        "&>p": { color: zubgtext },
                      }}
                    >
                      <Typography
                        variant="body1"
                        color="initial"
                        className="!text-[13px]"
                      >
                        Success D/T
                      </Typography>
                      <Typography
                        variant="body1"
                        color="initial"
                        className="zubgtext !text-[13px]"
                      >
                        {moment(i?.success_date)?.format("DD-MM-YYYY")}{" "}
                        {moment(i?.success_date)?.format("HH:mm:ss")}
                      </Typography>
                    </Stack>
                  )}
                  <Stack
                    direction="row"
                    sx={{
                      mb: "5px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: zubgtext },
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="initial"
                      className="!text-[13px]"
                    >
                      Trans number
                    </Typography>
                    <Stack
                      direction="row"
                      sx={{
                        mb: "5px",
                        alignItems: "center",
                        justifyContent: "space-between",
                        "&>p": { color: zubgtext },
                      }}
                    >
                      <Typography
                        variant="body1"
                        color="initial"
                        className="!text-[13px]"
                      >
                        {i?.m_w_trans_id}
                      </Typography>

                      {/* <IconButton>
                        <ContentCopyIcon sx={{ color: zubgtext }} />
                      </IconButton> */}
                    </Stack>
                  </Stack>
                  <Stack
                    direction="row"
                    sx={{
                      mb: "5px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: zubgtext },
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="initial"
                      className="!text-[13px]"
                    >
                      Address
                    </Typography>
                    <Stack
                      direction="row"
                      sx={{
                        mb: "5px",
                        alignItems: "center",
                        justifyContent: "space-between",
                        "&>p": { color: zubgtext },
                      }}
                    >
                      <Typography
                        variant="body1"
                        color="initial"
                        className="!text-[13px] !text-[#b7aeb5]"
                      >
                        <p> {i?.withdrawal_add?.substring(0, 20)}</p>
                        <p>{i?.withdrawal_add?.substring(20)}</p>
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export default WithdrawalHistoryUSdt;

const style = {
  header: {
    padding: "15px 8px",
    background: "#63BA0E",
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
    background: "#63BA0E",
    borderRadius: "5px",
    mb: "5px",
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
    background: "#63BA0E",
    borderRadius: "5px",
    mb: "5px",
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
    my: "5px",
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
    padding: "5px",
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
    padding: "5px",
    "&:hover": { background: zubgbackgrad, border: "1px solid transparent" },
  },
  rechargeinstext: {
    mb: "5px",
    alignItems: "center",
    justifyContent: "start",
    "&>p": { marginLeft: "5px", color: "white !important", fontSize: "14px" },
  },
};
