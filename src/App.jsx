import Cart from "./components/Cart.jsx";
import Header from "./components/Header.jsx";
import Meals from './components/Meals.jsx';
import Checkout from "./components/UI/Checkout.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgresContextProvider } from "./store/UserProgresContext.jsx";

function App() {
  return (
   <UserProgresContextProvider>
    `<CartContextProvider>
      <Header/>
      <Meals/>
      <Cart/>
      <Checkout/>
    `</CartContextProvider>
   </UserProgresContextProvider> 
  );
}

export default App;
