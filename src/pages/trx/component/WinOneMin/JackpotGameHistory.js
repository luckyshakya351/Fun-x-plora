import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import * as React from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { lightblue, zubgback, zubgtext } from "../../../../Shared/color";
import history from "../../../../assets/images/list.png";
import {
    trx_game_image_index_function,
    updateNextCounter,
} from "../../../../redux/slices/counterSlice";
import { endpoint } from "../../../../services/urls";
import { Block } from "@mui/icons-material";

const JackpotGameHistory = ({ gid }) => {
    const navigate = useNavigate();
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    const dispatch = useDispatch();
    //   const { isLoading, data: game_history } = useQuery(
    //     ["trx_gamehistory", gid],
    //     () => GameHistoryFn(gid),
    //     {
    //       refetchOnMount: false,
    //       refetchOnReconnect: false,
    //       refetchOnWindowFocus: false
    //     }
    //   );

    //   const GameHistoryFn = async (gid) => {
    //     try {
    //       const response = await axios.get(
    //         `${endpoint.trx_game_history}?gameid=${gid}&limit=500`
    //       );
    //       return response;
    //     } catch (e) {
    //       toast(e?.message);
    //       console.log(e);
    //     }
    //   };

    //   const game_history_data = React.useMemo(
    //     () => game_history?.data?.result,
    //     [game_history?.data?.result]
    //   );
    const isLoading = false;
    const Dummy = [
        {
            period: "202408334",
            Block: "vjjvj",
            BlockTime: "14:39:51",
            Hash: "**1925",
            Result: "9",
            number: "100",
            color: "green"
        },
        {
            period: "202408334",
            Block: "vggjv",
            BlockTime: "14:39:51",
            Hash: "**1925",
            Result: "8",
            number: "200",
            color: "violet"
        },
        {
            period: "2024083784",
            Block: "www",
            BlockTime: "14:39:51",
            Hash: "**1925",
            Result: "1",
            number: "200",
            color: "violet"
        },
        {
            period: "202408334",
            Block: "nbvnb",
            BlockTime: "14:39:51",
            Hash: "**1925",
            Result: "5",
            number: "300",
            color: "red"
        },
        {
            period: "202408334",
            Block: "vjjvj",
            BlockTime: "14:39:51",
            Hash: "**1925",
            Result: "2",
            number: "100",
            color: "green"
        },
    ];

    //   React.useEffect(() => {
    //     dispatch(
    //       updateNextCounter(
    //         game_history?.data?.result
    //           ? Number(game_history?.data?.result?.[0]?.tr_transaction_id) + 1
    //           : 1
    //       )
    //     );
    //     const tr_digit =
    //       game_history?.data?.result && game_history?.data?.result?.[0]?.tr_digits;
    //     let array = [];
    //     for (let i = 0; i < tr_digit?.length; i++) {
    //       if (/[a-zA-Z]/.test(tr_digit[i])) {
    //         array.push(tr_digit[i].toUpperCase());
    //       } else {
    //         array.push(tr_digit[i]);
    //       }
    //     }
    //     dispatch(trx_game_image_index_function(array));
    //   }, [game_history?.data?.result]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const visibleRows = React.useMemo(
        () =>
            Dummy?.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [page, rowsPerPage, Dummy]
    );
    console.log(Dummy, "ghg")
    if (isLoading)
        return (
            <div className="!w-full  flex justify-center">
                <CircularProgress className={"!text-white"} />
            </div>
        );
    return (
        <Box sx={{ pb: 4 }}>
            <Stack direction="row" className="onegotextbox">
                <Typography variant="body1" color="initial">
                    <Box
                        component="img"
                        src={history}
                        width={25}
                        sx={{ marginRight: "10px" }}
                    ></Box>
                    {gid === "1"
                        ? "One GO Record"
                        : gid === "2"
                            ? "Three Go Record"
                            : "Five Go Record"}
                </Typography>
            </Stack>
            <TableContainer sx={{ borderRadius: '7px' }}>
                <Table
                    sx={{ background: zubgback, color: "white", borderRadius: '10px  10px 0px 0px' }}
                    className="wintable"
                    aria-label="simple table"
                >
                    <TableHead sx={{ borderRadius: '10px  10px 0px 0px' }}>
                        <TableRow>
                            <TableCell sx={{ padding: ' 10px 5px', fontSize: '13px', fontWeight: 600, }}>
                                Period
                            </TableCell>
                            <TableCell sx={{ padding: ' 10px 5px', fontSize: '13px', fontWeight: 600, }}>
                                Block
                            </TableCell>
                            <TableCell sx={{ padding: ' 10px 5px', fontSize: '13px', fontWeight: 600, }}>
                                Block Time
                            </TableCell>
                            <TableCell sx={{ padding: ' 10px 5px', fontSize: '13px', fontWeight: 600, }}>
                                Hash
                            </TableCell>
                            <TableCell sx={{ padding: ' 10px 5px', fontSize: '13px', fontWeight: 600, }}>
                                Result
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {visibleRows?.map((i) => {
                            return (
                                <TableRow className="!w-[95%]">
                                    <TableCell className="!text-white" sx={{ padding: ' 10px 5px', fontsize: ' 13px', borderBottom: `1px solid ${lightblue}` }}>
                                        <p
                                            style={{ fontWeight: 700, fontSize: '12px', color: zubgtext }}
                                        >
                                            {i?.period}
                                        </p>
                                    </TableCell>
                                    <TableCell sx={{ padding: ' 10px 5px', fontsize: ' 13px', borderBottom: `1px solid ${lightblue}` }}>
                                        <span>
                                            <LiveHelpIcon
                                                className="!text-[#FBA343] cursor-pointer"
                                                onClick={() =>
                                                    navigate("/trx/tron-scan", {
                                                        state: {
                                                            tron_id: i?.Block,
                                                        },
                                                    })
                                                }
                                            />
                                        </span>
                                        <span>{i?.Block}</span>
                                    </TableCell>
                                    <TableCell sx={{ padding: ' 10px 5px', fontsize: ' 13px', borderBottom: `1px solid ${lightblue}` }}>
                                        <span>{i?.BlockTime}</span>
                                    </TableCell>
                                    <TableCell sx={{ padding: ' 10px 5px', fontsize: ' 13px', borderBottom: `1px solid ${lightblue}` }}>
                                        <span>{i?.Hash}</span>
                                    </TableCell>

                                    <TableCell sx={{ padding: ' 10px 5px', fontsize: ' 13px', borderBottom: `1px solid ${lightblue}` }}>
                                        <span
                                            className={`
                                                   ${(Number(i?.number) === 200 &&
                                                    "bg-gradient-to-t from-violet-400 to-violet-900 text-white") ||
                                                (Number(i?.number) === 100 &&
                                                    "bg-gradient-to-t from-green-400 to-green-900 text-white") ||
                                                (Number(i?.number) === 300 &&
                                                    "bg-gradient-to-t from-red-400 to-red-900 text-white")}
                                            transparentColor font-bold text-lg`}
                                        >
                                            {Number(i?.Result)} {String(i?.color)}
                                        </span>    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                <Box className="paginationTable !w-full">
                    <TablePagination
                        sx={{ background: zubgtext, color: "white", width: "100%" }}
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={Dummy?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Rows"
                    />
                </Box>
            </TableContainer>
            {/* <CustomCircularProgress isLoading={isLoading}/> */}
        </Box >
    );
};

export default JackpotGameHistory;
