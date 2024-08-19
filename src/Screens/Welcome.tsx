import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { checkAuth } from "../Helpers/CheckAuth";
import { getSessionToken } from "../Helpers/CheckAuth";
import { useNavigate } from "react-router-dom";
import {useState,useEffect} from 'react';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
interface Decoded{
    email: string,
    username:string,
    userId: string,
    iat:number,
    exp: number
}
export const Welcome = () => {
    const [hasProfile, setHasProfile] = useState(false);
    const [userData, setUserData] = useState<Decoded>()
    const url = 'http://localhost:8085/v1/profile'
    const isAuthorized = checkAuth();
     const navigate = useNavigate();
     
     useEffect(() => {
         if(!isAuthorized){
            navigate('/')
         }else{
             const decoded = jwtDecode(getSessionToken() as string) as Decoded;
             //setUserData(decoded);
            axios.get(`http://localhost:8085/v1/profile/${decoded.userId}`,{headers:{Authorization:`Bearer ${getSessionToken() as string}`}}).then(results => {
                if(results.status === 200){
                    setHasProfile(true)
                }else{
                    setHasProfile(false)
                }
            }).catch(error => {
                if(error.response.status === 404){
                   setHasProfile(false);
                }
            })            
         }
     })
     const handleSignOut = () => {
        sessionStorage.clear();
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
                       <ul className="nav-links close" >
                          <li className="nav-link" id="user">ntsakelo@gmail.com</li>
                          <li className="nav-link" id="signout"><Link to="/" onClick={handleSignOut}>Sign out</Link></li>
                      </ul>
                    </div>
                   </nav>     
                </Grid>
                <Grid item xs={12}>
                   <div className="welcome-section">
                       {!hasProfile && <div><p>Hi {}, Welcome back. It looks like you don't have a profile yet. Some quick advice, A business profile gives you the ability to connect with other business profiles and creates the exposure for your business.</p>
                       <Link to="/business/profile/create" className="cta" id="link-to-create-profile">Create profile</Link></div>}

                       {hasProfile && <div><p>Hi {userData && userData?.username}, Welcome back. Don't miss out on your next opportunity to connect and your network.Visit your profile and find out what's next in store for you today.</p>
                       <Link to="/manage/profile" className="cta" id="link-to-my-profile">Go to my profile</Link></div>}
                   </div>
                </Grid>
            </Grid>
        </div>
    )
}