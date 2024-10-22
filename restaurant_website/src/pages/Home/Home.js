import React, { useState } from 'react'
import './Home.css'
import Header from '../../Component/Header/Header'
const Home = ({setmenu, menu}) => {
  
  return (
    <div>
        <Header setmenu={setmenu} menu={menu}/>
    </div>
  )
}

export default Home