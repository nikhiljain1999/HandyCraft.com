import React, { useState } from 'react'
import axios from "axios"
import "./addproduct.css"
import { Link, useHistory } from "react-router-dom"
import { useTheme } from '@material-ui/core'
function Adminaddproduct() {
const history = useHistory()
  const [title, setTitle] = useState('')
  const [Description, setDescription] = useState('');
  const [producttype, setproducttype] = useState('');
  const [price, setPrice] = useState('');
  const [image,setImage]=useState('');
  const[offer,setOffer]=useState('')
  const [errors, setErrors] = useState({})
  
    let config = {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      }
    }
    
  const register = e => {
    e.preventDefault()
    axios.post('http://localhost:3001/admin/addproduct', {
      title,
      Description,
      producttype,
      price,
      offer,
      image
    }, config)
      .then(auth => {
        console.log(auth)
        
        alert("Submitted Successfully")
        setErrors({})
         history.push('/AdminDashbord')
      }).catch(error => {
        console.log(error)
        if(error.response.data.errors){
          setErrors(error.response.data.errors)
        }
      }
      
      )


  }
  return (

    <div>


      <div className="header_Admin">
        <h2 >ADD Product</h2>
      </div>
      {errors.config && <h4 style={{color: 'red'}}>{errors.config.message}</h4>}
      <form className="addproduct">
        <div >
          <input className="addproduct_container" type="text" value={title} placeholder="Product Ttile" onChange={e => setTitle(e.target.value)}/>
          {errors.title && <h4 style={{color: 'red'}}>{errors.title.message}</h4>}
          <textarea className="addproduct_container" type="textarea" rows="4" cols="50" value={Description} placeholder="Product Details" onChange={e => setDescription(e.target.value)}></textarea>
          {errors.Description && <h4 style={{color: 'red'}}>{errors.Description.message}</h4>}
        </div>
        <div><input className="addproduct_container" type="number"  value ={price}placeholder="Add Product Price" onChange={e => setPrice(e.target.value)}></input>
        {errors.price && <h4 style={{color: 'red'}}>{errors.price.message}</h4>}
        </div>
        <div><input className="addproduct_container" type="number"  value ={offer}placeholder="Add Offers in %" onChange={e => setOffer(e.target.value)}></input>
        {errors.offer && <h4 style={{color: 'red'}}>{errors.offer.message}</h4>}
        </div>
        <div>
        <div className="addproduct_container">
          <label >Choose Product Type:</label>
          <select onChange={e => setproducttype(e.target.value)}>
            <option value=""></option>
            <option value="woodenproducs">Wooden & Poetry Products</option>
            <option value="juteproducts">Jute Products</option>
            <option value="metalproducts">Metal Products</option>
            <option value="stoneproducts">Stone Products</option>
            <option value="leatherproducts">Leather Products</option>
            <option value="shellproducts">Shell Products</option>
            <option value="boneproducts">Bone Products</option>
            <option value="bamboo&cane">Bamboo & Cane Products</option>
            <option value="clayproducts">Clay Products</option>
          </select>
         
        </div>
        {errors.producttype && <h4 style={{color: 'red'}}>{errors.producttype.message}</h4>}
        </div>
        

        <input className="addproduct_container" type="file" value={image} name="filename" onChange={e => setImage(e.target.value) }/>
        {errors.image && <h4 style={{color: 'red'}}>{errors.image.message}</h4>}
        <div>
        <Link to='/AdminDashbord'  style={{textDecoration:"none"}}>
          <button className="submit_addproduct" type="submit" onClick={register} >Submit </button>
     
        </Link>
        </div>
      </form>
    </div>
  )
}

export default Adminaddproduct
