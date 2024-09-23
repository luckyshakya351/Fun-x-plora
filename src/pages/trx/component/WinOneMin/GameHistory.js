import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { Box, IconButton, Typography } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { zubgback } from "../../../../Shared/color";
const GameHistory = ({ gid }) => {
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const game_history_data = useSelector(
    (state) => state.aviator.trx_game_history_data
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
      game_history_data?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [page, rowsPerPage, game_history_data]
  );
  return (
    <Box sx={{ pb: 4 }}>
      {/* <Stack direction="row" className="onegotextbox">
        <Typography variant="body1" color="initial" sx={{ color: zubgtext }}>
          <Box
            component="img"
            src={history}
            width={25}
            sx={{
              marginRight: "10px",
              filter: "drop-shadow(2px 4px 6px black)",
            }}
          ></Box>
          {gid === "1"
            ? "One GO Record"
            : gid === "2"
            ? "Three Go Record"
            : "Five Go Record"}
        </Typography>
      </Stack> */}
      <TableContainer sx={{ borderRadius: "7px", paddingBottom: "10px" }}>
        {/* <Table
          sx={{
            background: zubgback,
            color: "white",
            borderRadius: "10px  10px 0px 0px",
          }}
          className="wintable"
          // aria-label="simple table"
        >
          <TableHead sx={{ borderRadius: "10px  10px 0px 0px" }}>
            <TableRow>
              <TableCell
                sx={{ fontWeight: 600 }}
              >
                Period
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600 }}
              >
                Block
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600 }}
              >
                Block Time
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600 }}
              >
                Hash
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600 }}
              >
                Result
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows?.map((i) => {
              return (
                <TableRow className="!w-[95%]" sx={{ background: "#0D0335" }}>
                  <TableCell
                    className="!text-white"
                    sx={{
                      padding: " 10px 5px",
                      fontsize: " 13px",
                      borderBottom: `1px solid ${lightblue}`,
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: "12px",
                        color: zubgtext,
                      }}
                    >
                      {i?.tr_transaction_id}
                    </p>
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "10px 5px",
                      fontsize: " 13px",
                      borderBottom: `1px solid ${lightblue}`,
                    }}
                    className="!flex !gap-1"
                  >
                    <span>
                      <LiveHelpIcon
                        
                        className="!text-[#FBA343] cursor-pointer !text-[16px]"
                        onClick={() =>
                          navigate("/trx/tron-scan", {
                            state: {
                              tron_id: i?.tr_number,
                            },
                          })
                        }
                      />
                    </span>
                    <span style={{ color: "white" }}>{i?.tr_number}</span>
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: " 10px 5px",
                      fontsize: " 13px",
                      borderBottom: `1px solid ${lightblue}`,
                    }}
                  >
                    <span style={{ color: "white" }}>{i?.tr_block_time}</span>
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: " 10px 5px",
                      fontsize: " 13px",
                      borderBottom: `1px solid ${lightblue}`,
                    }}
                  >
                    <span style={{ color: "white" }}> {i?.tr_hashno}</span>
                  </TableCell>

                  <TableCell
                    sx={{
                      padding: " 10px 5px",
                      fontsize: " 13px",
                      borderBottom: `1px solid ${lightblue}`,
                    }}
                  >
                    <span
                      className={`
                ${
                  (String(Number(i?.tr41_slot_id)) === "0" &&
                    "!bg-gradient-to-t from-red-400 to-violet-400") ||
                  (String(Number(i?.tr41_slot_id)) === "5" &&
                    "!bg-gradient-to-t from-violet-400 to-green-400") ||
                  ((String(Number(i?.tr41_slot_id)) === "1" ||
                    String(Number(i?.tr41_slot_id)) === "3" ||
                    String(Number(i?.tr41_slot_id)) === "7" ||
                    String(Number(i?.tr41_slot_id)) === "9" ||
                    String(Number(i?.tr41_slot_id)) === "10") &&
                    "bg-gradient-to-t from-green-400 to-green-900") ||
                  ((String(Number(i?.tr41_slot_id)) === "2" ||
                    String(Number(i?.tr41_slot_id)) === "4" ||
                    String(Number(i?.tr41_slot_id)) === "6" ||
                    String(Number(i?.tr41_slot_id)) === "8" ||
                    String(Number(i?.tr41_slot_id)) === "30") &&
                    "bg-gradient-to-tl from-red-400 to-red-900") ||
                  (String(Number(i?.tr41_slot_id)) === "50" &&
                    "bg-[#3183ee]") ||
                  (String(Number(i?.tr41_slot_id)) === "40" &&
                    "bg-[#f1be24]") ||
                  (String(Number(i?.tr41_slot_id)) === "20" && "bg-[#eb2feb]")
                }
                transparentColor font-bold  text-lg
                `}
                      style={{ color: "white" }}
                    >
                      {Number(i?.tr41_slot_id)}
                    </span>
                    <span style={{ color: "white" }}>
                      {" "}
                      {Number(i?.tr41_slot_id) <= 4 ? "S" : "B"}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table> */}
      </TableContainer>
      <div className={`!w-full !text-[${zubgback}] !bg-white  rounded-t-lg`}>
        <div
          className="!w-full !text-[13px] !grid !grid-cols-8 !place-items-center !py-2 
        !bg-[#63BA0E] rounded-t-lg !text-white"
        >
          <p className="!col-span-2">Period</p>
          <p className="!col-span-2">Block No.</p>
          <p className="!col-span-2">Block Time</p>
          <p>Hash</p>
          <p>Result</p>
        </div>
        <div className={`!w-full`}>
          {visibleRows?.map((i) => {
            return (
              <>
                <div className="!w-full !p-3 !grid !grid-cols-8  !place-items-center !text-[12px]">
                  <p className="!col-span-2 !text-[#63BA0E] !font-semibold !text-[13px]">
                    {i?.tr_transaction_id}
                  </p>
                  <p className="!col-span-2 !flex gap-[1px]">
                    <span>
                      <LiveHelpIcon
                        className="!text-[#FBA343] cursor-pointer !text-[16px]"
                        onClick={() =>
                          navigate("/trx/tron-scan", {
                            state: {
                              tron_id: i?.tr_number,
                            },
                          })
                        }
                      />
                    </span>
                    <span
                    // style={{ color: "white" }}
                    >
                      {i?.tr_number}
                    </span>
                  </p>
                  <p className="!col-span-2">{i?.tr_block_time}</p>
                  <p>{i?.tr_hashno}</p>
                  <div
                    className="grid !grid-cols-2  !place-items-center !pl-3"
                    // style={{ color: "white" }}
                  >
                    <p
                      className={`
                ${
                  (String(Number(i?.tr41_slot_id)) === "0" &&
                    "transparentColorRedPurpleBGTOP") ||
                  (String(Number(i?.tr41_slot_id)) === "5" &&
                    "transparentColorGreenRedBGTOP") ||
                  ((String(Number(i?.tr41_slot_id)) === "1" ||
                    String(Number(i?.tr41_slot_id)) === "3" ||
                    String(Number(i?.tr41_slot_id)) === "7" ||
                    String(Number(i?.tr41_slot_id)) === "9" ||
                    String(Number(i?.tr41_slot_id)) === "10") &&
                    "bg-gradient-to-t from-[#18b680] 50% to-[#18b680] 50%") ||
                  ((String(Number(i?.tr41_slot_id)) === "2" ||
                    String(Number(i?.tr41_slot_id)) === "4" ||
                    String(Number(i?.tr41_slot_id)) === "6" ||
                    String(Number(i?.tr41_slot_id)) === "8" ||
                    String(Number(i?.tr41_slot_id)) === "30") &&
                    "bg-gradient-to-tl from-[#fb6161] 50% to-[#fb6161] 50%") ||
                  (String(Number(i?.tr41_slot_id)) === "50" &&
                    "bg-[#c86eff]") ||
                  (String(Number(i?.tr41_slot_id)) === "40" &&
                    "bg-[#f1be24]") ||
                  (String(Number(i?.tr41_slot_id)) === "20" && "bg-[#c86eff]")
                }
                   !text-white !rounded-full !w-[15px] !h-[15px] !text-center !text-[10px] !bg-green-500
                `}
                    >
                      {" "}
                      {Number(i?.tr41_slot_id)}
                    </p>
                    <p
                      className={`
                ${
                  Number(i?.tr41_slot_id) > 4
                    ? "!text-[#ffc300]"
                    : "!text-[#6cb4ee]"
                }
                  text-[13px]
                `}
                    >
                      {Number(i?.tr41_slot_id) <= 4 ? "S" : "B"}
                    </p>
                  </div>
                </div>
                <div className="!w-full !h-[.2px] !bg-[#63BA0E] !bg-opacity-30"></div>
              </>
            );
          })}
        </div>
      </div>
      <Box className="paginationTable !w-full " mb={4}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            borderRadius: "10px",
            marginTop: "5px",
            mb: 3,
          }}
        >
          <IconButton
            onClick={() => handleChangePage(null, Math.max(0, page - 1))}
            className={`${page === 0 ? "!text-gray-400" : "!text-white"} !bg-[#63ba0e] !p-2 !rounded-md !flex !items-center !justify-center pr-1`}
          >
            <ArrowBackIosIcon  />
          </IconButton>

          <Typography sx={{ margin: "0 10px" }}>
            {page + 1} / {Math.ceil(game_history_data?.length / rowsPerPage)}
          </Typography>

          <IconButton
            onClick={() =>
              handleChangePage(
                null,
                Math.min(
                  Math.ceil(game_history_data?.length / rowsPerPage) - 1,
                  page + 1
                )
              )
            }
            sx={{
              marginLeft: "10px",
              color: "white",
            }}
            className={`${
              page + 1 >= Math.ceil(game_history_data?.length / rowsPerPage)
                ? "!text-gray-400"
                : "!text-white"
            } !bg-[#63ba0e] !p-2 !rounded-md !flex !items-center !justify-center pr-1`}
          >
            <ArrowForwardIosIcon  />
          </IconButton>
        </Box>
      </Box>
      {/* <CustomCircularProgress isLoading={isLoading}/> */}
    </Box>
  );
};

export default GameHistory;
