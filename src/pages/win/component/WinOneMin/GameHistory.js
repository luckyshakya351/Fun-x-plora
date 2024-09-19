import { Box, IconButton, Pagination, Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useSelector } from "react-redux";
import { zubgtext } from "../../../../Shared/color";
import history from "../../../../assets/images/list.png";
import theme from "../../../../utils/theme";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const GameHistory = ({ gid }) => {
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
        <Typography
          variant="body1"
          color="initial"
          sx={{ color: `${theme.palette.primary.main} !important` }}
        >
          <Box
            component="img"
            src={history}
            width={25}
            sx={{
              marginRight: "4px",
              filter: "drop-shadow(2px 4px 4px black)",
            }}
          ></Box>
          {gid === "1"
            ? "One GO Record"
            : gid === "2"
            ? "Three Go Record"
            : "Five Go Record"}
        </Typography>
      </Stack> */}
      {/* <TableContainer > */}
      <Table
        sx={{ maxWidth: 400, background: "white", color: "white" }}
        className="wintable !mt-3"
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ padding: " 4px 5px", fontSize: "13px", fontWeight: 600 }}
            >
              Period
            </TableCell>
            <TableCell
              sx={{ padding: " 4px 5px", fontSize: "13px", fontWeight: 600 }}
            >
              Number
            </TableCell>
            <TableCell
              sx={{ padding: " 4px 5px", fontSize: "13px", fontWeight: 600 }}
            >
              Big Small
            </TableCell>
            <TableCell
              sx={{ padding: " 4px 5px", fontSize: "13px", fontWeight: 600 }}
            >
              Result
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleRows?.map((i) => {
            return (
              <TableRow sx={{ background: "white" }}>
                <TableCell
                  className="!text-[#180F3F]"
                  sx={{ padding: " 4px 5px", fontsize: " 13px" }}
                >
                  <span
                    style={{
                      color: zubgtext,
                      fontWeight: 600,
                      fontSize: "10px",
                    }}
                    className="!ml-1"
                  >
                    {i?.gamesno}
                  </span>
                </TableCell>
                <TableCell
                  className="!text-[#180F3F]"
                  sx={{ padding: "4px 5px", fontsize: "3px", fontWeight: 600 }}
                >
                  <span
                    className={`
      ${
        (i?.number === "0" && "transparentColorRedPurple") ||
        (i?.number === "5" && "transparentColorGreenRed") ||
        ((i?.number === "1" ||
          i?.number === "3" ||
          i?.number === "7" ||
          i?.number === "9" ||
          i?.number === "10") &&
          "bg-gradient-to-t from-[#18b680] 50% to-[#18b680] 50%") ||
        ((i?.number === "2" ||
          i?.number === "4" ||
          i?.number === "6" ||
          i?.number === "8" ||
          i?.number === "30") &&
          "bg-gradient-to-tl from-[#fb6161] 50% to-[#fb6161] 50%") ||
        (i?.number === "50" && "bg-[#c86eff]") ||
        (i?.number === "40" && "bg-[#f1be24]") ||
        (i?.number === "20" && "bg-[#c86eff]")
      }
      transparentColor  !text-[20px] !pl-5
    `}
                  >
                    {i?.number}
                  </span>
                </TableCell>

                <TableCell
                  sx={{
                    padding: " 4px 5px",
                    fontSize: "11px",
                    fontWeight: "400",
                  }}
                  // className={`${Number(i?.number) <= 4
                  //   ? "!bg-gradient-to-l !from-[#FE63FF] !to-violet-600"
                  //   : "!bg-gradient-to-l !from-[#FE63FF] !to-green-600"
                  //   }  transparentColor `}
                  className="!text-[#3e586b] !ml-2"
                >
                  <p className="!w-[40px]  !flex justify-center">
                    {Number(i?.number) <= 4 ? "Small" : "Big"}
                  </p>
                </TableCell>
                <TableCell sx={{ padding: " 4px 5px" }}>
                  {i?.number === "0" || i?.number === "5" ? (
                    <div className="!flex !gap-1 ">
                      <div
                        className={`!w-[10px] !h-[10px] !rounded-full ${
                          (i?.number === "0" && " bg-[#fb5b5b]") ||
                          (i?.number === "5" && "bg-[#18b660]")
                        }`}
                      ></div>
                      <div
                        className={`!w-[10px] !h-[10px] !rounded-full ${
                          (i?.number === "0" && "bg-[#c86eff]") ||
                          (i?.number === "5" && "bg-[#c86eff]")
                        }`}
                      ></div>
                    </div>
                  ) : (
                    <>
                      {((i?.number === "1" ||
                        i?.number === "3" ||
                        i?.number === "7" ||
                        i?.number === "9" ||
                        i?.number === "10") && (
                        <div
                          className={`!w-[10px] !h-[10px] !rounded-full ${
                            (i?.number === "1" ||
                              i?.number === "3" ||
                              i?.number === "7" ||
                              i?.number === "9" ||
                              i?.number === "10") &&
                            "bg-[#18b660] !ml-2"
                          }`}
                        ></div>
                      )) ||
                        ((i?.number === "2" ||
                          i?.number === "4" ||
                          i?.number === "6" ||
                          i?.number === "8" ||
                          i?.number === "30") && (
                          <div
                            className={`!w-[10px] !h-[10px] !rounded-full ${
                              (i?.number === "2" ||
                                i?.number === "4" ||
                                i?.number === "6" ||
                                i?.number === "8" ||
                                i?.number === "30") &&
                              "bg-[#fb5b5b] !ml-2"
                            }`}
                          ></div>
                        )) || (
                          <div
                            className={`!w-[10px] !h-[10px] !rounded-full ${
                              (i?.number === "50" && "bg-[#68A1ED]") ||
                              (i?.number === "40" && "bg-[#D8B23E]") ||
                              (i?.number === "20" && "bg-[#c86eff]")
                            }`}
                          ></div>
                        )}
                    </>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Box className="paginationTable !w-full ">
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
      {/* </TableContainer> */}
      {/* <CustomCircularProgress isLoading={isLoading} /> */}
    </Box>
  );
};

export default GameHistory;
