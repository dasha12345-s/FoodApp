import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {}
});

function cartReduser(state, action){
  if (action.type === 'ADD_ITEM'){
    const existingCartItemIn = state.items.findIndex((item) => item.id === action.item.id);

    const updatedItems = [...state.items];

    if(existingCartItemIn > -1){
      const existingItem = state.items[existingCartItemIn]
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIn] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 })
    }

    return {...state, items: updatedItems };
  }

  if (action.type === 'REMOVE_ITEM'){
    const existingCartItemIn = state.items.findIndex(
      (item) => item.id === action.id);
      const existingCartItem = state.items[existingCartItemIn];
      
      const updatedItems = [...state.items];

      if(existingCartItemIn === 1){

        updatedItems.splice(existingCartItemIn, 1);
      } else {
        const updatedItem = {...existingCartItem,
           quantity: existingCartItem.quantity - 1
          };
        updatedItems[existingCartItemIn] = updatedItem;
      }

      return {...state, items: updatedItems };
  }

  return state;
}

export function CartContextProvider({ children }){
  const [cart, dispatchCart] = useReducer(cartReduser, {items: []});

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem
  }

  function addItem(item){
    dispatchCart({ type: 'ADD_ITEM', item })
  };
  function removeItem(id){
    dispatchCart({ type: 'REMOVE_ITEM', id })
  };

  console.log(cartContext);

  return(
    <CartContext.Provider value={cartContext}>
    {children}
  </CartContext.Provider>
  ) 
}

export default CartContext;