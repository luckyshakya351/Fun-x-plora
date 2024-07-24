import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import CloseIcon from "@mui/icons-material/Close";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import { Box, Container, Dialog, IconButton, Stack, Typography } from "@mui/material";
import copy from "clipboard-copy";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import CustomCircularProgress from "../../Shared/CustomCircularProgress";
import { lightblue, lightgreen, zubgback, zubggray, zubgtext } from "../../Shared/color";
import customer from "../../assets/images/24-hours-service.png";
import bgms from "../../assets/images/bgs.jpg";
import bgms1 from "../../assets/images/bgs1.jpg";
import copyIimage from "../../assets/images/copy.png";
import sort from "../../assets/images/data-flow.png";
import donut from "../../assets/images/database.png";
import book from "../../assets/images/rules.png";
import money from "../../assets/images/salary.png";
import sunlotteryhomebanner from "../../assets/sunlotteryhomebanner.jpg";
import Layout from "../../component/Layout/Layout";
import { MypromotionDataFn } from "../../services/apicalling";
import { fron_end_main_domain } from "../../services/urls";

function Promotion() {
  const [openDialogBoxHomeBanner, setopenDialogBoxHomeBanner] = useState(false);

  const { isLoading, data } = useQuery(
    ["promotion_data"],
    () => MypromotionDataFn(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
refetchOnWindowFocus:false
    }
  );

  const result = data?.data?.data;

  const functionTOCopy = (value) => {
    console.log("function hit");
    copy(value);
    toast.success("Copied to clipboard!");
  };
  return (
    <Layout>
      <Container>
        <CustomCircularProgress isLoading={isLoading} />
        <Box sx={style.header}>
          <Typography variant="body1" >
            {" "}
          </Typography>
          <Typography variant="body1" className="!text-white">
            Agency
          </Typography>
          <Box component={NavLink} to="/promotion/TeamReport/">
            <Box component="img" src={sort} width={30}></Box>
          </Box>
        </Box>
        <Box sx={style.commitionboxOuter}>
          <Box sx={style.commitionbox}>
            <Typography variant="body1" sx={{ color: zubgtext }}>
              {result?.today_turnover}
            </Typography>
            <Typography variant="body1" sx={{ color: 'white' }}>
              Total Turnover
            </Typography>
            <Typography variant="body1" sx={{ color: zubgtext }}>
              Upgrade the level to increase turnover
            </Typography>
          </Box>
        </Box>
        <Box sx={style.subcordinateBox}>
          <Stack direction="row" sx={{ width: "100%" }}>
            <Box sx={style.subordinatesleft}>
              <EmojiPeopleOutlinedIcon />
              <Typography variant="body1" >
                {" "}
                Direct subordinates
              </Typography>
            </Box>
            <Box sx={style.subordinatesRight}>
              <Groups2OutlinedIcon />
              <Typography variant="body1" >
                Team subordinates
              </Typography>
            </Box>
          </Stack>
          <Box sx={style.boxStyles}>
            <Box sx={style.innerBoxStyles}>
              <Box sx={style.subcordinatelist}>
                <Typography
                  variant="body1"

                >
                  {result?.count || 0}
                </Typography>
                <Typography
                  variant="body1"

                >
                  {" "}
                  Number of register
                </Typography>
              </Box>
              <Box sx={style.subcordinatelist}>
                <Typography
                  variant="body1"

                >
                  {result?.deposit_member || 0}
                </Typography>
                <Typography
                  variant="body1"

                >
                  {" "}
                  Number of Deposit Members
                </Typography>
              </Box>
              <Box sx={style.subcordinatelist}>
                <Typography
                  variant="body1"

                >
                  {result?.deposit_recharge || 0}
                </Typography>
                <Typography
                  variant="body1"

                >
                  {" "}
                  Deposit amount
                </Typography>
              </Box>
              {/* <Box sx={style.subcordinatelist}>
                  <Typography
                    variant="body1"
                    
                
                  >
                    0
                  </Typography>
                  <Typography
                    variant="body1"
                    
                
                  >
                    {" "}
                    Number of people making first deposit
                  </Typography>
                </Box> */}
            </Box>

            <Box sx={style.innerBoxStylestwo}>
              <Box sx={style.subcordinatelist}>
                <Typography variant="body1" >
                  {result?.teamcount || 0}
                </Typography>
                <Typography variant="body1" >
                  {" "}
                  Number of register{" "}
                </Typography>
              </Box>
              <Box sx={style.subcordinatelist}>
                <Typography variant="body1" >
                  {result?.deposit_member_team || 0}
                </Typography>
                <Typography variant="body1" >
                  {" "}
                  Number of Deposit Members
                </Typography>
              </Box>
              <Box sx={style.subcordinatelist}>
                <Typography variant="body1" >
                  {result?.deposit_recharge_team || 0}
                </Typography>
                <Typography variant="body1" >
                  {" "}
                  Deposit amount
                </Typography>
              </Box>
              {/* <Box sx={style.subcordinatelist}>
                  <Typography variant="body1" >
                    0
                  </Typography>
                  <Typography variant="body1" >
                    {" "}
                    Number of people making first deposit
                  </Typography>
                </Box> */}
            </Box>
          </Box>
          <Box sx={style.invitebtn}>
            <NavLink
              //  to="/promotion/PromotionShare"
              onClick={() => functionTOCopy(`${fron_end_main_domain}/register?ref=${result?.referral_code}`)}
            >
              <Typography sx={{}}>INVITATION LINK</Typography>
            </NavLink>
          </Box>
        </Box>
        <Box sx={style.invitebutton} className="invitebutton">
          <Box sx={style.invitbox}>
            <Stack direction="row">
              {/* <Box component='img' src={copycode}></Box> */}
              <Box
                component="img"
                src={copyIimage}
                className="!cursor-pointer"
                onClick={() => functionTOCopy(result?.referral_code)}
              ></Box>
              <Typography variant="body1" >
                Copy invitation code
              </Typography>
            </Stack>
            <Stack direction="row">
              <Typography variant="body1" >
                {result?.referral_code}
              </Typography>
              <ArrowForwardIosOutlinedIcon />
            </Stack>
          </Box>
          <NavLink to="/promotion/TeamReport">
            <Box sx={style.invitbox}>
              <Stack direction="row">
                {/* <Box component='img' src={team_port}></Box> */}
                <Box component="img" src={donut}></Box>
                <Typography variant="body1" >
                  Subordinate data
                </Typography>
              </Stack>
              <Stack direction="row">
                <ArrowForwardIosOutlinedIcon />
              </Stack>
            </Box>
          </NavLink>
          <NavLink to="/account/income-main">
            <Box sx={style.invitbox}>
              <Stack direction="row">
                {/* <Box component='img' src={team_port}></Box> */}
                <Box component="img" src={money}></Box>
                <Typography variant="body1" >
                  Income data
                </Typography>
              </Stack>
              <Stack direction="row">
                <ArrowForwardIosOutlinedIcon />
              </Stack>
            </Box>
          </NavLink>
          <NavLink to="/promotion/TeamReport/data">
            <Box sx={style.invitbox}>
              <Stack direction="row">
                {/* <Box component='img' src={team_port}></Box> */}
                <Box component="img" src={donut}></Box>
                <Typography variant="body1" >
                  Team data
                </Typography>
              </Stack>
              <Stack direction="row">
                <ArrowForwardIosOutlinedIcon />
              </Stack>
            </Box>
          </NavLink>
          {/* <NavLink to="/promotion/PromotionRule">
            <Box sx={style.invitbox}>
              <Stack direction="row">
              
                <Box component="img" src={book}></Box>
                <Typography variant="body1" >
                  Invitation rules
                </Typography>
              </Stack>
              <Stack direction="row">
                <ArrowForwardIosOutlinedIcon />
              </Stack>
            </Box>
          </NavLink> */}
          <NavLink to="/customerLine/">
            <Box sx={style.invitbox}>
              <Stack direction="row">
                {/* <Box component='img' src={server}></Box> */}
                <Box component="img" src={customer}></Box>
                <Typography variant="body1" >
                  Agent line customer service
                </Typography>
              </Stack>
              <Stack direction="row">
                <ArrowForwardIosOutlinedIcon />
              </Stack>
            </Box>
          </NavLink>
          {/* <NavLink to="/promotion/RebateRatio/">
              <Box sx={style.invitbox}>
                <Stack direction="row">
                  <Box component="img" src={money}></Box>
                  <Typography variant="body1" >
                    Rebate ratio
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <ArrowForwardIosOutlinedIcon />
                </Stack>
              </Box>
            </NavLink> */}
          <Box sx={style.promotionBoxOuter}>
            <Box sx={style.promotionBox}>
              <Stack direction="row">
                {/* <Box component='img' src={download}></Box> */}
                <Box component="img" src={money}></Box>
                <Typography variant="body1" >
                  Promotion data
                </Typography>
              </Stack>
            </Box>
            {/* <Stack direction="row">
              <Box>
                <Typography variant="body1" >
                  {Number(Number(result?.turnover || 0) + Number(result?.today_turnover || 0))?.toFixed(2)}
                </Typography>
                <Typography variant="body1" >
                  Total Turnover
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" >
                  {result?.commission || 0}
                </Typography>
                <Typography variant="body1" >
                  Total Commission
                </Typography>
              </Box>
            </Stack> */}
            <Stack direction="row">
              <Box className= "!text-white">
              <EmojiPeopleOutlinedIcon />
                <Typography variant="body1" >
                  {result?.count || 0}
                </Typography>
                <Typography variant="body1" >
                  Direct subordinate
                </Typography>
              </Box>
              <Box className= "!text-white">
              <Groups2OutlinedIcon />
                <Typography variant="body1" >
                  {result?.teamcount || 0}
                </Typography>
                <Typography variant="body1" >
                  Team subordinates  
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Box sx={style.promotionBoxOutertwo}></Box>
        </Box>

        {openDialogBoxHomeBanner && (
          <Dialog PaperProps={{ width: "500px", height: "500px" }} open={openDialogBoxHomeBanner}>
            <div>
              <p>
                <IconButton onClick={() => setopenDialogBoxHomeBanner(false)}>
                  <CloseIcon />
                </IconButton>
              </p>
              <p>
                <img src={sunlotteryhomebanner} />
              </p>
            </div>
          </Dialog>
        )}
      </Container>
    </Layout >
  );
}

