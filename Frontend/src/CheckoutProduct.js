import React from 'react'
import "./CheckoutProduct.css"
import { useStateValue } from './StateProvider';
function CheckoutProduct(props) {
   const[{basket},dispatch]=useStateValue()
    const { item } = props;
    console.log(item);
    const removeFromCart = (id) => {
        
        console.log("id", id);
        dispatch({
            type:"REMOVE_FROM_CART",
            payload:id,
        })
    }
    return (
        <div className="checkProduct">
            {/* <img className="checkoutProduct_image" src={item.image} alt="" /> */}
            <div className="checkoutProduct_info">
                <p className="checkoutProduct_title">{item.title}</p>
                <br/>
                <p className="checkoutProduct_price">
                    <small>Rs</small>
                    <strong>{item.price}</strong>
                </p><br></br>
                <p className="checkoutProduct_des" style={{fontWeight:700}}>Product Type:{item.producttype}</p>
                
                <p className="checkoutProduct_des">{item.Description.length>20 ? item.Description.slice(0,140)+'...' : item.Description}</p>
                <button onClick={() => removeFromCart(item._id)}>Remove from Cart</button>
                </div>

        </div>
    )
}

export default CheckoutProduct
