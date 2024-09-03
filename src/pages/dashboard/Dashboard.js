import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Box, Button, CircularProgress, Container, Dialog, DialogContent, Slide, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import copy from "clipboard-copy";
import CryptoJS from "crypto-js";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { checkTokenValidity } from "../../Shared/CookieStorage";
import CustomCircularProgress from "../../Shared/CustomCircularProgress";
import { gray, lightyellow, zubgback, zubgmid, zubgshadow, zubgtext } from "../../Shared/color";
import aviator_game_image from "../../assets/aviator_game_image.png";
import crown1 from "../../assets/crown1.png";
import crown2 from "../../assets/crown2.png";
import crown3 from "../../assets/crown3.png";
import place1 from "../../assets/place1.png";
import place2 from "../../assets/place2.png";
import place3 from "../../assets/place3.png";
import logo from "../../assets/funXplora-8-13-2024 (1).png";
import one from "../../assets/images/1.jpg";
import three from "../../assets/images/123.png";
import two from "../../assets/images/2.jpg";
import bgms from "../../assets/images/bgms2.jpg";
import stage from "../../assets/images/podium.png";
import position2 from "../../assets/images/positio2.png";
import position3 from "../../assets/images/position3.png";
import position1 from "../../assets/images/positoin1.png";
import winning_bg from "../../assets/images/winning_bg-d9c728ae.png";
import profile1 from "../../assets/profile1.png";
import profile2 from "../../assets/profile2.png";
import profile3 from "../../assets/profile3.png";
import winerbanner1 from "../../assets/winerbanner1.png";
import Layout from "../../component/Layout/Layout";
import { Logout } from "@mui/icons-material";
import { net_wallet_amount_function, please_reconnect_the_serverFun, waitingAviatorFun, } from "../../redux/slices/counterSlice";
import { get_user_data_fn, walletamount, } from "../../services/apicalling";
import { endpoint, fron_end_main_domain, support_mail, telegram_url } from "../../services/urls";
import theme from "../../utils/theme";
import Lottery from "./DashboadSubcomponent/Lottery";
import Original from "./DashboadSubcomponent/Original";
import Sports from "./DashboadSubcomponent/Sports";
import Notification from "./Notification";
import trximg from "../../assets/images/f233fc5431d2b61e65327cc77d9bb1f8.png";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const imageSources = [
  "https://mui.com/static/images/avatar/2.jpg",
  "https://mui.com/static/images/avatar/3.jpg",
  profile3,
  "https://mui.com/static/images/avatar/4.jpg",
  profile1,
  "https://mui.com/static/images/avatar/1.jpg",
  profile2,
  "https://mui.com/static/images/avatar/5.jpg",
];

