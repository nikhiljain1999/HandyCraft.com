import React from 'react'
import "./Checkout.css"
import Subtotal from "./Subtotal"
import {useStateValue} from "./StateProvider"
import CheckoutProduct from "./CheckoutProduct"
import sale from "./assets/saveimg.jpg"
function Checkout() {
    const [{basket},dispatch]=useStateValue();
    return (
        <div className="checkout">
            <div className="temp">
                <div className="checkout_left">
                    <img className="checkout_ad" src={sale} alt=""/>
                </div>
                
                <div className="checkout_right">
                    <Subtotal />                
                </div>
            </div>
            <div>
                <h2 className="checkout_title">
                    Your Shopping Basket
                   {basket.map(items=>( <CheckoutProduct item={items}
                  />))}
                    {/*Basket*/ }
                {/*Basket*/ }
                {/*Basket*/ }
                {/*Basket*/ }
                </h2>
            </div>
        </div>
    )
}

export default Checkout
