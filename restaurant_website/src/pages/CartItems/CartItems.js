import React, { useContext } from 'react'
import './CartItems.css'
import { StoreContext } from '../../Context/StoreContext'
const CartItems = () => {
    const {cartItem,food_list,removetocart,getTotalAmount} = useContext(StoreContext);
  return (
    <div className='cart'> 
        <div className='cart-items'>
            <div className='cart-items-title'>
                <p>Items</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <br/>
            <hr/>
            {food_list.map((item,index)=>{
                if(cartItem[item._id]>0){
                    return(
                        <div>
                        <div className='cart-items-title cart-items-item' key={item._id}>
                            <img src={item.image} />
                           <p>{item.name}</p>
                           <p>₹{item.price}</p> 
                           <p>{cartItem[item._id]}</p>
                           <p>₹{item.price*cartItem[item._id]}</p>
                           <p onClick={()=>removetocart(item._id)} className='cross'>x</p>
                        </div>
                        <hr/>
                        </div>
                    );
                }
            })}
        </div>
        <div className='cart-bottom'>
            <div className='cart-total'>
                <h2>Cart Total</h2>
                <div className='cart-total-details'>
                    <p>Subtotal</p>
                    <p>₹{getTotalAmount()}</p>
                </div>
                <hr/>
                <div className='cart-total-details'>
                    <p>Delivery Fee</p>
                    <p>₹{getTotalAmount()===0?0:25}</p>
                </div>
                <hr/>
                <div className='cart-total-details'>
                    <p>Total</p>
                    <p>₹{getTotalAmount()===0?0:getTotalAmount()+20}</p>
                </div>
                <button>PROCEED TO PAYMENT</button>
            </div>
        </div>
    </div>
  )
}

export default CartItems