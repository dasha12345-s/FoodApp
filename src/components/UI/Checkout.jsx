import CartContext from "../../store/CartContext";
import Modal from "./Modal";
import { useContext } from "react";
import { currencyFormatter } from "../../util/formatting";
import Input from "./Input.jsx";
import Button from "./Button";
import UserProgresContext from "../../store/UserProgresContext";
import useHttp from "../../hooks/useHttp";
import Error from "../Error.jsx";

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

export default function Checkout(){

 const cartCtx  = useContext(CartContext);
 const userProgressCtx = useContext(UserProgresContext)

const {data, isLoading: isSending, error, sendRequest, clearData} = useHttp('http://localhost:3000/orders', requestConfig)

 const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price , 0);

 function handleClose(){
  userProgressCtx.hideCheckout();
 }

 function handleFinish(){
  userProgressCtx.hideCheckout();
  cartCtx.clearCart();
  clearData();
 }

 function handleSubmit(event){
  event.preventDefault();

  const fd = new FormData(event.target);
  const customerData = Object.fromEntries(fd.entries());

  sendRequest( JSON.stringify({
    order: {
      items: cartCtx.items,
      customer: customerData
    }
  })
  );
 };

 let actions = (
  <>
  <Button type='button' textOnly onClick={handleClose}>Close</ Button>
   <Button>Submit Order</Button>
  </>
 );

 if (isSending){
  actions = <spen> Sending order data...</spen>
 }

 if (data &&  !error){
  return <Modal open={userProgressCtx.process === 'checkout'} onClose={handleFinish}>
    <h2>Success!</h2>
    <p>Order was submitted</p>
    <p className="modal-actions">
    <Button onClick={handleFinish}>OKAY</Button>
    </p>
  </Modal>
 }

  return(
    <Modal className='modal cart' open={userProgressCtx.process === 'checkout'} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p >Total Amount: {currencyFormatter.format(cartTotal)}</p>
        
        <Input label='Full Name' type='text' id='name'/>
        <Input label='E-Mail Address' type='email' id='email'/>
        <Input label='Street' type='text' id='street'/>
        <div className="control-row">
        <Input label='Postal Code' type='text' id='postal-code'/>
        <Input label='City' type='text' id='city'/>
        </div>

        {error && <Error title='Faild to submit order' message={error} />}
        <p className="modal-actions">
          {actions}
        </p>
      </form>
    </Modal>
  )
}