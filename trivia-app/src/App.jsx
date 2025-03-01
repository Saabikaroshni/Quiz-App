import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import Signup from './pages/Signup';
import Login from './pages/Login';
import General from './quiz/General';
import Congratulations from './pages/Congratulations';

import Entertainment from './quiz/Entertainment';
import History from './quiz/History';
import Movie from './quiz/Movie';
import Natures from './quiz/Natures';
import Science from './quiz/Science';
import Sports from './quiz/Sports';
import Technology from './quiz/Technology';

import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="page-container">
      <Routes>
      
        
      
        
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/congratulations" element={<Congratulations/>}></Route>
        <Route path="/quiz/nature" element={<Natures/>}></Route>
        <Route path="/quiz/science" element={<Science/>}></Route>
        <Route path="/quiz/technology" element={<Technology/>}></Route>
        <Route path="/quiz/history" element={<History/>}></Route>
        <Route path="/quiz/entertainment" element={<Entertainment/>}></Route>
        <Route path="/quiz/movie" element={<Movie/>}></Route>
        <Route path="/quiz/sports" element={<Sports/>}></Route>
        <Route path="/quiz/general" element={<General/>}></Route>
       
      </Routes>
      </div>
    </>
  )
}

export default App