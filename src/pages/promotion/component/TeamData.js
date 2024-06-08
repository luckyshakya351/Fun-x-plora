import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { Box, Container, Typography } from "@mui/material";
import * as React from "react";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { zubgback, zubggray, zubgmid, zubgshadow, zubgtext, zubgwhite } from "../../../Shared/color";
import Layout from "../../../component/Layout/Layout";
import { MypromotionDataFn } from "../../../services/apicalling";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { rupees } from "../../../services/urls";
import { Star } from "@mui/icons-material";
function TeamData() {
  const { isLoading, data } = useQuery(
    ["promotion_data"],
    () => MypromotionDataFn(),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  const result = data?.data?.data?.teamMembersByLevel;
  const all_data = data?.data?.data;

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
                  <p className="">{result?.level_1?.length || 0}</p>
                  <p className="">
                    {rupees}{" "}
                    <span className="text-green-200">
                      {all_data?.deposit_member_amount?.[0] || 0}
                    </span>{" "}
                  </p>
                </div>
              </AccordionSummary>
              <AccordionDetails sx={{ background: zubgwhite, boxShadow: zubgshadow, color: "white" }}>
                <Box >
                  <Box sx={style.accordian}>
                    <div style={{ color: 'white', borderBottom: '2px solid red', padding: '10px', borderBottom: '2px solid red', padding: '10px', }} className="!grid !grid-cols-3    ">
                      <span>S.No.</span>
                      <span>User Id</span>
                      <span className="">Name</span>
                    </div>
                    <div className="h-[2px] w-full "></div>
                    {result?.level_1?.map((i, index) => {
                      return (
                        <div style={{ color: 'white', background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
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
                  <p className="">{result?.level_2?.length || 0}</p>
                  <p className="">
                    {rupees}{" "}
                    <span className="text-green-200">
                      {all_data?.deposit_member_amount?.[1] || 0}
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
                      < span > S.No.</span>
                      <span>User Id</span>
                      <span className="">Name</span>
                    </div>
                    {result?.level_2?.map((i, index) => {
                      return (
                        <div style={{ color: 'white', background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
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
              </AccordionDetails >
            </Accordion >
          </Box >
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
                  <span className="">Level: 3</span>
                  <p className="">{result?.level_3?.length || 0}</p>
                  <p className="">
                    {rupees}{" "}
                    <span className="text-green-200">
                      {all_data?.deposit_member_amount?.[2] || 0}
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
                      < span > S.No.</span>
                      <span>User Id</span>
                      <span className="">Name</span>
                    </div>
                    <div className="h-[2px] w-full "></div>
                    {result?.level_3?.map((i, index) => {
                      return (
                        <div style={{ color: 'white', background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
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
              </AccordionDetails >
            </Accordion >
          </Box >
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
                  <p className="">{result?.level_4?.length || 0}</p>
                  <p className="">
                    {rupees}{" "}
                    <span className="text-green-200">
                      {all_data?.deposit_member_amount?.[3] || 0}
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
                      < span > S.No.</span>
                      <span>User Id</span>
                      <span className="">Name</span>
                    </div>
                    <div className="h-[2px] w-full "></div>
                    {result?.level_4?.map((i, index) => {
                      return (
                        <div style={{ color: 'white', background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
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
              </AccordionDetails >
            </Accordion >
          </Box >
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
                  <p className="">{result?.level_5?.length || 0}</p>
                  <p className="">
                    {rupees}{" "}
                    <span className="text-green-200">
                      {all_data?.deposit_member_amount?.[4] || 0}
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
                      < span > S.No.</span>
                      <span>User Id</span>
                      <span className="">Name</span>
                    </div>
                    <div className="h-[2px] w-full "></div>
                    {result?.level_5?.map((i, index) => {
                      return (
                        <div style={{ color: 'white', background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
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
              </AccordionDetails >
            </Accordion >
          </Box >
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
                  <p className="">{result?.level_6?.length || 0}</p>
                  <p className="">
                    {rupees}{" "}
                    <span className="text-green-200">
                      {all_data?.deposit_member_amount?.[5] || 0}
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
                      < span > S.No.</span>
                      <span>User Id</span>
                      <span className="">Name</span>
                    </div>
                    <div className="h-[2px] w-full "></div>
                    {result?.level_6?.map((i, index) => {
                      return (
                        <div style={{ color: 'white', background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
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
              </AccordionDetails >
            </Accordion >
          </Box >
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
                  <span className="">Level: 7</span>
                  <p className="">{result?.level_7?.length || 0}</p>
                  <p className="">
                    {rupees}{" "}
                    <span className="text-green-200">
                      {all_data?.deposit_member_amount?.[6] || 0}
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
                      < span > S.No.</span>
                      <span>User Id</span>
                      <span className="">Name</span>
                    </div>
                    <div className="h-[2px] w-full "></div>
                    {result?.level_7?.map((i, index) => {
                      return (
                        <div style={{ color: 'white', background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
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
              </AccordionDetails >
            </Accordion >
          </Box >
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
                  <span className="">Level: 8</span>
                  <p className="">{result?.level_8?.length || 0}</p>
                  <p className="">
                    {rupees}{" "}
                    <span className="text-green-200">
                      {all_data?.deposit_member_amount?.[7] || 0}
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
                      < span > S.No.</span>
                      <span>User Id</span>
                      <span className="">Name</span>
                    </div>
                    <div className="h-[2px] w-full "></div>
                    {result?.level_8?.map((i, index) => {
                      return (
                        <div style={{ color: 'white', background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
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
              </AccordionDetails >
            </Accordion >
          </Box >
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
                  <span className="">Level: 9</span>
                  <p className="">{result?.level_9?.length || 0}</p>
                  <p className="">
                    {rupees}{" "}
                    <span className="text-green-200">
                      {all_data?.deposit_member_amount?.[8] || 0}
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
                      < span > S.No.</span>
                      <span>User Id</span>
                      <span className="">Name</span>
                    </div>
                    <div className="h-[2px] w-full "></div>
                    {result?.level_9?.map((i, index) => {
                      return (
                        <div style={{ color: 'white', background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
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
              </AccordionDetails >
            </Accordion >
          </Box >
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
                  <span className="">Level: 10</span>
                  <p className="">{result?.level_10?.length || 0}</p>
                  <p className="">
                    {rupees}{" "}
                    <span className="text-green-200">
                      {all_data?.deposit_member_amount?.[9] || 0}
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
                      < span > S.No.</span>
                      <span>User Id</span>
                      <span className="">Name</span>
                    </div>
                    <div className="h-[2px] w-full "></div>
                    {result?.level_10?.map((i, index) => {
                      return (
                        <div style={{ color: 'white', background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
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
              </AccordionDetails >
            </Accordion >
          </Box >
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
                  <span className="">Level: 11</span>
                  <p className="">{result?.level_11?.length || 0}</p>
                  <p className="">
                    {rupees}{" "}
                    <span className="text-green-200">
                      {all_data?.deposit_member_amount?.[10] || 0}
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
                      < span > S.No.</span>
                      <span>User Id</span>
                      <span className="">Name</span>
                    </div>
                    <div className="h-[2px] w-full "></div>
                    {result?.level_11?.map((i, index) => {
                      return (
                        <div style={{ color: 'white', background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
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
              </AccordionDetails >
            </Accordion >
          </Box >
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
                  <span className="">Level: 12</span>
                  <p className="">{result?.level_12?.length || 0}</p>
                  <p className="">
                    {rupees}{" "}
                    <span className="text-green-200">
                      {all_data?.deposit_member_amount?.[11] || 0}
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
                      < span > S.No.</span>
                      <span>User Id</span>
                      <span className="">Name</span>
                    </div>
                    <div className="h-[2px] w-full "></div>
                    {result?.level_12?.map((i, index) => {
                      return (
                        <div style={{ color: 'white', background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
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
              </AccordionDetails >
            </Accordion >
          </Box >
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
                  <span className="">Level: 13</span>
                  <p className="">{result?.level_13?.length || 0}</p>
                  <p className="">
                    {rupees}{" "}
                    <span className="text-green-200">
                      {all_data?.deposit_member_amount?.[12] || 0}
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
                      < span > S.No.</span>
                      <span>User Id</span>
                      <span className="">Name</span>
                    </div>
                    <div className="h-[2px] w-full "></div>
                    {result?.level_13?.map((i, index) => {
                      return (
                        <div style={{ color: 'white', background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
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
              </AccordionDetails >
            </Accordion >
          </Box >
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
                  <span className="">Level: 14</span>
                  <p className="">{result?.level_14?.length || 0}</p>
                  <p className="">
                    {rupees}{" "}
                    <span className="text-green-200">
                      {all_data?.deposit_member_amount?.[13] || 0}
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
                      < span > S.No.</span>
                      <span>User Id</span>
                      <span className="">Name</span>
                    </div>
                    <div className="h-[2px] w-full "></div>
                    {result?.level_14?.map((i, index) => {
                      return (
                        <div style={{ color: 'white', background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
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
              </AccordionDetails >
            </Accordion >
          </Box >
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
                  <span className="">Level: 15</span>
                  <p className="">{result?.level_15?.length || 0}</p>
                  <p className="">
                    {rupees}{" "}
                    <span className="text-green-200">
                      {all_data?.deposit_member_amount?.[14] || 0}
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
                      < span > S.No.</span>
                      <span>User Id</span>
                      <span className="">Name</span>
                    </div>
                    <div className="h-[2px] w-full "></div>
                    {result?.level_15?.map((i, index) => {
                      return (
                        <div style={{ color: 'white', background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
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
              </AccordionDetails >
            </Accordion >
          </Box >
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
                  <span className="">Level: 16</span>
                  <p className="">{result?.level_16?.length || 0}</p>
                  <p className="">
                    {rupees}{" "}
                    <span className="text-green-200">
                      {all_data?.deposit_member_amount?.[15] || 0}
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
                      < span > S.No.</span>
                      <span>User Id</span>
                      <span className="">Name</span>
                    </div>
                    <div className="h-[2px] w-full "></div>
                    {result?.level_16?.map((i, index) => {
                      return (
                        <div style={{ color: 'white', background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
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
              </AccordionDetails >
            </Accordion >
          </Box >
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
                  <span className="">Level: 17</span>
                  <p className="">{result?.level_17?.length || 0}</p>
                  <p className="">
                    {rupees}{" "}
                    <span className="text-green-200">
                      {all_data?.deposit_member_amount?.[16] || 0}
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
                      < span > S.No.</span>
                      <span>User Id</span>
                      <span className="">Name</span>
                    </div>
                    <div className="h-[2px] w-full "></div>
                    {result?.level_17?.map((i, index) => {
                      return (
                        <div style={{ color: 'white', background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
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
              </AccordionDetails >
            </Accordion >
          </Box >
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
                  <span className="">Level: 18</span>
                  <p className="">{result?.level_18?.length || 0}</p>
                  <p className="">
                    {rupees}{" "}
                    <span className="text-green-200">
                      {all_data?.deposit_member_amount?.[17] || 0}
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
                      < span > S.No.</span>
                      <span>User Id</span>
                      <span className="">Name</span>
                    </div>
                    <div className="h-[2px] w-full "></div>
                    {result?.level_18?.map((i, index) => {
                      return (
                        <div style={{ color: 'white', background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
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
              </AccordionDetails >
            </Accordion >
          </Box >
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
                  <span className="">Level: 19</span>
                  <p className="">{result?.level_19?.length || 0}</p>
                  <p className="">
                    {rupees}{" "}
                    <span className="text-green-200">
                      {all_data?.deposit_member_amount?.[18] || 0}
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
                      < span > S.No.</span>
                      <span>User Id</span>
                      <span className="">Name</span>
                    </div>
                    <div className="h-[2px] w-full "></div>
                    {result?.level_19?.map((i, index) => {
                      return (
                        <div style={{ color: 'white', background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
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
              </AccordionDetails >
            </Accordion >
          </Box >
        }
        {
          <Box sx={{ width: '95%', margin: '10px 2.5% 10px 2.5%', }}>
            <Accordion className="!rounded-lg !mb-20">
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon className="!text-white" />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{ background: zubggray, color: "white", borderRadius: '5px' }}
              >
                <div className="w-full grid grid-cols-3 pr-2">
                  <span className="">Level: 20</span>
                  <p className="">{result?.level_20?.length || 0}</p>
                  <p className="">
                    {rupees}{" "}
                    <span className="text-green-200">
                      {all_data?.deposit_member_amount?.[19] || 0}
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
                      < span > S.No.</span>
                      <span>User Id</span>
                      <span className="">Name</span>
                    </div>
                    <div className="h-[2px] w-full "></div>
                    {result?.level_20?.map((i, index) => {
                      return (
                        <div style={{ color: 'white', background: zubgback, color: zubgtext, borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-3  ">
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
              </AccordionDetails >
            </Accordion >
          </Box >
        }
      </Container >
    </Layout >
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
