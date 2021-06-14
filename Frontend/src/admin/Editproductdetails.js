import React, { useState, useEffect } from 'react'
import axios from "../../src/axios/instance"
import "./addproduct.css"
import { Link, useHistory } from "react-router-dom"
import { confirmAlert } from 'react-confirm-alert';
import AdminHeader from "./adminHeader"
function Adminupdateproduct() {
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [Description, setDescription] = useState('');
  const [producttype, setproducttype] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImage] = useState('');
  const [errors, setErrors] = useState({})
  const [offer, setOffer] = useState('')
  const [stock, setStock] = useState("")

  let config = {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    }
  }

  const updateproduct = () => {
    const id = localStorage.getItem('id')
    console.log("stock",stock)

      confirmAlert({
        title: 'Updated Item',
        message: 'Are you sure regarding following Update.',

        buttons: [
          {
            label: 'Yes',
            style: { color: 'Red' },
            onClick: () => {axios.patch(`/admin/edit/${id}`, {
              title,
              Description,
              producttype,
              price,
              stock,
              offer
        
            }, config).then(resp=>
              console.log(resp.data),
              window.location.reload()
            )}
          },
          {
            label: 'No',
            onClick: () => {history.goBack() }
          }
        ]
      })
    
  }
  useEffect(() => {
    const id = localStorage.getItem('id')
    axios.get(`/product/getproduct/${id}`, config)
      .then(resp => {

        setTitle(resp.data[0].title)
        setDescription(resp.data[0].Description)
        setPrice(resp.data[0].price)
        setproducttype(resp.data[0].producttype)
        setOffer(resp.data[0].offer)
        setStock(resp.data[0].stock)
        console.log(resp.data[0].producttype)
      })
      .catch(error => console.log(error))

  }, []);
  return (

    <div>
      <AdminHeader/>
      <div className="header_Admin">
        <h2 >Edit Product</h2>
      </div>
      {errors.config && <h4 style={{ color: 'red' }}>{errors.config.message}</h4>}
      <form className="addproduct">
        <div className="divstyle" >
          Title:
          <input className="addproduct_container" type="text" value={title} onChange={e => setTitle(e.target.value)} />
          {errors.title && <h4 style={{ color: 'red' }}>{errors.title.message}</h4>}
          Description:
          <textarea className="addproduct_container" type="textarea" rows="4" cols="50" value={Description} placeholder="Product Details" onChange={e => setDescription(e.target.value)}></textarea>
          {errors.Description && <h4 style={{ color: 'red' }}>{errors.Description.message}</h4>}
        </div>
        <div >
          Price:
          <input className="addproduct_container" type="number" value={price} placeholder="Add Product Price" onChange={e => setPrice(e.target.value)}></input>
          {errors.price && <h4 style={{ color: 'red' }}>{errors.price.message}</h4>}
        </div>

        <div> Offer Percentage:<input className="addproduct_container" type="number" value={offer} onChange={e => setOffer(e.target.value)}></input>
          {errors.offer && <h4 style={{ color: 'red' }}>{errors.offer.message}</h4>}
        </div>

        <div>In Stock:<input className="addproduct_container" type="number" value={stock} onChange={e => setStock(e.target.value)}></input>
          {errors.stock && <h4 style={{ color: 'red' }}>{errors.stock.message}</h4>}
        </div>

        <label >Choose Product Type:</label>
        <div className="addproduct_container">

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
            <option value="clayproducts">Clat Products</option>
          </select>
          {errors.producttype && <h4 style={{ color: 'red' }}>{errors.producttype.message}</h4>}
        </div>



        <Link to='/AdminDashbord'>
          <button className="submit_addproduct" type="submit" onClick={() => updateproduct()} >Update Product </button>
        </Link>

      </form>


    </div>
  )
}

export default Adminupdateproduct
