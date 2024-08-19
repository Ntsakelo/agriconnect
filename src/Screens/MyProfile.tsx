import { Grid } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "../Components/Manage/Navbar";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import InventoryIcon from '@mui/icons-material/Inventory';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import {ThemeProvider} from "@mui/material/styles";
import { Theme } from "../Helpers/Theme";
import { Connections } from "./Connections";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const MyProfile = () => {
  const [value,setValue] = useState(0);
  const navigate = useNavigate();
    function stringAvatar(name: string) {
        return {
          sx: {
            bgcolor: '#fff',
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }
      
  return (
    <ThemeProvider theme={Theme}>

    <div className="main-container myProfile-container">
      <Grid container>
        <Grid item xs={12} sm={3} md={3}>
          <div className="logo-container">
            <img
              src={`${process.env.PUBLIC_URL}/logo.svg`}
              alt=""
              className="logo"
              id="logo"
            />
          </div>
        </Grid>
        <Grid item xs={12} id="profile-info-container">
          <div className="profile-info">
            <div className="background-image">
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CameraAltIcon />}
                id="upload-button"
              >
                Edit photo
                <VisuallyHiddenInput type="file" />
              </Button>
              <img
                src={`${process.env.PUBLIC_URL}/background-image.jpg`}
                alt=""
                className="background-display"
                id="background-display"
              />
            </div>
            <div className="profile-photo">
            <Stack direction="row" spacing={2}>
      <Avatar {...stringAvatar('Kent Dodds')}  id="profile-avatar"/>
      <p className="business-profile-name">ANM POULTRY</p>
    </Stack>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} id="profile-actions-container">
            <div className="profile-actions">
               {/* <Grid container>
                 <Grid item xs={4} sx={{zIndex:100}}>
                    <Tooltip title="connections">
                    <Badge badgeContent={200} color="primary">
                    <Link to="/myProfile/connections" id="connections-link"><ConnectWithoutContactIcon className="link-icon"/></Link>
                    </Badge>    
                    </Tooltip>
                 </Grid>
                 <Grid item xs={4} sx={{zIndex:100}}>
                    <Tooltip title="products">
                    <Badge badgeContent={40} color="primary">
                    <Link to="/myProfile/products" id="products-link"><InventoryIcon className="link-icon"/></Link>     
                    </Badge>    

                    </Tooltip>
                 </Grid>
                 <Grid item xs={4} sx={{zIndex:100}}>
                    <Tooltip title="quotations">
                     <Badge badgeContent={10} color="primary">
                    <Link to="" id="quotes-link"><RequestQuoteIcon className="link-icon"/></Link>
                     </Badge>   
                    </Tooltip>
                 </Grid>
               </Grid> */}
                  {/* <Box sx={{ width:'100%' }}> */}
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction onClick={() => navigate('/myProfile/connections')} label="Connections" icon={<ConnectWithoutContactIcon />} />
        <BottomNavigationAction onClick={() => navigate('/myProfile/products')} label="Products" icon={<InventoryIcon />} />
        <BottomNavigationAction onClick={() => navigate('/myProfile/quotations')} label="Quotes" icon={<RequestQuoteIcon />} />
      </BottomNavigation> 
    {/* </Box> */}
            </div>
        </Grid>
        <Grid item xs={12} id="content-display-container">
            <div className="content-display">
                  <Outlet />
            </div>
        </Grid>
      </Grid>
    </div>
    </ThemeProvider>
  );
};
