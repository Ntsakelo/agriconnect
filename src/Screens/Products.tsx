import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { QuotesDialog } from "../Components/Quotes/QuotesDialog";
import { useState, useEffect, Fragment } from "react";
import { AddProdDialog } from "../Components/Products/AddProdDialog";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


export const Products = () => {
   const [isMyProfile, setIsMyProfile] = useState<boolean>();
   const [open, setOpen] = useState(false);
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const openAnchor = Boolean(anchorEl);
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
     setAnchorEl(event.currentTarget);
   };
   const handleClickClose = () => {
     setAnchorEl(null);
   };

   const handleClickOpen = () => {
     setOpen(true);
   };
   const handleClose = () => {
     setOpen(false);
   };
 
   useEffect(() => {
     if(window.location.pathname === '/myProfile/products'){
      setIsMyProfile(true);
     }else{
      setIsMyProfile(false);
     }
   },[])
  return (
    <div className="main-container stacked-top">
 
      <Grid container >
       
      <Grid item xs={12} sx={{zIndex:100,marginBottom:'30px'}}>
        {!isMyProfile && <QuotesDialog />}
        {isMyProfile && <AddProdDialog />}
      </Grid>     
       <Grid item xs={12} sm={6} md={4} sx={{}}>
                <img 
                src={`${process.env.PUBLIC_URL}/product.jpg`} 
                alt="" 
                className="product-image" 
                onClick={handleClickOpen}
                />
       </Grid>
       <Grid item xs={12} sm={6} md={4} sx={{}}>
                <img 
                src={`${process.env.PUBLIC_URL}/product.jpg`} 
                alt="" 
                className="product-image" 
            
                />
       </Grid>
       <Grid item xs={12} sm={6} md={4} sx={{}}>
                <img 
                src={`${process.env.PUBLIC_URL}/product.jpg`} 
                alt="" 
                className="product-image"
                />
       </Grid>
       <Grid item xs={12} sm={6} md={4} sx={{}}>
                <img 
                src={`${process.env.PUBLIC_URL}/product.jpg`} 
                alt="" 
                className="product-image" 

                />
       </Grid>
        </Grid>
        <Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
          <IconButton
          id="menu-list-button"
          aria-label="close"
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          aria-controls={openAnchor ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openAnchor ? 'true' : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon/>
        </IconButton>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openAnchor}
        onClose={handleClickClose}
        MenuListProps={{
          'aria-labelledby': 'menu-list-button',
        }}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Disable</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
        <DialogContent dividers>
           <Grid container>
              <Grid item xs={12} sm={4}>
                <img 
                src={`${process.env.PUBLIC_URL}/product.jpg`} 
                alt="" 
                className="product-image"
                id="selected-item-image"
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                 <p className="product-name">Sneaker addition 2</p>
                  <p className="views"><VisibilityIcon id="views-icon"/>2K views</p>
                  <p className="likes"><FavoriteIcon id="likes-icon"/>2K likes</p>
              </Grid>
              <Grid item xs={12}>
                  <p>Feeling stylish? You not alone, get this stylish sneaker with great comfort that will leave you astonished. I don't sleep with my boots on! Says who, never say never with this stylish sneaker. What are you waiting for?</p>
              </Grid>
           </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </BootstrapDialog>
    </Fragment>
 
    </div>
  );
};
