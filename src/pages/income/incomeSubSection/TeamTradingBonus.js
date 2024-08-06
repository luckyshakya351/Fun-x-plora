import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { Box, Container, IconButton } from "@mui/material";
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
  zubgtext,
  zubgwhite,
} from "../../../Shared/color";
import nodatafoundimage from "../../../assets/images/nodatafoundimage.png";
import Layout from "../../../component/Layout/Layout";
import { team_trading_bonus_functoin } from "../../../services/apicalling";
function TeamTradingBonus() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const [filter, setFilter] = React.useState("0");
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const { isLoading, data } = useQuery(
    ["team_trading_bonus"],
    () => team_trading_bonus_functoin(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const res = React.useMemo(() => {
    if (startDate && endDate && filter) {
      return data?.data?.data?.filter(
        (i) =>
          moment(i?.l01_date)?.format("YYYY-MM-DD") >=
            moment(startDate)?.format("YYYY-MM-DD") &&
          moment(i?.l01_date)?.format("YYYY-MM-DD") <=
            moment(endDate)?.format("YYYY-MM-DD") &&
          i?.l01_transection_type?.includes(filter)
      );
    }
    return filter === "0"
      ? data?.data?.data
      : data?.data?.data?.filter((i) =>
          i?.l01_transection_type?.includes(filter)
        );
  }, [filter, data?.data?.data, startDate && endDate]);
  if (!isLoading && !res)
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
          <Box sx={style.header}>
            <Box component={NavLink} onClick={goBack}>
              <KeyboardArrowLeftOutlinedIcon />
            </Box>
            <p>Level Income</p>
          </Box>
          <div>
            <img className="" src={nodatafoundimage} />
          </div>
        </Container>
      </Layout>
    );
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
          <p>Level Income</p>
        </Box>
        <div
          className="!flex !w-fullpx-5 justify-between py-1 items-center"
          style={{ background: zubgwhite, boxShadow: zubgshadow }}
        >
          <div className="flex mx-1 flex-col">
            <label className="!text-sm "> Start Date:</label>
            <input
              value={startDate}
              type="date"
              className="px-1 rounded-sm"
              placeholder="Start Date"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          {filter !== "0" || (startDate && endDate) ? (
            <IconButton
              className="!pt-8"
              onClick={() => {
                setFilter("0");
                setStartDate();
                setEndDate();
              }}
            >
              <FilterAltOffIcon />{" "}
            </IconButton>
          ) : (
            <IconButton className="!pt-8">
              <FilterAltIcon />
            </IconButton>
          )}

          <div className="flex flex-col mx-1">
            <label className="!text-sm"> End Date:</label>
            <input
              value={endDate}
              type="date"
               className="px-1 rounded-sm"
              placeholder="Start Date"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div>
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="!w-full !flex !flex-col   !p-2 !rounded-lg !mt-2"
            style={{ background: zubgwhite, boxShadow: zubgshadow }}
          >
            <option value={"0"}>All </option>
            {[1, 2, 3, 4, 5, 6]?.map((i) => {
              return <option value={`Level ${i}`}>Level {i} </option>;
            })}
          </select>
        </div>

        <div className="no-scrollbar !mb-10">
          {res?.map((i) => {
            return (
              <div
                className="!w-full !flex !flex-col   !p-2 !rounded-lg !mt-2"
                style={{ background: zubgwhite, boxShadow: zubgshadow }}
              >
                <div className="!w-full !flex !justify-between">
                  <span style={{ color: zubgtext }}>
                    {i?.l01_transection_type}
                  </span>
                  <span className="!text-green-800 !text-lg">
                    {i?.l01_amount?.toFixed(2)}
                  </span>
                </div>
                <div className="!w-full !flex !justify-between">
                  <span style={{ color: zubgtext }}></span>
                  <span className="!text-yellow-600  !text-[12px]">
                    {moment(i?.l01_date)?.format("DD-MM-YYYY")}{" "}
                    {moment(i?.l01_date)?.format("HH:mm:ss")}
                  </span>
                </div>
                <div className="!w-full !flex !justify-between"></div>
              </div>
            );
          })}
        </div>
      </Container>
    </Layout>
  );
}

export default TeamTradingBonus;

const style = {
  header: {
    padding: "10px 8px",
    background: zubgtext,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "15px",
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
