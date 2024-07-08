import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
    zubgback,
    zubgshadow,
    zubgtext,
    zubgwhite,
} from "../../../../Shared/color";
import pr0 from "../../../../assets/images/0.png";
import pr11 from "../../../../assets/images/11.png";
import pr22 from "../../../../assets/images/22.png";
import pr33 from "../../../../assets/images/33.png";
import pr4 from "../../../../assets/images/4.png";
import pr5 from "../../../../assets/images/5.png";
import pr6 from "../../../../assets/images/6.png";
import pr7 from "../../../../assets/images/7.png";
import pr8 from "../../../../assets/images/8.png";
import pr9 from "../../../../assets/images/9.png";
import Chart from "./Chart";
import GameHistory from "./GameHistory";
import MyHistory from "./MyHistory";
import JackpotCountdown from "./JackpotCountdown";
import JackpotBetDialogBox from "./JackpotBetDialogBox";

function Jackpot({ gid }) {
    const [TabTwo, setTabTwo] = useState(1);
    const [jackpot_bit_dialog_box, setjackpot_bit_dialog_box] = React.useState(false);
    const [dialog_type, setdialog_type] = React.useState("green_0");
    const [timing, setBetNumber] = useState(100);
    const net_wallet_amount = useSelector(
        (state) => state.aviator.net_wallet_amount
    );
    const initialValues = {
        openTimerDialogBoxOneMin: false,
        show_this_one_min_time: "0_0",
    };

    const fk = useFormik({
        initialValues: initialValues,
        onSubmit: () => {
            console.log(fk.values);
        },
    });

    return (
        <Box className="mainBox">
            {React.useMemo(() => {
                return <JackpotCountdown fk={fk} setBetNumber={setBetNumber} />;
            }, [])}
            {React.useMemo(() => {
                return (
                    <Box
                        sx={{
                            width: "95%",
                            marginLeft: "2.5%",
                            my: "20px",
                            background: "#FCFEFB",
                            boxShadow: zubgshadow,
                            padding: "10px",
                            borderRadius: "10px",
                            position: "relative",
                        }}
                    >
                        {fk.values.openTimerDialogBoxOneMin && (
                            <div className="!w-full !z-50 !h-full  !absolute px-5 flex justify-center items-center">
                                <div
                                    className="flex gap-2 justify-cente !bg-opacity-5"
                                    sx={{ width: "100%" }}
                                >
                                    <div
                                        style={{
                                            fontSize: 200,
                                            borderRadius: 20,
                                            fontWeight: 700,
                                            width: 150,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background: zubgtext,
                                            color: "white !important",
                                        }}
                                    >
                                        {String(fk.values.show_this_one_min_time?.split("_")?.[1])
                                            ?.padStart(2, "0")
                                            ?.substring(0, 1)}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 200,
                                            borderRadius: 20,
                                            fontWeight: 700,
                                            width: 150,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background: zubgtext,
                                            color: "white !important",
                                        }}
                                    >
                                        {String(fk.values.show_this_one_min_time?.split("_")?.[1])
                                            ?.padStart(2, "0")
                                            ?.substring(1, 2)}
                                    </div>
                                </div>
                            </div>
                        )}
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                mb: "20px",
                                "&>button": { width: "32%", padding: "10px 10px " },
                            }}
                        >
                            <Button
                                className="greembtn"
                            >
                                Join Green
                            </Button>
                            <Button
                                className="greemviolet"
                            >
                                Join Violet
                            </Button>
                            <Button
                                className="greemred"
                            >
                                Join Red
                            </Button>
                        </Box>
                        {/* pridictcolor */}

                        <Box
                            sx={{
                                width: "100%",
                                my: "20px",
                                background: zubgwhite,
                                boxShadow: zubgshadow,
                                borderRadius: "10px",
                                position: "relative",
                                padding: "10px",

                            }}
                            className=" grid grid-cols-3 "
                        >
                            <Box

                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: '20px',
                                }}
                                className=""
                            >
                                <div className="w-[28%] m-1 " >
                                    {[
                                        { nogreen: 0, img: pr0 },
                                        { nogreen: 1, img: pr11 },
                                        { nogreen: 2, img: pr22 },
                                        { nogreen: 3, img: pr33 },
                                        { nogreen: 4, img: pr4 },

                                    ]?.map((i) => {
                                        return (
                                            <img
                                                className="!cursor-pointer"
                                                src={i?.img}
                                                onClick={() => {
                                                    setjackpot_bit_dialog_box(true);
                                                    setdialog_type(`green_${i.nogreen}`)
                                                }}
                                                alt="button"
                                            />
                                        );
                                    })}
                                </div>
                                <div
                                    className="w-[28%] m-1">
                                    {[ 
                                        { nogreen: 5, img: pr5 },
                                        { nogreen: 6, img: pr6 },
                                        { nogreen: 7, img: pr7 },
                                        { nogreen: 8, img: pr8 },
                                        { nogreen: 9, img: pr9 },

                                    ]?.map((i) => {
                                        return (
                                            <img
                                                className="!cursor-pointer"
                                                src={i?.img}
                                                onClick={() => {
                                                    setjackpot_bit_dialog_box(true);
                                                    setdialog_type(`green_${i.nogreen}`)
                                                }}
                                                alt="button"
                                            />
                                        );
                                    })}
                                </div>
                            </Box>
                            <Box
                                //violet
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: '20px',
                                }}
                                className=""
                            >
                                <div className="w-[28%] m-1" >
                                    {[
                                        { noviolet: 0, img: pr0 },
                                        { noviolet: 1, img: pr11 },
                                        { noviolet: 2, img: pr22 },
                                        { noviolet: 3, img: pr33 },
                                        { noviolet: 4, img: pr4 },

                                    ]?.map((i) => {
                                        return (
                                            <img
                                                className="!cursor-pointer"
                                                src={i?.img}
                                                onClick={() => {
                                                    setjackpot_bit_dialog_box(true);
                                                    setdialog_type(`voilet_${i.noviolet}`)
                                                }}
                                                alt="button"
                                            />
                                        );
                                    })}
                                </div>
                                <div
                                    className="w-[28%] m-1"
                                >
                                    {[
                                        { noviolet: 5, img: pr5 },
                                        { noviolet: 6, img: pr6 },
                                        { noviolet: 7, img: pr7 },
                                        { noviolet: 8, img: pr8 },
                                        { noviolet: 9, img: pr9 },

                                    ]?.map((i) => {
                                        return (
                                            <img
                                                className="!cursor-pointer"
                                                src={i?.img}
                                                onClick={() => {
                                                    setjackpot_bit_dialog_box(true);
                                                    setdialog_type(`voilet_${i.noviolet}`)
                                                }}
                                                alt="button"
                                            />
                                        );
                                    })}
                                </div>
                            </Box>
                            <Box
                                //red
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: '20px',
                                }}
                                className=""
                            >
                                <div className="w-[28%] m-1 " >
                                    {[
                                        { nored: 0, img: pr0 },
                                        { nored: 1, img: pr11 },
                                        { nored: 2, img: pr22 },
                                        { nored: 3, img: pr33 },
                                        { nored: 4, img: pr4 },

                                    ]?.map((i) => {
                                        return (
                                            <img
                                                className="!cursor-pointer"
                                                src={i?.img}
                                                onClick={() => {
                                                    setjackpot_bit_dialog_box(true);
                                                    setdialog_type(`red_${i.nored}`)
                                                }}
                                                alt="button"
                                            />
                                        );
                                    })}
                                </div>
                                <div
                                    className="w-[28%] m-1"
                                >
                                    {[
                                        { nored: 5, img: pr5 },
                                        { nored: 6, img: pr6 },
                                        { nored: 7, img: pr7 },
                                        { nored: 8, img: pr8 },
                                        { nored: 9, img: pr9 },

                                    ]?.map((i) => {
                                        return (
                                            <img
                                                className="!cursor-pointer"
                                                src={i?.img}
                                                onClick={() => {
                                                    setjackpot_bit_dialog_box(true);
                                                    setdialog_type(`red_${i.nored}`)
                                                }}
                                                alt="button"
                                            />
                                        );
                                    })}
                                </div>
                            </Box>
                        </Box>


                    </Box>
                );
            }, [fk])}

            <Box className="tableBox_wingo">
                {React.useMemo(() => {
                    return (
                        <>
                            <Box sx={{ background: zubgback, borderRadius: "10px" }}>
                                <Stack direction="row">
                                    <Box
                                        component={NavLink}
                                        onClick={() => setTabTwo(1)}
                                        className={
                                            TabTwo === 1 ? "activewinNavtwo Winnavtow" : "Winnavtow"
                                        }
                                    >
                                        <Typography variant="h3" color="initial">
                                            Game History
                                        </Typography>
                                    </Box>
                                    <Box
                                        component={NavLink}
                                        onClick={() => setTabTwo(2)}
                                        className={
                                            TabTwo === 2 ? "activewinNavtwo Winnavtow" : "Winnavtow"
                                        }
                                    >
                                        <Typography variant="h3" color="initial">
                                            Chart
                                        </Typography>
                                    </Box>
                                    <Box
                                        component={NavLink}
                                        onClick={() => setTabTwo(3)}
                                        className={
                                            TabTwo === 3 ? "activewinNavtwo Winnavtow" : "Winnavtow"
                                        }
                                    >
                                        <Typography variant="h3" color="initial">
                                            My History
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        </>
                    );
                }, [TabTwo])}
                {TabTwo === 1 && <GameHistory gid={gid} />}
                {TabTwo === 2 && <Chart gid={gid} />}
                {TabTwo === 3 && <MyHistory gid={gid} />}
            </Box>
            {jackpot_bit_dialog_box &&
                Number(
                    `${String(timing)?.split("_")?.[0]}.${String(timing)
                        ?.split("_")?.[1]
                        ?.padStart(2, "0")}`
                ) > 0.1 && (
                    <JackpotBetDialogBox
                        jackpot_bit_dialog_box={jackpot_bit_dialog_box}
                        setjackpot_bit_dialog_box={setjackpot_bit_dialog_box}
                        type={dialog_type}
                        gid={gid}
                        net_wallet_amount={net_wallet_amount}
                    />
                )}
        </Box>
    );
}

export default Jackpot;
