import StartIcon from '@mui/icons-material/ArrowRightAlt';
import CasinoIcon from '@mui/icons-material/Casino';
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { NavLink } from 'react-router-dom';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import d5 from '../../../assets/images/5d.png';
import k3 from '../../../assets/images/k3.png';
import trx from '../../../assets/images/trx.png';
import wingo from '../../../assets/images/wingo.png';
import { lightblue, zubgtext } from '../../../Shared/color';
import { MyStatusFn } from '../../../services/apicalling';
import { useQuery } from 'react-query';

function Lottery() {
  const {data } = useQuery(
    ["get_status"],
    () => MyStatusFn(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  );
  const result = data?.data?.data

  return (
    <Box >
      <Box sx={{ mt: 3 }}>
        <Stack direction='row' alignItems='center'>
          <Typography variant="body1" mr={1}>      <CasinoIcon /></Typography>
          <Typography variant="h6" sx={style.headertitle}> Wingo</Typography>
        </Stack>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '95%', margin: 'auto', }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...style.gamemenubox }}>
            <Box sx={{ ...style.gameimgbox }}>
              <Box component='img' src={wingo} sx={{ ...style.gameimg }}></Box>
            </Box>
            <Box sx={{ ...style.gamenamebox }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                <Typography variant="h6" sx={{ fontWeight: '600' }} >Win Go</Typography>
                <Button component={NavLink} to={result?.find((i)=>i?.title ==="wingo_status")?.longtext !=="0" && '/win'} variant="text" color="primary" sx={{ ...style.playbutton }}> Go <StartIcon ml={2} /></Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1, ...style.maxwin }}>
                <Typography variant="body2" sx={{ fontSize: '11px', }} >The Highest Bounus in history</Typography>
                <Typography variant="body2" sx={{ fontSize: '14px', color: 'black', fontWeight: '600' }} >98456.66</Typography>
              </Box>
              <Box sx={{}}>
                <Typography variant="body2" sx={{ fontSize: '11px', }} >Through the platform Win Go Hash Games seed as the result of the Games
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...style.gamemenubox }}>
            <Box sx={{ ...style.gameimgbox }}>
              <Box component='img' src={k3} sx={{ ...style.gameimg }}></Box>
            </Box>
            <Box sx={{ ...style.gamenamebox }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                <Typography variant="h6" sx={{ fontWeight: '600' }} >K3</Typography>
                <Button variant="text" color="primary" sx={{ ...style.playbutton }}> Go <StartIcon ml={2} /></Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1, ...style.maxwin }}>
                <Typography variant="body2" sx={{ fontSize: '11px', }} >The Highest Bounus in history</Typography>
                <Typography variant="body2" sx={{ fontSize: '14px', color: 'black', fontWeight: '600' }} >98456.66</Typography>
              </Box>
              <Box sx={{}}>
                <Typography variant="body2" sx={{ fontSize: '11px', }} >The player predicts 3 DICE numbers, the winning rate is high,the gameplay is simple, and it is easy to win
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...style.gamemenubox }}>
            <Box sx={{ ...style.gameimgbox }}>
              <Box component='img' src={d5} sx={{ ...style.gameimg }}></Box>
            </Box>
            <Box sx={{ ...style.gamenamebox }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                <Typography variant="h6" sx={{ fontWeight: '600' }} >5D</Typography>
                <Button variant="text" color="primary" sx={{ ...style.playbutton }}> Go <StartIcon ml={2} /></Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1, ...style.maxwin }}>
                <Typography variant="body2" sx={{ fontSize: '11px', }} >The Highest Bounus in history</Typography>
                <Typography variant="body2" sx={{ fontSize: '14px', color: 'black', fontWeight: '600' }} >98456.66</Typography>
              </Box>
              <Box sx={{}}>
                <Typography variant="body2" sx={{ fontSize: '11px', }} >5 numbers are used as the result of the Games, and the palying methods are flexible and diverse

                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...style.gamemenubox }}>
            <Box sx={{ ...style.gameimgbox }}>
              <Box component='img' src={trx} sx={{ ...style.gameimg }}></Box>
            </Box>
            <Box sx={{ ...style.gamenamebox }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                <Typography variant="h6" sx={{ fontWeight: '600' }} >TRX</Typography>
                <Button component={NavLink} to={result?.find((i)=>i?.title ==="trx_status")?.longtext !=="0" && '/trx'} variant="text" color="primary" sx={{ ...style.playbutton }}> Go <StartIcon ml={2} /></Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1, ...style.maxwin }}>
                <Typography variant="body2" sx={{ fontSize: '11px', }} >The Highest Bounus in history</Typography>
                <Typography variant="body2" sx={{ fontSize: '14px', color: 'black', fontWeight: '600' }} >98456.66</Typography>
              </Box>
              <Box sx={{}}>
                <Typography variant="body2" sx={{ fontSize: '11px', }} >By obtaining the real-time hash value of the TRX blockchain as the result of the Games
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Lottery;

