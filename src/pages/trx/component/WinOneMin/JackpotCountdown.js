import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import * as React from "react";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../../../Shared/SocketContext";
import countdownfirst from "../../../../assets/countdownfirst.mp3";
import countdownlast from "../../../../assets/countdownlast.mp3";
import circle from "../../../../assets/images/circle-arrow.png";
import howToPlay from "../../../../assets/images/user-guide.png";
import Policy from "../policy/Policy";
import ShowImages from "./ShowImages";
import {
  dummycounterFun,
  net_wallet_amount_function,
  trx_game_history_data_function,
  trx_game_image_index_function,
  updateNextCounter,
} from "../../../../redux/slices/counterSlice";
import axios from "axios";
import { endpoint } from "../../../../services/urls";
import toast from "react-hot-toast";
import { zubgtext } from "../../../../Shared/color";
import { walletamount } from "../../../../services/apicalling";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const JackpotCountdown = ({ fk, setBetNumber }) => {
  const socket = useSocket();
  const client = useQueryClient();
  const audioRefMusic = React.useRef(null);
  const audioRefMusiclast = React.useRef(null);
  const [poicy, setpoicy] = React.useState(false);
  const [one_min_time, setOne_min_time] = useState("0_0");
  const next_step = useSelector((state) => state.aviator.next_step);
  const dispatch = useDispatch();
  const show_this_three_min_time_sec = React.useMemo(
    () => String(one_min_time?.split("_")?.[1]).padStart(2, "0"),
    [one_min_time]
  );
  const show_this_three_min_time_min = React.useMemo(
    () => String(one_min_time?.split("_")?.[0]).padStart(2, "0"),
    [one_min_time]
  );
  const handleClickOpenpoicy = () => {
    setpoicy(true);
  };
  const handleClosepolicy = () => {
    setpoicy(false);
  };
  React.useEffect(() => {
    const handleFiveMin = (onemin) => {
      let fivemin = `${4 - (new Date()?.getMinutes() % 5)}_${onemin}`;
      setOne_min_time(fivemin);
      setBetNumber(fivemin);
      fk.setFieldValue("show_this_one_min_time", fivemin);
      if (
        (fivemin?.split("_")?.[1] === "5" ||
          fivemin?.split("_")?.[1] === "4" ||
          fivemin?.split("_")?.[1] === "3" ||
          fivemin?.split("_")?.[1] === "2") &&
        fivemin?.split("_")?.[0] === "0"
      )
        handlePlaySound();
      if (fivemin?.split("_")?.[1] === "1" && fivemin?.split("_")?.[0] === "0")
        handlePlaySoundLast();

      if (
        Number(fivemin?.split("_")?.[1]) <= 10 && // this is for sec
        fivemin?.split("_")?.[0] === "0" // this is for minut
      ) {
        fk.setFieldValue("openTimerDialogBoxOneMin", true);
      }
      if (fivemin?.split("_")?.[1] === "59") {
        fk.setFieldValue("openTimerDialogBoxOneMin", false);
      }
      if (
        fivemin?.split("_")?.[1] === "40" && // this is for sec
        fivemin?.split("_")?.[0] === "0" // this is for minut
      ) {
        // oneMinCheckResult();
        // oneMinColorWinning();
      }
      if (
        fivemin?.split("_")?.[1] === "56" &&
        Number(fivemin?.split("_")?.[0]) === 4
      ) {
        client.refetchQueries("jackpod_gamehistory");
        client.refetchQueries("my_jackpod_history");
        client.refetchQueries("walletamount");
        dispatch(dummycounterFun());
        // fk.setFieldValue("openTimerDialogBoxOneMin", false);
      }
    };

    socket.on("onemintrx", handleFiveMin);

    return () => {
      socket.off("onemintrx", handleFiveMin);
    };
  }, []);

  const { isLoading: amount_loder, data } = useQuery(
    ["walletamount"],
    () => walletamount(),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    }
  );

  React.useEffect(() => {
    dispatch(net_wallet_amount_function(data?.data?.data));
  }, [Number(data?.data?.data?.wallet), Number(data?.data?.data?.winning)]);

  const { isLoading, data: game_history } = useQuery(
    ["jackpod_gamehistory"],
    () => GameHistoryFn(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const GameHistoryFn = async () => {
    try {
      const response = await axios.get(`${endpoint.jackpod_game_history}`);
      return response;
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };

  React.useEffect(() => {
    dispatch(
      updateNextCounter(
        game_history?.data?.data
          ? Number(game_history?.data?.data?.[0]?.tr_transaction_id) + 1
          : 1
      )
    );
    const tr_digit =
      game_history?.data?.data && game_history?.data?.data?.[0]?.tr_hashno;
    let array = [];
    function randomStr(len, arr) {
      let ans = "";
      for (let i = len; i > 0; i--) {
        ans += arr[Math.floor(Math.random() * arr.length)];
      }
      return ans;
    }
    array.push(randomStr(1, "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"));
    for (let i = 0; i < tr_digit?.length; i++) {
      if (/[a-zA-Z]/.test(tr_digit[i])) {
        array.push(tr_digit[i].toUpperCase());
      } else {
        array.push(tr_digit[i]);
      }
    }
    console.log(array);
    dispatch(trx_game_history_data_function(game_history?.data?.data));
    dispatch(trx_game_image_index_function(array));
  }, [game_history?.data?.data]);

  const handlePlaySound = async () => {
    try {
      if (audioRefMusic?.current?.pause) {
        await audioRefMusic?.current?.play();
      } else {
        await audioRefMusic?.current?.pause();
      }
    } catch (error) {
      // Handle any errors during play
      console.error("Error during play:", error);
    }
  };

  const handlePlaySoundLast = async () => {
    try {
      if (audioRefMusiclast?.current?.pause) {
        await audioRefMusiclast?.current?.play();
      } else {
        await audioRefMusiclast?.current?.pause();
      }
    } catch (error) {
      // Handle any errors during play
      console.error("Error during play:", error);
    }
  };

  return (
    <Box className="countdownbgtrx" sx={{ background: zubgtext }}>
      {React.useMemo(() => {
        return (
          <>
            <audio ref={audioRefMusic} hidden>
              <source src={`${countdownfirst}`} type="audio/mp3" />
            </audio>
            <audio ref={audioRefMusiclast} hidden>
              <source src={`${countdownlast}`} type="audio/mp3" />
            </audio>
          </>
        );
      }, [audioRefMusiclast, audioRefMusic])}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "50%",
            borderRight: "1px dashed white",
            paddingRight: "2%",
          }}
          className="win-banner"
        >
          {React.useMemo(() => {
            return (
              <>
                <Box onClick={() => handleClickOpenpoicy()}>
                  <Box
                    component="img"
                    src={howToPlay}
                    sx={{ width: "25px !important", height: "25px !important" }}
                  ></Box>
                  <Typography variant="body1" color="initial">
                    How to play
                  </Typography>
                  <Box
                    component="img"
                    src={circle}
                    sx={{ width: "15px !important", height: "15px !important" }}
                  ></Box>
                </Box>
                <Typography
                  variant="body1"
                  color="initial"
                  className="!ml-2 !text-lg"
                >
                  Jackpot
                </Typography>
              </>
            );
          }, [])}
          {poicy && (
            <Dialog
              open={poicy}
              TransitionComponent={Transition}
              onClose={handleClosepolicy}
              className="dialogsmall"
            >
              <Box>
                <Stack className="dialog-header-policy">
                  <Box>
                    <Typography variant="body1" color="initial">
                      Policy
                    </Typography>
                  </Box>
                  <IconButton onClick={handleClosepolicy}>
                    <CloseIcon />
                  </IconButton>
                </Stack>
              </Box>
              <Policy />
            </Dialog>
          )}
        </Box>
        <Box>
          <Typography variant="h3" color="initial" className="winTextone">
            Time remaining
          </Typography>
          <Stack direction="row">
            {React.useMemo(() => {
              return (
                <>
                  <Box className="timerBoxone">
                    {show_this_three_min_time_min?.substring(0, 1)}
                  </Box>
                  <Box className="timerBox">
                    {show_this_three_min_time_min?.substring(1, 2)}
                  </Box>
                </>
              );
            }, [show_this_three_min_time_min])}
            {React.useMemo(() => {
              return (
                <>
                  <Box className={"!text-white !font-bold !text-lg"}>:</Box>
                  <Box className="timerBox">
                    {show_this_three_min_time_sec?.substring(0, 1)}
                  </Box>
                  <Box className="timerBoxfour">
                    {show_this_three_min_time_sec?.substring(1, 2)}
                  </Box>
                </>
              );
            }, [show_this_three_min_time_sec])}
          </Stack>
          <Typography variant="h3" color="initial" className="winTexttwo">
            {Number(next_step)?.toString()?.padStart(7, "0")}
          </Typography>
        </Box>
      </Box>
      <ShowImages />
    </Box>
  );
};

export default JackpotCountdown;
