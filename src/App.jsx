import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import './App.css'

// handling //
import Products from './/components/handling/Products' 
import Categories from './components/handling/Catgories'
import Users from './components/handling/Users'
import Authentification from './components/handling/Authentification';
export default function App() {
  return (
    <div className='grid-container'>
      <Sidebar />
      <div className="main-content-wrapper">
        <Navbar />
        {/* THE ROUTING LOGIC GOES HERE */}
        <div className="main-container">
          <Routes>
           <Route path ="/Dashboard" element={<Dashboard/>} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/Clients" element={<Users />} />
            <Route path="/Authentification" element={<Authentification/>} />
          </Routes>
        </div>
      </div>
    </div>
  )
}