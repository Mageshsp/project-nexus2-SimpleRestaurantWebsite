import React from 'react'
import { useState, useContext } from 'react'
import FoodItem from '../../Component/FoodItem/FoodItem'
import { StoreContext } from '../../Context/StoreContext';
import './ExplorMenu.css'
import { menu_list } from '../../assets/assets'
    
const ExplorMenu = () => {
    const [category,setcategory]=useState("All");
    const {food_list}=useContext(StoreContext);
  return (
    <>
    <div className='explor-menu' id='explor-menu' >
        <h1>Explor our menu</h1>
        <p className='explor-menu-text'>Find your favorite dish from our extensive menu, offering a range of culinary delights.</p>
        <div className='explor-menu-list'>
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>setcategory(category=>category===item.menu_name?"All":item.menu_name)} key={index} className='explor-menu-list-item'>
                        <img src={item.menu_image} className={category===item.menu_name?"active":""}/>
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>

    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className='food-display-list'>
          {food_list.map((item,index)=>{
           
            if(category==="All"||category===item.category){
  
            return( 
              
            <FoodItem
             key={item._id} 
             id={item._id} 
             name={item.name} 
             price={item.price} 
             description={item.description} 
             image={item.image} />
            );
            }
          })}
        </div>
    </div>
    </>
  )
}

export default ExplorMenu