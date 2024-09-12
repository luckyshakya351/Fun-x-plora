import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
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
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import {
  zubgback,
  zubgbackgrad,
  zubgmid,
  zubgshadow,
  // zubgtext,
} from "../../../Shared/color";
import deposit from "../../../assets/check.png";
import Layout from "../../../component/Layout/Layout";
import { withdrawlHistoryFunction } from "../../../services/apicalling";
import theme from "../../../utils/theme";
let zubgtext = "#546476"

function WithdravalHistory() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const { isLoading, data } = useQuery(
    ["deposit_history"],
    () => withdrawlHistoryFunction(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const res = data?.data?.data?.filter((i) => i?.type === "Winzo");
  return (
    <Layout>
      <Container
        sx={{
          background: theme.palette.secondary.main,
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 5,
        }}
        className="no-scrollbar "
      >
        <CustomCircularProgress isLoading={isLoading} />
        <Box sx={style.header}>
          <Box component={NavLink} onClick={goBack}>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1">Withdrawl history</Typography>
          <Box></Box>
        </Box>

        <Box>
          <Box
            sx={{
              padding: "10px",
              borderRadius: "10px",
              mb: 5,
              mt: 3,
            }}
            className={"!text-sm"}
          >
            <Stack direction="row" sx={{ alignItems: "center", mb: 3 }}>
              <Box component="img" src={deposit} width={30}></Box>
              <Typography
                variant="body1"
                sx={{ fontSize: "15px ", color: "white", ml: "10px" }}
              >
                Withdrawal history
              </Typography>
            </Stack>
            {res?.map((i) => {
              return (
                <Box
                  sx={{
                    mb: 2,
                    padding: "15px",
                    borderRadius: "10px",
                    // background: theme.palette.secondary.light,
                    background:"white",
                    boxShadow: zubgshadow,
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{
                      paddingBottom: "5",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: "1px solid white",
                    }}
                  >
                    <Box>
                      <Button
                        sx={{
                          // background: theme.palette.primary.light,
                          // background:""
                          color: "white",
                          textTransform: "capitalize",
                        }}
                        className="!bg-rose-500"
                      >
                        Withdraw
                      </Button>
                    </Box>
                    <Box>
                      <Button
                        sx={{ color: "green", textTransform: "capitalize" }}
                        className={`${
                          i?.status === "Success"
                            ? "!text-green-500"
                            : "!text-rose-500"
                        }`}
                      >
                        {i?.status}
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
                    // className="!text-[5px]"
                  >
                    <Typography variant="body1" className="!text-[13px]">Balance</Typography>
                    <Typography variant="body1" className="!text-yellow-500 !text-[13px]">₹ {i?.amount}</Typography>
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
                    <Typography variant="body1" className="!text-[13px]">Req Time</Typography>
                    <Typography variant="body1" className="!text-[13px]">
                      {moment(i?.date)?.format("DD-MM-YYYY")}{" "}
                      {moment(i?.date)?.format("HH:mm:ss")}
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
                    <Typography variant="body1" className="!text-[13px]">Status</Typography>
                    <Typography variant="body1" className="!text-[13px]">{i?.status} </Typography>
                  </Stack>
                  {i?.approve_date !== null && i?.approve_date !== "" && (
                    <Stack
                      direction="row"
                      sx={{
                        mb: "5px",
                        alignItems: "center",
                        justifyContent: "space-between",
                        "&>p": { color: zubgtext },
                      }}
                    >
                      <Typography variant="body1" className="!text-[13px]">Success Time</Typography>
                      <Typography variant="body1" sx={{color:zubgtext}} className="!text-[13px]">
                        {moment(i?.approve_date)?.format("DD-MM-YYYY")}{" "}
                        {moment(i?.approve_date)?.format("HH:mm:ss")}
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
                    <Typography variant="body1" className="!text-[13px]">Trans number</Typography>
                    <Typography variant="body1" className="!text-gray-400 !text-[13px]">{i?.tran_id}</Typography>

                    {/* <Stack
                      direction="row"
                      sx={{
                        mb: "5px",
                        alignItems: "center",
                        justifyContent: "space-between",
                        "&>p": { color: zubgtext },
                      }}
                    >
                      <Typography variant="body1" className="!text-gray-400 !text-[13px]">{i?.tran_id}</Typography>
                      <IconButton>
                        <ContentCopyIcon  fontSize="small" sx={{ color: zubgtext }} />
                      </IconButton>
                    </Stack> */}
                  </Stack>
                </Box>
              );
            })}
            {/* <Button sx={style.paytmbtntwo}>All history</Button> */}
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export default WithdravalHistory;

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
    background: zubgmid,
    borderRadius: "10px",
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
    background: zubgmid,
    borderRadius: "10px",
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
    mb: "5px",
    alignItems: "center",
    justifyContent: "start",
    "&>p": { marginLeft: "10px", color: "white !important", fontSize: "14px" },
  },
};
