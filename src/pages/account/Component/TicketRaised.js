import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Box,
  Button,
  Container,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useFormik } from "formik";
// import "jspdf-autotable";
import moment from "moment";
import * as React from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { zubgback, zubgbackgrad, zubgtext } from "../../../Shared/color";
import Layout from "../../../component/Layout/Layout";
import { getTicketRaisedHistory } from "../../../services/apicalling";
import { endpoint } from "../../../services/urls";
import theme from "../../../utils/theme";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { NavLink, useNavigate } from "react-router-dom";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";

function TicketRaised() {
  const [image, setImage] = React.useState(null);
  const [isAllValue, setIsAllValue] = React.useState(false);
  const [visibleData, setvisibleData] = React.useState([]);
  const [isvisible, setisvisible] = React.useState(false);
  const login_data =
    (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
        localStorage.getItem("logindataen"),
        "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
    null;
  const user_id = login_data && JSON.parse(login_data)?.UserID;
  const initialValue = {
    type: "Select Type",
    description: "",
  };
  const client = useQueryClient();
  const [loding, setloding] = React.useState(false);
  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      if (fk.values.type === "Select Type") return "Select Type of issues.";
      const reqBody = {
        user_id: user_id,
        files: image,
        type: Number(fk.values.type),
        description: fk.values.description,
      };
      ticketRaised(reqBody);
    },
  });

  async function ticketRaised(reqBody) {
    setloding(true);
    try {
      const response = await axios.post(endpoint.ticket_raised, reqBody);
      toast(response?.data?.msg);
    } catch (e) {
      toast("File size should be less than 25kb");
    }
    setloding(false);
    client.refetchQueries("get_ticket_raised_history");
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const { isLoading, data: TicketRaised } = useQuery(
    ["get_ticket_raised_history"],
    () => getTicketRaisedHistory(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  React.useEffect(() => {
    isAllValue
      ? setvisibleData(TicketRaised?.data?.data)
      : setvisibleData(TicketRaised?.data?.data?.slice(0, 3));
  }, [isAllValue, TicketRaised]);

  return (
    <Layout>
      <Container
        sx={{
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 5,
        }}
        className="no-scrollbar"
      >
        <Box sx={style.header}>
          <Box component={NavLink} onClick={() => goBack()}>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1" color="initial">
            Ticket
          </Typography>
          <Typography variant="body1" color="initial">
            {" "}
          </Typography>
        </Box>
        <div className="flex justify-between w-full items-center bg-[#518b36] px-2 py-6 rounded-lg mt-3 ">
          <div className="grid grid-cols-2 gap-1 items-center w-[400px] p-5">
            <span className="col-span-2 justify-end">
              <div className="flex justify-between">
                <span className="font-bold">Ticket Generate</span>
              </div>
            </span>
            <span className="!text-white !my-3 !text-sm">
              Select Ticket Type*
            </span>
            <TextField
              id="type"
              name="type"
              value={fk.values.type}
              onChange={fk.handleChange}
              className="!w-[100%] !bg-[#518b36] !my-3"
              select
              size="small"
            >
              <MenuItem value={"Select Type"}>Select Type</MenuItem>
              <MenuItem value={"1"}>Deposit</MenuItem>
              <MenuItem value={"2"}>Withdrawal</MenuItem>
              <MenuItem value={"3"}>Bank Details</MenuItem>
              <MenuItem value={"4"}>Payout </MenuItem>
              <MenuItem value={"5"}>Other issue </MenuItem>
            </TextField>

            <span className="!text-white !my-3 !text-sm">Attachment*</span>
            <div>
              <input
                type="file"
                id="myfile"
                name="myfile"
                className="!text-sm !my-3"
                // onChange={(e) => setImage(e.target.files[0])}
                onChange={handleFileChange}
                required
              />
              <p className="!text-red-700 !text-[10px]">
                File size should be less than 10MB
              </p>
            </div>
            <span className="!text-white !my-3 !text-sm">Description*</span>
            <textarea
              type="textarea"
              id="description"
              name="description"
              placeholder="Enter Description"
              value={fk.values.description}
              onChange={fk.handleChange}
              className="!w-[100%] !bg-white !text-sm  !text-center !text-black pt-2 !my-3"
            />

            <div className="col-span-2 flex  justify-end gap-2 mt-4">
              <Button
                className="!bg-[#FD565C] !text-white"
                onClick={() => fk.handleReset()}
              >
                Cancel
              </Button>
              <Button
                className="!bg-[#BF6DFE] !text-white"
                onClick={() => fk.handleSubmit()}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>

        {visibleData?.map((i, index) => {
          return (
            <Box
              key={index}
              sx={{
                mb: 2,
                padding: "10px",
                borderRadius: "10px",
                background: "#fff",
                width: "92%",
                margin: "auto",
                mt: 2,
              }}
            >
              <Stack
                direction="row"
                sx={{
                  paddingBottom: "10px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #efefef",
                }}
              >
                <Box>
                  <Typography className="!bg-[#518b36] !text-white rounded px-2 py-1 !flex justify-center">
                    Ticket
                  </Typography>
                </Box>
                <Box
                  sx={{
                    color: "#888",
                    textTransform: "capitalize",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {i?.call_back_status}
                </Box>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  "&>p:nth-child(1)": {
                    color: "#888",
                    fontSize: "13px",
                    fontWeight: "600",
                    py: 1,
                  },
                  "&>p:nth-child(2)": {
                    color: theme.palette.primary.main,
                    fontSize: "13px",
                    fontWeight: "600",
                    py: 1,
                  },
                }}
              >
                <Typography variant="body1" color="initial">
                  Status
                </Typography>
                <Typography variant="body1">
                  {i?.status === 0 ? "Pending" : "Success"}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  "&>p": {
                    color: "#888",
                    fontSize: "13px",
                    fontWeight: "600",
                    py: 1,
                  },
                }}
              >
                <Typography variant="body1" color="initial">
                  Type
                </Typography>
                <Typography variant="body1" color="initial">
                  {i?.ticket_type}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  "&>p": {
                    color: "#888",
                    fontSize: "13px",
                    fontWeight: "600",
                    py: 1,
                  },
                }}
              >
                <Typography variant="body1" color="initial">
                  Time
                </Typography>
                <Typography
                  variant="body1"
                  color="initial"
                  className="!text-green-500"
                >
                  {moment(i?.timestamp)?.format("DD-MM-YYYY HH:mm:ss")}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  "&>p": {
                    color: "#888",
                    fontSize: "13px",
                    fontWeight: "600",
                    py: 1,
                  },
                }}
              >
                <Typography variant="body1" color="initial">
                  Ticket Id
                </Typography>
                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    "&>p:nth-child(1)": {
                      color: "#888",
                      fontSize: "13px",
                      fontWeight: "600",
                      py: 1,
                    },
                    "&>p:nth-child(2)": {
                      color: theme.palette.primary.main,
                      fontSize: "13px",
                      fontWeight: "600",
                    },
                  }}
                >
                  <Typography variant="body1" color="initial">
                    {i?.ticket_id}
                  </Typography>
                  <IconButton sx={{ padding: 0 }}>
                    <ContentCopyIcon
                      sx={{ color: "#888", width: "15px", ml: 1 }}
                    />
                  </IconButton>
                </Stack>
              </Stack>
              <div>
                <p className="!text-blue-500">Query:</p>
                <p className="!px-5 !w-full !overflow-auto border-2 !border-gray-400 !min-h-[100px]">
                  {i?.description}
                </p>
              </div>

              {i?.status === 1 && (
                <div>
                  <p className="!text-green-500 !font-bold !w-full flex justify-between items-center">
                    <span>Resolution:</span>
                    <span className="!text-[10px]">
                      {moment(i?.resolution_date)?.format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </span>
                  </p>
                  <p className="!px-5 !w-full !overflow-auto border-2 !border-gray-400 !min-h-[100px] !text-black">
                    {i?.resolution}
                  </p>
                </div>
              )}
              <p
                onClick={() => setisvisible(index)}
                className="!cursor-pointer"
              >
                View Image
              </p>
              {String(isvisible) && index === isvisible && (
                <div className="!flex w-full ">
                  <img src={i?.file_name} className="!w-full !h-[400px]" />
                </div>
              )}
            </Box>
          );
        })}

        <Button
          sx={style.paytmbtntwo}
          variant="outlined"
          onClick={() => setIsAllValue(!isAllValue)}
        >
          {isAllValue ? "Show Less" : " All history"}
        </Button>

        <CustomCircularProgress isLoading={loding || isLoading} />
      </Container>
    </Layout>
  );
}

export default TicketRaised;

export const style = {
  container: {
    background: zubgback,
    width: "100%",
    height: "100vh",
    overflow: "auto",
  },
  header: {
    padding: "10px 8px",
    background: zubgtext,
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
  notificationBox: {
    width: "95%",
    marginLeft: "2.5%",
    borderRadius: "10px",
    background: zubgtext,
    padding: "10px",
    mt: "10px",
    "&>div>div>p": {
      color: "white",
      fontSize: "14px",
      marginLeft: "10px",
      fontWeight: "500",
    },
    "&>p": {
      color: "white",
      fontSize: "13px",
      marginLeft: "0px",
      fontWeight: "500",
      mt: "10px",
    },
    "&>div>div>svg": { color: "white", fontSize: "24px" },
    "&>div>svg": { color: "white", fontSize: "24px" },
  },
  notificationStack: { alignItems: "center", justifyContent: "space-between" },
  paytmbtntwo: {
    borderRadius: "5px",
    textTransform: "capitalize",
    mb: 2,
    background: zubgtext,
    color: "white !important",
    width: "100%",
    mt: "20px",
    border: "1px solid white",
    padding: "10px",
    "&:hover": { background: zubgbackgrad, border: "1px solid transparent" },
  },
};