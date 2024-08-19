import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";



export const Navbar = () => {
  return (
    <div className="main-container">
      <Grid container id="manage-navbar"> 
          <Grid item xs={12} sm={3} md={3} >
          <div className="logo-container">
                    <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="" className="logo" id="logo"/>
                    </div>
          </Grid>
          <Grid item xs={12} sm={9} md={9} id="nav-grid">
             <nav className="manage-nav">                 
                 <Link to="/manage/chats" className="manage-nav-link"><img src={`${process.env.PUBLIC_URL}/bubble.svg`} alt="" className="link-icon"/><br/><span className="link-description">Chats</span></Link>
                 <Link to="/manage/connections" className="manage-nav-link"><img src={`${process.env.PUBLIC_URL}/connections.svg`} alt="" className="link-icon"/><br/><span className="link-description">Connections</span></Link>
                 <Link to="/manage/notifications" className="manage-nav-link" id="notification"><img src={`${process.env.PUBLIC_URL}/notifications.svg`} alt="" className="link-icon"/><br/><span className="link-description">Notifications</span></Link>
             </nav>
          </Grid>
      </Grid>
    </div>
  );
};