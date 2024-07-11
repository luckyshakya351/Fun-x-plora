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
import { endpoint } from "../../../../services/urls";
import { trx_game_image_index_function, updateNextCounter } from "../../../../redux/slices/counterSlice";

const JackpotGameHistory = ({ gid }) => {
    const navigate = useNavigate();
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    const dispatch = useDispatch();
    const { isLoading, data: game_history } = useQuery(
        ["jackpod_gamehistory"],
        () => GameHistoryFn(),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false
        }
    );

    const GameHistoryFn = async () => {
        try {
            const response = await axios.get(
                `${endpoint.jackpod_game_history}`
            );
            return response;
        } catch (e) {
            toast(e?.message);
            console.log(e);
        }
    };
    const game_history_data = game_history?.data?.data || [];


    React.useEffect(() => {
        dispatch(
            updateNextCounter(
                game_history?.data?.data
                    ? Number(game_history?.data?.data?.[0]?.tr_transaction_id) + 1
                    : 1
            )
        );
        const tr_digit =
            game_history?.data?.data && game_history?.data?.data?.tr_digits;
        let array = [];
        for (let i = 0; i < tr_digit?.length; i++) {
            if (/[a-zA-Z]/.test(tr_digit[i])) {
                array.push(tr_digit[i].toUpperCase());
            } else {
                array.push(tr_digit[i]);
            }
        }
        dispatch(trx_game_image_index_function(array));
    }, [game_history?.data?.data]);


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
                                            {i?.tr_transaction_id}
                                        </p>
                                    </TableCell>
                                    <TableCell sx={{ padding: ' 10px 5px', fontsize: ' 13px', borderBottom: `1px solid ${lightblue}` }}>
                                        <span>
                                            <LiveHelpIcon
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
                                        <span>{i?.tr_number}</span>
                                    </TableCell>
                                    <TableCell sx={{ padding: ' 10px 5px', fontsize: ' 13px', borderBottom: `1px solid ${lightblue}` }}>
                                        <span>{i?.tr_block_time}</span>
                                    </TableCell>
                                    <TableCell sx={{ padding: ' 10px 5px', fontsize: ' 13px', borderBottom: `1px solid ${lightblue}` }}>
                                        <span>{i?.tr_hashno}</span>
                                    </TableCell>
                                    <TableCell sx={{ padding: ' 10px 5px', fontsize: ' 13px', borderBottom: `1px solid ${lightblue}` }}>
                                        <span
                                            className={`
                                                    ${(String(Number(i?.tr41_slot_id)) === "0" &&
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
                                        >
                                            {Number(i?.tr41_slot_id)}
                                        </span>
                                        <span
                                            className={`
                                                    ${(() => {
                                                    const slotId = Number(i?.tr41_slot_id);
                                                    if (slotId === 0) {
                                                        return "!bg-gradient-to-t from-red-400 to-violet-400";
                                                    } else if (slotId === 5) {
                                                        return "!bg-gradient-to-t from-violet-400 to-green-400";
                                                    } else if (slotId === 1 || slotId === 3 || slotId === 7 || slotId === 9 || slotId === 10) {
                                                        return "bg-gradient-to-t from-green-400 to-green-900";
                                                    } else if (slotId === 2 || slotId === 4 || slotId === 6 || slotId === 8 || slotId === 30) {
                                                        return "bg-gradient-to-tl from-red-400 to-red-900";
                                                    } else if (slotId === 50) {
                                                        return "bg-[#3183ee]";
                                                    } else if (slotId === 40) {
                                                        return "bg-[#f1be24]";
                                                    } else if (slotId === 20) {
                                                        return "bg-[#eb2feb]";
                                                    } else {
                                                        return "";
                                                    }
                                                })()}
                                                        transparentColor font-bold text-lg
                                                    `}
                                        >
                                            {(() => {
                                                const slotId = Number(i?.tr41_slot_id);
                                                if (slotId === 1 || slotId === 3 || slotId === 7 || slotId === 9 || slotId === 10) {
                                                    return "g";
                                                } else if (slotId === 2 || slotId === 4 || slotId === 6 || slotId === 8 || slotId === 30) {
                                                    return "r";
                                                } else {
                                                    return "v";
                                                }
                                            })()}
                                        </span>
                                    </TableCell>

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
        </Box >
    );
};

export default JackpotGameHistory;
