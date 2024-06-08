import { Box, Typography, hexToRgb } from "@mui/material";
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
import toast from "react-hot-toast";



const Lottery = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ transition: '0.3s !important' }}>
      <Box sx={style.root}>
        <Box sx={style.roottwo} component={NavLink} to={"/win"}>
          <Box sx={{ background: 'white', width: "100%", height: "100%", borderRadius: '10px', backgroundImage: `url(${kind})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>
            <Box sx={{ width: "100%", height: "100%", position: 'relative', }}>
              <Box sx={style.titleBox}>
                <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body1" color="initial" className="gametitle">
                    <Box component='img' style={{ width: '130px', height: '36px' }} src='https://see.fontimg.com/api/renderfont4/OVGwe/eyJyIjoiZnMiLCJoIjo2MSwidyI6MTI1MCwiZnMiOjQ5LCJmZ2MiOiIjRjVGMkYyIiwiYmdjIjoiIzAwMDAwMCIsInQiOjF9/V2luZ28/sportypo-reguler.png' />
                  </Typography>
                </Box>
              </Box>
              <Box component='img' src={frame} sx={{
                width: '100%', height: '25%', position: 'absolute', zIndex: '100', top: '76%', opacity: '1', width: '40%', right: '-1px', borderRadius: '0px 0px 13px 0px',
              }}></Box>
            </Box>
          </Box>
        </Box>
        <Box sx={style.roottwo} component={NavLink} onClick={() => toast("Comming Soon !")}>
          <Box sx={{ background: 'white', width: "100%", height: "100%", borderRadius: '10px', backgroundImage: `url(${kind})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>
            <Box sx={{ width: "100%", height: "100%", position: 'relative', }}>

              <Box sx={style.titleBox}>
                <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body1" color="initial" className="gametitle">
                    <Box component='img' style={{ width: '110px', height: '25px' }} src='https://see.fontimg.com/api/renderfont4/lg83d/eyJyIjoiZnMiLCJoIjo2MSwidyI6MTI1MCwiZnMiOjQ5LCJmZ2MiOiIjRjVGMkYyIiwiYmdjIjoiIzAwMDAwMCIsInQiOjF9/SzMgTG90dGVyeQ/omega-flight-italic.png' />
                  </Typography>
                </Box>
              </Box>
              <Box component='img' src={frame} sx={{
                width: '100%', height: '25%', position: 'absolute', zIndex: '100', top: '76%', opacity: '1', width: '40%', right: '-1px', borderRadius: '0px 0px 13px 0px',
              }}></Box>
            </Box>
          </Box>
        </Box>
        <Box sx={style.roottwo} component={NavLink} onClick={() => toast("Comming Soon !")}>
          <Box sx={{ background: 'white', width: "100%", height: "100%", borderRadius: '10px', backgroundImage: `url(${kind})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>
            <Box sx={{ width: "100%", height: "100%", position: 'relative', }}>

              <Box sx={style.titleBox}>
                <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body1" color="initial" className="gametitle">
                    <Box component='img' style={{ width: '110px', height: '25px' }} src='https://see.fontimg.com/api/renderfont4/ZV5gz/eyJyIjoiZnMiLCJoIjo2MSwidyI6MTI1MCwiZnMiOjQ5LCJmZ2MiOiIjRjVGMkYyIiwiYmdjIjoiIzAwMDAwMCIsInQiOjF9/NWQgTG90dGVyeQ/azn-unified-oblique.png' />
                  </Typography>
                </Box>
              </Box>
              <Box component='img' src={frame} sx={{
                width: '100%', height: '25%', position: 'absolute', zIndex: '100', top: '76%', opacity: '1', width: '40%', right: '-1px', borderRadius: '0px 0px 13px 0px',
              }}></Box>
            </Box>
          </Box>
        </Box>
        <Box sx={style.roottwo} component={NavLink} to={"/trx"}>
          <Box sx={{ background: 'white', width: "100%", height: "100%", borderRadius: '10px', backgroundImage: `url(${kind})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>
            <Box sx={{ width: "100%", height: "100%", position: 'relative', }}>

              <Box sx={style.titleBox}>
                <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body1" color="initial" className="gametitle">
                    <Box component='img' style={{ width: '110px', height: '20px' }} src='https://see.fontimg.com/api/renderfont4/3zn93/eyJyIjoiZnMiLCJoIjo2MSwidyI6MTI1MCwiZnMiOjQ5LCJmZ2MiOiIjRjVGMkYyIiwiYmdjIjoiIzAwMDAwMCIsInQiOjF9/VFJYIFdJTg/pilot-command.png' />
                  </Typography>
                </Box>
              </Box>
              <Box component='img' src={frame} sx={{
                width: '100%', height: '25%', position: 'absolute', zIndex: '100', top: '76%', opacity: '1', width: '40%', right: '-1px', borderRadius: '0px 0px 13px 0px',
              }}></Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Lottery;

const style = {
  root: {
    width: "95%",
    marginLeft: "2.5%",
    background: zubgwhite,
    boxShadow: zubgshadow,
    marginTop: "20px",
    padding: "1px 10px 10px 10px",
    borderRadius: "10px",
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  roottwo: {
    width: "49%",
    height: "14vh",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mt: '10px',
    position: 'relative;'
  },

  titleBox: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: '10px'
  },

  imgtwo: { width: "100%", height: "100%", borderRadius: "0px 10px 10px 0px", filter: 'brightness(0.5)', },
  imgone: { width: "100%", height: "100%", borderRadius: "0px 0px 0px 10px" },
  textone: { color: 'white', fontSize: "11px" },
  texttow: { color: "white", fontSize: "10px", mr: "5px" },
  btmbox: {
    width: "100%",
    height: "45%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
  },
};



{/* <Box component='img' src={frame} sx={{ position: 'absolute', width: '80px', top: '-7%', right: '0%' }}></Box>
<Box component='img' src={playbtn} sx={{ position: 'absolute', width: '80px', top: '-2%', left: '4%', borderRadius: '5px' }}></Box> */}