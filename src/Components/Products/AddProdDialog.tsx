import { useState,Fragment } from "react";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled as style} from '@mui/system';
import { useFormik } from "formik";
import * as Yup from 'yup'; 
import TextField from "@mui/material/TextField";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CameraAltIcon from '@mui/icons-material/CameraAlt';



export default function UnstyledTextareaIntroduction() {
  return <TextareaAutosize aria-label="empty textarea" placeholder="Empty" />;
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const TextareaAutosize = style(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  display: block;
  width: 100%;
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 2.5;
  padding: 8px 12px;
  border-radius: 5px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  resize:none;

  &:hover {
    border-color: #40A578;
  }

  &:focus {
    border-color: #40A578;
    box-shadow: 0 0 0 2px #40A578;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

export const AddProdDialog = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
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
             if(values){
            
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
        <Fragment>
            <button className="cta-btn right-aligned" onClick={handleClickOpen}>Add product</button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add product
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <div className="input-container">
              <TextField
                fullWidth
                label="Product name"
                id="product_name"
                value={formik.values.business_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}              
              />
              <p className="error">{formik.errors.business_name && formik.touched.business_name && formik.errors.business_name}</p>
            </div>
            <div className="input-container">
            <TextareaAutosize placeholder="Product description (optional)"/>
            <p className="error">{formik.errors.business_name && formik.touched.business_name && formik.errors.business_name}</p>
            </div>
            <div className="input-container">
              <TextField
                fullWidth
                label="Selling price"
                id="selling_price"
                value={formik.values.business_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}              
              />
              <p className="error">{formik.errors.business_name && formik.touched.business_name && formik.errors.business_name}</p>
            </div>
            <div className="input-container">
            <FormControl fullWidth>
               <InputLabel id="discount-option">Product/Service discount</InputLabel>
              <Select 
              sx={{width:'100%',textAlign:'left'}} 
              labelId="discount-option" 
              label="Product/Service discount"
              value={formik.values.business_country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="business_country"
              name="business_country"
              >
                    <MenuItem value="">Discount on request</MenuItem>
                    <MenuItem value="">No discount</MenuItem>
              </Select>
              </FormControl>
              <p className="error">{formik.errors.business_country && formik.touched.business_country && formik.errors.business_country}</p>
            </div>
            <div>
            <Button
  component="label"
  role={"button"}
  tabIndex={-1}
  startIcon={<CameraAltIcon />}
  className="cta-btn"
>
  Upload photo
  <VisuallyHiddenInput type="file"  accept=".jpg,.png"/>
</Button>
            </div>
            <button className="cta-btn" id="send-request-cta">ADD</button>
        </DialogContent>
      </BootstrapDialog>
    </Fragment>
    )
}