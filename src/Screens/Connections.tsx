import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const responsive = {
  superLargeDesktop: {
    //the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 956 },
    items: 3
  },
  desktop: {
    breakpoint: { max: 956, min: 799},
    items: 3
  },
  tablet: {
    breakpoint: { max: 799, min:  544},
    items: 2
  },
  mobile: {
    breakpoint: { max: 544, min: 0 },
    items: 1,
  }

}

export const Connections = () => {
  const CustomRightArrow = ({ onClick, ...rest }:any) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType }
    } = rest;
    // onMove means if dragging or swiping in progress.
    return <ArrowForwardIosIcon sx={{color:'red',zIndex:500}} onClick={() => onClick()} />;
  };
    function stringAvatar(name: string) {
        return {
          sx: {
            bgcolor: '#fff',
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }
      
  return (
    <Grid container>
        <Grid item xs={12} sx={{overflow:'auto'}}>
          <h3 className="connections-header">you may be interested in</h3>
        <Carousel responsive={responsive} itemClass="connections-carousel">
          <div className="connection-profile">
            <div className="connection">
              <div className="connection-cover">
                  <img src={`${process.env.PUBLIC_URL}/profile1.jpg`} alt="" className="connection-cover-image"/>
              </div>
              <div className="connection-details">
                 <h3 className="connection-profile-name">ANM POULTRY</h3>
                 <p className="mutual-connections"><Diversity3Icon id="group-icon"/>22 mutual connections</p>
              </div>
              <div className="add-connection">
                 <div className="add-connection-btn"><p><PersonAddAlt1Icon id="person-add-icon"/>Add Connection</p></div>
              </div>
            </div>
          </div>
          <div className="connection-profile">
          <div className="connection">
              <div className="connection-cover">
                  <img src={`${process.env.PUBLIC_URL}/profile2.jpg`} alt="" className="connection-cover-image"/>
              </div>
              <div className="connection-details">
                 <h3 className="connection-profile-name">ANM POULTRY</h3>
                 <p className="mutual-connections"><Diversity3Icon id="group-icon"/>22 mutual connections</p>
              </div>
              <div className="add-connection">
                 <div className="add-connection-btn"><p><PersonAddAlt1Icon id="person-add-icon"/>Add Connection</p></div>
              </div>
            </div>
          </div>
          <div className="connection-profile">
          <div className="connection">
              <div className="connection-cover">
                  <img src={`${process.env.PUBLIC_URL}/profile3.jpg`} alt="" className="connection-cover-image"/>
              </div>
              <div className="connection-details">
                 <h3 className="connection-profile-name">ANM POULTRY</h3>
                 <p className="mutual-connections"><Diversity3Icon id="group-icon"/>22 mutual connections</p>
              </div>
              <div className="add-connection">
                 <div className="add-connection-btn"><p><PersonAddAlt1Icon id="person-add-icon"/>Add Connection</p></div>
              </div>
            </div>
          </div>
          <div className="connection-profile">
          <div className="connection">
              <div className="connection-cover">
                  <img src={`${process.env.PUBLIC_URL}/background-image.jpg`} alt="" className="connection-cover-image"/>
              </div>
              <div className="connection-details">
                 <h3 className="connection-profile-name">ANM POULTRY</h3>
                 <p className="mutual-connections"><Diversity3Icon id="group-icon"/>22 mutual connections</p>
              </div>
              <div className="add-connection">
                 <div className="add-connection-btn"><p><PersonAddAlt1Icon id="person-add-icon"/>Add Connection</p></div>
              </div>
            </div>
          </div>

         </Carousel> 
        </Grid>
    </Grid>
   
  );
};

