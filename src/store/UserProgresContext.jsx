import { createContext, useState } from "react";

const UserProgresContext = createContext({
  process: '',
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {}
});

export function UserProgresContextProvider({children}) {
  const [userProgress, setUserProgress] = useState('');

  function showCart(){
    setUserProgress('cart');
  }

  function hideCart(){
    setUserProgress('');
  }

  function showCheckout(){
    setUserProgress('checkout');
  }

  function hideCheckout(){
    setUserProgress('');
  }

  const userProgressCtx = {
    process: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout
  };

  return(
    <UserProgresContext.Provider value={userProgressCtx}>
      {children}
      </UserProgresContext.Provider>
  ) 
}

export default UserProgresContext;