import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import {useState,useRef} from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export const ProfileView = () => {
    return (
        <div className="main-container">
          <Grid container>
             <Grid item xs={12}>
                <div className="background-picture secondary-profile-container">
                   <img src={'background-image.jpg'} alt="" className="background-image"/>
                </div>
             </Grid>
             <Grid item sx={{maxWidth:'700px',width:'100%',margin:'auto'}}>
                 <div className="business-avatar">
                    <Avatar alt="Remy Sharp" src="olly.jpg" id="avatar" />
                    
                 </div>
                 <div className="business-details">
                <h4 className="business-name">ANM POULTRY</h4>
                <Link to="/recommendations" className="recommendations-link">2K recommendations</Link>
                <Link to="/recommendations" className="recommendations-link">20 mutual connections</Link>
                 </div>            
             </Grid>
             <Grid item sx={{maxWidth:'700px',width:'100%',margin:'auto'}}>
                <p className="business-description">We are a small farming enterprise that supplies chicken feeds, Cow feeds and also produce chicklets. We are on the verge of opening our first feeds factory in Durban. We currently supply customers within the surrounding areas. Hopefully soon enough we will be able to cater for other regions.</p>           
             </Grid>
             <Grid item sx={{maxWidth:'700px',width:'100%',margin:'auto'}}>
                <Link to="/profile/products" className="cta" id="view-products">View Products</Link> 
                 <img src="bubble.svg" alt=""  className="bubble-chat"/>
             </Grid>
          </Grid> 
        </div>
    )
}