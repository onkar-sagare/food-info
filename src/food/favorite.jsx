import { Delete } from "@mui/icons-material";
import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, withRouter  } from "react-router-dom";

export default function FavoriteFood()  {
 

  const [foods, setFoods] = useState([]);

  const removeFromFav = (removeItem) => {
    
    let newFoodsList = foods.filter((item) =>{
      return (item.fdcId == removeItem.fdcId ? false : true);
    });
    
    localStorage.setItem('favFoods', JSON.stringify(newFoodsList));
    setFoods(newFoodsList);
  };  

  useEffect(() => {
    let storedFavFoods = localStorage.getItem('favFoods');
    console.log(storedFavFoods);
    if(storedFavFoods != null) {
      setFoods(JSON.parse(storedFavFoods));
    }
  }, []);

    return(
      <div className="row">
      <h3>Search Result  </h3>
      <Grid container spacing={4}>

      {
        foods.length > 0 &&
        foods.map((item, i) => 
        
        
          <Grid item xs={3}>
            <div className="card">
            <Link to={`/food/${item.fdcId}`}>
              <div className="brandName">
                {item.brandName}
                </div>
                </Link>
              <div className="cardInner">
              <Link to={`/food/${item.fdcId}`}>
                Brand Owner: {item.brandOwner} <br></br> 
                Description: {item.description} <br></br> 
                </Link>
                
                <div className="foodID">
                <button className="removeFav" onClick={() => removeFromFav(item)}><Delete className="deleteIcon"></Delete></button>
                  <div style={{float:"right"}}>ID: {item.fdcId}</div>
                  </div>
              </div>
              
            </div>
          </Grid>
        
        )
      }
      
      </Grid> 
      </div>
    );
    }
