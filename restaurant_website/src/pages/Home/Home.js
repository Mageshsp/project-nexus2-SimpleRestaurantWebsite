import React, { useState } from 'react'
import './Home.css'
import Header from '../../Component/Header/Header'
import HomeVideo from '../../Component/HomeVideo/HomeVideo'
const Home = ({setmenu, menu}) => {
  
  return (
    <div>
      <HomeVideo/>
      <Header setmenu={setmenu} menu={menu}/>
    </div>
  )
}

export default Home