export default Promotion;

const style = {
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
  },
  commitionboxOuter: {
    width: "100%",
    backgroundImage: `url(${bgms})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    "&>img": { width: "100%", height: "100%" },
  },
  commitionbox: {
    margin: "auto",
    width: "70%",
    textAlign: "center",
    py: 5,
    "&>p:nth-child(1)": { fontSize: "25px", fontWeight: "500" },
    "&>p:nth-child(2)": {
      fontSize: "13px",
      fontWeight: "400",
      padding: "5px 0px",
      background: lightblue,
      borderRadius: "20px",
    },
    "&>p:nth-child(3)": {
      fontSize: "13px",
      fontWeight: "400",
      marginTop: "5px",
    },
  },
  subordinatesleft: {
    width: "50%",
    textAlign: "center",
    py: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: zubgtext,
    borderTopLeftRadius: "10px",
    borderRight: "2px solid black",
    "&>svg": { color: "white", fontSize: "25px", marginRight: "10px" },
    "&>p": { color: "white", fontSize: "14px", fontWeight: "500" },
  },
  subordinatesRight: {
    width: "50%",
    textAlign: "center",
    py: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: zubgtext,
    borderTopRightRadius: "10px",
    "&>svg": { color: "white", fontSize: "25px", marginRight: "10px" },
    "&>p": { color: "white", fontSize: "14px", fontWeight: "500" },
  },
  boxStyles: {
    backgroundImage: `url(${bgms1})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    padding: "30px 15px",
    display: "flex",
    borderRadius: " 0px 0px 10px 10px",
  },
  innerBoxStyles: {
    width: "50%",
    borderRight: "1px solid black",
    borderBottomLeftRadius: "10px",
    padding: "0px 0px",
  },
  innerBoxStylestwo: { width: "50%", padding: "0px 0px" },
  subcordinatelist: {
    textAlign: "center",
    "&>p:nth-child(1)": { color: lightblue, fontSize: "13px" },
    "&>p:nth-child(2)": { color: 'red', fontSize: "13px" },
    mb: 1,
  },
  subcordinateBox: {
    width: "100%",
    padding: "20px 10px",
    background: zubgback,
  },
  invitebutton: {
    width: "100%",
    background: zubgback,
  },
  invitebtn: {
    mt: "20px",
    "&>a>p": {
      width: "80%",
      marginLeft: "10%",
      borderRadius: "20px",
      textAlign: "center",
      padding: "10px",
      background: zubgtext,
      color: "white",
      fontSize: "17px",
      fontWeight: 600,
    },
  },
  invitbox: {
    width: "95%",
    background: zubggray,
    padding: "10px",
    mb: "20px",
    borderRadius: "10px",
    marginLeft: "2.5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "&>div>img": { width: "30px", marginRight: "10px" },
    "&>div>p": { fontSize: "14px", color: "white !important" },
    "&>div": { alignItems: "center" },
    "&>div:nth-child(2)>p": { marginRight: "20px", color: "white !important" },
    "&>div:nth-child(2)>svg": {
      fontSize: "14px",
      marginRight: "10px",
      color: "white !important",
    },
  },
  promotionBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "&>div:nth-child(1)": { alignItems: "center" },
    "&>div:nth-child(1)>img": { width: "35px", marginRight: "10px" },
    "&>div:nth-child(1)>p": {
      fontSize: "17px",
      fontWeight: 500,
      color: "white !important",
    },
  },
  promotionBoxOuter: {
    width: "95%",
    background: lightgreen,
    padding: "10px",
    mt: "20px",
    borderRadius: "5px",
    marginLeft: "2.5%",
    paddingBottom: "15px",
    "&>div:nth-child(2)>div:nth-child(1)": {
      my: "10px",
      borderRight: "1px solid gray",
      width: "50%",
      textAlign: "center",
    },
    "&>div:nth-child(2)>div:nth-child(2)": {
      my: "10px",
      width: "50%",
      textAlign: "center",
    },
    "&>div:nth-child(2)>div>p:nth-child(1)": { color: "white !important" },
    "&>div:nth-child(2)>div>p:nth-child(2)": {
      fontSize: "13px",
      fontWeight: 500,
      color: "white !important",
    },
    "&>div:nth-child(3)>div:nth-child(1)": {
      my: "10px",
      borderRight: "1px solid #ff00001f",
      width: "50%",
      textAlign: "center",
    },
    "&>div:nth-child(3)>div:nth-child(2)": {
      my: "10px",
      width: "50%",
      textAlign: "center",
    },
    "&>div:nth-child(3)>div>p:nth-child(1)": { color: "white !important" },
    "&>div:nth-child(3)>div>p:nth-child(2)": {
      fontSize: "13px",
      fontWeight: 500,
      color: "white !important",
    },
  },
  promotionBoxOutertwo: {
    width: "90%",
    background: zubgback,
    padding: "10px",
    borderRadius: "5px",
    marginLeft: "5%",
    paddingBottom: "70px",
  },
};
