import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {

  },
  removeItem: (id) => {}
});

function cartReduser(state, action){
  if (action.type === 'ADD_ITEM'){
    const existingCartItemIn = state.items.findIndex((item) => item.id === action.item.id);

    const updatedItems = [...state.items];

    if(existingCartItem > -1){
      const existingItem = state.items[existingCartItemIn]
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1
      };
      updatedItems[existingCartItemIn] = updatedItem;
    } else {
      updatedItems.push({...action.item, quantity: 1})
    }

    return {...state, items: updatedItems };
  }

  if (action.type === 'REMUVE_ITEM'){

  }

  return state;
}

export function CartContextProvider({ children }){
  useReducer(cartReduser, {items: []});

  return <CartContext.Provider>
{children}
  </CartContext.Provider>
}

export default CartContext;