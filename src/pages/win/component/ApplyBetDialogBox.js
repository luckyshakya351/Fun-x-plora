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
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { zubgtext } from "../../../Shared/color";
import { endpoint, rupees } from "../../../services/urls";
import Policy from "./policy/Policy";
import { useFormik } from "formik";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ApplyBetDialogBox = ({
  apply_bit_dialog_box,
  setapply_bit_dialog_box,
  type,
  gid,
  random,
  net_wallet_amount,
}) => {
  // const [value, setValue] = useState(random || 1);
  const [Rules, setRules] = useState(false);
  const [loding, setLoding] = useState(false);
  const [multiplyBy, setmultiplyBy] = useState(1);
  const [calculated_value, setcalculated_value] = useState(1);

  const client = useQueryClient();
  const login_data =
    (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
        localStorage.getItem("logindataen"),
        "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
    null;
  // const login_data_ = localStorage.getItem("aviator_data");

  const user_id = login_data && JSON.parse(login_data)?.UserID;

  // React.useEffect(() => {
  //   !aviator_login_data && get_user_data_fn(dispatch);
  // }, []);

  // const handleClickValue = (value) => {
  //   if (value === 0) {
  //     return setValue(1);
  //   }
  //   setValue(value);
  // };
  const initialValue = {
    value: 1,
  };
  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
  });
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
      amount: Number(fk.values.value || 0) || 0,
      number:
        (type === "green" && 10) ||
        (type === "red" && 30) ||
        (type === "voilet" && 20) ||
        (type === "big" && 40) ||
        (type === "small" && 50) ||
        type,
      gameid: Number(gid),
    };
    if (
      reqBody.amount >
      Number(
        Number(net_wallet_amount?.wallet) + Number(net_wallet_amount?.winning)
      )
    ) {
      setLoding(false);
      return toast("Your Wallet Amount is low.");
    }
    try {
      const response = await axios.post(`${endpoint.applybet}`, reqBody);
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

    client.refetchQueries(`myAllhistory_${gid}`);
    client.refetchQueries("walletamount");
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
          dialog-header`}
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
      <div>
        <Box className="dialogsmallbat !flex !justify-between  !items-center !w-full">
          <div className="!text-[15px] !text-[#595f6b]">Balance</div>
          <Box
            className={`
          addbtnbox  !grid !grid-cols-4 !gap-[2px]`}
          >
            {[1, 10, 100, 1000]?.map((i) => {
              return (
                <p
                  onClick={() => {
                    // handleClickValue(i);
                    fk.setFieldValue("value", i);
                    setcalculated_value(i);
                  }}
                  className={`!p-1 !text-center !text-[12px] !rounded-md
  ${
    (type === "green" ||
      type === 1 ||
      type === 3 ||
      type === 7 ||
      type === 9) &&
    calculated_value === i
      ? "!bg-[#30b539] !text-white"
      : ""
  }
  ${
    (type === "red" || type === 2 || type === 6 || type === 4 || type === 8) &&
    calculated_value === i
      ? "!bg-[#FE0000] !text-white"
      : ""
  }
  ${
    (type === "voilet" || type === 0 || type === 5) && calculated_value === i
      ? "!bg-[#710193] !text-white"
      : ""
  }
  ${
    type === "small" && calculated_value === i
      ? "!bg-[#EE1285] !text-white"
      : ""
  }
  ${type === "big" && calculated_value === i ? "!bg-[#FBB13B] !text-white" : ""}
  ${calculated_value !== i ? "!bg-[#f6f6f6] !text-gray-600" : ""}
`}
                >
                  {i}
                </p>
              );
            })}
          </Box>
        </Box>
        <div className="!flex !justify-between !items-center  gap-2 px-2">
          <div className="!text-[15px] !text-[#595f6b]">Quantity</div>
          {/* bat-price-input-box */}
          <div className=" !flex !items-center gap-1">
            <span
              className="!p-1 !h-[25px] !bg-[#cdc5c5] rounded-md !flex !justify-center !items-center"
              onClick={() =>
                fk.setFieldValue("value", Number(fk.values.value) - 1)
              }
            >
              <RemoveIcon size="small" className="!w-[12px]" />
            </span>
            <TextField
              size="small"
              placeholder="Enter value"
              value={fk.values.value}
              variant="outlined"
              type="number"
              id="value"
              name="value"
              onChange={fk.handleChange}
              sx={{
                width: "150px",
                "& .MuiOutlinedInput-root": {
                  height: "25px", // Height applied correctly
                },
              }}
              className="!text-[10px]"
            />

            <span
              className="!p-1 !h-[25px] !bg-[#cdc5c5] rounded-md !flex !justify-center !items-center"
              onClick={() =>
                fk.setFieldValue("value", Number(fk.values.value) + 1)
              }
            >
              <AddIcon size="small" className="!w-[12px]" />
            </span>
          </div>
        </div>
        <Box className="!grid !grid-cols-6 lg:gap-1 gap-[1px] !pt-8 lg:px-2 px-1">
          {[1, 5, 10, 20, 50, 100]?.map((i) => {
            return (
              <div
                onClick={() => {
                  // handleClickValue(value * i);
                  fk.setFieldValue("value", Number(fk.values.value) * i);
                  setmultiplyBy(i);
                }}
                className={`!p-1 !text-center !text-[12px] !rounded-md
  ${
    (type === "green" ||
      type === 1 ||
      type === 3 ||
      type === 7 ||
      type === 9) &&
    multiplyBy === i
      ? "!bg-[#30b539] !text-white"
      : ""
  }
  ${
    (type === "red" || type === 2 || type === 6 || type === 4 || type === 8) &&
    multiplyBy === i
      ? "!bg-[#FE0000] !text-white"
      : ""
  }
  ${
    (type === "voilet" || type === 0 || type === 5) && multiplyBy === i
      ? "!bg-[#710193] !text-white"
      : ""
  }
  ${type === "small" && multiplyBy === i ? "!bg-[#EE1285] !text-white" : ""}
  ${type === "big" && multiplyBy === i ? "!bg-[#FBB13B] !text-white" : ""}
  ${multiplyBy !== i ? "!bg-[#f6f6f6] !text-gray-600" : ""}
`}
              >
                {i}x
              </div>
            );
          })}
        </Box>
      </div>
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
      <div className="grid grid-cols-3 gap-[3px] p-2 !text-[10px]">
        <Button
          className="!bg-[#cdc5c5] !text-white !py-0"
          variant="text"
          onClick={() => setapply_bit_dialog_box(false)}
        >
          <span className="!text-[12px]">Cancel</span>
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
          <span className="!text-[12px]">
            Total Amount {rupees} {fk.values.value || "0"}
          </span>
        </Button>
      </div>

      <CustomCircularProgress isLoading={loding} />
    </Dialog>
  );
};

export default ApplyBetDialogBox;
