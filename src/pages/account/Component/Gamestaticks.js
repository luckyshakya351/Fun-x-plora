import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Container,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import * as React from "react";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import {
  zubgback,
  zubgbackgrad,
  zubgmid,
  zubgshadow,
  zubgtext,
} from "../../../Shared/color";
import nodatafoundimage from "../../../assets/images/nodatafoundimage.png";
import Layout from "../../../component/Layout/Layout";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { yesterdayFn } from "../../../services/apicalling";
import { Add, DockTwoTone, Minimize } from "@mui/icons-material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
function Gamestaticks() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);

  const { isLoading, data } = useQuery(
    ["yesterday_income"],
    () => yesterdayFn(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const i = data?.data?.data?.[0] || [];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const goBack = () => {
    navigate(-1);
  };

  let text_color = "white";
  let bg_color = zubgback;
  if (!isLoading && !i)
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
            <p>Total Bet & Income</p>
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
          <p>Total Bet & Income</p>
          <Box></Box>
        </Box>
        <div className="!overflow-x-auto  ">
          <Table sx={{ background: text_color, boxShadow: zubgshadow }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ color: bg_color }}
                  className={`!font-bold !border !text-xs !border-r   !border-b !border-[${text_color}]`}
                >
                  <span className="!text-blue-900">Title</span>
                </TableCell>
                <TableCell
                  sx={{ color: bg_color }}
                  className={`!font-bold !border !text-xs !border-r   !border-b !border-[${text_color}]`}
                >
                  {" "}
                  <span className="!text-blue-900">Amount</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{ color: bg_color }}
                  className={`!font-bold !border !text-xs !border-r   !border-b !border-[${text_color}]`}
                >
                  <span className="!text-blue-800">Total Self Deposit</span>
                </TableCell>

                <TableCell
                  sx={{ color: bg_color }}
                  className={` !border !text-xs !border-r   !border-b !border-[${text_color}]`}
                >
                  {Number(i?.total_my_deposit_till_yest)?.toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ color: bg_color }}
                  className={`!font-bold !border !text-xs !border-r   !border-b !border-[${text_color}]`}
                >
                  <span className="!text-blue-800">Total Direct Deposit</span>
                </TableCell>

                <TableCell
                  sx={{ color: bg_color }}
                  className={` !border !text-xs !border-r   !border-b !border-[${text_color}]`}
                >
                  {Number(i?.total_direct_depo_till_yest)?.toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ color: bg_color }}
                  className={`!font-bold !border !text-xs !border-r   !border-b !border-[${text_color}]`}
                >
                  <span className="!text-blue-800">
                    Total Team Deposit Current Month
                  </span>
                </TableCell>

                <TableCell
                  sx={{ color: bg_color }}
                  className={` !border !text-xs !border-r   !border-b !border-[${text_color}]`}
                >
                  {Number(i?.total_my_team_depo_till_this_month)?.toFixed(2)}
                </TableCell>
              </TableRow>
              {/* withdrawal */}
              <TableRow>
                <TableCell
                  sx={{ color: bg_color }}
                  className={`!font-bold !border !text-xs !border-r   !border-b !border-[${text_color}]`}
                >
                  <span className="!text-blue-800">Total Self Withdrawal</span>
                </TableCell>

                <TableCell
                  sx={{ color: bg_color }}
                  className={` !border !text-xs !border-r   !border-b !border-[${text_color}]`}
                >
                  {Number(i?.total_my_withdr_till_yest)?.toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ color: bg_color }}
                  className={`!font-bold !border !text-xs !border-r   !border-b !border-[${text_color}]`}
                >
                  <span className="!text-blue-800">
                    Total Direct Withdrawal
                  </span>
                </TableCell>

                <TableCell
                  sx={{ color: bg_color }}
                  className={` !border !text-xs !border-r   !border-b !border-[${text_color}]`}
                >
                  {Number(i?.total_direct_withdr_till_yest)?.toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ color: bg_color }}
                  className={`!font-bold !border !text-xs !border-r   !border-b !border-[${text_color}]`}
                >
                  <span className="!text-blue-800">
                    Total Team Withdrawal Current Month
                  </span>
                </TableCell>

                <TableCell
                  sx={{ color: bg_color }}
                  className={` !border !text-xs !border-r   !border-b !border-[${text_color}]`}
                >
                  {Number(i?.total_my_team_withdr_till_this_month)?.toFixed(2)}
                </TableCell>
              </TableRow>
              {/* general data */}
              <TableRow>
                <TableCell
                  sx={{ color: bg_color }}
                  className={`!font-bold !border !text-xs !border-r   !border-b !border-[${text_color}]`}
                >
                  <span className="!text-blue-800">Current Week Team Bet</span>
                </TableCell>

                <TableCell
                  sx={{ color: bg_color }}
                  className={` !border !text-xs !border-r   !border-b !border-[${text_color}]`}
                >
                  {Number(i?.current_week_team_bet)?.toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ color: bg_color }}
                  className={`!font-bold !border !text-xs !border-r   !border-b !border-[${text_color}]`}
                >
                  <span className="!text-blue-800">Total Salary</span>
                </TableCell>

                <TableCell
                  sx={{ color: bg_color }}
                  className={` !border !text-xs !border-r   !border-b !border-[${text_color}]`}
                >
                  {Number(i?.total_my_salary)?.toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ color: bg_color }}
                  className={`!font-bold !border !text-xs !border-r   !border-b !border-[${text_color}]`}
                >
                  <span className="!text-blue-800">
                    Salary Achiever Member In Team
                  </span>
                </TableCell>

                <TableCell
                  sx={{ color: bg_color }}
                  className={` !border !text-xs !border-r   !border-b !border-[${text_color}]`}
                >
                  {i?.salary_achiever_member}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ color: bg_color }}
                  className={`!font-bold !border !text-xs !border-r   !border-b !border-[${text_color}]`}
                >
                  <span className="!text-blue-800">Self Withdrawal Status</span>
                </TableCell>

                <TableCell
                  sx={{ color: bg_color }}
                  className={` !border !text-xs !border-r   !border-b !border-[${text_color}]`}
                >
                  {Number(i?.my_withdrawal_status) === 1 ? (
                    <Add />
                  ) : (
                    <Minimize />
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box className="paginationTable !mb-10">
            {/* <TablePagination
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
            /> */}
            <Pagination
              count={3}
              // count={Math.ceil(res?.length / rowsPerPage)} // Calculate total pages based on the data length
              page={page} // Current page
              onChange={handleChangePage} // Function to handle page changes
              color="primary" // Color of pagination
              sx={{
                // background: zubgtext, // Background styling
                color: "white",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            />
          </Box>
        </div>
      </Container>
    </Layout>
  );
}

export default Gamestaticks;

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
    "&:hover": { background: zubgbackgrad, border: "1px solid transparent" },
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
    "&:hover": { background: zubgbackgrad, border: "1px solid transparent" },
  },
  rechargeinstext: {
    mb: "10px",
    alignItems: "center",
    justifyContent: "start",
    "&>p": { marginLeft: "10px", color: "white !important", fontSize: "14px" },
  },
};

