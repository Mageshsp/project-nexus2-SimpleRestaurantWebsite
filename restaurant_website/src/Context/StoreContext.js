import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
export const StoreContext = createContext(null)

export const StoreContextProvider = (props)=>{
    const [cartItem,setcartItem]=useState(()=>{
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : {};
    })

    useEffect(() => {
        // Save cartItem to localStorage whenever it changes
        localStorage.setItem("cart", JSON.stringify(cartItem));
    }, [cartItem]);
    

    const addtocart=(itemid)=>{
        if(!cartItem[itemid]){
            setcartItem((prev)=>({...prev,[itemid]:1}))
        }
        else{
            const currentQuantity=cartItem[itemid] || 0;
            if(currentQuantity<5) {
                setcartItem((prev)=>({...prev,[itemid]:prev[itemid]+1}))
            }
            
        }
    }
    const removetocart=(itemid)=>{
        if(!cartItem[itemid]){
            setcartItem((prev)=>({...prev,[itemid]:1}))
        }
        else{
            setcartItem((prev)=>({...prev,[itemid]:prev[itemid]-1}))
        }
    }
    const getTotalAmount = ()=>{
        let totalAmount=0;
        for(const item in cartItem){
            if(cartItem[item]>0)
            {
                let itemInfo=food_list.find((product)=>product._id === item);
                totalAmount +=itemInfo.price * cartItem[item];
            }
            
        }
        return totalAmount;
    }

    const contextValue ={
        food_list,
        cartItem,
        setcartItem,
        addtocart,
        removetocart,
        getTotalAmount
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider