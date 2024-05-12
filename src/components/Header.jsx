import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from "./UI/Button.jsx";
import CartContext from '../store/CartContext';

export default function Header(){

  const cartCtx = useContext(CartContext);

  const totalCartItems = cartCtx.items.reduce((totalNumOfItems, item) => {
    return totalNumOfItems + item.quantity;
  }, 0);

  return(
    <header id='main-header'>
    <div id='title'>
      <img src={logoImg} />
      <h1>ReactFoodApp</h1>
    </div>
    <nav>
      <Button textOnly>Cart ({totalCartItems})</Button>
    </nav>
  </header>
  ) 
}