import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  Box,
  CircularProgress,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import moment from "moment";
import * as React from "react";
import {
  zubgback,
  zubgtext,
} from "../../../../Shared/color";
import history from "../../../../assets/images/list.png";
import { rupees } from "../../../../services/urls";
import { useSelector } from "react-redux";

const MyHistory = ({ gid }) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const my_history_data = useSelector(
    (state) => state.aviator.trx_my_history_data
  );
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      my_history_data?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [page, rowsPerPage, my_history_data]
  );



  return (
    <Box>
      <Stack direction="row" className="onegotextbox">
        <Typography variant="body1" color="initial" sx={{ color: zubgtext }}>
          <Box
            component="img"
            src={history}
            width={25}
            sx={{ marginRight: "10px", filter: 'drop-shadow(2px 4px 6px black)' }}
          ></Box>
          {gid === "1"
            ? " My One GO Record"
            : gid === "2"
              ? " My Three GO Record"
              : " My Five GO Record"}
        </Typography>
      </Stack>
      <div className="flex flex-col gap-[2px]">
        {/* {my_history_data?.[0]?.status === "0" &&
          my_history_data
            ?.filter((i) => i.status === "0")
            ?.map((i, index) => {
              return (
                <div key={index}>
                  <Accordion
                    className="!rounded-lg"
                    disableElevation
                    sx={{
                      borderBottom: "1px solid red",
                      boxShadow: "none !important",
                    }}
                  >
                    <AccordionSummary
                      disableElevation
                      expandIcon={
                        <ArrowDownwardIcon
                          sx={{ color: `${zubgtext} !important` }}
                        />
                      }
                      aria-controls="panel1-content"
                      id="panel1-header"
                      sx={{
                        background: "#fff",
                        color: zubgtext,
                        borderBottom: "1px solid red",
                      }}
                    >
                      <div className="!w-full !flex !justify-between">
                        <p className=" " style={{ color: zubgtext }}>
                          {i?.gamesno}
                        </p>
                        <p
                          className={`${
                            i?.status === "0"
                              ? "!text-red-400"
                              : i?.status === "1"
                              ? "!text-green-400"
                              : "!text-red-400"
                          }`}
                        >
                          {i?.status === "0"
                            ? "Pending"
                            : i?.status === "1"
                            ? "Win"
                            : "Loss"}
                        </p>
                        <span
                          className={`${
                            i?.status === "0"
                              ? "!text-red-400"
                              : i?.status === "1"
                              ? "!text-green-400"
                              : "!text-red-400"
                          }`}
                        >
                          {" "}
                          {rupees} {i?.status === "1" ? i?.win : i?.totalamount}
                        </span>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        background: "#fff",
                        color: zubgtext,
                        borderBottom: "1px solid red",
                      }}
                    >
                      <p className={`!text-green-400 !font-semibold !text-lg`}>
                        Period Detail
                      </p>
                      <div className="!w-full !grid !grid-cols-2 !px-2">
                        <span>Period</span>
                        <span>{i?.gamesno}</span>
                        <span>Contract Money</span>
                        <span>{Number(i?.amount || 0).toFixed(2)}</span>
                        <span>Contract Count</span>
                        <span>0</span>
                        <span>Delivery</span>
                        <span>{Number(i?.totalamount || 0).toFixed(2)}</span>
                        <span>Fee</span>
                        <span>{Number(i?.commission || 0).toFixed(2)}</span>
                        <span>Open Price</span>
                        <span>{i?.gamesno}</span>
                        <span>Result</span>

                        {i?.status !== "0" ? (
                          <div className="flex gap-2 items-center">
                            <span>{`${i?.result}`}</span>
                            <span
                              className={`
                  ${
                    (i?.number === "0" &&
                      "!bg-gradient-to-t from-red-400 to-violet-400") ||
                    (i?.number === "5" &&
                      "!bg-gradient-to-t from-violet-400 to-green-400") ||
                    ((i?.number === "1" ||
                      i?.number === "3" ||
                      i?.number === "7" ||
                      i?.number === "9" ||
                      i?.number === "10") &&
                      "bg-gradient-to-t from-green-400 to-green-900") ||
                    ((i?.number === "2" ||
                      i?.number === "4" ||
                      i?.number === "6" ||
                      i?.number === "8" ||
                      i?.number === "30") &&
                      "bg-gradient-to-tl from-red-400 to-red-900") ||
                    (i?.number === "50" && "bg-[#3183ee]") ||
                    (i?.number === "40" && "bg-[#f1be24]") ||
                    (i?.number === "20" && "bg-[#eb2feb]")
                  }
                  transparentColor font-bold text-xl
                  `}
                            >
                              {i?.color_result}
                            </span>
                            <span>{i?.number <= 4 ? "Small" : "Big"}</span>
                          </div>
                        ) : (
                          <div></div>
                        )}

                        <span>Select</span>
                        <span
                          className={`
                  ${
                    (i?.number === "0" &&
                      "!bg-gradient-to-t from-red-400 to-violet-400") ||
                    (i?.number === "5" &&
                      "!bg-gradient-to-t from-violet-400 to-green-400") ||
                    ((i?.number === "1" ||
                      i?.number === "3" ||
                      i?.number === "7" ||
                      i?.number === "9" ||
                      i?.number === "10") &&
                      "bg-gradient-to-t from-green-400 to-green-900") ||
                    ((i?.number === "2" ||
                      i?.number === "4" ||
                      i?.number === "6" ||
                      i?.number === "8" ||
                      i?.number === "30") &&
                      "bg-gradient-to-tl from-red-400 to-red-900") ||
                    (i?.number === "50" && "bg-[#3183ee]") ||
                    (i?.number === "40" && "bg-[#f1be24]") ||
                    (i?.number === "20" && "bg-[#eb2feb]")
                  }
                  transparentColor font-bold text-xl
                  `}
                        >
                          {i?.number === "10"
                            ? "Green"
                            : i?.number === "50"
                            ? "Small"
                            : i?.number === "40"
                            ? "Big"
                            : i?.number === "30"
                            ? "Red"
                            : i?.number === "20"
                            ? "Voilet"
                            : i?.number}
                        </span>
                        <span>Status</span>
                        <span
                          className={`${
                            i?.status === "0"
                              ? "!text-red-400"
                              : i?.status === "1"
                              ? "!text-green-400"
                              : "!text-red-400"
                          }`}
                        >
                          {i?.status === "0"
                            ? "Pending"
                            : i?.status === "1"
                            ? "Win"
                            : "Loss"}
                        </span>
                        <span>Amount</span>
                        <span className={`!text-green-400`}>
                          {" "}
                          {rupees} {i?.win || 0}
                        </span>
                        <span>Create Time</span>
                        <span>
                          {moment(i?.datetime)?.format("DD-MM-YYYY")}{" "}
                          {moment(i?.datetime)?.format("HH:mm:ss")}
                        </span>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              );
            })} */}

        {visibleRows?.map((i) => {
          return (
            <div>
              <Accordion className="!rounded-lg" disableElevation>
                <AccordionSummary
                  expandIcon={<ArrowDownwardIcon sx={{ color: 'gray', mx: '10px' }} />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{ background: 'white', color: zubgtext, borderRadius: '5px', margin: '0px important', mb: 1 }}
                >
                  <Box className="flexbetween">
                    <Box sx={{ background: 'red', width: '50px', height: '45px', borderRadius: '10px' }} className={` flexcenter ${i?.result <= 4 ? "!bg-[#6DA7F4]" : "!bg-[#FEAA57]"}`}>
                      <Typography variant="body1" sx={{ color: 'white' }}
                        className={`funp13 ${i?.result <= 4 ? "!bg-[#6DA7F4]" : "!bg-[#FEAA57]"}`}
                      >{i?.result <= 4 ? "Small" : "Big"}</Typography>
                    </Box>
                    <Box className="flexrowsstart" >
                      <Typography variant="body1" className="funp15" sx={{ color: '#0D0335', textDecoration: 'none' }}>{i?.gamesno}</Typography>
                      <Typography variant="body1" className="funp13" sx={{ color: '#0D0335' }}>{moment(i?.datetime)?.format("DD-MM-YYYY")}{" "}
                        {moment(i?.datetime)?.format("HH:mm:ss")} </Typography>
                    </Box>
                    <Box className="flexrows" >
                      <Typography variant="body1" sx={{ borderRadius: '5px', padding: '1px 10px', border: `1px solid red`, color: 'red' }}
                        className={` funp15 ${i?.status === "0"
                          ? "!text-red-400"
                          : i?.status === "1"
                            ? "!text-green-400 !border-1 !border-green-500"
                            : "!text-red-400"
                          } `}
                      >  {i?.status === "0"
                        ? "Pending"
                        : i?.status === "1"
                          ? "Success"
                          : "Failed"}</Typography>
                      <Typography variant="body1" sx={{ color: 'red', mt: 1, }}
                        className={` funp13 ${i?.status === "0"
                          ? "!text-red-400"
                          : i?.status === "1"
                            ? "!text-green-400"
                            : "!text-red-400"
                          } `}
                      > {i?.win ? '₹ ' + i?.win : "- " + ' ₹ ' + i?.amount}</Typography>
                    </Box>
                  </Box>
                  {/* <div className="!w-full !flex !justify-between">
                  <p style={{ color: zubgtext, }}>{i?.gamesno}</p> 
                    <p
                      className={`${i?.status === "0"
                        ? "!text-red-400"
                        : i?.status === "1"
                          ? "!text-green-400"
                          : "!text-red-400"
                        }`}
                    >
                      {i?.status === "0"
                        ? "Pending"
                        : i?.status === "1"
                          ? "Win"
                          : "Loss"}
                    </p>
                    <span
                      className={`${i?.status === "0"
                        ? "!text-red-400"
                        : i?.status === "1"
                          ? "!text-green-400"
                          : "!text-red-400"
                        }`}
                    >
                      {" "}
                      {rupees} {i?.status === "1" ? i?.win : i?.totalamount}
                    </span>
                  </div> */}
                </AccordionSummary>
                <AccordionDetails sx={{ borderRadius: '10px', color: 'black', }}>
                  <p className={`!text-black-400 !font-semibold !text-lg`} style={{ color: 'black !important', }}>
                    Period Detail
                  </p>
                  <div className="!w-full !grid !grid-cols-2 !gap-y-1 ">
                    <span className="bg-white !bg-opacity-10 py-1 px-2">
                      Period
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2 ">
                      {i?.gamesno}
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2 ">
                      Contract Money
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2 ">
                      {Number(i?.amount || 0).toFixed(2)}
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2 ">
                      Contract Count
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2 ">
                      0
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2 ">
                      Delivery
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2 ">
                      {Number(i?.totalamount || 0).toFixed(2)}
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2 ">
                      Fee
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2 ">
                      {Number(i?.commission || 0).toFixed(2)}
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2 ">
                      Open Price
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2 ">
                      {i?.gamesno}
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2 ">
                      Result
                    </span>

                    {i?.status !== "0" ? (
                      <div className="flex gap-2 items-center bg-white !bg-opacity-10 py-1 px-2">
                        <span>{`${i?.result}`}</span>
                        <span
                          className={`
                  ${(i?.result === "0" &&
                              "!bg-gradient-to-t from-red-400 to-violet-400") ||
                            (i?.result === "5" &&
                              "!bg-gradient-to-t from-violet-400 to-green-400") ||
                            ((i?.result === "1" ||
                              i?.result === "3" ||
                              i?.result === "7" ||
                              i?.result === "9" ||
                              i?.result === "10") &&
                              "bg-gradient-to-t from-green-400 to-green-900") ||
                            ((i?.result === "2" ||
                              i?.result === "4" ||
                              i?.result === "6" ||
                              i?.result === "8" ||
                              i?.result === "30") &&
                              "bg-gradient-to-tl from-red-400 to-red-900") ||
                            (i?.result === "50" && "bg-[#3183ee]") ||
                            (i?.result === "40" && "bg-[#f1be24]") ||
                            (i?.result === "20" && "bg-[#eb2feb]")
                            }
                  transparentColor font-bold text-xl
                  `}
                        >
                          {i?.result === "0"
                            ? "Red Voilet"
                            : i?.result === "1" ||
                              i?.result === "3" ||
                              i?.result === "7" ||
                              i?.result === "9"
                              ? "Green"
                              : i?.result === "5"
                                ? "Voilet Green"
                                : (i?.result === "2" ||
                                  i?.result === "4" ||
                                  i?.result === "6" ||
                                  i?.result === "8") &&
                                "Red"}
                        </span>
                        <span>
                          {Number(i?.result) <= 4 ? "Small" : "Big"}
                        </span>
                      </div>
                    ) : (
                      <div></div>
                    )}

                    <span className="bg-white !bg-opacity-10 py-1 px-2">
                      Select
                    </span>
                    <div className="!bg-white !bg-opacity-10 py-1 px-2">
                      <span
                        className={`
                  ${(i?.number === "0" &&
                            "!bg-gradient-to-t from-red-400 to-violet-400") ||
                          (i?.number === "5" &&
                            "!bg-gradient-to-t from-violet-400 to-green-400") ||
                          ((i?.number === "1" ||
                            i?.number === "3" ||
                            i?.number === "7" ||
                            i?.number === "9" ||
                            i?.number === "10") &&
                            "bg-gradient-to-t from-green-400 to-green-900") ||
                          ((i?.number === "2" ||
                            i?.number === "4" ||
                            i?.number === "6" ||
                            i?.number === "8" ||
                            i?.number === "30") &&
                            "bg-gradient-to-tl from-red-400 to-red-900") ||
                          (i?.number === "50" && "bg-[#3183ee]") ||
                          (i?.number === "40" && "bg-[#f1be24]") ||
                          (i?.number === "20" && "bg-[#eb2feb]")
                          }
                  transparentColor font-bold text-xl 

                  `}
                      >
                        {i?.number === "10"
                          ? "Green"
                          : i?.number === "50"
                            ? "Small"
                            : i?.number === "40"
                              ? "Big"
                              : i?.number === "30"
                                ? "Red"
                                : i?.number === "20"
                                  ? "Voilet"
                                  : i?.number}
                      </span>
                    </div>
                    <span className="bg-white !bg-opacity-10 py-1 px-2">
                      Status
                    </span>
                    <span
                      className={`${i?.status === "0"
                        ? "!text-red-400"
                        : i?.status === "1"
                          ? "!text-green-400"
                          : "!text-red-400"
                        } bg-white !bg-opacity-10 py-1 px-2`}
                    >
                      {i?.status === "0"
                        ? "Pending"
                        : i?.status === "1"
                          ? "Win"
                          : "Loss"}
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2">
                      Amount
                    </span>
                    <span
                      className={`!text-green-400 bg-white !bg-opacity-10 py-1 px-2`}
                    >
                      {" "}
                      {rupees} {i?.win || 0}
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2">
                      Create Time
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2">
                      {moment(i?.datetime)?.format("DD-MM-YYYY")}{" "}
                      {moment(i?.datetime)?.format("HH:mm:ss")}
                    </span>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          );
          {
            /* (
            <div style={{ background: zubgback, padding: '15px', borderRadius: '10px ', marginBottom: '10px !important' }}>
              <div className="flex justify-between">
                <Typography variant="body1" sx={{ background: zubgmid, color: 'white !important', padding: '5px 20px', borderRadius: '5px' }}>Bet</Typography>
                <p
                  className={`${i?.status === "0"
                    ? "!text-red-400"
                    : i?.status === "1"
                      ? "!text-green-400"
                      : "!text-blue-400"
                    }`}
                >
                  {i?.status === "0"
                    ? "Pending"
                    : i?.status === "1"
                      ? "Win"
                      : "Loss"}
                </p>
              </div>
              <div className="flex justify-between mt-2">
                <p className=" !text-[12px]">Balance</p>
                <p className=" !text-[12px]">
                  {rupees} {i?.amount}
                </p>
              </div>
              <div className="flex justify-between">
                <p className=" !text-[12px]">Bet Type</p>
                <p className={` !text-[12px]`}>
                  {(["10","1","3","7","9"]?.includes(i?.color) && "Green") ||
                    (["30","2","4","6","8"]?.includes(i?.color) && "Red") ||
                    (i?.color === String(20) && "Voilet") ||
                    (i?.color === String(40) && "Big") ||
                    (i?.color === String(50) && "Small") ||
                    (i?.color === String(0) && "Red Voilet") ||
                    (i?.color === String(5) && "Green Voilet")
                    }
                </p>
              </div>
              <div className="flex justify-between">
                <p className=" !text-[12px]">Type</p>
                <p className=" !text-[12px]">
                  {i?.gameid === "1"
                    ? "1 min"
                    : i?.gameid === "2"
                      ? "3 min"
                      : "5 min"}
                </p>
              </div>
              <div className="flex justify-between">
                <p className=" !text-[12px]">Win Amount</p>
                <p className=" !text-[12px]">
                  {rupees} {i?.win || 0}
                </p>
              </div>
              <div className="flex justify-between">
                <p className=" !text-[12px]">Time</p>
                <p className=" !text-[12px]">
                  {moment(i?.datetime)?.format("DD-MM-YYYY")}
                </p>
              </div>
              <div className="flex justify-between">
                <p className=" !text-[12px]">Order number</p>
                <p className=" !text-[12px]">{i?.gamesno}</p>
              </div>
            </div>
          ); */
          }
        })}
      </div>

      <Box className="paginationTable " mb={10}>
        <TablePagination
          sx={{
            background: zubgtext,
            color: "white",
            borderRadius: "10px",
            marginTop: "10px",

          }}
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={my_history_data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Rows"
        />
      </Box>
      {/* <CustomCircularProgress isLoading={myhistory_loding} /> */}
    </Box>
  );
};

export default MyHistory;
