import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import copy from "clipboard-copy";
import CryptoJS from "crypto-js";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { checkTokenValidity } from "../../Shared/CookieStorage";
import CustomCircularProgress from "../../Shared/CustomCircularProgress";
import {
  gray,
  lightgreen,
  lightyellow,
  zubgback,
  zubgmid,
  zubgshadow,
  zubgtext,
} from "../../Shared/color";
import aviator_game_image from "../../assets/aviator_game_image.png";
import one from "../../assets/images/1.jpg";
import three from "../../assets/images/123.png";
import two from "../../assets/images/2.jpg";
import winp4 from "../../assets/images/GOTI.png";
import bgms from "../../assets/images/bgms2.jpg";
import deposit from "../../assets/images/deposit.png";
import logo from "../../assets/images/fun.jpg";
import cash from "../../assets/images/money.png";
import stage from "../../assets/images/pod2.png";
import position2 from "../../assets/images/positio2.png";
import position3 from "../../assets/images/position3.png";
import position1 from "../../assets/images/positoin1.png";
import trximg from "../../assets/trx.png";
import Layout from "../../component/Layout/Layout";
import {
  net_wallet_amount_function,
  please_reconnect_the_serverFun,
  waitingAviatorFun,
} from "../../redux/slices/counterSlice";
import {
  MyProfileDataFn,
  MypromotionDataFn,
  allWithdrawlCashUserFn,
  get_user_data_fn,
  walletamount,
} from "../../services/apicalling";
import {
  endpoint,
  fron_end_main_domain,
  support_mail,
  telegram_url,
} from "../../services/urls";
import Lottery from "./DashboadSubcomponent/Lottery";
import Original from "./DashboadSubcomponent/Original";
import Sports from "./DashboadSubcomponent/Sports";
import Notification from "./Notification";
import { Logout } from "@mui/icons-material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Dashboard() {
  const dispatch = useDispatch();
  const aviator_login_data = useSelector(
    (state) => state.aviator.aviator_login_data
  );
  const net_wallet_amount = useSelector(
    (state) => state.aviator.net_wallet_amount
  );

  const isAvailableUser = sessionStorage.getItem("isAvailableUser");
  // const aviator_data = localStorage.getItem("aviator_data");
  const value =
    (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
        localStorage.getItem("logindataen"),
        "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
    null;
  //  console.log(JSON.parse(value));
  const navigate = useNavigate();
  const [poicy, setpoicy] = React.useState(false);
  const [type_of_game, settype_of_game] = React.useState("");
  // const login_data = localStorage.getItem("logindata");
  const [winnner_data, setwinnerdata] = useState([]);
  const [openbannerurl, setopenbannerurl] = useState("");
  const [loding, setloding] = useState(false);
  const [lodingBanner, setlodingBanner] = useState(false);

  useQuery(["promotion_data"], () => MypromotionDataFn(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!checkTokenValidity()) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/"; // Redirect to login page
    }
  }, []);

  const functionTOCopy = (value) => {
    copy(value);
    toast.success("Copied to clipboard!");
  };

  const top11WinnerFunction = async () => {
    setloding(true);
    try {
      const response = await axios.get(`${endpoint.top11winner}`);
      setwinnerdata(response?.data?.data);
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
    setloding(false);
  };

  useEffect(() => {
    top11WinnerFunction();
  }, []);

  const { isLoading, data } = useQuery(["walletamount"], () => walletamount(), {
    refetchOnMount: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });


  useEffect(() => {
    dispatch(net_wallet_amount_function(data?.data?.data))
  }, [Number(data?.data?.data?.wallet), Number(data?.data?.data?.winning)])

  const {
    isLoading: allWithdrawlCashUserFnLoding,
    data: allWithdrawlCashData,
  } = useQuery(["allWithdrawlCashUser"], () => allWithdrawlCashUserFn(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const allWithdrawl_CashData = allWithdrawlCashData?.data?.data || [];

  const { isLoading: profile_loding, data: profile } = useQuery(
    ["myprofile"],
    () => MyProfileDataFn(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  );

  const result = profile?.data?.data || [];

  useEffect(() => {
    openbannerFunction();
    localStorage.removeItem("amount_set");
    localStorage.removeItem("Deposit_type");
    localStorage.removeItem("server_provider");
  }, []);

  const openbannerFunction = async () => {
    setlodingBanner(true);
    try {
      const response = await axios.get(`${endpoint.openbannerUrl}`);
      setopenbannerurl(response?.data?.image);
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
    setlodingBanner(false);
  };

  // console.log(openbannerurl);

  // useEffect(() => {
  //   console.log(result?.referral_code, "nandn");
  //   setReferral_code(
  //     CryptoJS.AES.encrypt(
  //       JSON.stringify(result?.referral_code),
  //       "anand"
  //     ).toString()
  //   );
  //   console.log(referal_code, "converted value");
  // }, [result]);

  const initialValues = {
    //  referrel_code: `https://play.ferryinfotech.in/register?ref=${referal_code}`,
    referrel_code: `${fron_end_main_domain}/register?ref=${result?.referral_code}`,
    // referrel_code: `https://play.ferryinfotech.in/register?ref=${referal_code}`,
  };

  const fk = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      console.log("This is handle submit");
    },
  });

  const handleClosepolicy = () => {
    setpoicy(false);
    sessionStorage.removeItem("isAvailableUser");
  };
  useEffect(() => {
    if (isAvailableUser) {
      setpoicy(true);
    }
  }, []);

  useEffect(() => {
    dispatch(waitingAviatorFun(true));
    dispatch(please_reconnect_the_serverFun(false));
  }, []);

  // useEffect(() => {
  //   setInterval(() => {
  //     setdata_array([...data_array, 100]);
  //     setTimeout(() => {
  //       setdata_array(data_array.slice(0, data_array.length));
  //     }, 1000);
  //   }, 3000);
  // }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    !aviator_login_data && get_user_data_fn(dispatch);
  }, []);

  console.log(winnner_data);

  const game_data = [
    {
      name: "Wingo",
      img: "https://ossimg.bdgadminbdg.com/IndiaBDG/gamecategory/gamecategory_202401100619315n2k.png",
    },
    {
      name: "Aviator",
      img: aviator_game_image,
    },
    {
      name: "Sports",
      img: "https://ossimg.bdgadminbdg.com/IndiaBDG/gamecategory/gamecategory_20240110061915xrqy.png",
    },
    {
      name: "Slots",
      img: "https://ossimg.bdgadminbdg.com/IndiaBDG/gamecategory/gamecategory_20240110061937gbid.png",
    },
    {
      name: "Popular",
      img: "https://ossimg.bdgadminbdg.com/IndiaBDG/gamecategory/gamecategory_202401100619464x51.png",
    },
    {
      name: "Casino",
      img: "https://ossimg.bdgadminbdg.com/IndiaBDG/gamecategory/gamecategory_20240110061909hwqs.png",
    },
  ];
  return (
    <Layout>
      <Box sx={styles.root}>
        <Container
          className="!h-[100%] !overflow-auto no-scrollbar"
          sx={{ background: zubgback }}
        >
          <div
            style={{
              background: zubgback,
            }}
            className=" rounded-b-md"
          >
            <div className="px-2 py-2 flex justify-between">
              <div
                className="flex items-center gap-2"
                style={{ color: zubgtext }}
              >
                <Box
                  component="img"
                  src={logo}
                  sx={{ width: "60px", height: "60px" }}
                ></Box>
              </div>
              <div className="flex justify-end gap-2">
                <div className="flex  gap-1 items-center cursor-pointer "
                 onClick={() => {
                  localStorage.clear();
                  navigate("/") }}>
                 <Logout  sx={{ color: zubgtext }}/>
                  <Button
                    className="text-red"  style={{ color: zubgtext }}>
                    Logout
                  </Button>
                </div>
                <div className="flex gap-1 items-center cursor-pointer">
                  <CloudDownloadIcon sx={{ color: zubgtext }} />
                  <span className="text-[12px]" style={{ color: zubgtext }}>
                    Download App
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Box className="!px-2">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={false}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper !rounded-lg !mt-2"
            >
              <SwiperSlide>
                <Box
                  component="img"
                  src={one}
                  alt="Slide 1"
                  sx={styles.swiperImage}
                  className="!rounded-lg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Box
                  component="img"
                  src={two}
                  alt="Slide 2"
                  sx={styles.swiperImage}
                />
              </SwiperSlide>
              <SwiperSlide>
                <Box
                  component="img"
                  src={three}
                  alt="Slide 3"
                  sx={styles.swiperImage}
                />
              </SwiperSlide>
            </Swiper>
          </Box>
          {/* <Box className="!px-2">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={false}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper !rounded-lg !mt-2"
            >
              {allWithdrawlCashUserFnLoding
                ? [1, 2]?.map((i) => {
                  return (
                    <SwiperSlide>
                      <CircularProgress className="!text-#E71D1E" />
                    </SwiperSlide>
                  );
                })
                : allWithdrawl_CashData?.map((i, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="!h-20 !w-full  !flex !items-center ">
                        <div className="!w-full grid grid-cols-2 place-items-center  !py-6" style={{ background: '#ffffff', boxShadow: ' rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
                          <div className="flex items-center justify-between gap-3">
                            <Avatar alt="Remy Sharp" sizes="large">
                              {i?.full_name?.substring(0, 1) || ""}
                            </Avatar>
                            <p className=" !text-#E71D1E !text-lg !#E71D1Espace-nowrap">
                              {i?.full_name || ""}
                            </p>
                          </div>
                          <p className=" !text-#E71D1E">
                            Withdraw {rupees}{" "}
                            <spna className={"!font-bold !text-[#FB8356]"}>
                              {Number(i?.amount || 0).toFixed(2)}
                            </spna>
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </Box> */}
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "space-between",
              width: "95%",
              marginLeft: "2.5%",
              background: lightyellow,
              boxShadow: zubgshadow,
              borderRadius: "10px",
              mt: "20px",
              padding: "10px 10px",
            }}
          >
            <Box sx={{ width: "10%" }}>
              <CampaignOutlinedIcon sx={{ color: "black" }} />
            </Box>
            <Box
              sx={{
                width: "90%",
                "&>p": { fontSize: "13px", color: "black" },
              }}
            >
              <Typography variant="body1">
                See the Installation page for additional docs about how to make
                sure everything is set up correctly.
              </Typography>
            </Box>
          </Box>

          <Stack direction="row" sx={styles.depositWithdrawContainer}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box className="serv-item2 cursor-pointer">
                <Box
                  component="img"
                  src={deposit}
                  alt="Deposit"
                  sx={styles.depositWithdrawIcon}
                  onClick={() => navigate("/wallet/Recharge")}
                />
              </Box>
              <Typography
                variant="body1"
                color="initial"
                className="db-header"
                sx={{ color: `${lightgreen} !important`, textAlign: "center" }}
              >
                Deposit
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="body1"
                color="initial"
                className="b-val "
                sx={{ color: zubgtext }}
              >
                ₹{" "}
                {Number(
                  Number(net_wallet_amount?.wallet || 0) + Number(net_wallet_amount?.winning || 0)
                )?.toFixed(2)}
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                className="b-valp"
                sx={{ color: lightgreen }}
              >
                Available Balance
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box className="serv-item">
                <Box
                  onClick={() => navigate("/Withdrawal")}
                  component="img"
                  src={cash}
                  alt="Withdraw"
                  sx={styles.depositWithdrawIcon}
                  className="!cursor-pointer"
                />
              </Box>
              <Typography
                variant="body1"
                color="initial"
                className="db-header"
                sx={{ color: zubgtext }}
              >
                Withdraw
              </Typography>
            </Box>
          </Stack>
          <Box sx={styles.referralLinkContainer}>
            <Typography variant="body1" sx={styles.referralLinkTitle}>
              Referral Link
            </Typography>
            <Stack direction="row" sx={styles.referralLinkInputContainer}>
              <TextField
                className="dbinput"
                fullWidth
                id="referrel_code"
                name="referrel_code"
                value={fk.values.referrel_code}
                // onChange={fk.handleChange}
                sx={styles.referralLinkInput}
              />
              <Button
                variant="contained"
                sx={styles.referralLinkButton}
                onClick={() => functionTOCopy(fk.values.referrel_code)}
              >
                Copy
              </Button>
            </Stack>
            <Stack direction="row" sx={styles.socialButtonsContainer}>
              <Button
                className="telegrambtn"
                sx={styles.telegramButton}
                onClick={() => window.open(`${telegram_url}`, "_blank")}
              >
                <Stack>
                  <Box sx={styles.socialButtonIcon}>
                    <TelegramIcon sx={styles.socialIcon} />
                  </Box>
                  <Box sx={styles.socialButtonText}>Telegram</Box>
                </Stack>
              </Button>

              <Button className="supportbtn" sx={styles.supportButton}>
                <a href={`mailto:${support_mail}`}>
                  <Stack>
                    <HelpOutlineIcon sx={styles.socialIconinfo} />
                    <Box sx={styles.socialButtonText}>Support</Box>
                  </Stack>
                </a>
              </Button>
            </Stack>
          </Box>
          <div
            className="mt-2 w-full grid grid-cols-3 gap-[2%] o"
            style={{
              width: "95%",
              marginLeft: "2.5%",
              marginTop: "20px",
              mb: "20px",
            }}
          >
            {game_data?.map((i) => {
              return (
                <Box
                  sx={{
                    marginBottom: "10px",
                    width: "95%",
                    borderRadius: "7px 7px 7px 7px !important",
                    overflow: "hidden",
                  }}
                >
                  <a
                    onClick={() => {
                      if (
                        i.name === "Slots" ||
                        i.name === "Popular" ||
                        i.name === "Casino" ||
                        i.name === "Aviator"
                      )
                        return toast("Comming Soon !", { id: 1 });
                      scrollToSection("games");
                      settype_of_game(i?.name);
                    }}
                    href={`#${i?.name}`}
                    style={{
                      backgroundImage: `url(${bgms})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "100% 100%",
                      padding: "15px 15px 15px 15px",
                      borderRadius: "7px 7px 0px 0px !important",
                    }}
                    className="cursor-pointer   flex flex-col items-center justify-center"
                  >
                    <img className="w-[90px] h-[90px] " src={i?.img} />
                  </a>
                  <p
                    className="!text-sm font-bold"
                    style={{
                      color: "black",
                      background: lightyellow,
                      width: "100%",
                      textAlign: "center",
                      padding: "5px 0px",
                      borderRadius: "0px 0px 7px 7px !important",
                    }}
                  >
                    {i?.name}
                  </p>
                </Box>
              );
            })}
          </div>
          <Box id="games">
            <div id="game_lottery">
              {type_of_game === "Wingo" && <Lottery />}
            </div>
            <div id="game_original">
              {type_of_game === "Aviator" && <Original />}
            </div>
            <div id="game_sports">
              {type_of_game === "Sports" && <Sports />}
            </div>
          </Box>
          {loding ? (
            <div className="w-[100%] flex justify-center">
              <CircularProgress className="!text-#E71D1E" />
            </div>
          ) : (
            <Box sx={styles.wininfoouter}>
              <Typography
                variant="body1"
                color="initial"
                sx={{
                  color: zubgtext,
                  fontWeight: "600",
                  fontSize: "16px",
                  mb: 2,
                }}
              >
                Winning information
              </Typography>
              {winnner_data?.slice(3, 8)?.map((i, index) => {
                return (
                  <Stack
                    key={index}
                    direction="row"
                    sx={{ ...styles.wininfoinner, mb: "10px" }}
                  >
                    <Stack direction="row" sx={styles.wininfoouterone}>
                      <Avatar
                        width={50}
                        src={
                          Math.floor(Math.random() * 5) + 1 === 1
                            ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVFCKn8Mm3sD46GsY3dSodC_9W8HzE2NJjxffFf5Sc5XHl_4bSqBWTz6DfOg&s"
                            : Math.floor(Math.random() * 5) + 1 === 2
                              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVFCKn8Mm3sD46GsY3dSodC_9W8HzE2NJjxffFf5Sc5XHl_4bSqBWTz6DfOg&s"
                              : Math.floor(Math.random() * 5) + 1 === 3
                                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVFCKn8Mm3sD46GsY3dSodC_9W8HzE2NJjxffFf5Sc5XHl_4bSqBWTz6DfOg&s"
                                : Math.floor(Math.random() * 5) + 1 === 4
                                  ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVFCKn8Mm3sD46GsY3dSodC_9W8HzE2NJjxffFf5Sc5XHl_4bSqBWTz6DfOg&s"
                                  : ""
                        } // Close the src attribute here
                        className={`capitalize ${i.id % 2 === 0 ? "!bg-[#2350BF]" : "!bg-green-700"
                          }`}
                      >
                        {i?.email?.split("@")[0]?.substring(0, 1)}
                      </Avatar>
                      <Typography variant="body1">
                        {i?.email
                          ? i.email.split("@")[0].substring(0, 2) +
                          "**" +
                          (i.email.split("@")[0].length > 2
                            ? i.email.split("@")[0].substring(2, 4)
                            : "")
                          : "**"}
                      </Typography>
                    </Stack>
                    <Stack direction="row" sx={styles.wininfooutertwo}>
                      <Box component="img" src={winp4} />
                      <Box>
                        <Typography variant="body1" color="initial">
                          Receive ₹{Number(i?.win || 0)?.toFixed(2)}
                        </Typography>
                        <Typography variant="body1" color="initial">
                          Winning amount
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                );
              })}
            </Box>
          )}

          {/* stage Podium */}
          <Box
            sx={{
              width: "95%",
              marginLeft: "2.5%",
              borderRadius: "10px",
              mt: "20px",
              mb: "20px",
              height: "30vh",
              backgroundImage: `url(${stage})`,
              backgroundSize: "100% 100%",
              position: "relative",
            }}
          >
            <Box sx={styles.winner1}>
              <Box
                component="img"
                // src={pro1c}
                src="https://img.freepik.com/premium-photo/man-with-shirt-that-says-he-is-wearing-orange-shirt_745528-9884.jpg?size=626&ext=jpg"
                sx={{
                  width: "60px",
                  borderRadius: "50%",
                  border: `3px solid ${zubgmid}`,
                  height: "60px",
                  objectPosition: "top",
                }}
              ></Box>
              <Box
                component="img"
                src={position1}
                sx={{ width: "70px", height: "20px" }}
              ></Box>
            </Box>
            <Box sx={styles.winner2}>
              <Box
                component="img"
                // src={pro1c}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVFCKn8Mm3sD46GsY3dSodC_9W8HzE2NJjxffFf5Sc5XHl_4bSqBWTz6DfOg&s"
                sx={{
                  width: "50px",
                  borderRadius: "50%",
                  border: `3px solid ${zubgmid}`,
                  height: "50px",
                  objectPosition: "top",
                }}
              ></Box>
              <Box
                component="img"
                src={position2}
                sx={{ width: "60px", height: "15px" }}
              ></Box>
            </Box>
            <Box sx={styles.winner3}>
              <Box
                component="img"
                // src={pro1c}
                 src="data:image/jpeg;base64,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"
                sx={{
                  width: "50px",
                  borderRadius: "50%",
                  border: `3px solid ${zubgmid}`,
                  height: "50px",
                  objectPosition: "top",
                }}
              ></Box>
              <Box
                component="img"
                src={position3}
                sx={{ width: "60px", height: "15px" }}
              ></Box>
            </Box>
          </Box>
          {/* stage Podium end */}

          {loding ? (
            <div className="w-[100%] flex justify-center">
              <CircularProgress className="!text-#E71D1E" />
            </div>
          ) : (
            // <Box sx={styles.wininfoouter}>
            //   <Typography
            //     variant="body1"
            //     color="initial"
            //     sx={{
            //       color: zubgtext,
            //       fontWeight: "600",
            //       fontSize: "16px",
            //       mb: 2,
            //     }}
            //   >
            //     TRX Winning information
            //   </Typography>
            //   {winnner_data?.slice(0, 5)?.map((i, index) => {
            //     return (
            //       <Stack
            //         key={index}
            //         direction="row"
            //         sx={{ ...styles.wininfoinner, mb: "10px" }}
            //       >
            //         <Stack direction="row" sx={styles.wininfoouterone}>
            //           <Avatar
            //             width={50}
            //             src={
            //               Math.floor(Math.random() * 5) + 1 === 1
            //                 ? "https://mui.com/static/images/avatar/4.jpg"
            //                 : Math.floor(Math.random() * 5) + 1 === 2
            //                   ? "https://lh3.googleusercontent.com/a/ACg8ocJ_lQQ7XjcLthKctAe1u5A6Fv8JJUQ0ugECmc7RkiZmKfI=s360-c-no"
            //                   : Math.floor(Math.random() * 5) + 1 === 3
            //                     ? "https://sunlottery.fun/static/media/tanveer.03fd8989206194114777.PNG"
            //                     : Math.floor(Math.random() * 5) + 1 === 4
            //                       ? "https://sunlottery.fun/static/media/sajid.e6abfd6b30c0fa7d3b1a.PNG"
            //                       : ""
            //             } // Close the src attribute here
            //             className={`capitalize ${i.id % 2 === 0 ? "!bg-[#2350BF]" : "!bg-green-700"
            //               }`}
            //           >
            //             {i?.email?.split("@")[0]?.substring(0, 1)}
            //           </Avatar>
            //           <Typography variant="body1">
            //             {i?.email
            //               ? i.email.split("@")[0].substring(0, 2) +
            //               "**" +
            //               (i.email.split("@")[0].length > 2
            //                 ? i.email.split("@")[0].substring(2, 4)
            //                 : "")
            //               : "**"}
            //           </Typography>
            //         </Stack>
            //         <Stack direction="row" sx={styles.wininfooutertwo}>
            //           <Box component="img" src={trximg} />
            //           <Box>
            //             <Typography variant="body1" color="initial">
            //               Receive ₹{Number(i?.win || 0)?.toFixed(2)}
            //             </Typography>
            //             <Typography variant="body1" color="initial">
            //               Winning amount
            //             </Typography>
            //           </Box>
            //         </Stack>
            //       </Stack>
            //     );
            //   })}
            // </Box>
            <Box>
             
            </Box>
          )}

          {poicy && !lodingBanner && (
            <Dialog
              open={poicy}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClosepolicy}
              aria-describedby="alert-dialog-slide-description"
              PaperProps={{ className: `!max-w-[500px] ${gray}` }}
            >
              <div
                style={{
                  background: zubgtext,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px",
                }}
              >
                {!openbannerurl ||
                  (openbannerurl === "" && (
                    <p style={{ color: "white", fontSize: "14px" }}>
                      Notification
                    </p>
                  ))}
                <RxCross2
                  style={{ color: "white" }}
                  onClick={handleClosepolicy}
                />
              </div>
              <DialogContent style={{ background: zubgback }}>
                {!openbannerurl || openbannerurl === "" ? (
                  <Notification handleClosepolicy={handleClosepolicy} />
                ) : (
                  <img src={openbannerurl} className="w-[100%] h-[100%]" />
                )}
              </DialogContent>
            </Dialog>
          )}

          {/* {poicy && (
            <Dialog
              open={poicy}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClosepolicy}
              aria-describedby="alert-dialog-slide-description"
              PaperProps={{ className: `!max-w-[1000px] ${gray}` }}
            >
              <div
                style={{
                  background: zubgmid,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px",
                }}
              >
                <p style={{ color:zubgtext, fontSize: "14px" }}>Notification</p>
                <RxCross2
                  style={{ color:zubgtext }}
                  onClick={handleClosepolicy}
                />
              </div>
              <DialogContent style={{ background: zubgback }}>
                <Notification handleClosepolicy={handleClosepolicy} />
              </DialogContent>
            </Dialog>
          )} */}
        </Container>
      </Box>
      <CustomCircularProgress isLoading={isLoading || profile_loding} />
    </Layout>
  );
}

export default Dashboard;

const styles = {
  root: { background: "#F6F7FE", pb: 6 },
  dashboardTitle: {
    textAlign: "center",
    color: "#E71D1E !important",
    fontSize: "21px",
    fontWeight: "500",
  },
  swiperImage: { width: "100%", height: "auto" },
  depositWithdrawContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    mt: 4,
    width: "95%",
    marginLeft: "2.5%",
  },
  depositWithdrawIcon: { width: "30px", height: "30px" },
  referralLinkContainer: {
    background: "black",
    boxShadow: zubgshadow,
    padding: "15px 15px",
    borderRadius: "5px",
    mt: 4,
    width: "95%",
    marginLeft: "2.5%",
  },
  referralLinkTitle: {
    color: lightyellow,
    fontSize: "14px",
    fontWeight: "500 !important",
    mb: 1,
  },
  referralLinkInputContainer: { alignItems: "center" },
  referralLinkInput: {
    width: "100%",
    background: "#eae8e8",
    boxShadow: zubgshadow,
    borderRadius: "5px",
    "&>div>input": { color: zubgtext },
  },
  referralLinkButton: { marginLeft: 2, background: zubgtext },
  socialButtonsContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    mt: 2,
  },
  telegramButton: {
    fontSize: "14px",
    color: "white !important",
    textTransform: "capitalize",
    fontWeight: "400",
    background: "#1A8AD5",
    "&:hover": { background: "#1A8AD5" },
  },
  supportButton: {
    fontSize: "14px",
    color: "white !important",
    textTransform: "capitalize",
    fontWeight: "400",
    background: "#1A8AD5",
    "&:hover": { background: "#1A8AD5" },
  },
  socialButtonIcon: {
    margin: "auto",
    borderRadius: "50%",
    width: "25px",
    height: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  socialIcon: { fontSize: "30px", "&>path": { color: "white !important" } },
  socialIconinfo: {
    fontSize: "27px",
    margin: "auto",
    "&>path": { color: "white !important" },
  },
  socialButtonText: {
    color: "white !important",
    textTransform: "capitalize",
    fontWeight: "400",
    fontSize: "14px",
  },
  gameImage: {
    width: "90px",
    height: "80px",
    position: "absolute",
    top: "-20px",
    right: "0px",
  },
  gameTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#E71D1E !important",
    transition: "all 0.3s",
  },
  gameDescription: {
    fontSize: "15px",
    fontWeight: "400",
    color: "#E71D1E !important",
    mt: 2,
    transition: "all 0.3s",
  },
  userImage: { width: "50px", height: "50px" },
  profileBox: {
    "&>.profile": { width: "80px", height: "80px", borderRadius: "50%" },
    position: "relative",
    mb: "15px",
  },
  stageBox: { width: "100%" },
  stageinner: {
    width: "32%",
    position: "absolute",
    top: "0%",
    left: "0%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  stageinnerTwo: {
    width: "32%",
    position: "absolute",
    top: "-18%",
    left: "34%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  stageinnerThree: {
    width: "32%",
    position: "absolute",
    top: "-4%",
    right: "0%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  imgBox: {
    width: "50px",
    height: "50px",
    position: "absolute",
    top: "-23px",
    left: "-15px",
  },
  thirdimg: {
    width: "70px",
    height: "18px",
    position: "absolute",
    bottom: "0",
    left: "7px",
  },
  name: { color: "#8f5206", fontSize: "13px", fontWeight: 500 },
  rupee: {
    color: "#8f5206",
    fontSize: "13px",
    fontWeight: 500,
    background: "linear-gradient(180deg, #FAE59F 0%, #C4933F 100%)",
    padding: "6px 5px",
    borderRadius: "20px",
  },
  wininfoouter: {
    width: "95%",
    marginLeft: "2.5%",
    // background: zubgwhite,
    padding: "10px 0px",
    mt: "20px",
    borderRadius: "10px",

    // backgroundImage: `url(${gmbg})`,
    // backgroundSize: "100% 100%",
    position: "relative",
  },
  wininfooutertwo: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%",
    justifyContent: "center",

    "&>img": {
      width: "100px",
      height: "50px",
      borderRadius: "10px",
      marginRight: "5px",
      background: "#ff8080",
      objectFit: "cover",
    },
    "&>div>p:nth-child(1)": {
      color: zubgtext,
      fontSize: "12px",
      fontWeight: "600",
      textAlign: "center",
    },
    "&>div>p:nth-child(2)": {
      color: zubgtext,
      fontSize: "11px",
      fontWeight: "400",
      textAlign: "center",
    },
  },
  wininfoouterone: {
    alignItems: "center",
    justifyContent: "start",
    width: "30%",
    justifyContent: "center",
    "&>p": { color: zubgtext, ml: "10px", fontSize: "11px", fontWeight: "600" },
  },
  wininfoinner: {
    alignItems: "center",
    justifyContent: "space-between",
    background: zubgback,
    padding: "10px 0px",
    borderRadius: "10px",
    boxShadow: zubgshadow,
    opacity: 0.9,
  },
  winner1: {
    position: "absolute",
    left: "41%",
    top: "5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  winner2: {
    position: "absolute",
    left: "17%",
    bottom: "52%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  winner3: {
    position: "absolute",
    right: "18%",
    bottom: "49%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
};