function Dashboard() {

  const dispatch = useDispatch();
  const aviator_login_data = useSelector(
    (state) => state.aviator.aviator_login_data
  );
  const net_wallet_amount = useSelector(
    (state) => state.aviator.net_wallet_amount
  );


  const isAvailableUser = sessionStorage.getItem("isAvailableUser");
  const value =
    (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
        localStorage.getItem("logindataen"),
        "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
    null;
  const navigate = useNavigate();
  const [poicy, setpoicy] = React.useState(false);
  const [type_of_game, settype_of_game] = React.useState("");
  const [winnner_data, setwinnerdata] = useState([]);
  const [openbannerurl, setopenbannerurl] = useState("");
  const [loding, setloding] = useState(false);
  const [lodingBanner, setlodingBanner] = useState(false);


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

  const wallet = data?.data?.data;


  useEffect(() => {
    dispatch(net_wallet_amount_function(data?.data?.data))
  }, [Number(data?.data?.data?.wallet), Number(data?.data?.data?.winning)])



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


  const initialValues = {
    referrel_code: `${fron_end_main_domain}/register?ref=${wallet?.referral_code}`,
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



  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };



  // useEffect(() => {
  //   !aviator_login_data && get_user_data_fn(dispatch);
  // }, []);



  const game_data = [
    {
      name: "Wingo",
      url: 'win',
      img: "https://ossimg.bdgadminbdg.com/IndiaBDG/gamecategory/gamecategory_202401100619315n2k.png",
    },
    {
      name: "Aviator",

      img: aviator_game_image,
    },
    {
      name: "Trx",
      url: 'trx',
      img: trximg,
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
          sx={{ background: '#0D0335' }}
        >
          <div
            style={{
              background: '#0D0335',
            }}
          >
            <div className=" flex justify-between">
              <div
                className="flex items-center gap-2"
                style={{ color: zubgtext }}
              >
                <Box
                  component="img"
                  src={logo}
                  sx={{ width: "45%", height: "100%", mt: 1 }}
                ></Box>
              </div>
              <div className="flex justify-end gap-2">
                <div className="flex  gap-1 items-center cursor-pointer "
                  onClick={() => {
                    localStorage.clear();
                    navigate("/")
                  }}>
                  <Logout sx={{ color: zubgtext }} />
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

          <Box
            sx={{

              width: "95%",
              marginLeft: "2.5%",
              background: lightyellow,
              boxShadow: zubgshadow,
              borderRadius: "10px",
              mt: "20px",
              padding: "10px 10px",
            }}
          >
            <Stack direction='row' sx={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: theme.palette.secondary.main, borderRadius: '5px', mb: 1, py: 1, }}>
              <Typography variant="body1" sx={{
                color: 'white',
                fontWeight: 600,
                fontSize: '20px'
              }}>₹ {(Number(wallet?.wallet) +Number(wallet?.winning))?.toFixed(2) }</Typography>
              <Typography variant="body1" sx={{
                color: 'white',
                fontWeight: 500,
                fontSize: '15px'
              }} >Available balance</Typography>
            </Stack>
            <Box sx={{
              width: "100%", display: "flex",
              alignItems: "start",
              justifyContent: "space-between",
            }}>
              <CampaignOutlinedIcon sx={{ color: "black" }} />

              <Box
                sx={{
                  width: "90%",
                  "&>p": { fontSize: "13px", },
                }}
              >
                <Typography variant="body1" sx={{ color: 'white' }}>
                  See the Installation page for additional docs about how to make
                  sure everything is set up correctly.
                </Typography>
              </Box>
            </Box>
          </Box>
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
                  <Box sx={{ ...styles.socialButtonText, color: 'white !important' }}>Telegram</Box>
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
                <Box component={NavLink} to={`/${i?.url}`}>
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
                          i.name === "Casino"

                        )
                          return toast("Comming Soon !", { id: 1 });
                        scrollToSection("games");
                        settype_of_game(i?.name);
                      }}
                      href={`${i?.name}`}
                      style={{
                        backgroundImage: `url(${bgms})`,
                        filter: 'hue-rotate(45deg)',
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100% 100%",
                        padding: "15px 15px 15px 15px",
                        borderRadius: "7px 7px 0px 0px !important",
                      }}
                      className="cursor-pointer   flex flex-col items-center justify-center"
                    >
                      <img style={{ filter: 'hue-rotate(311deg)' }} className="w-[90px] h-[90px] " src={i?.img} />
                    </a>
                    <p
                      className="!text-sm font-bold"
                      style={{
                        color: "white",
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
              <Stack direction={"row"} sx={{ alignItems: "center", mb: 2, }}>
                <Box
                  sx={{
                    background: 'white',
                    width: "4px",
                    height: "16px",
                  }}
                ></Box>
                <Typography
                  variant="body1"

                  sx={{ fontSize: "18px", fontWeight: 700, ml: 1, color: 'white' }}
                >
                  Winning information
                </Typography>
              </Stack>
              {winnner_data?.slice(5, 8)?.map((i, index) => {
                return (
                  <Stack
                    key={index}
                    direction="row"
                    sx={styles.winnerslider}
                  >
                    <div style={{ position: 'relative' }}>
                      <Box
                        width={25}
                        height={25}
                        component={"img"}
                        src={crown2}
                        sx={styles.bca}
                      ></Box>
                      <Box
                        component={"img"}
                        src={imageSources[index]}
                        alt={`Profile ${index + 1} `}
                        width={45}
                        height={45}
                        sx={styles.winnerprofile}
                      ></Box>

                    </div>
                    <Typography
                      variant="body1"

                      sx={styles.winnername}
                    >
                      <p className="!flex !flex-col" style={{ color: 'white' }}>
                        {i?.email
                          ? i.email.split("@")[0].substring(0, 2) +
                          "**" +
                          (i.email.split("@")[0].length > 2
                            ? i.email.split("@")[0].substring(2, 4)
                            : "")
                          : "**"}
                      </p>
                    </Typography>
                    <Box sx={styles.winnerbannerouter}>
                      <Box
                        height={45}
                        component={"img"}
                        src={winerbanner1}
                        sx={styles.winnerbannerinner}
                      ></Box>
                    </Box>
                    <Box>
                      <Typography
                        variant="body1"

                        sx={styles.winneramout || 0}
                      >
                        Receive ₹{Number(i?.win || 0)?.toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body1"

                        sx={styles.winnertitle}
                      >
                        Winning amount
                      </Typography>
                    </Box>
                  </Stack>
                );
              })}
            </Box>
          )}

          <Box sx={styles.podiumbox}>
            <Stack direction="row" sx={styles.podiumtextouterbox}>
              <Box sx={styles.winner2box}>
                <Box
                  component={"img"}
                  src={crown2}
                  sx={styles.winnercroun}
                ></Box>
                <Box
                  component={"img"}
                  src={profile1}
                  sx={styles.winnerprofilepod}
                ></Box>
                <Box
                  component={"img"}
                  src={place2}
                  sx={styles.winnerposition}
                ></Box>
                <Box sx={styles.winner2amt}>
                  <Typography variant="body1" >
                    {winnner_data?.[1]?.email
                      ? winnner_data?.[1]?.email?.split("@")?.[0]?.substring(0, 2) +
                      "**" +
                      (winnner_data?.[1]?.email?.split("@")?.[0]?.length > 2
                        ? winnner_data?.[1]?.email?.split("@")?.[0]?.substring(2, 4)
                        : "")
                      : "**"}
                  </Typography>
                  <Typography
                    variant="body1"

                    sx={styles.winningamount}
                  >
                    ₹ {Number(winnner_data?.[1]?.win)?.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "30%",
                  position: "absolute",
                  zIndex: 30,
                  top: "-18%",
                  left: "33.33%",
                  height: "100%",
                }}
              >
                <Box
                  component={"img"}
                  src={crown1}
                  sx={styles.winnercroun}
                ></Box>
                <Box
                  component={"img"}
                  src={profile2}
                  sx={styles.winnerprofilepod}
                ></Box>
                <Box
                  component={"img"}
                  src={place1}
                  sx={styles.winnerposition}
                ></Box>
                <Box sx={styles.winner2amt}>
                  <Typography variant="body1" >
                    {winnner_data?.[0]?.email
                      ? winnner_data?.[0]?.email?.split("@")?.[0]?.substring(0, 2) +
                      "**" +
                      (winnner_data?.[0]?.email?.split("@")?.[0]?.length > 2
                        ? winnner_data?.[0]?.email?.split("@")?.[0]?.substring(2, 4)
                        : "")
                      : "**"}
                  </Typography>
                  <Typography
                    variant="body1"

                    sx={styles.winningamount}
                  >
                    ₹  {Number(winnner_data?.[0]?.win)?.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "30%",
                  position: "absolute",
                  zIndex: 30,
                  top: 0,
                  right: 0,
                  height: "100%",
                }}
              >
                <Box
                  component={"img"}
                  src={crown3}
                  sx={styles.winnercroun}
                ></Box>
                <Box
                  component={"img"}
                  src={profile3}
                  sx={styles.winnerprofilepod}
                ></Box>
                <Box
                  component={"img"}
                  src={place3}
                  sx={styles.winnerposition}
                ></Box>
                <Box sx={styles.winner2amt}>
                  <Typography variant="body1" >
                    {winnner_data?.[2]?.email
                      ? winnner_data?.[2]?.email?.split("@")?.[0]?.substring(0, 2) +
                      "**" +
                      (winnner_data?.[2]?.email?.split("@")?.[0]?.length > 2
                        ? winnner_data?.[2]?.email?.split("@")?.[0]?.substring(2, 4)
                        : "")
                      : "**"}
                  </Typography>
                  <Typography
                    variant="body1"

                    sx={styles.winningamount}
                  >
                    ₹ {Number(winnner_data?.[2]?.win)?.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>

          <Box sx={styles.wininfoouter} >
            {winnner_data?.slice(3, 5)?.map((i, index) => {
              return (
                <Stack
                  key={index}
                  direction="row"
                  sx={styles.winnerslider}
                >
                  <div style={{ position: 'relative' }}>
                    <Box
                      width={25}
                      height={25}
                      component={"img"}
                      src={crown2}
                      sx={styles.bca}
                    ></Box>
                    <Box
                      component={"img"}
                      src={imageSources[index]}
                      alt={`Profile ${index + 1} `}
                      width={45}
                      height={45}
                      sx={styles.winnerprofile}
                    ></Box>

                  </div>
                  <Typography
                    variant="body1"

                    sx={styles.winnername}
                  >
                    <p className="!flex !flex-col" style={{ color: 'white' }}>
                      {i?.email
                        ? i.email.split("@")[0].substring(0, 2) +
                        "**" +
                        (i.email.split("@")[0].length > 2
                          ? i.email.split("@")[0].substring(2, 4)
                          : "")
                        : "**"}
                    </p>
                  </Typography>
                  <Box sx={styles.winnerbannerouter}>
                    <Box
                      height={45}
                      component={"img"}
                      src={winerbanner1}
                      sx={styles.winnerbannerinner}
                    ></Box>
                  </Box>
                  <Box>
                    <Typography
                      variant="body1"

                      sx={styles.winneramout || 0}
                    >
                      Receive ₹{Number(i?.win || 0)?.toFixed(2)}
                    </Typography>
                    <Typography
                      variant="body1"

                      sx={styles.winnertitle}
                    >
                      Winning amount
                    </Typography>
                  </Box>
                </Stack>
              );
            })}
          </Box>
          {/* <Box sx={styles.wininfoouter} >
            <Stack direction={"row"} sx={{ alignItems: "center", mb: 2, }}>
              <Box
                sx={{
                  background: 'white',
                  width: "4px",
                  height: "16px",
                }}
              ></Box>
              <Typography
                variant="body1"

                sx={{ fontSize: "18px", fontWeight: 700, ml: 1, color: 'white' }}
              >
                Last Trade Top Winner
              </Typography>
            </Stack>
            {winnner_data?.slice(3, 8)?.map((i, index) => {
              return (
                <Stack
                  key={index}
                  direction="row"
                  sx={styles.winnerslider}
                >
                  <div style={{ position: 'relative' }}>
                    <Box
                      width={25}
                      height={25}
                      component={"img"}
                      src={crown2}
                      sx={styles.bca}
                    ></Box>
                    <Box
                      component={"img"}
                      src={imageSources[index]}
                      alt={`Profile ${index + 1} `}
                      width={45}
                      height={45}
                      sx={styles.winnerprofile}
                    ></Box>

                  </div>
                  <Typography
                    variant="body1"

                    sx={styles.winnername}
                  >
                    <p className="!flex !flex-col" style={{ color: 'white' }}>
                      <span>tanve***</span>
                      <span>fun@859***</span>
                    </p>
                  </Typography>
                  <Box sx={styles.winnerbannerouter}>
                    <Box
                      height={45}
                      component={"img"}
                      src={winerbanner1}
                      sx={styles.winnerbannerinner}
                    ></Box>
                  </Box>
                  <Box>
                    <Typography
                      variant="body1"

                      sx={styles.winneramout || 0}
                    >
                      Receive ₹{Number(i?.win || 0)?.toFixed(2)}
                    </Typography>
                    <Typography
                      variant="body1"

                      sx={styles.winnertitle}
                    >
                      Winning amount
                    </Typography>
                  </Box>
                </Stack>
              );
            })}
          </Box> */}
          {/* {poicy && !lodingBanner && (
            <Dialog
              open={poicy}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClosepolicy}
              aria-describedby="alert-dialog-slide-description"
              PaperProps={{ className: `!max - w - [500px] ${gray} ` }}
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
          )} */}
        </Container>
      </Box>
      <CustomCircularProgress isLoading={isLoading || isLoading} />
    </Layout>
  );
}

