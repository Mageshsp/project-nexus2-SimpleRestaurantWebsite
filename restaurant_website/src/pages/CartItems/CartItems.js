import React, { useContext } from 'react'
import './CartItems.css'
import { StoreContext } from '../../Context/StoreContext'
import emptyCart from '../../assets/emptyCart.jpeg'

import { Link } from 'react-router-dom';
const CartItems = () => {
    const {cartItem,food_list,addtocart,removetocart,getTotalAmount,remove} = useContext(StoreContext);
  return (
    <div className='cart'> 
        <div className='cart-items'>
            {food_list.some(item => cartItem[item._id] > 0) ? (
            <>
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
            </>):(
            <div className='no-cart'>
                <img src={emptyCart} />
                <p>Your cart is empty!!</p>
            </div>
            )
            }
            
            <div className='scroll-box'  style={{ overflowY: Object.values(cartItem).some(value => value >= 3) ? 'visible' : 'auto'}}>
                {food_list.map((item,index)=>{
                    if(cartItem[item._id]>0){
                        return(
                            <div>
                                <div className='cart-items-title cart-items-item' key={item._id}>
                                    <img src={item.image} />
                                    <p>{item.name}</p>
                                    <p >₹{item.price}</p> 
                                    <p className='quantity'><button onClick={()=>removetocart(item._id)} className='removes-btn btn'>-</button>{cartItem[item._id]}<button onClick={()=>addtocart(item._id)} className='adds-btn btn'>+</button></p>
                                    <p >₹{item.price*cartItem[item._id]}</p>
                                    <p onClick={()=>remove(item._id)} className='cross'>x</p>
                                </div>
                                <hr />
                            </div>
                           
                        );
                        
                    }
                    
                })}
            </div>
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
                <div className='cart-total-details total'>
                    <p>Total</p>
                    <p>₹{getTotalAmount()===0?0:getTotalAmount()+20}</p>
                </div>
                <Link to="/ConfirmPayment" ><button>PROCEED TO PAYMENT</button></Link>
            </div>
        </div>
    </div>
  )
}

export default CartItems