import { Cancel } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Container,
  Dialog,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import * as React from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import {
  zubgback,
  zubgbackgrad,
  zubgmid,
  zubgshadow,
  zubgtext
} from "../../../Shared/color";
import nodatafoundimage from "../../../assets/images/nodatafoundimage.png";
import Layout from "../../../component/Layout/Layout";
import { endpoint } from "../../../services/urls";
import theme from "../../../utils/theme";
function USDTPayInRequest() {
  const [isOpenImageDialog, setisOpenImageDialog] = React.useState(false);
  const [isOpenDesBlock, setisOpenDesBlock] = React.useState(false);
  const [filter, setfilter] = React.useState("pending");
  const [visibleRows, setVisibleRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();
  const client = useQueryClient();
  const goBack = () => {
    navigate(-1);
  };

  const { isLoading, data } = useQuery(
    ["ticket_issued_solurijon_req", filter],
    () =>
      depositBonusFn(filter === "pending" ? 1 : filter === "failed" ? 2 : 3),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const res = data?.data?.data;
  const depositBonusFn = async (value) => {
    try {
      const response = await axios.get(`${endpoint.usdt_payin_requst_admin}`, {
        params: {
          type: value,
        },
      });
      return response;
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    setVisibleRows(
      res?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [page, rowsPerPage, res]);
  const Approve_request = async (id) => {
    try {
      const response = await axios.get(`${endpoint.approve_request_ad}`, {
        params: {
          t_id: id,
        },
      });
      console.log(response);
      client.refetchQueries("ticket_issued_solurijon_req");
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };
  const Reject_request = async (id) => {
    try {
      const response = await axios.get(`${endpoint.reject_request_ad}`, {
        params: {
          t_id: id,
        },
      });
      client.refetchQueries("ticket_issued_solurijon_req");
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };
  if (!isLoading && !res)
    return (
      <Layout>
        <Container
          sx={{
            background: zubgback,
            width: "100%",
            height: "100vh",
            overflow: "auto",
            mb: 5,
          }}
        >
          <Box sx={style.header}>
            <Box component={NavLink} onClick={goBack}>
              <KeyboardArrowLeftOutlinedIcon />
            </Box>
            <p>Deposit Self Income</p>
          </Box>
          <div>
            <img className="" src={nodatafoundimage} />
          </div>
        </Container>
      </Layout>
    );

  return (
    <Layout>
      <Container
        sx={{
          background: zubgback,
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 5,
        }}
      >
        <CustomCircularProgress isLoading={isLoading} />
        <Box sx={style.header}>
          <Box component={NavLink} onClick={goBack}>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <p>USDT Request</p>
          <Box></Box>
        </Box>
        <TextField
          id="filter_data"
          name="filter_data"
          select
          className="!w-full !bg-white"
          size="small"
          value={filter}
          onChange={(e) => setfilter(e.target.value)}
        >
          <MenuItem value={"pending"}>Pending</MenuItem>
          <MenuItem value={"failed"}>Failed</MenuItem>
          <MenuItem value={"success"}>Success</MenuItem>
        </TextField>
        <div className="!overflow-x-auto">
          <Table
            sx={{
              background: theme.palette.secondary.light,
              boxShadow: zubgshadow,
              color: "white",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ color: "white" }}
                  className=" !font-bold !border !text-xs !border-r  !text-center !border-b !border-white"
                >
                  S.No
                </TableCell>
                <TableCell
                  sx={{ color: "white" }}
                  className=" !font-bold !border !text-xs !border-r !text-center  !border-b !border-white"
                >
                  Date/Time
                </TableCell>
                <TableCell
                  sx={{ color: "white" }}
                  className=" !font-bold !border !text-xs !border-r !text-center  !border-b !border-white"
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{ color: "white" }}
                  className=" !font-bold !border !text-xs !border-r !text-center  !border-b !border-white"
                >
                  Mobile
                </TableCell>
                <TableCell
                  sx={{ color: "white" }}
                  className=" !font-bold !border !text-xs !border-r !text-center  !border-b !border-white"
                >
                  User Id
                </TableCell>
                <TableCell
                  sx={{ color: "white" }}
                  className=" !font-bold !border !text-xs !border-r !text-center  !border-b !border-white"
                >
                  Amount
                </TableCell>
                <TableCell
                  sx={{ color: "white" }}
                  className="!font-bold !border !text-xs !border-r !text-center  !border-b !border-white"
                >
                  Type
                </TableCell>
                <TableCell
                  sx={{ color: "white" }}
                  className="!font-bold !border !text-xs !border-r !text-center  !border-b !border-white"
                >
                  Image
                </TableCell>
                <TableCell
                  sx={{ color: "white" }}
                  className="!font-bold !border !text-xs !border-r !text-center  !border-b !border-white"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows?.map((i, index) => (
                <TableRow key={i?.id}>
                  <TableCell
                    sx={{ color: "white" }}
                    className="!border !border-r !text-xs !text-center !mt-5  !border-b !border-white"
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    sx={{ color: "white" }}
                    className="!border !border-r !text-xs !text-center  !border-b !border-white"
                  >
                    {moment(i?.l01_date).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell
                    sx={{ color: "white" }}
                    className="!border !border-r !text-xs !text-center  !border-b !border-white"
                  >
                    {i?.full_name}
                  </TableCell>
                  <TableCell
                    sx={{ color: "white" }}
                    className="!border !border-r !text-xs !text-center !border-b !border-white"
                  >
                    {i?.mobile}
                  </TableCell>
                  <TableCell
                    sx={{ color: "white" }}
                    className="!border !border-r !text-xs !text-center !border-b !border-white"
                  >
                    {i?.username}
                  </TableCell>
                  <TableCell
                    sx={{ color: "white" }}
                    className="!border !border-r !text-xs !text-center !border-b !border-white"
                  >
                    {i?.amt}
                  </TableCell>
                  <TableCell
                    sx={{ color: "white" }}
                    className="!border !border-r !text-xs !text-center !border-b !border-white"
                  >
                    {i?.to_coin}
                  </TableCell>
                  <TableCell
                    sx={{ color: "white" }}
                    className="!border !border-r !text-xs !text-center !border-b !border-white"
                  >
                    <img
                      className="!w-[30px] !h-[30px]"
                      src={i?.u_receipt_image}
                      onClick={() => setisOpenImageDialog(i?.u_receipt_image)}
                    />
                  </TableCell>
                  <TableCell
                    sx={{ color: "white" }}
                    className="!border !border-r !text-xs !text-center !border-b !border-white"
                  >
                    {i?.status === "pending" ? (
                      <div className="!flex gap-1">
                        <IconButton
                          className="!bg-green-600"
                          onClick={() => {
                            Approve_request(i?.id);
                          }}
                        >
                          <DoneIcon className="!text-white" />
                        </IconButton>
                        <IconButton
                          className="!bg-rose-600"
                          onClick={() => {
                            Reject_request(i?.id);
                          }}
                        >
                          <ClearIcon className="!text-white" />
                        </IconButton>
                      </div>
                    ) : i?.status === "failed" ? (
                      <span className="!text-green-500">Rejected</span>
                    ) : (
                      <span className="!text-green-500">Success</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Dialog open={isOpenImageDialog}>
            <div>
              <IconButton onClick={() => setisOpenImageDialog(false)}>
                <Cancel />
              </IconButton>
              <img className="!h-full !w-full" src={isOpenImageDialog} />
            </div>
          </Dialog>

          <Box className="paginationTable !mb-10">
            <TablePagination
              sx={{
                background: zubgtext,
                color: "white",
                borderRadius: "10px",
                marginTop: "10px",
              }}
              rowsPerPageOptions={[10, 15, 25, 35]}
              component="div"
              count={res?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Rows"
            />
          </Box>
        </div>
      </Container>
    </Layout>
  );
}

export default USDTPayInRequest;

const style = {
  header: {
    padding: "10px 8px",
    background: zubgtext,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "15px",
      fontWeight: "600",
      textAlign: "center",
      color: "white",
    },
    "& > a > svg": {
      color: "white",
      fontSize: "35px",
    },
  },
  wthui: {
    textAlign: "center",
    width: "32%",
    minHeight: "15vh",
    background: zubgmid,
    borderRadius: "10px",
    mb: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&>div>p": { color: "white" },
  },
  paymentlink: {
    width: "32%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "15vh",
    background: zubgmid,
    borderRadius: "10px",
    mb: "10px",
    "&>p": {
      color: "white",
      fontSize: "12px",
      fontWeight: "500",
      textAlign: "center",
      mt: "5px",
    },
  },
  paymentBoxOuter: {
    width: "95%",
    margin: "auto",
    my: "10px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paytmbtn: {
    mb: 2,
    background: zubgback,
    color: "white !important",
    width: "31%",
    border: "1px solid white",
    padding: "10px",
    "&:hover": { background: zubgbackgrad, border: "1px solid white" },
  },
  paytmbtntwo: {
    borderRadius: "5px",
    textTransform: "capitalize",
    mb: 2,
    background: zubgbackgrad,
    color: "white !important",
    width: "100%",
    mt: 2,
    border: "1px solid white",
    padding: "10px",
    "&:hover": { background: zubgbackgrad, border: "1px solid white" },
  },
  rechargeinstext: {
    mb: "10px",
    alignItems: "center",
    justifyContent: "start",
    "&>p": { marginLeft: "10px", color: "white !important", fontSize: "14px" },
  },
};
