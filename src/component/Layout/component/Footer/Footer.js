import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import ExtensionIcon from '@mui/icons-material/Extension';
import home from '../../../../assets/images/new/download.png'
import activity from '../../../../assets/images/new/download (1).png'
import activitya from '../../../../assets/images/new/download (4).png'
import account from '../../../../assets/images/new/download (2).png'
import accounta from '../../../../assets/images/new/download (5).png'
import accountb from '../../../../assets/images/new/download (3).png'
import accountba from '../../../../assets/images/new/download (6).png'
import promotion from '../../../../assets/images/new/promotion.0d68fcd8d72cf383fa0e.png'
import WalletIcon from '@mui/icons-material/Wallet';
import { Box, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import tabBarBg from '../../../../assets/images/new/footer.3efc1714802b4ec761ca.png';
import { lightgreen, } from "../../../../Shared/color";
import theme from '../../../../utils/theme';


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
        zIndex: 10000,
      }}
    >
      <Box sx={style.root}>
        <Stack direction="row" sx={style.stack}>
          <Box sx={style.nav} onClick={() => navigate("/dashboard")}>
            {location.pathname === "/dashboard" && <Box component={'img'} src={home} sx={{ filter: 'hue-rotate(45deg)', width: '20px' }}></Box>}
            {location.pathname !== "/dashboard" && <Box component={'img'} src={home} sx={{ filter: 'grayscale(1)', width: '20px' }}></Box>}
            {location.pathname === "/dashboard" && <Typography variant="body1" sx={style.text}>
              Home
            </Typography>
            }
            {location.pathname !== "/dashboard" && <Typography variant="body1" sx={style.text1}>
              Home
            </Typography>
            }

          </Box>
          <Box sx={style.nav} onClick={() => navigate("/activity")}>
            {location.pathname === "/activity" && <Box component={'img'} src={activitya} sx={{ filter: 'hue-rotate(45deg)', width: '20px' }}></Box>}
            {location.pathname !== "/activity" && <Box component={'img'} src={activity} sx={{ filter: 'grayscale(1)', width: '20px' }}></Box>}
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
                // background: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // border: '1px solid #F02257',
                position: ' absolute',
                top: ' -62px',
                left: '12px',
              }}>
                {location.pathname === "/promotion" && <Box component='img' src={promotion} sx={{ width: '100%', filter: 'hue-rotate(45deg)' }} />}
                {location.pathname !== "/promotion" && <Box component='img' src={promotion} sx={{ width: '100%', filter: 'hue-rotate(45deg)' }} />}
              </Box>
            </Box>
            <Typography variant="body1" sx={{ ...style.text, ml: '5px' }}>
              Promotion
            </Typography>
          </Box>
          <Box onClick={() => navigate("/wallet")} sx={style.nav}>
            {location.pathname === "/wallet" && <Box component={'img'} src={accounta} sx={{ filter: 'hue-rotate(45deg)', width: '20px' }}></Box>}
            {location.pathname !== "/wallet" && <Box component={'img'} src={account} sx={{ filter: 'grayscale(1)', width: '20px' }}></Box>}
            {location.pathname === "/wallet" && <Typography variant="body1" sx={style.text}>
              Wallet
            </Typography>
            }
            {location.pathname !== "/wallet" && <Typography variant="body1" sx={style.text1}>
              Wallet
            </Typography>
            }
          </Box>
          <Box sx={style.nav} onClick={() => navigate("/account")}>
            {location.pathname === "/account" && <Box component={'img'} src={accountba} sx={{ filter: 'hue-rotate(45deg)', width: '20px' }}></Box>}
            {location.pathname !== "/account" && <Box component={'img'} src={accountb} sx={{ filter: 'grayscale(1)', width: '20px' }}></Box>}
            {location.pathname === "/account" && <Typography variant="body1" sx={style.text}>
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
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '70px',
    borderRadius: "10px 10px 0px 0px",
    padding: "15px 10px 3px 10px",
    maxWidth: "400px",
    margin: "auto",
  },
  icon: { fontSize: "25px", "&>path": { color: "white !important" } },
  text: { fontSize: "13px", fontWeight: 500, color: theme.palette.secondary.dark, },
  text1: { fontSize: "13px", fontWeight: 500, color: theme.palette.secondary.light, },
  stack: { alignItems: "end", justifyContent: "space-between", width: '100%', height: '100%' },
  nav: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};
