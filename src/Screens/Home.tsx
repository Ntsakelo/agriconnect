import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {useRef,useState} from 'react'
import HandshakeIcon from '@mui/icons-material/Handshake';
import PaidIcon from '@mui/icons-material/Paid';
import Diversity2Icon from '@mui/icons-material/Diversity2';

export const Home = () => {
    const menu = useRef<HTMLUListElement>(null);
    const handleMenuOpen = (e:any) => {
       menu.current?.classList.add('open');
       menu.current?.classList.remove('close');
       menu.current?.setAttribute('style','transition: 0.3s linear transform;')
    }

    const handleMenuClose = (e:any) => {
        menu.current?.classList.add('close');
        menu.current?.classList.remove('open');
        menu.current?.setAttribute('style','transition: 0.3s linear transform;')
     }
     const handleDetailClick = () => {
        alert('i have been clicked')
     }
    return (
        <div className="main-container">
           <Grid container>
               <Grid item xs={12}>
                 <nav className="nav">
                    <div className="logo-container">
                    <img src={'logo.svg'} alt="" className="logo"/>
                    </div>
                    <div className="nav-links-container">
                        <MenuIcon  id="menuIcon" onClick={handleMenuOpen}/>
                       <ul className="nav-links close" ref={menu}>
                          <li className="nav-link" id="closeIcon"><CloseIcon onClick={handleMenuClose}/></li>
                          <li className="nav-link"><Link to="/" >Home</Link></li>
                          <li className="nav-link"><Link to="/">About</Link></li>
                          {/* <li className="nav-link"><Link to="/"></Link></li>  */}
                          <li className="nav-link" id="login"><Link to="/authenticate/login">Login</Link></li>
                          <li className="nav-link" id="signup"><Link to="/authenticate/register">SIGN UP</Link></li> 
                       </ul>
                    </div>
                 </nav>
               </Grid>
               <Grid item container  id="description-container">
                   <Grid item xs={12} sm={4}>
                    <div className="description-item" onClick={handleDetailClick}>
                    <div className="description">
                        <HandshakeIcon id="handshake" />
                    </div>
                    <p className="text">Connect</p>

                    </div>
                   </Grid>
                   <Grid item xs={12}  sm={4}>
                   <div className="description-item" onClick={handleDetailClick}>
                   <div className="description">
                        <PaidIcon id="transact" />
                    </div>
                    <p className="text">Transact</p>
                    </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <div className="description-item" onClick={handleDetailClick}>
                    <div className="description">
                        <Diversity2Icon id="grow" />
                    </div>
                    <p className="text">Grow</p>
                    </div>
                    </Grid>
               </Grid>
           </Grid>
        </div>
    )
}