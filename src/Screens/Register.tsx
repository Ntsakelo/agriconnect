import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Theme } from "../Helpers/Theme";
import { ThemeProvider } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import {AxiosError, AxiosResponse} from "axios";
import axios from "axios";
import {useState} from 'react';
import { SpinnerDotted } from "spinners-react";

export const Register = () => {
  const url = 'http://localhost:8085/v1/user';
  const [message,setMessage] = useState('');
  const [loading,setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setMessage('');
      if(values){
        setLoading(true);
         axios
         .put(url,values)
         .then((data:AxiosResponse) => {
            setLoading(false);
             if(data.status === 200){
                 setMessage('success');
             }
         })
         .catch((error:AxiosError) => {
          setLoading(false);
          if(error.response?.status === 400){
            setMessage('error')
          }else{
            setMessage('connection')
          }
         })
         
      }
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
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
              <h3 className="form-head sign-up-head">Sign up</h3>
              <h5 className="form-head">Welcome!</h5>
            </Grid>
            <Grid item xs={12}>
             {message === "success" && <p className="form-success">Welcome!We are happy to have you join us. You now have an account and can proceed to <Link className="proceedToLogin" to="/authenticate/login">login</Link> to continue browsing the website</p>}
             {message === "error" && <p className="form-error">Oh no! It looks like there is a problem with the provided details. Don't worry, take a deep breathe, double check your details and make sure you do not have an existing account</p>}
             {message === "connection" && <p className="form-error">Oh no! It seems like there is a connection problem. Please try again! </p>}
            </Grid>
            <Grid item xs={12}>
              <div className="input-container">
                <TextField
                  fullWidth
                  label="Enter username"
                  id="username"
                  sx={{ width: "95%" }}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <p className="error">
                  {formik.errors.username &&
                    formik.touched.username &&
                    formik.errors.username}
                </p>
              </div>
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
              <button type="submit" className="cta" id="create-account-cta">
                Sign up
              </button>
            </Grid>
            <Grid item xs={12}> 
                <p className="form-text" id="redirect-text">Already have an account? <Link to="/authenticate/login">Sign in</Link></p>
            </Grid>
          </Grid>
        </form>
      </ThemeProvider>
    </div>
  );
};
