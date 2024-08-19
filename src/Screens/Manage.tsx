import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { Navbar } from "../Components/Manage/Navbar";
import Button from "@mui/material/Button";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { styled } from "@mui/material/styles";
import axios, { AxiosError } from "axios";
import { getSessionToken } from "../Helpers/CheckAuth";
import { jwtDecode } from "jwt-decode";
import {storage} from '../Helpers/Firebase';
import {ref, uploadBytes, getDownloadURL,listAll,deleteObject} from 'firebase/storage';
import {v4} from 'uuid';

interface Decoded{
  email: string,
  username:string,
  userId: string,
  iat:number,
  exp: number
}

interface BusinessProfile{
  id:number,
  business_profile_owner: number,
  business_name: string,
  business_country: string,
  business_region: string,
  business_street_address: string,
  business_zip_code: string,
  business_city: string,
  business_phone: string,
  business_description: string,
  business_cover_photo: string,
 business_profile_photo: string,
}

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
export const Manage = () => {
  const [data, setData] = useState<BusinessProfile>();
  //let [coverPhoto, setCoverPhoto] = useState<File>();
  const decoded:Decoded = jwtDecode(getSessionToken() as string);
   
  const uploadImage = (e:any) => {
     const coverPhoto:File = e.target?.files[0]
    
     if(!coverPhoto){
      return
     }
       const imageRef = ref(storage, `${decoded.username + decoded.userId}/cover/${coverPhoto.name}`);
       listAll(imageRef).then((results) => {
        if(results){
          deleteObject(imageRef).then(() => {
            alert('file deleted successfully');
            return;
          })
        }
       })
       uploadBytes(imageRef, coverPhoto).then((snapshot) => {
        if(snapshot){
          getDownloadURL(ref(storage,`${decoded.username + decoded.userId}/cover/${coverPhoto.name}`)).then(url =>{
             axios({
                  method:'patch',
                  url:`http://localhost:8085/v1/profile/${decoded.userId}`,
                  headers:{Authorization:`Bearer ${getSessionToken() as string}`},
                  data:{
                    imageUrl:url,
                  }
             }).then(response => {
              console.log(response)
             }).catch(error => {
              console.log(error)
             })
          })          
        }
        // console.log('yes')
      })
     
  }
  useEffect(() => {
    axios({
      method:'get',
      headers:{Authorization:`Bearer ${getSessionToken() as string}`},
      url:`http://localhost:8085/v1/profile/${decoded.userId}`
    }).then(response => {
         setData(response.data.profile);
    }).catch(error => {
      console.log(error)
    })
     //uploadImage();
  },[decoded.userId])
  return (
    <div className="main-container">
        <Navbar />
        {data && <Grid container id="my-profile-container">
        <Grid item xs={12}>
                <div className="background-picture secondary-profile-container" id="my-profile-background">
                   <div className="overlay">
                   <Button
              component="label"
              disableElevation
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CameraAltIcon />}
              sx={{background:'transparent',textAlign:'center',marginTop:'15px',float:'right',padding:'0px','&:hover':{backgroundColor:'transparent'}}}
            >
              <VisuallyHiddenInput  type="file" accept="image/jpg,image/png,image/jpeg" onChange={(e) => uploadImage(e)}/>
            </Button>
                   </div>
                   {!data.business_cover_photo && <img src="https://firebasestorage.googleapis.com/v0/b/agriconnect-web-project.appspot.com/o/default.png?alt=media&token=3428a4b3-69a3-46c8-83ef-7b6c1f8f906b" alt="" className="background-image"/>}
                   {data.business_cover_photo && <img src={data.business_cover_photo} alt="" className="background-image" id="background-image"/>}
                </div>
             </Grid>
             <Grid item sx={{maxWidth:'700px',width:'100%',margin:'auto'}}>
                 <div className="business-avatar" id="my-profile-avatar">
                    
                  <Avatar sx={{border:'1px solid #000',borderRadius:'50%'}} alt="Remy Sharp" src="" id="avatar" />
                    
                 </div>
                 <div className="business-details">
                <h4 className="business-name">{data.business_name}</h4>
                <Link to="/recommendations" className="recommendations-link">2K recommendations</Link>
                {/* <Link to="/recommendations" className="recommendations-link">20 mutual connections</Link> */}
                 </div>            
             </Grid>
             <Grid item sx={{maxWidth:'700px',width:'100%',margin:'auto'}}>
                <p className="business-description">{data.business_description}</p>           
             </Grid>
             <Grid item sx={{maxWidth:'700px',width:'100%',margin:'auto'}}>
                <Link to="/profile/products" className="cta" id="view-products">Manage Products</Link> 
                 <img src={`${process.env.PUBLIC_URL}/bubble.svg`} alt=""  className="bubble-chat"/>
             </Grid>
        </Grid>}
    </div>
  );
};

function err(reason: any): PromiseLike<never> {
  throw new Error("Function not implemented.");
}
