import React from 'react'
import "./Subtotal.css"
import CurrencyFormat from "react-currency-format"
import { useStateValue } from "./StateProvider"
import { getBasketTotal } from './Reducer'
import { useHistory } from "react-router-dom"
function Subtotal() {
    const [{ basket }, { price }, dispatch] = useStateValue();
    console.log(basket)
    const history = useHistory()
    let config = {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
      }
    const checkout=()=>{
        if(config.headers.Authorization === 'Bearer null'){
            alert("Login first to checkout") 
            history.push('/login')
        }
        else if(basket.length>0 ){
        history.push('/orderplaced')
        }
        else{
            alert("Please add product first")
            
            history.goBack()
        }
    }
    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                SubTotal ({basket.length} items):
                <strong>{value}</strong>
                        </p>
                        <small className="subtotal_gift">
                            <input type="checkbox" />This order Contains a Gift
                </small>
                    </>

                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rs:"}
            />{console.log(basket)}
            <button onClick={checkout}>Proceed to Checkout</button>

        </div>
    )
}

export default Subtotal
