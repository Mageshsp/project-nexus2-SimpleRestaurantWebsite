
import React, { useState } from 'react'
import Nav from './Component/Navigation/Nav'
import Home from './pages/Home/Home'
import { Route, Router, Routes } from 'react-router-dom'
import Footer from './Component/Footer/Footer'
import Login from './Component/Login/Login'
import CartItems from './pages/CartItems/CartItems'
import CustomerDetails from './pages/CustomerDetails/CustomerDetails'

const App = () => {
  const [login,setlogin]=useState(false)
  const [isLogged,setisLogged] =useState(false)

  return (
   <>
   {login?<Login setlogin={setlogin} setisLogged={setisLogged}/>:<></>}
    <div className='app'>
      <Nav setlogin={setlogin}  isLogged={isLogged}  />
        <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Cart' element={<CartItems/>}/>
        <Route path='/Profile' element={<CustomerDetails/>}/>
        </Routes>
    </div>
    <Footer/>
   </>
  )
}

export default App