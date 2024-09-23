import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { Box, Stack, Typography } from "@mui/material";
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
      <Stack direction="row" className="onegotextbox">
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
      </Stack>
      <TableContainer sx={{ borderRadius: "7px" }}>
        <Table
          sx={{
            background: zubgback,
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
                <TableRow
                  className="!w-[95%]"
                  style={{ background: "#0D0335" }}
                >
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
                    className="!text-white"
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
                    className="!text-white"
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
                    className="!text-white"
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
                    <span
                      className={`slot-id ${
                        String(i?.tr41_slot_id)?.slice(0, 3) === "300"
                          ? "bg-gradient-to-tl from-red-400 to-red-900"
                          : String(i?.tr41_slot_id)?.slice(0, 3) === "200"
                          ? "!bg-gradient-to-t from-violet-400 to-violet-900"
                          : String(i?.tr41_slot_id)?.slice(0, 3) === "100"
                          ? "bg-gradient-to-t from-green-400 to-green-900"
                          : ""
                      } transparentColor font-bold  text-lg !px-1`}
                    >
                      {`${i?.tr41_slot_id?.toString()?.slice(-1) || ""}`}
                    </span>

                    <span
                      className={`slot-id ${
                        String(i?.tr41_slot_id)?.slice(0, 3) === "300"
                          ? "bg-gradient-to-tl from-red-400 to-red-900"
                          : String(i?.tr41_slot_id)?.slice(0, 3) === "200"
                          ? "!bg-gradient-to-t from-violet-400 to-violet-900"
                          : String(i?.tr41_slot_id)?.slice(0, 3) === "100"
                          ? "bg-gradient-to-t from-green-400 to-green-900"
                          : ""
                      } transparentColor font-bold  text-lg !px-1`}
                    >
                      {String(i?.tr41_slot_id)?.slice(0, 3) === "300"
                        ? "R"
                        : String(i?.tr41_slot_id)?.slice(0, 3) === "200"
                        ? "V"
                        : String(i?.tr41_slot_id)?.slice(0, 3) === "100"
                        ? "G"
                        : ""}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <Box className="paginationTable !w-full " mb={4}>
          <TablePagination
            sx={{ background: zubgtext, color: "white", width: "100%" }}
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={game_history_data?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Rows"
          />
        </Box>
      </TableContainer>
      {/* <CustomCircularProgress isLoading={isLoading}/> */}
    </Box>
  );
};

export default JackpotGameHistory;
