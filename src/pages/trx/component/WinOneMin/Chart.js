import {
  Box,
  Button,
  IconButton,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import * as React from "react";
import { useSelector } from "react-redux";
import { zubgtext } from "../../../../Shared/color";
import history from "../../../../assets/images/list.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const Chart = ({ gid }) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [cor, setcor] = React.useState([]);
  const [visibleRows, setVisibleRows] = React.useState([]);
  const game_history_data = useSelector(
    (state) => state.aviator.trx_game_history_data
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    setVisibleRows(
      game_history_data?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
    );
  }, [page, rowsPerPage, game_history_data]);

  React.useEffect(() => {
    if (visibleRows && visibleRows?.length > 0) {
      const parent = document.getElementById("parent");
      const parentRect = parent.getBoundingClientRect();
      const newCor =
        visibleRows?.length > 0 &&
        visibleRows?.map((element, index) => {
          const childId =
            String(Number(element?.tr41_slot_id)) === "0"
              ? `zero${index}`
              : String(Number(element?.tr41_slot_id)) === "1"
              ? `one${index}`
              : String(Number(element?.tr41_slot_id)) === "2"
              ? `two${index}`
              : String(Number(element?.tr41_slot_id)) === "3"
              ? `three${index}`
              : String(Number(element?.tr41_slot_id)) === "4"
              ? `four${index}`
              : String(Number(element?.tr41_slot_id)) === "5"
              ? `five${index}`
              : String(Number(element?.tr41_slot_id)) === "6"
              ? `six${index}`
              : String(Number(element?.tr41_slot_id)) === "7"
              ? `seven${index}`
              : String(Number(element?.tr41_slot_id)) === "8"
              ? `eight${index}`
              : `nine${index}`;
          const childRect = document
            .getElementById(childId)
            .getBoundingClientRect();
          const centerX =
            childRect.left + childRect.width / 2 - parentRect.left;
          const centerY = childRect.top + childRect.height / 2 - parentRect.top;

          return { x: centerX, y: centerY };
        });
      setcor(newCor || []);
    }
  }, [visibleRows]);

  return (
    <Box className="chartTable">
      {/* <Stack direction="row" className="onegotextbox">
        <Typography variant="body1" color="initial" sx={{ color: zubgtext }}>
          <Box
            component="img"
            src={history}
            width={25}
            sx={{ marginRight: "10px", filter: 'drop-shadow(2px 4px 6px black)' }}
          ></Box>{" "}
          Statistic(last 100 Periods)
        </Typography>
      </Stack> */}
      <div className="relative !mt-2 !h-[56vh] overflow-auto !w-[100%] no-scrollbar !overflow-x-hidden">
        <div className="absolute !w-[100%] !bg-red-800">
          {visibleRows?.length > 0 &&
            visibleRows?.map((element, indexi) => {
              return (
                <Box
                  sx={{
                    background: "white",
                    padding: "10px",
                    borderBottom: "1px solid rgba(99, 186, 14, 0.1)", // 30% opacity
                  }}
                >
                  <div className="flex justify-between">
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: "12px",
                        color: zubgtext,
                      }}
                    >
                      {element?.tr_transaction_id}
                    </span>
                    {/* // main box of chart form 0 to 9 */}
                    <Box className="flex items-center justify-between !w-[75%]  lg:!w-[70%]">
                      {/* /// 0   //// */}
                      <div
                        id={`zero${indexi}`}
                        className={`${
                          String(Number(element?.tr41_slot_id)) === "0"
                            ? "!z-20"
                            : "!z-[-10px]"
                        }`}
                      >
                        <Typography
                          className={`circleNumberbody  !font-bold ${
                            String(Number(element?.tr41_slot_id)) === "0"
                              ? "transparentColorRedPurpleBG !text-white "
                              : "!bg-white !text-[#abadaf] !font-normal !shadow-sm !shadow-green-800"
                          }`}
                        >
                          {" "}
                          0
                        </Typography>
                      </div>
                      {/* /// 1   //// */}
                      <div
                        id={`one${indexi}`}
                        className={`${
                          String(Number(element?.tr41_slot_id)) === "1"
                            ? "!z-20"
                            : "!z-[-10px]"
                        }`}
                      >
                        <Typography
                          className={`circleNumberbody   !font-bold ${
                            String(Number(element?.tr41_slot_id)) === "1"
                              ? "!bg-[#18b680] !text-white"
                              : "!bg-white !text-[#abadaf] !font-normal !shadow-sm !shadow-green-800 "
                          }`}
                        >
                          {" "}
                          1
                        </Typography>
                      </div>
                      {/* /// 2   //// */}
                      <div
                        id={`two${indexi}`}
                        className={`${
                          String(Number(element?.tr41_slot_id)) === "2"
                            ? "!z-20"
                            : "!z-[-10px]"
                        }`}
                      >
                        <Typography
                          className={`circleNumberbody   !font-bold ${
                            String(Number(element?.tr41_slot_id)) === "2"
                              ? "!bg-[#fb6161] !text-white"
                              : "!bg-white !text-[#abadaf] !font-normal !shadow-sm !shadow-green-800 "
                          }`}
                        >
                          {" "}
                          2
                        </Typography>
                      </div>
                      {/* /// 3   //// */}
                      <div
                        id={`three${indexi}`}
                        className={`${
                          String(Number(element?.tr41_slot_id)) === "3"
                            ? "!z-20"
                            : "!z-[-10px]"
                        }`}
                      >
                        <Typography
                          className={`circleNumberbody   !font-bold ${
                            String(Number(element?.tr41_slot_id)) === "3"
                              ? "!bg-[#18b680] !text-white"
                              : "!bg-white !text-[#abadaf] !font-normal !shadow-sm !shadow-green-800 "
                          }`}
                        >
                          {" "}
                          3
                        </Typography>
                      </div>
                      {/* /// 4   //// */}
                      <div
                        id={`four${indexi}`}
                        className={`${
                          String(Number(element?.tr41_slot_id)) === "4"
                            ? "!z-20"
                            : "!z-[-10px]"
                        }`}
                      >
                        <Typography
                          className={`circleNumberbody   !font-bold ${
                            String(Number(element?.tr41_slot_id)) === "4"
                              ? "!bg-[#fb6161] !text-white"
                              : "!bg-white !text-[#abadaf] !font-normal !shadow-sm !shadow-green-800 "
                          }`}
                        >
                          {" "}
                          4
                        </Typography>
                      </div>
                      {/* /// 5   //// */}
                      <div
                        id={`five${indexi}`}
                        className={`${
                          String(Number(element?.tr41_slot_id)) === "5"
                            ? "!z-20"
                            : "!z-[-10px]"
                        }`}
                      >
                        <Typography
                          className={`circleNumberbody  !font-bold ${
                            String(Number(element?.tr41_slot_id)) === "5"
                              ? "transparentColorGreenRedBG !text-white"
                              : "!bg-white !text-[#abadaf] !font-normal !shadow-sm !shadow-green-800 "
                          }`}
                        >
                          {" "}
                          5
                        </Typography>
                      </div>
                      {/* /// 6   //// */}
                      <div
                        id={`six${indexi}`}
                        className={`${
                          String(Number(element?.tr41_slot_id)) === "6"
                            ? "!z-20"
                            : "!z-[-10px]"
                        }`}
                      >
                        <Typography
                          className={`circleNumberbody  !font-bold ${
                            String(Number(element?.tr41_slot_id)) === "6"
                              ? "!bg-[#fb6161] !text-white"
                              : "!bg-white !text-[#abadaf] !font-normal !shadow-sm !shadow-green-800 "
                          }`}
                        >
                          {" "}
                          6
                        </Typography>
                      </div>
                      {/* /// 7   //// */}
                      <div
                        id={`seven${indexi}`}
                        className={`${
                          String(Number(element?.tr41_slot_id)) === "7"
                            ? "!z-20"
                            : "!z-[-10px]"
                        }`}
                      >
                        <Typography
                          className={`circleNumberbody  !font-bold ${
                            String(Number(element?.tr41_slot_id)) === "7"
                              ? "!bg-[#18b680] !text-white"
                              : "!bg-white !text-[#abadaf] !font-normal !shadow-sm !shadow-green-800 "
                          }`}
                        >
                          {" "}
                          7
                        </Typography>
                      </div>
                      {/* /// 8   //// */}
                      <div
                        id={`eight${indexi}`}
                        className={`${
                          String(Number(element?.tr41_slot_id)) === "8"
                            ? "!z-20"
                            : "!z-[-10px]"
                        }`}
                      >
                        <Typography
                          className={`circleNumberbody   !font-bold ${
                            String(Number(element?.tr41_slot_id)) === "8"
                              ? "!bg-[#fb6161] !text-white"
                              : "!bg-white !text-[#abadaf] !font-normal !shadow-sm !shadow-green-800 "
                          }`}
                        >
                          {" "}
                          8
                        </Typography>
                      </div>
                      {/* /// 9   //// */}
                      <div
                        id={`nine${indexi}`}
                        className={`${
                          String(Number(element?.tr41_slot_id)) === "9"
                            ? "!z-20"
                            : "!z-[-10px]"
                        }`}
                      >
                        <Typography
                          className={`circleNumberbody   !font-bold ${
                            String(Number(element?.tr41_slot_id)) === "9"
                              ? "!bg-[#18b680] !text-white"
                              : "!bg-white !text-[#abadaf] !font-normal !shadow-sm !shadow-green-800 "
                          }`}
                        >
                          {" "}
                          9
                        </Typography>
                      </div>
                      <Typography
                        className={`circleNumberbody ${
                          Number(element?.tr41_slot_id) <= 4
                            ? "!bg-[#468ce8] "
                            : "!bg-[#feaa57]"
                        }  !h-[20px] !w-[20px] !rounded-full !text-center !text-white `}
                      >
                        {Number(element?.tr41_slot_id) <= 4 ? "S" : "B"}
                      </Typography>
                    </Box>
                  </div>
                </Box>
              );
            })}
        </div>
        <div className=" h-[100%] w-[100%] absolute flex justify-end">
          <div className="!w-[80%] lg:!w-[70%]" id="parent">
            <svg
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              className="z-10 absolute"
            >
              {cor?.map((i, index) => {
                return (
                  index > 0 && (
                    <line
                      x1={cor?.[index]?.x}
                      y1={cor?.[index]?.y}
                      x2={cor?.[index - 1]?.x}
                      y2={cor?.[index - 1]?.y}
                      stroke="#ff9696"
                      stroke-width="1.5"
                      fill="none"
                    />
                  )
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      <Box className="paginationTable" mb={10}>
        {/* <TablePagination
          sx={{
            background: zubgtext,
            color: "white",
            borderRadius: "10px",
            marginTop: "5px",
            height:"32px",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            overflowY:"hidden"
          }}
          rowsPerPageOptions={[2, 5, 10, 15]}
          component="div"
          count={game_history_data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Rows"
        /> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            borderRadius: "10px",
            marginTop: "5px",
            mb: 3,
          }}
        >
          <IconButton
            onClick={() => handleChangePage(null, Math.max(0, page - 1))}
            className={`${
              page === 0 ? "!text-gray-400" : "!text-white"
            } !bg-[#63ba0e] !p-2 !rounded-md !flex !items-center !justify-center pr-1`}
          >
            <ArrowBackIosIcon />
          </IconButton>

          <Typography sx={{ margin: "0 10px" }}>
            {page + 1} / {Math.ceil(game_history_data?.length / rowsPerPage)}
          </Typography>

          <IconButton
            onClick={() =>
              handleChangePage(
                null,
                Math.min(
                  Math.ceil(game_history_data?.length / rowsPerPage) - 1,
                  page + 1
                )
              )
            }
            sx={{
              marginLeft: "10px",
              color: "white",
            }}
            className={`${
              page + 1 >= Math.ceil(game_history_data?.length / rowsPerPage)
                ? "!text-gray-400"
                : "!text-white"
            } !bg-[#63ba0e] !p-2 !rounded-md !flex !items-center !justify-center pr-1`}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>
      {/* <CustomCircularProgress isLoading={isLoading} /> */}
    </Box>
  );
};

export default Chart;
