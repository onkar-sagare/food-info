import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import './food.css';
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Favorite  } from '@mui/icons-material'


export default function SearchResult() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get("input"));
  
  const [storedFavFoodIds, setStoredFavFoodIds] = useState();
  const [foods, setFoods] = useState([]);
  const fetchFoodList = () => {
    setFoods([]);
    fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=dJoLJSlujAQ8BQuvlfWvU65I8davd10gW86XFF99&query=${searchInput}`)
      .then(response => {
        return response.json()
      })
      .then(data => {        
        setFoods(data.foods)
        localStorage.setItem('foods', JSON.stringify(data.foods));
      });
  }
  
  const addToFav = (e, foodItem) => {
    
    let storedFavFoods = JSON.parse(localStorage.getItem('favFoods'));    
    if(storedFavFoods === null) {
      storedFavFoods = [];
    }
    let newFoodItem = {
      brandName: foodItem.brandName,
      brandOwner: foodItem.brandOwner,
      description: foodItem.description,
      fdcId: foodItem.fdcId
    };

    storedFavFoods.unshift(newFoodItem);

    localStorage.setItem('favFoods', JSON.stringify(storedFavFoods));

    e.target.firstChild?.classList?.remove("fav");
    e.target.firstChild?.classList?.add("favRed");
    e.target.style.color = "red";
  };

  useEffect(() => {

    let storedFavFoods = localStorage.getItem('favFoods');
    let storedFavFoodIdsArr = [];
    if(storedFavFoods != null) {
      JSON.parse(localStorage.getItem('favFoods')).map((item)=>{
        storedFavFoodIdsArr.push(item.fdcId);
      });

      setStoredFavFoodIds(storedFavFoodIdsArr);
    }
            
    let storeSearchInput = localStorage.getItem('searchInput');
    let newSearch = (storeSearchInput !== searchInput  ? true : false);
    
    let storeFoodData = localStorage.getItem('foods');
    let foods = [];
    if(storeFoodData && storeFoodData !== undefined && storeFoodData !== '') {
       foods = JSON.parse(localStorage.getItem('foods'));
    }    
    if(foods.length <= 0 || newSearch) {       
      localStorage.setItem('searchInput', searchInput);
      fetchFoodList();
    }                
    setFoods(foods);

  }, []);
  
  
    return(
      <div className="row">
        <h3>Search Result  </h3>
        <Grid container spacing={4}>

        {
          foods.length > 0 &&
          foods.map((item, i) => 
          
          
            <Grid item lg={3} md={6} xs={12}>
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
                  <button className="favButton" onClick={event => addToFav(event, item)}>
                    <Favorite 

                    
                    className={storedFavFoodIds.indexOf(item.fdcId) < 0 ? "fav" : "favRed"} />
                    </button>
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
