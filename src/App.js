import { Link, Navigate, useNavigate, BrowserRouter, Routes, Route  } from "react-router-dom";
import { Favorite, Padding } from '@mui/icons-material';
import logo from './logo.svg';
import SearchResult from "./food/searchResult";
import Search from "./food/search";
import FoodDetails from "./food/foodDetails"
import FavoriteFood from "./food/favorite"

import { Button, Grid, TextField } from '@mui/material';




function App() {
  return (
    <div className="App" >
      <div className='container' style={{Padding: "30px"}}> 
        <br></br>
        <Routes>
		<Route path="/search" element={<SearchResult />} />
          	<Route path="/" element={<Search />} />
          	<Route path="/food/:id" element={<FoodDetails/>}></Route>
          	<Route path="/favorite" element={<FavoriteFood/>}></Route>
  	</Routes>
        
        
    </div>
    </div>
  );
}

export default App;
