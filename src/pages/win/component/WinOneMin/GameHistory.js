
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import CustomCircularProgress from "../../../../Shared/CustomCircularProgress";
import { lightblue, zubgback,  zubgtext } from "../../../../Shared/color";
import history from '../../../../assets/images/list.png';
import { useSelector } from "react-redux";


const GameHistory = ({ gid }) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const game_history_data = useSelector((state) => state.aviator.trx_game_history_data);

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
      <Stack direction="row" className="onegotextbox">
        <Typography variant="body1" color="initial" sx={{ color: `${zubgtext} !important` }}>
          <Box component='img' src={history} width={25} sx={{ marginRight: '10px' }}></Box>
          {gid === "1"
            ? "One GO Record"
            : gid === "2"
              ? "Three Go Record"
              : "Five Go Record"}
        </Typography>
      </Stack>
      <TableContainer >
        <Table sx={{ maxWidth: 575, background: zubgback, color: "white" }} className="wintable" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ padding: ' 10px 5px', fontSize: '13px', fontWeight: 600, }}>Period</TableCell>
              <TableCell sx={{ padding: ' 10px 5px', fontSize: '13px', fontWeight: 600, }}>Number</TableCell>
              <TableCell sx={{ padding: ' 10px 5px', fontSize: '13px', fontWeight: 600, }}>Big/Small</TableCell>
              <TableCell sx={{ padding: ' 10px 5px', fontSize: '13px', fontWeight: 600, }}>Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows?.map((i) => {
              return (
                <TableRow>
                  <TableCell className="!text-white" sx={{ padding: ' 10px 5px', fontsize: ' 13px', borderBottom: `1px solid ${lightblue}` }}>
                    <span
                      style={{ color: zubgtext, fontWeight: 700, fontSize: '13px' }}
                    >
                      {i?.gamesno}
                    </span>

                  </TableCell>
                  <TableCell className="!text-white" sx={{ padding: ' 10px 5px', fontsize: ' 13px', borderBottom: `1px solid ${lightblue}` }}>
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
                transparentColor font-bold 
                `}
                    >
                      {i?.number}
                    </span>
                  </TableCell>
                  <TableCell sx={{ padding: ' 10px 5px', fontSize: '12px', fontWeight: '700', borderBottom: `1px solid ${lightblue}` }}
                    className={`${Number(i?.number) <= 4
                      ? "!bg-gradient-to-l !from-[#FE63FF] !to-violet-600"
                      : "!bg-gradient-to-l !from-[#FE63FF] !to-green-600"
                      }  transparentColor `}
                  >
                    {Number(i?.number) <= 4 ? "SMALL" : "BIG"}
                  </TableCell>
                  <TableCell sx={{ padding: ' 10px 5px', borderBottom: `1px solid ${lightblue}` }}>
                    {i?.number === "0" || i?.number === "5" ? (
                      <div className="!flex !gap-1">
                        <div
                          className={`!w-[15px] !h-[15px] !rounded-full ${(i?.number === "0" &&
                            " bg-[#be4345]") ||
                            (i?.number === "5" &&
                              "bg-[#249357]")
                            }`}
                        ></div>
                        <div
                          className={`!w-[15px] !h-[15px] !rounded-full ${(i?.number === "0" &&
                            "bg-[#b065e9]") ||
                            (i?.number === "5" &&
                              "bg-[#b065e9]")
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
                              className={`!w-[15px] !h-[15px] !rounded-full ${(i?.number === "1" ||
                                i?.number === "3" ||
                                i?.number === "7" ||
                                i?.number === "9" ||
                                i?.number === "10") &&
                                "bg-[#249357]"
                                }`}
                            ></div>
                          )) ||
                          ((i?.number === "2" ||
                            i?.number === "4" ||
                            i?.number === "6" ||
                            i?.number === "8" ||
                            i?.number === "30") && (
                              <div
                                className={`!w-[15px] !h-[15px] !rounded-full ${(i?.number === "2" ||
                                  i?.number === "4" ||
                                  i?.number === "6" ||
                                  i?.number === "8" ||
                                  i?.number === "30") &&
                                  "bg-[#be4345]"
                                  }`}
                              ></div>
                            )) || (
                            <div
                              className={`!w-[15px] !h-[15px] !rounded-full ${(i?.number === "50" && "bg-[#68A1ED]") ||
                                (i?.number === "40" && "bg-[#D8B23E]") ||
                                (i?.number === "20" && "bg-[#FE63FF]")
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

        <Box className="paginationTable !w-full mb-32">
          <TablePagination
            sx={{
              background: zubgtext, color: 'white',
             
            }}
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={game_history_data?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </TableContainer>
      {/* <CustomCircularProgress isLoading={isLoading} /> */}
    </Box >
  );

};

export default GameHistory;

