import CartContext from "../../store/CartContext";
import Modal from "./Modal";
import { useContext } from "react";
import { currencyFormatter } from "../../util/formatting";
import Input from "./Input.jsx";
import Button from "./Button";
import UserProgresContext from "../../store/UserProgresContext";

export default function Checkout(){

 const cartCtx  = useContext(CartContext);
 const userProgressCtx = useContext(UserProgresContext)
 const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price , 0);

 function handleClose(){
  userProgressCtx.hideCheckout();
 }

  return(
    <Modal className='modal cart' open={userProgressCtx.process === 'checkout'} onClose={handleClose}>
      <form>
        <h2>Checkout</h2>
        <p >Total Amount: {currencyFormatter.format(cartTotal)}</p>
        
        <Input label='Full Name' type='text' id='full-name'/>
        <Input label='E-Mail Address' type='email' id='email'/>
        <Input label='Street' type='text' id='street'/>
        <div className="control-row">
        <Input label='Postal Code' type='text' id='postal-code'/>
        <Input label='City' type='text' id='city'/>
        </div>
        <p className="modal-actions">
          <Button type='button' textOnly onClick={handleClose}>Close</Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  )
}