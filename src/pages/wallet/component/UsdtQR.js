import { Box, Button, Container, Stack } from "@mui/material";
import * as React from "react";
import QRCode from "react-qr-code";
import { zubgback } from "../../../Shared/color";
import Layout from "../../../component/Layout/Layout";
import usdt from "../../../assets/payNameIcon1.png";
import toast from "react-hot-toast";
import copy from "clipboard-copy";
const UsdtQR = ({ deposit_req_data, address ,amount }) => {

  const functionTOCopy = (value) => {
    copy(value);
    toast.success("Copied to clipboard!");
  };
  return (
    <Layout footer={false}>
      <Container
        className="no-scrollbar"
        sx={{
          //   background: zubgback,
          background: "white",
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 4,
        }}
      >
        
          <p className="!text-center !text-red-800 font-bold !text-2xl my-5 ">My QR Code</p>
       <div className="flex justify-center">
       <img src={usdt} alt=""  className="w-10 !my-2"/>
       </div>
        <p className="!text-center !text-gray-600 font-bold !text-xl my-2 ">USDT</p>
        <div
          className={`!text-black !bg-white !flex !flex-col justify-center items-center no-scrollbar`}
        >
          <div className=" w-1/2 border border-gray-500 p-4">
            <QRCode
              style={{
                height: "auto",
                maxWidth: "100%",
                width: "100%",
                // background: "#FD565C",
              }}
              value={deposit_req_data}
              viewBox={`#FD565C`}
            />
          </div>
          <div className="">
            <p className="!bg-gray-300 mt-5 !rounded !text-sm px-2 py-1">
              {address}
            </p>
            <div className="w-full flex justify-center mt-5">
              <Button
                size="small !py-1"
                className="!bg-red-600 !text-white place-items-center"
                onClick={() =>
                  functionTOCopy(
                    address

                  )
                }
              >
                Copy
              </Button>
            </div>
          </div>
          {/* {callBackResponse?.payment_status === "Pending" ||
          callBackResponse?.payment_status === "NO" ? (
            <>
              <div className="!bg-white ">
                <QRCode value={deposit_req_data?.upi_qr_code} />
                <p className=" !text-center !mt-5 !font-semibold !text-[#FDB03C] !text-lg">
                  Remaining Time
                </p>
              </div>
              <Stack direction="row">
                <Box className="timerBoxone">0</Box>
                <Box className="timerBox">{show_time.split("_")?.[0]}</Box>
                <Box className={"!text-[#FDB03C] !font-bold !text-lg"}>:</Box>
                <Box className="timerBox">
                  {show_time.split("_")?.[1]?.padStart(2, "0")?.substring(0, 1)}
                </Box>
                <Box className="timerBoxfour">
                  {show_time.split("_")?.[1]?.padStart(2, "0")?.substring(1)}
                </Box>
              </Stack>
            </>
          ) : (
            <>
              <p className="!text-lg">
                Wallet{" "}
                <span className="!font-bold">
                  {rupees} {callBackResponse?.amount}
                </span>{" "}
                has been updated successfully
              </p>
            </>
          )} */}
        </div>
      </Container>
    </Layout>
  );
};

export default UsdtQR;

const style = {
  header: {
    padding: "15px 8px",
    background: zubgback,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "20px",
      fontWeight: "600",
      textAlign: "center",
      color: "white",
    },
    "& > a > svg": {
      color: "white",
      fontSize: "35px",
    },
  },
};
