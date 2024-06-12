import { Box, Button, Stack, Typography, hexToRgb } from "@mui/material";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { zubgback, zubgbackgrad, zubgmid, zubgshadow, zubgtext, zubgwhite } from "../../../Shared/color";
import go from "../../../assets/images/go.png";
import scr1 from '../../../assets/images/src1.png';
import wingobg from '../../../assets/images/wingo1.png';
import scr2 from '../../../assets/images/src2.png';
import scr3 from '../../../assets/images/src3.png';
import scr4 from '../../../assets/images/src4.png';
import epicWin from "../../../assets/images/psd1 (2).png";
import playbtn from "../../../assets/images/play.png";
import kind from "../../../assets/images/frame.jpg";
import frame from "../../../assets/images/playnow.png";
import pr0 from "../../../assets/images/0.png";
import pr11 from "../../../assets/images/11.png";
import pr22 from "../../../assets/images/22.png";
import pr33 from "../../../assets/images/33.png";
import pr4 from "../../../assets/images/4.png";
import pr5 from "../../../assets/images/5.png";
import pr6 from "../../../assets/images/6.png";
import pr7 from "../../../assets/images/7.png";
import pr8 from "../../../assets/images/8.png";
import pr9 from "../../../assets/images/9.png";
import wingo from "../../../assets/images/win1/wingo.png";
import k3 from "../../../assets/images/win1/k3.png";
import d5 from "../../../assets/images/win1/d5.png";
import trx from "../../../assets/images/win1/trx.png";
import daman from "../../../assets/images/win1/daman-lottery_background.png";
import toast from "react-hot-toast";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



const Lottery = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ transition: '0.3s !important' }}>
      <Box sx={style.root}>
        <Stack direction='row' justifyContent='space-between' sx={{ width: '100%', flexWrap: 'wrap' }}>
          <Box component={NavLink} to={"/win"} sx={{ width: '49%', mt: 1, minHeight: '25vh', borderRadius: '10px', position: 'relative', padding: '30px 0px', backgroundImage: `url(${daman})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>
            <Typography variant="body1" sx={{ textAlign: 'center', fontSize: '23px', fontWeight: '600', color: 'white' }}>Win Go</Typography>
            <Box component='img' src={wingo} sx={{ width: '130px', height: '130px', margin: 'auto' }}></Box>
            <Button className="Gobtn">Go  <ArrowForwardIosIcon ml={1} /></Button>
          </Box>
          <Box component={NavLink} onClick={() => toast("Comming Soon !")} sx={{ width: '49%', mt: 1, minHeight: '25vh', borderRadius: '10px', position: 'relative', padding: '30px 0px', backgroundImage: `url(${daman})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>
            <Typography variant="body1" sx={{ textAlign: 'center', fontSize: '23px', fontWeight: '600', color: 'white' }}>K3 Lottery</Typography>
            <Box component='img' src={k3} sx={{ width: '130px', height: '130px', margin: 'auto' }}></Box>
            <Button className="Gobtn">Go  <ArrowForwardIosIcon ml={1} /></Button>
          </Box>
          <Box component={NavLink} onClick={() => toast("Comming Soon !")} sx={{ width: '49%', mt: 1, minHeight: '25vh', borderRadius: '10px', position: 'relative', padding: '30px 0px', backgroundImage: `url(${daman})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>
            <Typography variant="body1" sx={{ textAlign: 'center', fontSize: '23px', fontWeight: '600', color: 'white' }}>5D Lottery</Typography>
            <Box component='img' src={d5} sx={{ width: '130px', height: '130px', margin: 'auto' }}></Box>
            <Button className="Gobtn">Go  <ArrowForwardIosIcon ml={1} /></Button>
          </Box>
          <Box component={NavLink} to={"/trx"} sx={{ width: '49%', mt: 1, minHeight: '25vh', borderRadius: '10px', position: 'relative', padding: '30px 0px', backgroundImage: `url(${daman})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>
            <Typography variant="body1" sx={{ textAlign: 'center', fontSize: '23px', fontWeight: '600', color: 'white' }}>TRX</Typography>
            <Box component='img' src={trx} sx={{ width: '130px', height: '130px', margin: 'auto' }}></Box>
            <Button className="Gobtn">Go  <ArrowForwardIosIcon ml={1} /></Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Lottery;

const style = {
  root: {
    width: "100%",
    marginTop: "20px",
    padding: "1px 10px 10px 10px",
    borderRadius: "10px",
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between'
  },


  titleBox: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: '10px'
  },

};



{/* <Box component='img' src={frame} sx={{ position: 'absolute', width: '80px', top: '-7%', right: '0%' }}></Box>
<Box component='img' src={playbtn} sx={{ position: 'absolute', width: '80px', top: '-2%', left: '4%', borderRadius: '5px' }}></Box> */}