import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams, withRouter  } from "react-router-dom";
import './food.css';

export default function FoodDetails()  {

  const { id } = useParams();
  const [foodDetails, setFoodDetails] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const fetchFoodDetails = () => {
    console.log(id);

    fetch(`https://api.nal.usda.gov/fdc/v1/food/${id}?api_key=dJoLJSlujAQ8BQuvlfWvU65I8davd10gW86XFF99`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      setFoodDetails(data);
      setShowLoader(false);
    });    
  };
  useEffect(() => {    
    fetchFoodDetails();
  }, []);
  return(
    <div>

      <h2>
        Food Details: 
      </h2>

      <h3>{foodDetails.brandOwner}</h3>

      
    <hr></hr>
    { 
    showLoader  ? "Loading..." :  
        <Grid container spacing={2}>
        
          <Grid item xs={7}>
          <h4 className="headerFoodDetail">Food Nutrient</h4>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead className="tableHeader">
                    <TableRow>
                      <TableCell className="tableCells">Nutrient Name (100g serving)</TableCell>
                      <TableCell className="tableCells" align="right">Rank(g/IU)</TableCell>            
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  
                  {foodDetails?.foodNutrients?.map((item) => (
                  <TableRow className="tableRow"
                    key={item.nutrient.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="tableCellBold" component="th" scope="row">
                      {item.nutrient.name}
                    </TableCell>
                    <TableCell align="right" className="tableCellBlack">
                      {item.nutrient.rank} 
                      ({item.nutrient.unitName})
                    </TableCell>            
                  </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={5}>
          <h4 className="headerFoodDetail">Summary</h4>
            <TableContainer component={Paper} className="summaryTable">
              <Table aria-label="simple table">              
                <TableBody>                            
                <TableRow className="tableRow"
                  key={'Test'}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell className="tableCellBold" component="th" scope="row">
                    Description
                  </TableCell>
                  <TableCell align="right" className="tableCellBlack">
                    {foodDetails.description}                  
                  </TableCell>                
                </TableRow>
                <TableRow className="tableRow"
                  key={'Test'}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell className="tableCellBold" component="th" scope="row">
                    Brand Name
                  </TableCell>
                  <TableCell align="right" className="tableCellBlack">
                    {foodDetails.brandName}
                  </TableCell>
                </TableRow>
                <TableRow className="tableRow"
                  key={'Test'}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell className="tableCellBold" component="th" scope="row">
                    Brand Owner
                  </TableCell>
                  <TableCell align="right" className="tableCellBlack">
                    {foodDetails.brandOwner}
                  </TableCell>
                </TableRow>
                <TableRow className="tableRow"
                  key={'Test'}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell className="tableCellBold" component="th" scope="row">
                      Category
                  </TableCell>
                  <TableCell align="right" className="tableCellBlack">
                    {foodDetails.brandedFoodCategory}                  
                  </TableCell>
                </TableRow>
                <TableRow className="tableRow"
                  key={'Test'}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell className="tableCellBold" component="th" scope="row">
                    Ingredients
                  </TableCell>
                  <TableCell align="right" className="tableCellBlack">
                    <span title={foodDetails.ingredients}>
                    {foodDetails.ingredients}
                    </span>
                  </TableCell>
                </TableRow>              
              </TableBody>
            </Table>
          </TableContainer>
          </Grid>

        </Grid>

    }
    </div>
  );
}
