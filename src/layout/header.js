import React from "react";
import logo from '../logo.svg';
import { Link } from "react-router-dom";
import { Favorite } from "@mui/icons-material";
import { Grid } from "@mui/material";
class Header extends React.Component {
  render() {
    return(
      <header>
        <Grid container spacing={2}>
            <Grid item xs={3}>
              <img src={logo} className="logo"></img>        
            </Grid>
            <Grid item xs={9}>
              <div className="headerMenu">
                <Link to="/" className="menuLinkSearch"> Search </Link>
                <Link to={'favorite'} className="menuLink">
                  <Favorite className="favIcon"></Favorite> 
                  <div className="headerMenuTxt">Favourite Food</div>
                </Link>
              </div>
            </Grid>
        </Grid>
      </header>
    );
  }
}
export default Header;