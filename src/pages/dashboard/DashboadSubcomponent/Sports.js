import { Box, Typography } from "@mui/material";
import React from "react";
import { zubgmid, zubgshadow, zubgwhite } from "../../../Shared/color";
import kind from "../../../assets/images/psd1 (2).png";
import wingobg from '../../../assets/images/wingo1.png';


const Original = () => {
 
  return (
    <Box>
      <Box sx={style.root}>
        <Box sx={style.roottwo} >
          <Box sx={{ width: "70%", height: "100%", position: 'relative' }}>
            <Box sx={{
              position: 'absolute', top: 0, left: '0', width: '100%', height: '100%', borderRadius: '10px 0px 0px 10px',
            }}>
              <Box component='img' src={wingobg} sx={{ width: '100%', height: '100%', borderRadius: '10px 0px 0px 10px', }}></Box>
            </Box>
            <Box sx={style.titleBox}>
              <Box>
                <Typography variant="body1" color="initial" sx={style.title} className="!text-4xl">
                  Cricket
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "30%", height: "100%" }}>
            <Box component="img" sx={style.imgtwo} src={kind}></Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Original;

const style = {
  root: {
    width: "95%",
    marginLeft: "2.5%",
    background: zubgwhite,
    boxShadow: zubgshadow,
    marginTop: "20px",
    padding: "1px 10px 10px 10px",
    borderRadius: "10px",
  },
  roottwo: {
    mt: "10px",
    width: "100%",
    height: "12vh",
    background: zubgmid,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  titleBox: {
    width: "100%",
    padding: "10px 0px 0px 10px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: 'relative',
  },

  title: {
    lineHeight: "1.5",
    textAlign: "start",
    color: "white",
    fontSize: "45px",
    fontWeight: "900 !important",
    fontFamily: "Trade Winds !important",

  },
  imgtwo: { width: "100%", height: "100%", borderRadius: "0px 10px 10px 0px", filter: 'brightness(0.5)', },
  imgone: { width: "100%", height: "100%", borderRadius: "0px 0px 0px 10px" },
  textone: { color: "white", fontSize: "13px" },
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
