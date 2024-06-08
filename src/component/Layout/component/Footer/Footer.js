import { Box, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import homeact from '../../../../assets/images/home (3).png';
import home from '../../../../assets/images/home (2).png';
import promotionact from '../../../../assets/images/diamond (4).png';
import promotion from '../../../../assets/images/diamond (6).png';
import puzzleact from '../../../../assets/images/activity.png';
import puzzle from '../../../../assets/images/activity (1).png';
import tabBarBg from '../../../../assets/images/tabBarBg-301df93c.png';
import useract from '../../../../assets/images/user (6).png';
import user from '../../../../assets/images/user (7).png';
import walletact from '../../../../assets/images/wallet (5).png';
import wallet from '../../../../assets/images/wallet (4).png';
import { zubgback, zubgmid, zubgtext } from "../../../../Shared/color";


function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "0px",
        width: "100%",
        backgroundColor: 'transparent',
      }}
    >
      <Box sx={style.root}>
        <Stack direction="row" sx={style.stack}>
          <Box sx={style.nav} onClick={() => navigate("/dashboard")}>
            {location.pathname == "/dashboard" && <Box component='img' src={homeact} width={25} />}
            {location.pathname !== "/dashboard" && <Box component='img' src={home} width={25} />}
            <Typography variant="body1" sx={style.text}>
              Home
            </Typography>
          </Box>
          <Box sx={style.nav} onClick={() => navigate("/activity")}>
            {location.pathname == "/activity" && <Box component='img' src={puzzleact} width={25} />}
            {location.pathname !== "/activity" && <Box component='img' src={puzzle} width={25} />}
            <Typography variant="body1" sx={style.text}>
              Activity
            </Typography>
          </Box>
          <Box sx={style.nav} onClick={() => navigate("/promotion")}>
            <Box sx={{ position: 'relative', width: '100%' }}>
              <Box className='promotion' sx={{
                width: '55px',
                height: '55px',
                background: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #F02257',
                position: ' absolute',
                top: ' -62px',
                left: '12px',
              }}>
                {location.pathname == "/promotion" && <Box component='img' src={promotionact} width={35} />}
                {location.pathname !== "/promotion" && <Box component='img' src={promotion} width={35} />}
              </Box>
            </Box>
            <Typography variant="body1" sx={style.text}>
              Promotion
            </Typography>
          </Box>
          <Box onClick={() => navigate("/wallet")} sx={style.nav}>
            {location.pathname == "/wallet" && <Box component='img' src={walletact} width={25} />}
            {location.pathname !== "/wallet" && <Box component='img' src={wallet} width={25} />}
            <Typography variant="body1" sx={style.text}>
              Wallet
            </Typography>
          </Box>
          <Box sx={style.nav} onClick={() => navigate("/account")}>
            {location.pathname == "/account" && <Box component='img' src={useract} width={25} />}
            {location.pathname !== "/account" && <Box component='img' src={user} width={25} />}
            <Typography variant="body1" sx={style.text}>
              Account
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default Footer;

const style = {
  root: {
    backgroundImage: `url(${tabBarBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '70px',
    borderRadius: "10px 10px 0px 0px",
    padding: "22px 20px 0px 20px",
    maxWidth: "575px",
    margin: "auto",
  },
  icon: { fontSize: "25px", "&>path": { color: "white !important" } },
  text: { fontSize: "13px", fontWeight: 500, color: zubgtext, },
  stack: { alignItems: "end", justifyContent: "space-between", },
  nav: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};
