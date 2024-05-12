import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from "./UI/Button.jsx";
import CartContext from '../store/CartContext';
import UserProgresContext from '../store/UserProgresContext';

export default function Header(){

  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgresContext);

  const totalCartItems = cartCtx.items.reduce((totalNumOfItems, item) => {
    return totalNumOfItems + item.quantity;
  }, 0);

  function handleShowCart(){
    userProgressCtx.showCart();
  }

  return(
    <header id='main-header'>
    <div id='title'>
      <img src={logoImg} />
      <h1>ReactFoodApp</h1>
    </div>
    <nav>
      <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
    </nav>
  </header>
  ) 
}