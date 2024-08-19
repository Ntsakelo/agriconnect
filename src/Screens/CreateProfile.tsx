import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Theme } from "../Helpers/Theme";
import { ThemeProvider } from "@mui/material";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from 'yup'; 
import { useState,useMemo} from "react";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import countryList from 'react-select-country-list';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import 'react-phone-number-input/style.css';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getSessionToken } from "../Helpers/CheckAuth";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { SpinnerDotted } from "spinners-react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from "react-router-dom";
// export default function UnstyledTextareaIntroduction() {
//   return <TextareaAutosize aria-label="empty textarea" placeholder="Empty" />;
// }
const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  width: 98%;
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: #80808;
  background: #80808;
  border: 1px solid #80808;
  box-shadow: 0px 2px 2px #80808;
  resize: none;

  &:hover {
    border-color: #000;
  }

  &:focus {
    border-color: #40A578;
    box-shadow: 0 0 0 1.5px #40A578;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

interface Decoded{
  email: string,
  username:string,
  userId: string,
  iat:number,
  exp: number
}
export const CreateProfile = () => {
  const countries = useMemo(() => countryList().getData(),[]);
  const url = 'http://localhost:8085/v1/profile';
  const [message, setMessage] = useState('');
  const [loading,setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const formik = useFormik({
      initialValues: {
        business_name:"",
            business_street_address:"",
            business_country:"",
            business_region:"",
            business_phone:"",
            business_description:"",
            business_city:"",
            business_zip_code:"",
        },
        onSubmit : (values) => {
          setMessage('');
           if(values){
             const decoded = jwtDecode(getSessionToken() as string) as Decoded;
             setLoading(true);
            axios({
              method:'post',
              url:'http://localhost:8085/v1/profile',
              headers:{
                Authorization:`Bearer ${getSessionToken() as string}`
              },
              data: {
                userData:{
                  userId:decoded.userId
                },
                businessData:values,
              }
             }).then(response => {
              setLoading(false);
              if(response.status === 201){
                handleOpen();
              }else{
                 setMessage('error')
              }
              console.log(response)
             }).catch(error => {
              setLoading(false);
              console.log(error);
              if(error.response.status === 401){
                setMessage('sessionExpired');
                setTimeout(() => {
                  navigate('/authenticate/login');
                },3000)
              }else if(error.response.status === 400){
                 setMessage('error')
              }
             })

           }
        },
        validationSchema: Yup.object({ 
          business_name:Yup.string().required('Business name is required'),
          business_street_address:Yup.string().required('Business address is required'),
            business_country:Yup.string().required('Business country is required'),
            business_region:Yup.string().required('Business region is required'),
            business_phone:Yup.string().required('Business contact is required'),
            business_description:Yup.string().required('Business description is required'),
            business_city:Yup.string().required('Business city is required'),
            business_zip_code:Yup.string().optional(),
        })
      })
      
  return (
    <div className="main-container">
      <ThemeProvider theme={Theme}>
      {loading && <div className="spinner-container">
            <SpinnerDotted  className="spinner" size="100px"/>
        </div>}
        <form onSubmit={formik.handleSubmit} className="create-profileForm">
        <Grid container sx={{ marginTop: "20px" }}>
          <Grid item xs={12}>
          <div className="logo-container">
                    <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="" className="logo" id="logo-1"/>
                    </div>
           </Grid> 
           <Grid item xs={12}>
             {message === 'error' && <p className="form-error">This user already has a profile created. A user cannot have more than 1 profile. <Link to="/manage/profile" className="go-to-my-profile">Go to your profile</Link> instead </p>}
             {message === 'sessionExpired' && <p className="form-error">Oops!Your session has expired!You will be redirected to login page</p>}
            </Grid> 
          <Grid item xs={12} sm={6}>
            <div className="input-container">
              <TextField
                fullWidth
                label="Enter Business name"
                id="business_name"
                sx={{ width: "95%" }}
                value={formik.values.business_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              
              />
              <p className="error">{formik.errors.business_name && formik.touched.business_name && formik.errors.business_name}</p>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="input-container">
              <TextField
                fullWidth
                label="Enter Business address"
                id="business_street_address"
                sx={{ width: "95%" }}
                value={formik.values.business_street_address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <p className="error">{formik.errors.business_street_address && formik.touched.business_street_address && formik.errors.business_street_address}</p>
             
            </div>
          </Grid>
             <Grid item xs={12} sm={6}>
            <div className="input-container">
              <TextField
                fullWidth
                label="Enter Business ZIP/postal code(optional)"
                id="business_zip_code"
                sx={{ width: "95%" }}
                value={formik.values.business_zip_code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <p className="error">{formik.errors.business_zip_code && formik.touched.business_zip_code && formik.errors.business_zip_code}</p>
             
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="input-container">
            
              <FormControl sx={{width:'95%'}}>
               <InputLabel id="country-select">Select country</InputLabel>
              <Select 
              sx={{width:'100%',textAlign:'left'}} 
              labelId="country-select" 
              label="Select country"
              value={formik.values.business_country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="business_country"
              name="business_country"
              >
                  {countries && countries.map(country => (
                    <MenuItem key={country.value} value={country.label}>{country.label}</MenuItem>
                  ))}
              </Select>
              </FormControl>
              <p className="error">{formik.errors.business_country && formik.touched.business_country && formik.errors.business_country}</p>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="input-container">
              <TextField
                fullWidth
                label="Enter region"
                id="business_region"
                sx={{ width: "95%" }}
                value={formik.values.business_region}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <p className="error">{formik.errors.business_region && formik.touched.business_region && formik.errors.business_region}</p>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="input-container">
              <TextField
                fullWidth
                label="Enter city"
                id="business_city"
                sx={{ width: "95%" }}
                value={formik.values.business_city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <p className="error">{formik.errors.business_city && formik.touched.business_city && formik.errors.business_city}</p>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="input-container">
              <TextField
                fullWidth
                label="Enter Business phone"
                id="business_phone"
                sx={{ width: "98%" }}
                value={formik.values.business_phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="tel"
              />
              <p className="error">{formik.errors.business_phone && formik.touched.business_phone && formik.errors.business_phone}</p>
            </div>
          </Grid>
          <Grid item xs={12} >
             <TextareaAutosize 
             minRows={3} 
             id="business_description"
             onBlur={formik.handleBlur}
             onChange={formik.handleChange}
             placeholder="Enter short description of your business"
             />
             <p className="error">{formik.errors.business_description && formik.touched.business_description && formik.errors.business_description}</p>
          </Grid>
          <Grid item xs={12}>
            <button type="submit" className="cta" id="create-profile-cta">
              Create profile
            </button>
          </Grid>
        </Grid>
        </form>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <CheckCircleOutlineIcon sx={{fontSize:100,color:'#40A578',display:'block',margin:'auto'}}/>
           You have successfully created your business profile.What's next?Head over to your profile section and start interacting with other business owners. This is the opportunity for you to grow your network. DON'T WAIT!
          </DialogContentText>
          <DialogActions>
            <Link to="/manage/profile" className="cta" id="link-to-my-profile">my profile</Link>
          </DialogActions>
        </DialogContent>
      </Dialog>
      </ThemeProvider>
    </div>
  );
};
