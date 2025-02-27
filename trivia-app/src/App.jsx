import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import Signup from './pages/Signup';
import Login from './pages/Login';
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
     
      </Routes>
      </div>
    </>
  )
}

export default App