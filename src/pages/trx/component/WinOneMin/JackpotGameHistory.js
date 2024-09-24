import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { lightblue, zubgback, zubgtext } from "../../../../Shared/color";
import history from "../../../../assets/images/list.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const JackpotGameHistory = ({ gid }) => {
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

  // if (isLoading)
  //   return (
  //     <div className="!w-full  flex justify-center">
  //       <CircularProgress />
  //     </div>
  //   );
  return (
    <Box sx={{ pb: 4 }}>
      {/* <Stack direction="row" className="onegotextbox">
        <Typography variant="body1" color="initial" sx={{ color: zubgtext }}>
          <Box
            component="img"
            src={history}
            width={25}
            sx={{ marginRight: "10px", filter: "grayscale(1)" }}
          ></Box>
          {gid === "1"
            ? "One GO Record"
            : gid === "2"
            ? "Three Go Record"
            : "Five Go Record"}
        </Typography>
      </Stack> */}
      <TableContainer sx={{ borderRadius: "7px" }} className="!mt-3">
        <Table
          sx={{
            background: "white",
            color: "white",
            borderRadius: "10px  10px 0px 0px",
          }}
          className="wintable"
          aria-label="simple table"
        >
          <TableHead sx={{ borderRadius: "10px  10px 0px 0px" }}>
            <TableRow>
              <TableCell
                sx={{ padding: " 10px 5px", fontSize: "13px", fontWeight: 600 }}
              >
                Period
              </TableCell>
              <TableCell
                sx={{ padding: " 10px 5px", fontSize: "13px", fontWeight: 600 }}
              >
                Block
              </TableCell>
              <TableCell
                sx={{ padding: " 10px 5px", fontSize: "13px", fontWeight: 600 }}
              >
                Block Time
              </TableCell>
              <TableCell
                sx={{ padding: " 10px 5px", fontSize: "13px", fontWeight: 600 }}
              >
                Hash
              </TableCell>
              <TableCell
                sx={{ padding: " 10px 5px", fontSize: "13px", fontWeight: 600 }}
              >
                Result
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows?.map((i) => {
              return (
                <TableRow className="!w-[95%]" style={{ background: "white" }}>
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
                    className="!text-[#0D0335]"
                    sx={{
                      padding: " 10px 5px",
                      borderBottom: `1px solid ${lightblue}`,
                    }}
                  >
                    <span>
                      <LiveHelpIcon
                        sx={{ width: "20px" }}
                        className="!text-[#FBA343] cursor-pointer"
                        onClick={() =>
                          navigate("/trx/tron-scan", {
                            state: {
                              tron_id: i?.tr_number,
                            },
                          })
                        }
                      />
                    </span>
                    <span style={{ fontsize: "12px" }}>{i?.tr_number}</span>
                  </TableCell>
                  <TableCell
                    className="!text-[#0D0335]"
                    sx={{
                      padding: " 10px 5px",
                      borderBottom: `1px solid ${lightblue}`,
                    }}
                  >
                    <span style={{ fontsize: "12px !important" }}>
                      {i?.tr_block_time}
                    </span>
                  </TableCell>
                  <TableCell
                    className="!text-[#0D0335]"
                    sx={{
                      padding: " 10px 5px",
                      fontsize: " 13px",
                      borderBottom: `1px solid ${lightblue}`,
                    }}
                  >
                    <span>{i?.tr_hashno}</span>
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: " 10px 5px",
                      fontsize: " 13px",
                      borderBottom: `1px solid ${lightblue}`,
                    }}
                  >
                    <div
                      className="grid !grid-cols-2  !place-items-center !pl-3"
                      // style={{ color: "white" }}
                    >
                      <p
                        className={`
                ${
                  (String(parseInt(Number(i?.tr41_slot_id) / 1000)) === "1" &&
                    "bg-gradient-to-t from-[#18b680] 50% to-[#18b680] 50%") ||
                  (String(parseInt(Number(i?.tr41_slot_id) / 1000)) === "2" &&
                    "bg-gradient-to-tl from-[#8217a2] 50% to-[#8217a2] 50%") ||
                  (String(parseInt(Number(i?.tr41_slot_id) / 1000)) === "3" &&
                    "bg-gradient-to-tl from-[#fb6161] 50% to-[#fb6161] 50%")
                }
                   !text-white !rounded-full !w-[15px] !h-[15px] !text-center !text-[10px] !bg-green-500
                `}
                      >
                        {" "}
                        {parseInt(Number(Number(i?.tr41_slot_id) % 10))}
                      </p>
                      <p
                        className={`
                ${
                  (String(parseInt(Number(i?.tr41_slot_id) / 1000)) === "1" &&
                    "!text-[#18b680]") ||
                  (String(parseInt(Number(i?.tr41_slot_id) / 1000)) === "2" &&
                    "!text-[#8217a2]") ||
                  (String(parseInt(Number(i?.tr41_slot_id) / 1000)) === "3" &&
                    "!text-[#fb6161]")
                }
                   !text-[#0D0335] !rounded-full !w-[15px] !h-[15px] !text-center !text-[10px] !font-semibold
                `}
                      >
                        {parseInt(Number(Number(i?.tr41_slot_id) / 1000)) === 1
                          ? "G"
                          : parseInt(Number(Number(i?.tr41_slot_id) / 1000)) ===
                            2
                          ? "V"
                          : "R"}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

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
              className={`${
                page === 0 ? "!text-gray-400" : "!text-white"
              } !bg-[#63ba0e] !p-2 !rounded-md !flex !items-center !justify-center pr-1`}
            >
              <ArrowBackIosIcon />
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
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>
      </TableContainer>
      {/* <CustomCircularProgress isLoading={isLoading}/> */}
    </Box>
  );
};

export default JackpotGameHistory;