export default Dashboard;

const styles = {
  root: { background: "#0F092A", pb: 6 },
  dashboardTitle: { textAlign: "center", color: "#E71D1E !important", fontSize: "21px", fontWeight: "500", },
  swiperImage: { width: "100%", height: "auto" },
  depositWithdrawContainer: { alignItems: "center", justifyContent: "space-between", mt: 4, width: "95%", marginLeft: "2.5%", },
  depositWithdrawIcon: { width: "30px", height: "30px" },
  referralLinkContainer: { background: "#63BA0E", boxShadow: zubgshadow, padding: "15px 15px", borderRadius: "5px", mt: 4, width: "95%", marginLeft: "2.5%", },
  referralLinkTitle: { color: '#160D3D', fontSize: "14px", fontWeight: "500 !important", mb: 1, },
  referralLinkInputContainer: { alignItems: "center" },
  referralLinkInput: { width: "100%", background: "#ff00008a", boxShadow: zubgshadow, borderRadius: "5px", "&>div>input": { color: '#3330BB' }, },
  referralLinkButton: { marginLeft: 2, background: '#160D3D', color: '#63BA0E' },
  socialButtonsContainer: { alignItems: "center", justifyContent: "space-between", mt: 2, },
  telegramButton: {
    fontSize: "14px", color: "#160D3D !important", textTransform: "capitalize", fontWeight: "400", background: '#27A3E3',
    "&:hover": { background: '#27A3E3' },
  },
  supportButton: {
    fontSize: "14px", color: theme.palette.secondary.dark, textTransform: "capitalize", fontWeight: "400",
    background: 'white',
    "&:hover": { background: 'white' },
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
    color: `${theme.palette.primary.dark}!important`,
    "&>path": { color: `${theme.palette.primary.dark}!important`, },
  },
  socialButtonText: {
    color: " !important",
    textTransform: "capitalize",
    fontWeight: "400",
    fontSize: "14px",
  },
  gameTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#E71D1E !important",
    transition: "all 0.3s",
  },
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
  winnerprofile: {
    borderRadius: "50%",
    objectPosition: "center",
    objectFit: "cover",
    marginTop: '-25px',
    marginLeft: '-3px',
  },
  name: { color: "#8f5206", fontSize: "13px", fontWeight: 500 },
  wininfoouter: {
    width: "95%",
    marginLeft: "2.5%",
    padding: "10px 0px",
    mt: "20px",
    borderRadius: "10px",
    position: "relative",
  },
  winnername: { fontSize: "12px", fontWeight: 400, mx: 1 },
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
  winnerslider: {
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px 0px 10px 5px",
    backgroundImage: `url(${winning_bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    borderRadius: "10px",
    my: 1.5,
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    animation: "infinite moves",
  },
  winnerbannerouter: {
    background: theme.palette.primary.main,
    width: "23%",
    borderRadius: "10px",
    objectPosition: "center",
  },
  winnerbannerinner: {
    width: "100%",
    borderRadius: "10px",
    objectPosition: "center",
    objectFit: "cover",
  },
  winneramout: { fontSize: "12px", fontWeight: 600, marginLeft: 1, color: 'white' },
  winnertitle: { fontSize: "11px", fontWeight: 400, marginLeft: 1, color: 'white' },
  bca: {
    width: '25px',
    height: '25px',
    position: 'absolute',
    bottom: '120%',
    left: '-33%',
    transform: 'rotate(-7deg)',
  },
  podiumbox: {
    backgroundImage: `url(${stage})`,
    width: "95%",
    height: "140px",
    mt: '54px',
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    position: "relative",
    zIndex: 10,
    ml: '2.5%',
  },
  podiumtextouterbox: { width: "100%", height: "100%", position: "relative" },
  winner2box: {
    width: "30%",
    position: "absolute",
    zIndex: 30,
    top: 0,
    left: 0,
    height: "100%",
  },
  winnerposition: {
    width: "70px",
    height: "50px",
    objectFit: "contain",
    position: "absolute",
    left: "21%",
    top: "14%",
  },
  winnerprofilepod: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    objectFit: "cover",
    position: "absolute",
    left: "25%",
    top: "-11%",
  },
  winnercroun: {
    width: "50px",
    height: "50px",
    objectFit: "contain",
    position: "absolute",
    left: "11%",
    top: "-25%",
    zIndex: 1000,
  },
  winner2amt: {
    width: "100%",
    position: "absolute",
    left: 0,
    bottom: "22%",
    textAlign: "center",
    "&>p": { color: "white", fontWeight: 400, fontSize: "11px" },
  },
  winningamount: {
    marginTop: "5px",
    padding: "5px",
    borderRadius: "10px",
    background: theme.palette.secondary.main,
    marginLeft: '5%',
    width: '90%',
  },
};
