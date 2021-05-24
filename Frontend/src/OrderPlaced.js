import React from 'react'
import { useHistory } from "react-router-dom"
import Header from './Header'
function OrderPlaced() {
    const history=useHistory()
    const back=()=>{
        history.push('/')
    }
    return (
        <div>
            <Header/>
            <img  style={{width:'80%',height:"80%", marginLeft: "10%",marginRight: '5%',marginTop: '1%',}} onClick={()=>back()} src="https://d33v4339jhl8k0.cloudfront.net/docs/assets/5d63dd312c7d3a7a4d77a11a/images/5d8a95b22c7d3a7e9ae19348/847653.png"/>
        </div>
    )
}

export default OrderPlaced
