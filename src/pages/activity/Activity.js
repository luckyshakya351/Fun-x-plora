import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { Box, Container, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import moment from "moment";
import * as React from "react";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../Shared/CustomCircularProgress";
import { zubgback, zubgbackgrad, zubgmid, zubgshadow, zubgtext, zubgwhite } from "../../Shared/color";
import Layout from "../../component/Layout/Layout";
import { referralBonusFn, yesterdayFn } from "../../services/apicalling";
import nodatafoundimage from "../../assets/images/nodatafoundimage.png";

function Activity() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const [visibleRows, setVisibleRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { isLoading, data } = useQuery(
    ["yesterday_income"],
    () => yesterdayFn(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  );
  const res = data?.data?.data || [];
  console.log(res)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    setVisibleRows(
      res?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
    );
  }, [page, rowsPerPage, res]);

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
            <p>Yesterday Total Bet Income</p>
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
          <p>Yesterday Total Bet Income</p>
          <Box></Box>
        </Box>
        <div className="!overflow-x-auto">
          <Table sx={{ background: zubgwhite, boxShadow: zubgshadow }}>
            <TableHead>
              <TableRow >
              <TableCell sx={{ color: 'white' }} className=" !font-bold !border !text-xs !border-r !text-center  !border-b !border-white">Level</TableCell>
                <TableCell sx={{ color: 'white' }} className=" !font-bold !border !text-xs !border-r  !text-center !border-b !border-white"> Income</TableCell>
                <TableCell sx={{ color: 'white' }} className=" !font-bold !border !text-xs !border-r !text-center  !border-b !border-white">Total Bet</TableCell>
                <TableCell sx={{ color: 'white' }} className=" !font-bold !border !text-xs !border-r !text-center  !border-b !border-white">Settlement  Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
           
                <TableRow >
                <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center !mt-5  !border-b !border-white">Level 1</TableCell>
                  <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center !mt-5  !border-b !border-white">{res?.[0]?.level_1_income}</TableCell>
                  <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center  !border-b !border-white">{res?.[0]?.level_1_total_bet}</TableCell>
                  <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center  !border-b !border-white">{moment(Date.now()).subtract(1, 'days').format("YYYY-MM-DD")}</TableCell>
                </TableRow>
                <TableRow >
                <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center !mt-5  !border-b !border-white">Level 2</TableCell>
                  <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center !mt-5  !border-b !border-white">{res?.[0]?.level_2_income}</TableCell>
                  <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center  !border-b !border-white">{res?.[0]?.level_2_total_bet}</TableCell>
                  <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center  !border-b !border-white">{moment(Date.now()).subtract(1, 'days').format("YYYY-MM-DD")}</TableCell>
                </TableRow>
                <TableRow >
                <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center !mt-5  !border-b !border-white">Level 3</TableCell>
                  <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center !mt-5  !border-b !border-white">{res?.[0]?.level_3_income}</TableCell>
                  <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center  !border-b !border-white">{res?.[0]?.level_3_total_bet}</TableCell>
                  <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center  !border-b !border-white">{moment(Date.now()).subtract(1, 'days').format("YYYY-MM-DD")}</TableCell>

                </TableRow>
                <TableRow >
                <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center !mt-5  !border-b !border-white">Level 4</TableCell>
                  <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center !mt-5  !border-b !border-white">{res?.[0]?.level_4_income}</TableCell>
                  <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center  !border-b !border-white">{res?.[0]?.level_4_total_bet}</TableCell>
                  <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center  !border-b !border-white">{moment(Date.now()).subtract(1, 'days').format("YYYY-MM-DD")}</TableCell>

                </TableRow>
                <TableRow >
                <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center !mt-5  !border-b !border-white"> Level 5</TableCell>
                  <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center !mt-5  !border-b !border-white">{res?.[0]?.level_5_income}</TableCell>
                  <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center  !border-b !border-white">{res?.[0]?.level_5_total_bet}</TableCell>
                  <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center  !border-b !border-white">{moment(Date.now()).subtract(1, 'days').format("YYYY-MM-DD")}</TableCell>

                </TableRow>
                <TableRow >
                <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center !mt-5  !border-b !border-white">Level 6</TableCell>
                  <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center !mt-5  !border-b !border-white">{res?.[0]?.level_6_income}</TableCell>
                  <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center  !border-b !border-white">{res?.[0]?.level_6_total_bet}</TableCell>
                  <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center  !border-b !border-white">{moment(Date.now()).subtract(1, 'days').format("YYYY-MM-DD")}</TableCell>

                </TableRow>
            </TableBody>
          </Table>
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

export default Activity;

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
