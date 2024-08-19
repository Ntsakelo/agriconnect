import { Grid } from "@mui/material";
import { Navbar } from "../Components/Manage/Navbar";
import { useState } from "react";

export const ManageProducts = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  return (
    <div>
        <Grid>
      <Grid xs={12} id="addProduct-cta-container">
            <button className="cta" onClick={handleClickOpen} id="addProduct-cta">Request Quote</button>
        </Grid>  
      <Grid item container id="products-container-container">
        <Grid xs={12} sm={6} md={4} lg={3}>
          <div className="product">
            <img
              src={`${process.env.PUBLIC_URL}/cow.jpg`}
              alt=""
              className="product-image"
            />
          </div>
          <div className="product-details">
            <h3 className="product-detail product-name">Eggs</h3>
            <p className="product-detail product-price">R200/Pack</p>
            <p className="product-detail product-stockprice">
              Stock price on request
            </p>
          </div>
        </Grid>
        <Grid xs={12} sm={6} md={4} lg={3}>
          <div className="product">
            <img
              src={`${process.env.PUBLIC_URL}/chicken.jpg`}
              alt=""
              className="product-image"
            />
          </div>
          <div className="product-details">
            <h3 className="product-detail product-name">Eggs</h3>
            <p className="product-detail product-price">R200/Pack</p>
            <p className="product-detail product-stockprice">
              Stock price on request
            </p>
          </div>
        </Grid>
        <Grid xs={12} sm={6} md={4} lg={3}>
          <div className="product">
            <img
              src={`${process.env.PUBLIC_URL}/sheep.jpg`}
              alt=""
              className="product-image"
            />
          </div>
          <div className="product-details">
            <h3 className="product-detail product-name">Eggs</h3>
            <p className="product-detail product-price">R200/Pack</p>
            <p className="product-detail product-stockprice">
              Stock price on request
            </p>
          </div>
        </Grid>
        <Grid xs={12} sm={6} md={4} lg={3}>
          <div className="product">
            <img
              src={`${process.env.PUBLIC_URL}/goat.jpg`}
              alt=""
              className="product-image"
            />
          </div>
          <div className="product-details">
            <h3 className="product-detail product-name">Eggs</h3>
            <p className="product-detail product-price">R200/Pack</p>
            <p className="product-detail product-stockprice">
              Stock price on request
            </p>
          </div>
        </Grid>
      </Grid>
        </Grid>
    </div>
  );
};
