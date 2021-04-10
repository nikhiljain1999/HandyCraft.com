import React from 'react'
import './Product.css'
import {useHistory} from "react-router-dom"
function Product({title,image}) {
 
    const history =useHistory()
    const redirectTo=()=>{
        console.log(history.location.pathname)
        const url=title.replace(/\s/g, '');
        history.push(`/products/${url.toLowerCase()}`)
    }

    return (
        <div className="product" onClick={()=>redirectTo()}>
            <div className="product_Info">
            <strong>{title}</strong>
            </div>
            <img src={image} alt=""/>
            <button  >Check Products</button>
        </div>
    )
}

export default Product
