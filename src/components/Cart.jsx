import { useContext } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button.jsx";
import UserProgresContext from "../store/UserProgresContext.jsx";
import CartItem from "./UI/CartItem.jsx";

export default function Cart(){

 const cartCtx = useContext(CartContext)
 const userProgressCtx = useContext(UserProgresContext);

 const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price , 0);

function handleCloseCart(){
  userProgressCtx.hideCart();
}

function handleGoToCheckout(){
  userProgressCtx.showCheckout();
};

  return(
    <Modal className="cart" open={userProgressCtx.process === 'cart'} onClose={userProgressCtx.process === 'cart' ? handleCloseCart : null}>
      <h2>Your cart</h2>
      <ul>
        {cartCtx.items.map(item => (
        <CartItem 
        key={item.id} 
        item={item}
        onIncrease={() => cartCtx.addItem(item)}
        onDecrease={() => cartCtx.removeItem(item.id)}
        />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>Close</Button>
        {cartCtx.items.length > 0 && (<Button onClick={handleGoToCheckout}>Go to Checkout</Button>)}
      </p>
    </Modal>
  )
}