import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';
const FoodItem = ({id,name,price,description,image}) => {
    // const [countItem,setcountItem]=useState(0);
    const {cartItem,addtocart,removetocart}=useContext(StoreContext)
  return (
    <div className='food-item'>
        <div className='food-item-img-container'>
            <img className='food-item-img' src={image}></img>
            {!cartItem[id]?<img className='add' onClick={()=>addtocart(id)} src={assets.add_icon_white}/>
            :<div className='food-item-counter'>
                <img onClick={()=>removetocart(id)} src={assets.remove_icon_red}/>
                <p>{cartItem[id]}</p>
                <img onClick={()=>addtocart(id)} src={assets.add_icon_green}/>
            </div> }
        </div>
        <div className='food-item-info'>
            <div className='food-item-name-rating'>
                <p>{name}</p>
                <img src={assets.rating_starts}></img>
            </div>
            <p className='food-item-des'>{description}</p>
            <p className='food-item-price'>Rs.{price}</p>
        </div>
    </div>
  )
}

export default FoodItem