const style = {
  headertitle: { color: zubgtext },
  winbox: {
    background: "#e9e9e9",
    borderRadius: "20px",
    height: "160px",
    marginBottom: "30px",
    position: "relative",
    boxShadow: "0 0.05333rem 0.10667rem #c5c5da42",
  },
  positiongame: {
    position: "absolute",
    top: "10px",
    left: "20px",
    "&>div>p": { fontSize: "12px", fontWeight: 400, color: "white" },
  },
  gameheading: { fontSize: "20px", fontWeight: 700, color: "white" },
  gamemenubox: { padding: '8px 5px', background: lightblue, mt: 2, borderRadius: '10px', width: '100%' },
  gameimgbox: { width: '25%', borderRadius: '10px', height: '16vh' },
  gameimg: { width: '100%', borderRadius: '10px', height: '100%', objectFit: 'cover' },
  gamenamebox: { width: '70%', },
  playbutton: { background: zubgtext, color: 'white', fontWeight: '900', fontSize: "13px", padding: '5px 30px' },
  maxwin: { background: 'white', padding: '2px 5px 2px 5px', borderRadius: '5px' },
};










// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { Box, Button, Stack, Typography } from "@mui/material";
// import React from "react";
// import toast from "react-hot-toast";
// import { NavLink, useNavigate } from "react-router-dom";
// import d5 from "../../../assets/images/win1/d5.png";
// import daman from "../../../assets/images/win1/daman-lottery_background.png";
// import k3 from "../../../assets/images/win1/k3.png";
// import trx from "../../../assets/images/win1/trx.png";
// import wingo from "../../../assets/images/win1/wingo.png";



// const Lottery = () => {
//   const navigate = useNavigate();

//   return (
//     <Box sx={{ transition: '0.3s !important' }}>
//       <Box sx={style.root}>
//         <Stack direction='row' justifyContent='space-between' sx={{ width: '100%', flexWrap: 'wrap' }}>
//           <Box component={NavLink} to={"/win"} sx={{ width: '49%', mt: 1, minHeight: '25vh', borderRadius: '10px', position: 'relative', padding: '30px 0px', backgroundImage: `url(${daman})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>
//             <Typography variant="body1" sx={{ textAlign: 'center', fontSize: '23px', fontWeight: '600', color: 'white' }}>Win Go</Typography>
//             <Box component='img' src={wingo} sx={{ width: '130px', height: '130px', margin: 'auto' }}></Box>
//             <Button className="Gobtn">Go  <ArrowForwardIosIcon ml={1} /></Button>
//           </Box>
//           <Box component={NavLink} onClick={() => toast("Comming Soon !")} sx={{ width: '49%', mt: 1, minHeight: '25vh', borderRadius: '10px', position: 'relative', padding: '30px 0px', backgroundImage: `url(${daman})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>
//             <Typography variant="body1" sx={{ textAlign: 'center', fontSize: '23px', fontWeight: '600', color: 'white' }}>K3 Lottery</Typography>
//             <Box component='img' src={k3} sx={{ width: '130px', height: '130px', margin: 'auto' }}></Box>
//             <Button className="Gobtn">Go  <ArrowForwardIosIcon ml={1} /></Button>
//           </Box>
//           <Box component={NavLink} onClick={() => toast("Comming Soon !")} sx={{ width: '49%', mt: 1, minHeight: '25vh', borderRadius: '10px', position: 'relative', padding: '30px 0px', backgroundImage: `url(${daman})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>
//             <Typography variant="body1" sx={{ textAlign: 'center', fontSize: '23px', fontWeight: '600', color: 'white' }}>5D Lottery</Typography>
//             <Box component='img' src={d5} sx={{ width: '130px', height: '130px', margin: 'auto' }}></Box>
//             <Button className="Gobtn">Go  <ArrowForwardIosIcon ml={1} /></Button>
//           </Box>
//           <Box component={NavLink} to={"/trx"} sx={{ width: '49%', mt: 1, minHeight: '25vh', borderRadius: '10px', position: 'relative', padding: '30px 0px', backgroundImage: `url(${daman})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>
//             <Typography variant="body1" sx={{ textAlign: 'center', fontSize: '23px', fontWeight: '600', color: 'white' }}>TRX</Typography>
//             <Box component='img' src={trx} sx={{ width: '130px', height: '130px', margin: 'auto' }}></Box>
//             <Button className="Gobtn">Go  <ArrowForwardIosIcon ml={1} /></Button>
//           </Box>
//         </Stack>
//       </Box>
//     </Box>
//   );
// };

// export default Lottery;

// const style = {
//   root: {
//     width: "100%",
//     marginTop: "20px",
//     padding: "1px 10px 10px 10px",
//     borderRadius: "10px",
//     display: 'flex',
//     flexWrap: 'wrap',
//     alignItems: 'center',
//     justifyContent: 'space-between'
//   },


//   titleBox: {
//     width: "100%",
//     height: "100%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderRadius: '10px'
//   },

// };



// {/* <Box component='img' src={frame} sx={{ position: 'absolute', width: '80px', top: '-7%', right: '0%' }}></Box>
// <Box component='img' src={playbtn} sx={{ position: 'absolute', width: '80px', top: '-2%', left: '4%', borderRadius: '5px' }}></Box> */}