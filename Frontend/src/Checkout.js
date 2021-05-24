import React from 'react'
import "./Checkout.css"
import Subtotal from "./Subtotal"
import {useStateValue} from "./StateProvider"
import CheckoutProduct from "./CheckoutProduct"
import Header from "./Header"
function Checkout() {
    const [{basket},dispatch]=useStateValue();
    let ids=[]
    for(let i=0;i<basket.length;i++){
        ids[i]=basket[i].id
    }
    console.log(ids)
    // console.log(ids)
   const obj=new Set(ids)
   console.log(obj)
    return (
        <>
        <Header/>
        <div className="checkout">
            <div className="temp">
                <div className="checkout_left">
                    <img className="checkout_ad" src="https://image.shutterstock.com/image-vector/3d-lettering-black-friday-mega-600w-705625765.jpg" alt=""/>
                </div>
                
                <div className="checkout_right">
                    <Subtotal />                
                </div>
            </div>
            <div>
                <h2 className="checkout_title">
                    Your Shopping Basket
                   {basket.map(items=>( <CheckoutProduct item={items} 
                  /> ))}
                  
                </h2>
                
            </div>
        </div>
        </>
    )
}

export default Checkout
