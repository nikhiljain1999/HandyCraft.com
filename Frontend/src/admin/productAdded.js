import React, { useState,useEffect } from 'react'
import "./productadded.css"
import './addproduct.css'
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from "../../src/axios/instance"
import Productcollaps from "./griditem"
import AdminHeader from "./adminHeader"
function AddedItems() {
  const [title, getTitle] = useState("title")
  const [items, setItems] = useState([])

 
  let config = {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    }
  }
  useEffect(()=>{
    
    axios.get('/admin/getAddedidems', config)
      .then(resp => setItems(resp.data))
      .catch(error => console.log(error))
    console.log(title)
 },[]);
  return (
    
    <div>
      <Productcollaps items={items}/>
    </div>
  )
}

export default AddedItems
