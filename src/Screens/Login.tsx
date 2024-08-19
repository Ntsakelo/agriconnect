import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Theme } from "../Helpers/Theme";
import { ThemeProvider } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { AxiosResponse,AxiosError } from "axios";
import axios from "axios";
import { SpinnerDotted } from "spinners-react";
import {useState} from 'react';
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const url = 'http://localhost:8085/v1/user'
  const [message, setMessage] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setMessage('');
      if(values){
        setLoading(true);
        axios.post(url,values).then((data:AxiosResponse) => {
          setLoading(false);
            if(data.status === 200){
                sessionStorage.setItem('access_token',data.data.token);
                navigate('/welcome');
            }else{
              setMessage('error');
            }
        }).catch((error:AxiosError) => {
          setLoading(false);
            if(error.response?.status !== 400){
              setMessage('connection'); 
            }else{
              setMessage('error');
            }
        })
      }
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Not a valid email"),
      password: Yup.string().required("Password is required"),
    }),
  });
  return (
    <div className="main-container">
      <ThemeProvider theme={Theme}>
      {loading && <div className="spinner-container">
            <SpinnerDotted  className="spinner" size="100px"/>
        </div>}
        <form className="form register-form" onSubmit={formik.handleSubmit}>
          <Grid container>
            <Grid item xs={12}>
              <div className="logo-container">
                <img
                  src={`${process.env.PUBLIC_URL}/logo.svg`}
                  alt=""
                  className="logo"
                  id="logo-2"
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <h3 className="form-head sign-up-head">Sign in</h3>
              <h5 className="form-head">Welcome back!</h5>
            </Grid>
            <Grid item xs={12}>
             {message === 'error' && <p className="form-error">Oops! Please check your credentials and try again!</p>}
             {message === 'connection' && <p className="form-error">Oh no! It seems like there is a connection problem. Please try again!</p>}
            </Grid>
            <Grid item xs={12}>
              <div className="input-container">
                <TextField
                  fullWidth
                  label="Enter email"
                  id="email"
                  sx={{ width: "95%" }}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <p className="error">
                  {formik.errors.email &&
                    formik.touched.email &&
                    formik.errors.email}
                </p>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="input-container">
                <TextField
                  fullWidth
                  label="Enter password"
                  id="password"
                  sx={{ width: "95%" }}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="password"
                />
                <p className="error">
                  {formik.errors.password &&
                    formik.touched.password &&
                    formik.errors.password}
                </p>
              </div>
            </Grid>
            <Grid item xs={12}>
              <button type="submit" className="cta" id="signin-cta">
                Sign in
              </button>
            </Grid>
            <Grid item xs={12}> 
                <p className="form-text" id="redirect-text">Already have an account? <Link to="/authenticate/register">Sign up</Link></p>
            </Grid>
          </Grid>
        </form>
      </ThemeProvider>
    </div>
  );
};