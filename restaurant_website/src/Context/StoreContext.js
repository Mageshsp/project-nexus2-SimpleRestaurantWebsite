import { createContext, useState, useEffect } from "react";
import { food_list } from "../assets/assets";
export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
    const [cartItem, setCartItem] = useState(() => {
        const savedCart = localStorage.getItem("cartItem");
        return savedCart ? JSON.parse(savedCart) : {};
    });

    useEffect(() => {
        localStorage.setItem("cartItem", JSON.stringify(cartItem));
    }, [cartItem]);

    const addtocart = (itemid) => {
        if (!cartItem[itemid]) {
            setCartItem((prev) => ({ ...prev, [itemid]: 1 }));
        } else {
            const currentQuantity = cartItem[itemid] || 0;
            if (currentQuantity < 5) {
                setCartItem((prev) => ({ ...prev, [itemid]: prev[itemid] + 1 }));
            }
        }
    };

    const removetocart = (itemid) => {
        if (!cartItem[itemid]) {
            setCartItem((prev) => ({ ...prev, [itemid]: 1 }));
        } else {
            setCartItem((prev) => ({ ...prev, [itemid]: prev[itemid] - 1 }));
        }
    };

    const remove = (itemid) => {
        const { [itemid]: _, ...rest } = cartItem;
        setCartItem(rest);
    };

    const getTotalAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItem[item];
            }
        }
        return totalAmount;
    };

    const contextValue = {
        food_list,
        cartItem,
        setCartItem,
        addtocart,
        removetocart,
        getTotalAmount,
        remove,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;