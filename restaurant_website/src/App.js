
import React, { useState } from 'react'
import Nav from './Component/Navigation/Nav'
import Home from './pages/Home/Home'
import { Route, Router, Routes } from 'react-router-dom'
import Footer from './pages/Footer/Footer'
import Login from './Component/Login/Login'
import CartItems from './pages/CartItems/CartItems'
import CustomerDetails from './pages/CustomerDetails/CustomerDetails'
import ExplorMenu from './pages/ExplorMenu/ExplorMenu'

const App = () => {
  const [login,setlogin]=useState(false)
  const [isLogged,setisLogged] =useState(false)
  const [menu,setmenu]=useState("Home")

  return (
   <>
   {login?<Login setlogin={setlogin} setisLogged={setisLogged} />:<></>}
    <div className='app'>
      <Nav setlogin={setlogin} isLogged={isLogged} menu={menu} setmenu={setmenu}  />
        <Routes>
        <Route path='/' element={<Home menu={menu} setmenu={setmenu} />}/>
        <Route path='/Menu' element={<ExplorMenu/>}/>
        <Route path='/Cart' element={<CartItems/>}/>
        <Route path='/Profile' element={<CustomerDetails/>}/>
        <Route path='/Contact' element={<Footer/>}/>
        </Routes>
    </div>
    <Footer/>
   </>
  )
}

export default App