import { Box, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import homeact from '../../../../assets/images/home (3).png';
import home from '../../../../assets/images/home (2).png';
import promotionact from '../../../../assets/images/fevicon.jpg';
import promotion from '../../../../assets/images/fevicon.jpg';
import puzzleact from '../../../../assets/images/activity.png';
import puzzle from '../../../../assets/images/activity (1).png';
import tabBarBg from '../../../../assets/images/tabBarBg-301df93c.png';
import useract from '../../../../assets/images/user (6).png';
import user from '../../../../assets/images/user (7).png';
import walletact from '../../../../assets/images/wallet (5).png';
import wallet from '../../../../assets/images/wallet (4).png';
import { lightgrelightgreen, en, zubgback, zubgmid, zubgtext, lightgreen } from "../../../../Shared/color";
import HomeIcon from '@mui/icons-material/Home';
import ExtensionIcon from '@mui/icons-material/Extension';
import WalletIcon from '@mui/icons-material/Wallet';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';


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
            {location.pathname == "/dashboard" && <HomeIcon sx={{ color: 'red' }} />}
            {location.pathname !== "/dashboard" && <HomeIcon sx={{ color: lightgreen }} />}
            {location.pathname == "/dashboard" && <Typography variant="body1" sx={style.text}>
              Home
            </Typography>
            }
            {location.pathname !== "/dashboard" && <Typography variant="body1" sx={style.text1}>
              Home
            </Typography>
            }

          </Box>
          <Box sx={style.nav} onClick={() => navigate("/activity")}>
            {location.pathname == "/activity" && <ExtensionIcon sx={{ color: 'red' }} />}
            {location.pathname !== "/activity" && <ExtensionIcon sx={{ color: lightgreen }} />}
            {location.pathname == "/activity" && <Typography variant="body1" sx={style.text}>
              Activity
            </Typography>
            }
            {location.pathname !== "/activity" && <Typography variant="body1" sx={style.text1}>
              Activity
            </Typography>
            }
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
            {location.pathname == "/wallet" && <WalletIcon sx={{ color: 'red' }} />}
            {location.pathname !== "/wallet" && <WalletIcon sx={{ color: lightgreen }} />}
            {location.pathname == "/wallet" && <Typography variant="body1" sx={style.text}>
              Wallet
            </Typography>
            }
            {location.pathname !== "/wallet" && <Typography variant="body1" sx={style.text1}>
              Wallet
            </Typography>
            }
          </Box>
          <Box sx={style.nav} onClick={() => navigate("/account")}>
            {location.pathname == "/account" && <ContactEmergencyIcon sx={{ color: 'red' }} />}
            {location.pathname !== "/account" && <ContactEmergencyIcon sx={{ color: lightgreen }} />}
            {location.pathname == "/account" && <Typography variant="body1" sx={style.text}>
              Account
            </Typography>
            }
            {location.pathname !== "/account" && <Typography variant="body1" sx={style.text1}>
              Account
            </Typography>
            }
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
  text1: { fontSize: "13px", fontWeight: 500, color: lightgreen, },
  stack: { alignItems: "end", justifyContent: "space-between", },
  nav: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};
