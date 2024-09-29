import React from 'react'
import './ExplorMenu.css'
import { menu_list } from '../../assets/assets'
const ExplorMenu = ({category,setcategory}) => {
  return (
    <div className='explor-menu' id='explor-menu'>
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
            })};
        </div>
        <hr/>
    </div>
  )
}

export default ExplorMenu