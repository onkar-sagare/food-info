import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, Navigate, useNavigate, withRouter  } from "react-router-dom";

export default function Search()  {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const actionSearch = () => {  
    navigate(`/search?input=${searchInput}`);
  };

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

    return(
      <div>
        <h2>Search Food</h2>
      <Grid container spacing={2}>
        
          <Grid item xs={6}>
            <TextField className="searchField" value={searchInput} onChange={handleChange} id="standard-basic" label="Search" variant="filled" />
          </Grid>
          <Grid item xs={2}>
            <Button className="searchButton" variant="contained" onClick={actionSearch}>Search</Button>          
          </Grid>
        </Grid>
        </div>
    );
    }
