import { Star } from "@mui/icons-material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { Box, Container, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import * as React from "react";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { zubgback, zubggray, zubgshadow, zubgtext, zubgwhite } from "../../../Shared/color";
import Layout from "../../../component/Layout/Layout";
import { MygetdataFn } from "../../../services/apicalling";
import { rupees } from "../../../services/urls";
function TeamData() {
  const { isLoading, data } = useQuery(
    ["get_level"],
    () => MygetdataFn(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  );
  const result = data?.data?.data;

  const level1Count = result?.filter(entry => entry.LEVEL === 1).length || 0;
  const levelOneWithDeposit = result?.filter(level => level.LEVEL === 1 && Number(level.deposit_amount) > 0);
  const total_deposit = levelOneWithDeposit?.reduce((a, b) => a + Number(b?.deposit_amount || 0), 0)
  const level1Data = result?.filter(item => item.LEVEL === 1) || [];

  const level2Count = result?.filter(entry => entry.LEVEL === 2).length || 0;
  const levelTwoWithDeposit = result?.filter(level => level.LEVEL === 2 && Number(level.deposit_amount) > 0);
  const to_deposit = levelTwoWithDeposit?.reduce((a, b) => a + Number(b?.deposit_amount || 0), 0)
  const level2Data = result?.filter(item => item.LEVEL === 2) || [];

  const level3Count = result?.filter(entry => entry.LEVEL === 3).length || 0;
  const level3WithDeposit = result?.filter(level => level.LEVEL === 3 && Number(level.deposit_amount) > 0);
  const three_deposit = level3WithDeposit?.reduce((a, b) => a + Number(b?.deposit_amount || 0), 0)
  const level3Data = result?.filter(item => item.LEVEL === 3) || [];

  const level4Count = result?.filter(entry => entry.LEVEL === 4).length || 0;
  const level4WithDeposit = result?.filter(level => level.LEVEL === 4 && Number(level.deposit_amount) > 0);
  const four_deposit = level4WithDeposit?.reduce((a, b) => a + Number(b?.deposit_amount || 0), 0)
  const level4Data = result?.filter(item => item.LEVEL === 4) || [];
 
  const level5Count = result?.filter(entry => entry.LEVEL === 5).length || 0;
  const level5WithDeposit = result?.filter(level => level.LEVEL === 5 && Number(level.deposit_amount) > 0);
  const five_deposit = level5WithDeposit?.reduce((a, b) => a + Number(b?.deposit_amount || 0), 0)
  const level5Data = result?.filter(item => item.LEVEL === 5) || [];

  const level6Count = result?.filter(entry => entry.LEVEL === 6).length || 0;
  const level6WithDeposit = result?.filter(level => level.LEVEL === 6 && Number(level.deposit_amount) > 0);
  const Six_deposit = level6WithDeposit?.reduce((a, b) => a + Number(b?.deposit_amount || 0), 0)
  const level6Data = result?.filter(item => item.LEVEL === 6) || [];

 
  return (
    <Layout>
      <Container
        sx={{
          background: zubgback,
          width: "100%",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <CustomCircularProgress isLoading={isLoading} />
        <Box sx={style.header}>
          <Box component={NavLink} to="/promotion/">
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1" color="initial">
            Team data
          </Typography>
          <Typography variant="body1" color="initial">
            {" "}
          </Typography>
        </Box>
        {

          <Accordion className="!rounded-lg">
            <AccordionSummary
              expandIcon={<Star className="!text-white" />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ background: zubgtext, color: "white" }}
            >
              <div className="w-full grid grid-cols-3 pr-2">
                <span className="">Levels</span>
                <p className="">Members</p>
                <p className="">Deposit Amount</p>
              </div>
            </AccordionSummary>
          </Accordion>
        }
        {
          <Box sx={{ width: '95%', margin: '10px 2.5% 10px 2.5%', }}>
            <Accordion className="!rounded-lg" >
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon className="!text-white" />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{ background: zubggray, color: "white", borderRadius: '5px' }}
              >
                <div className="w-full grid grid-cols-3 pr-2">
                  <span className="">Level: 1</span>
                  <p className="">{level1Count || 0}</p>
                  <p className="">
                    {rupees}{" "}
                    <span className="text-green-200">
                      {total_deposit|| 0}
                    </span>{" "}
                  </p>
                </div>
              </AccordionSummary>
              <AccordionDetails sx={{ background: zubgwhite, boxShadow: zubgshadow, color: "white" }}>
                <Box >
                  <Box sx={style.accordian}>
                    <div style={{ color: 'white', borderBottom: '2px solid red', padding: '10px', }} className="!grid !grid-cols-3    ">
                      <span>S.No.</span>
                      <span>User Id</span>
                      <span className="">Name</span>
                    </div>
                    <div className="h-[2px] w-full "></div>
                    {level1Data?.map((i, index) => {
                      return (
                        <div style={{  background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
                          <span>{index + 1}</span>
                          <span className=" ">
                            {i?.id || "No data found"}
                          </span>
                          <span className=" ">
                            {i?.full_name || "No data found"}
                          </span>
                        </div>
                      );
                    })}
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        }
         {
    <Box sx={{ width: '95%', margin: '10px 2.5% 10px 2.5%', }}>
      <Accordion className="!rounded-lg">
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon className="!text-white" />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ background: zubggray, color: "white", borderRadius: '5px' }}
        >
          <div className="w-full grid grid-cols-3 pr-2">
            <span className="">Level: 2</span>
            <p className="">{level2Count|| 0}</p>
            <p className="">
              {rupees}{" "}
              <span className="text-green-200">
                {to_deposit || 0}
              </span>{" "}
            </p>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ background: zubgwhite, boxShadow: zubgshadow, color: "white" }}>
          <Box >
            <Box sx={style.accordian}>
              <div style={{
                color: 'white', borderBottom: '2px solid red', padding: '10px',
              }} className="!grid !grid-cols-3    ">
                <span> S.No.</span>
                <span>User Id</span>
                <span className="">Name</span>
              </div>
              {level2Data?.map((i, index) => {
                return (
                  <div style={{ background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
                    <span>{index + 1}</span>
                    <span>{i?.id}</span>
                    <span className=" ">
                      {i?.full_name || "No data found"}
                    </span>
                  </div>
                );
              })}
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  }  {
    <Box sx={{ width: '95%', margin: '10px 2.5% 10px 2.5%', }}>
      <Accordion className="!rounded-lg">
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon className="!text-white" />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ background: zubggray, color: "white", borderRadius: '5px' }}
        >
          <div className="w-full grid grid-cols-3 pr-2">
            <span className="">Level: 3</span>
            <p className="">{level3Count|| 0}</p>
            <p className="">
              {rupees}{" "}
              <span className="text-green-200">
                {three_deposit || 0}
              </span>{" "}
            </p>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ background: zubgwhite, boxShadow: zubgshadow, color: "white" }}>
          <Box >
            <Box sx={style.accordian}>
              <div style={{
                color: 'white', borderBottom: '2px solid red', padding: '10px',
              }} className="!grid !grid-cols-3    ">
                <span> S.No.</span>
                <span>User Id</span>
                <span className="">Name</span>
              </div>
              {level3Data?.map((i, index) => {
                return (
                  <div style={{ background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
                    <span>{index + 1}</span>
                    <span>{i?.id}</span>
                    <span className=" ">
                      {i?.full_name || "No data found"}
                    </span>
                  </div>
                );
              })}
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  }
     {
    <Box sx={{ width: '95%', margin: '10px 2.5% 10px 2.5%', }}>
      <Accordion className="!rounded-lg">
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon className="!text-white" />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ background: zubggray, color: "white", borderRadius: '5px' }}
        >
          <div className="w-full grid grid-cols-3 pr-2">
            <span className="">Level: 4</span>
            <p className="">{level4Count|| 0}</p>
            <p className="">
              {rupees}{" "}
              <span className="text-green-200">
                {four_deposit || 0}
              </span>{" "}
            </p>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ background: zubgwhite, boxShadow: zubgshadow, color: "white" }}>
          <Box >
            <Box sx={style.accordian}>
              <div style={{
                color: 'white', borderBottom: '2px solid red', padding: '10px',
              }} className="!grid !grid-cols-3    ">
                <span> S.No.</span>
                <span>User Id</span>
                <span className="">Name</span>
              </div>
              {level4Data?.map((i, index) => {
                return (
                  <div style={{ background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
                    <span>{index + 1}</span>
                    <span>{i?.id}</span>
                    <span className=" ">
                      {i?.full_name || "No data found"}
                    </span>
                  </div>
                );
              })}
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  }
   {
    <Box sx={{ width: '95%', margin: '10px 2.5% 10px 2.5%', }}>
      <Accordion className="!rounded-lg">
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon className="!text-white" />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ background: zubggray, color: "white", borderRadius: '5px' }}
        >
          <div className="w-full grid grid-cols-3 pr-2">
            <span className="">Level: 5</span>
            <p className="">{level5Count|| 0}</p>
            <p className="">
              {rupees}{" "}
              <span className="text-green-200">
                {five_deposit || 0}
              </span>{" "}
            </p>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ background: zubgwhite, boxShadow: zubgshadow, color: "white" }}>
          <Box >
            <Box sx={style.accordian}>
              <div style={{
                color: 'white', borderBottom: '2px solid red', padding: '10px',
              }} className="!grid !grid-cols-3    ">
                <span> S.No.</span>
                <span>User Id</span>
                <span className="">Name</span>
              </div>
              {level5Data?.map((i, index) => {
                return (
                  <div style={{ background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
                    <span>{index + 1}</span>
                    <span>{i?.id}</span>
                    <span className=" ">
                      {i?.full_name || "No data found"}
                    </span>
                  </div>
                );
              })}
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  }
   {
    <Box sx={{ width: '95%', margin: '10px 2.5% 10px 2.5%', }}>
      <Accordion className="!rounded-lg">
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon className="!text-white" />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ background: zubggray, color: "white", borderRadius: '5px' }}
        >
          <div className="w-full grid grid-cols-3 pr-2">
            <span className="">Level: 6</span>
            <p className="">{level6Count|| 0}</p>
            <p className="">
              {rupees}{" "}
              <span className="text-green-200">
                {Six_deposit || 0}
              </span>{" "}
            </p>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ background: zubgwhite, boxShadow: zubgshadow, color: "white" }}>
          <Box >
            <Box sx={style.accordian}>
              <div style={{
                color: 'white', borderBottom: '2px solid red', padding: '10px',
              }} className="!grid !grid-cols-3    ">
                <span> S.No.</span>
                <span>User Id</span>
                <span className="">Name</span>
              </div>
              {level6Data?.map((i, index) => {
                return (
                  <div style={{ background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
                    <span>{index + 1}</span>
                    <span>{i?.id}</span>
                    <span className=" ">
                      {i?.full_name || "No data found"}
                    </span>
                  </div>
                );
              })}
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  }
      </Container>
    </Layout>
  );
}

export default TeamData;

const style = {
  header: {
    padding: "15px 8px",
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
  accordian: {
    backgroundColor: zubgwhite,
    "&>div": { mb: 1 },
    "&>div>div:nth-child(1)": {
      borderRight: "1px solid black",
    },
    "&>div>div:nth-child(2)": {
    },
    "&>div>div>p": {
      color: "white",
      fontSize: "14px",
      fontWeight: 500,
    },
  },
};