// import { Box, Container, Dialog, IconButton, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { zubgback, zubgmid, zubgtext } from "../../Shared/color";
// import ludotwo from "../../assets/images/lodu2.webp";
// import ludothree from "../../assets/images/lodu3.webp";
// import ludofour from "../../assets/images/lodu4.webp";
// import ludofive from "../../assets/images/lodu5.webp";
// import ludosix from "../../assets/images/lodu6.webp";
// import ludo from "../../assets/images/ludo.webp";
// import Layout from "../../component/Layout/Layout";
// import toast from "react-hot-toast";
// import CloseIcon from "@mui/icons-material/Close";
// import sunlotteryhomebanner from "../../assets/sunlotteryhomebanner.jpg";
// import { useState } from "react";

// function Activity() {
//   const [openDialogBoxHomeBanner, setopenDialogBoxHomeBanner] = useState(false);

//   const game_data = [
//     {
//       name: "Ludo Supreme",
//       src: ludo,
//     },
//     {
//       name: "Ludo Ninja",
//       src: ludotwo,
//     },
//     {
//       name: "Ludo Turbo",
//       src: ludothree,
//     },
//     {
//       name: "Snakes & Ladders Plus",
//       src: ludofour,
//     },
//     {
//       name: "Trump Cards Mania",
//       src: ludofive,
//     },
//     {
//       name: "Ludo Supreme League",
//       src: ludosix,
//     },
//   ];

//   return (
//     <Layout>
//       <Container
//         sx={{
//           background: zubgback,
//           width: "100%",
//           height: "100vh",
//           overflow: "auto",
//           mb: 7,
//         }}
//       >
//         <Box sx={style.header}>
//           <Box></Box>
//           <Typography
//             variant="body1"
//             color="initial"
//             sx={{ mt: 2, fontSize: "16px", fontWeight: "600" }}
//           >
//             Activity
//           </Typography>
//           <Box></Box>
//         </Box>

//         {openDialogBoxHomeBanner && (
//           <Dialog
//             PaperProps={{ width: "500px", height: "500px" }}
//             open={openDialogBoxHomeBanner}
//           >
//             <div>
//               <p>
//                 <IconButton onClick={() => setopenDialogBoxHomeBanner(false)}>
//                   <CloseIcon />
//                 </IconButton>
//               </p>
//               <p>
//                 <img src={sunlotteryhomebanner} />
//               </p>
//             </div>
//           </Dialog>
//         )}
//       </Container>
//     </Layout>
//   );
// }

// export default Activity;

// const style = {
//   header: {
//     padding: "8px",
//     background: zubgtext,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     "&>p": { color: "white !important", ml: "-30px" },
//     "&>a>svg": { color: "white", fontSize: "25px" },
//   },
//   dashboardTitle: {
//     textAlign: "center",
//     color: "white !important",
//     fontSize: "21px",
//     fontWeight: "500",
//   },
// };
