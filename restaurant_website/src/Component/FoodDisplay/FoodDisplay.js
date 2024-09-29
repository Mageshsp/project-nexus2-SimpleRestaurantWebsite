import { useContext } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import { StoreContext } from '../../Context/StoreContext';
const FoodDisplay = ({category}) => {
  const {food_list}=useContext(StoreContext);
  return (
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
  )
}

export default FoodDisplay