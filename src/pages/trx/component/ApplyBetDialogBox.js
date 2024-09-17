import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  DialogContentText,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slide from "@mui/material/Slide";
import axios from "axios";
import CryptoJS from "crypto-js";
import * as React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { endpoint, rupees } from "../../../services/urls";
import Policy from "./policy/Policy";
import { zubgtext } from "../../../Shared/color";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ApplyBetDialogBox = ({
  apply_bit_dialog_box,
  setapply_bit_dialog_box,
  type,
  gid,
  random,
}) => {
  const next_step = useSelector((state) => state.aviator.next_step);
  const client = useQueryClient();
  const login_data =
    (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
        localStorage.getItem("logindataen"),
        "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
    null;
  // const login_data_ = localStorage.getItem("aviator_data");
  // const first_rechange =
  //   aviator_login_data && JSON.parse(aviator_login_data)?.first_recharge;
  const user_id = login_data && JSON.parse(login_data)?.UserID;
  const [value, setValue] = useState(random || 1);
  const [Rules, setRules] = useState(false);
  // const [calculated_value, setcalculated_value] = useState(1);
  const [loding, setLoding] = useState(false);
  // React.useEffect(() => {
  //   !aviator_login_data && get_user_data_fn(dispatch);
  // }, []);

  const handleClickValue = (value) => {
    if (value === 0) {
      return setValue(1);
    }
    setValue(value);
  };

  const handleClickOpenRules = () => {
    setRules(true);
  };
  const handleCloseRules = () => {
    setRules(false);
  };

  async function betFunctionStart() {
    setLoding(true);
    console.log("FUnction called apply bit");
    const reqBody = {
      userid: user_id,
      amount: value | 0,
      number:
        (type === "green" && 10) ||
        (type === "red" && 30) ||
        (type === "voilet" && 20) ||
        (type === "big" && 40) ||
        (type === "small" && 50) ||
        type,
      gameid: Number(gid),
      gamesnio: Number(next_step),
    };
    try {
      const response = await axios.post(`${endpoint.trx_game_bet}`, reqBody);
      if (response?.data?.error === "200") {
        toast.success(response?.data?.msg);
        setapply_bit_dialog_box(false);
        localStorage.setItem("betApplied", `${gid}_true`);
      } else {
        toast(response?.data?.msg);
      }
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
    client.refetchQueries("walletamount");
    client.refetchQueries(`my_trx_history_${gid}_temp`);
    setLoding(false);
  }

  return (
    <Dialog
      open={apply_bit_dialog_box}
      TransitionComponent={Transition}
      keepMountedonClose={() => setapply_bit_dialog_box(false)}
      className="dialogsmall"
    >
      <Box>
        <Stack
          className={`${
            ((type === "green" ||
              type === 1 ||
              type === 3 ||
              type === 7 ||
              type === 9) &&
              "!bg-[#30b539]") ||
            ((type === "red" ||
              type === 2 ||
              type === 6 ||
              type === 4 ||
              type === 8) &&
              "!bg-[#FE0000]") ||
            ((type === "voilet" || type === 0 || type === 5) &&
              "!bg-[#710193]") ||
            (type === "small" && "!bg-[#EE1285]") ||
            (type === "big" && "!bg-[#FBB13B]")
          } 
            dialog-header `}
        >
          <div></div>
          <Box>
            <Typography
              variant="body1"
              // color="initial"
              sx={{
                color: "white",
                fontSize: "15px",
                fontWeight: "400",
              }}
              className="!bg-white !text-[#595f6b] px-10 !rounded-full !text-sm"
            >
              <span>Select </span>
              {(type === "green" && "Green") ||
                (type === "voilet" && "Voilet") ||
                (type === "red" && "Red") ||
                type}
            </Typography>
          </Box>
          <IconButton
            onClick={() => setapply_bit_dialog_box(false)}
            sx={{ "&>svg>path": { color: "#595f6b" } }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </Box>
      <Box className="dialogsmallbat !flex !justify-between !items-center">
        <div className="!text-[15px] !text-[#595f6b]">Balance</div>
        <Box
          className={`
            addbtnbox  !grid !grid-cols-4 !gap-[2px]`}
        >
          {[1, 10, 100, 1000]?.map((i) => {
            return (
              <p
                onClick={() => {
                  handleClickValue(i);
                  // setcalculated_value(i);
                }}
                className={`${
                  ((type === "green" ||
                    type === 1 ||
                    type === 3 ||
                    type === 7 ||
                    type === 9) &&
                    "!bg-[#30b539]") ||
                  ((type === "red" ||
                    type === 2 ||
                    type === 6 ||
                    type === 4 ||
                    type === 8) &&
                    "!bg-[#FE0000]") ||
                  ((type === "voilet" || type === 0 || type === 5) &&
                    "!bg-[#710193]") ||
                  (type === "small" && "!bg-[#EE1285]") ||
                  (type === "big" && "!bg-[#FBB13B]")
                } !p-1 !text-center !text-white !text-[12px] !rounded-md 
            `}
              >
                {i}
              </p>
            );
          })}
        </Box>
      </Box>
      <div className="!flex !justify-between !items-center  gap-2">
        <div className="!text-[15px] !text-[#595f6b]">Quantity</div>
        {/* bat-price-input-box */}
        <div className=" !flex !items-center gap-1">
          <span
            className="!p-1 !h-[25px] !bg-[#cdc5c5] rounded-md !flex !justify-center !items-center"
            onClick={() => handleClickValue(value - 1)}
          >
            <RemoveIcon size="small" />
          </span>
          <TextField
            size="small"
            placeholder="Enter value"
            value={value}
            variant="outlined"
            type="number"
            onChange={(e) => {
              const parsedValue = parseInt(e.target.value, 10);
              if (!isNaN(parsedValue)) {
                handleClickValue(parsedValue);
              }
            }}
            sx={{
              width: "150px",
              "& .MuiOutlinedInput-root": {
                height: "25px", // Height applied correctly
              },
            }}
          />

          <span
            className="!p-1 !h-[25px] !bg-[#cdc5c5] rounded-md !flex !justify-center !items-center"
            onClick={() => handleClickValue(value + 1 || 1)}
          >
            <AddIcon />
          </span>
        </div>
      </div>
      <Box className="!grid !grid-cols-6 lg:gap-1 gap-[1px] !pt-8 lg:px-2 px-1">
        {[1, 5, 10, 20, 50, 100]?.map((i) => {
          return (
            <div
              onClick={() => {
                handleClickValue(value * i);
                // setcalculated_value(value)
              }}
              className={`${
                ((type === "green" ||
                  type === 1 ||
                  type === 3 ||
                  type === 7 ||
                  type === 9) &&
                  "!bg-[#30b539]") ||
                ((type === "red" ||
                  type === 2 ||
                  type === 6 ||
                  type === 4 ||
                  type === 8) &&
                  "!bg-[#FE0000]") ||
                ((type === "voilet" || type === 0 || type === 5) &&
                  "!bg-[#710193]") ||
                (type === "small" && "!bg-[#EE1285]") ||
                (type === "big" && "!bg-[#FBB13B]")
              }
             !px-1 !py-1 rounded-md  !text-center !text-[#fff] !text-[12px]
            `}
            >
              {i}x
            </div>
          );
        })}
      </Box>
      {/* <Stack direction="row" className="total-money-box">
        <Typography variant="body1" color="initial" sx={{ color: zubgtext }}>
          Total contract money is ₹{" "}
        </Typography>
        <Typography variant="body1" color="initial" sx={{ color: zubgtext }}>
          
        </Typography>
      </Stack> */}
      <Stack direction="row" className="agree-btn">
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="I Agree"
        />
        <Button onClick={() => handleClickOpenRules()} sx={{ color: zubgtext }}>
          Personal Rules
        </Button>
        <Dialog
          open={Rules}
          onClose={handleCloseRules}
          className="dialog-rules"
        >
          <DialogContentText id="alert-dialog-description">
            <Stack direction="row" className="personal-rules-header">
              <Typography>Presale Rule</Typography>
              <CloseIcon onClick={() => handleCloseRules()} />
            </Stack>
            <Policy />
          </DialogContentText>
        </Dialog>
      </Stack>
      <div className="grid grid-cols-3 gap-[1px] !text-[10px]">
       
        <Button
          className="!bg-[#cdc5c5] !text-white !py-0"
          variant="text"
          onClick={() => setapply_bit_dialog_box(false)}
        >
          Cancel
        </Button>
        <Button
          className={`!text-white !col-span-2 
          ${
            ((type === "green" ||
              type === 1 ||
              type === 3 ||
              type === 7 ||
              type === 9) &&
              "!bg-[#30b539]") ||
            ((type === "red" ||
              type === 2 ||
              type === 6 ||
              type === 4 ||
              type === 8) &&
              "!bg-[#FE0000]") ||
            ((type === "voilet" || type === 0 || type === 5) &&
              "!bg-[#710193]") ||
            (type === "small" && "!bg-[#EE1285]") ||
            (type === "big" && "!bg-[#FBB13B]")
          } 
          `}
          variant="text"
          color="primary"
          onClick={() => {
            betFunctionStart();
          }}
          loding={true}
        >
          Total Amount {rupees} {value || "0"}
        </Button>
      </div>

      <CustomCircularProgress isLoading={loding} />
    </Dialog>
  );
};

export default ApplyBetDialogBox;
