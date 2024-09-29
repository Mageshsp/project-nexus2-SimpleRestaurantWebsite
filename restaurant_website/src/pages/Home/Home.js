import React, { useState } from 'react'
import './Home.css'
import Header from '../../Component/Header/Header'
import ExplorMenu from '../../Component/ExplorMenu/ExplorMenu'
import FoodDisplay from '../../Component/FoodDisplay/FoodDisplay'
const Home = () => {
  const [category,setcategory]=useState("All");
  return (
    <div>
        <Header/>
        <ExplorMenu category={category} setcategory={setcategory}/>
        <FoodDisplay category={category} />
    </div>
  )
}

export default Home