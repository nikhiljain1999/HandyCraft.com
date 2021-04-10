import React, { useState ,useEffect} from 'react'
import axios from "axios"
import "./addproduct.css"
import { Link, useHistory } from "react-router-dom"
function  Adminupdateproduct() {
  // const history = useHistory()
  const [title, setTitle] = useState('')
  const [Description, setDescription] = useState('');
  const [producttype, setproducttype] = useState('');
  const [price, setPrice] = useState('');
  const [img,setImage]=useState('');
  const [errors, setErrors] = useState({})
  const [offer,setOffer]=useState('')
  
  
    let config = {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      }
    }
    
  const updateproduct = () => {
    // e.preventDefault()
    const id= localStorage.getItem('id')
    
    axios.patch(`http://localhost:3001/admin/edit/${id}`, {
      title,
      Description,
      producttype,
      price,
      offer
      
    }, config).then(
      alert("Product Updated Successfully")
    ).catch(error=>{
      console.log("error: ", error, error.response);
    })
  }
  useEffect(() => {
    const id= localStorage.getItem('id')
    axios.get(`http://localhost:3001/product/getproduct/${id}`, config)
      .then(resp =>{ 
        console.log(id)
        console.log(resp.data)
        setTitle(resp.data[0].title)
      setDescription(resp.data[0].Description)
      setPrice(resp.data[0].price)
      setproducttype(resp.data[0].producttype)
      console.log(resp.data[0].producttype)
    })
      .catch(error => console.log(error))

  }, []);
  return (

    <div>

      <div className="header_Admin">
        <h2 >Edit Product</h2>
      </div>
      {errors.config && <h4 style={{color: 'red'}}>{errors.config.message}</h4>}
      <form className="addproduct">
        <div >
          <input className="addproduct_container" type="text" value={title} placeholder={title} onChange={e => setTitle(e.target.value)}/>
          {errors.title && <h4 style={{color: 'red'}}>{errors.title.message}</h4>}
          <textarea className="addproduct_container" type="textarea" rows="4" cols="50" value={Description} placeholder="Product Details" onChange={e => setDescription(e.target.value)}></textarea>
          {errors.Description && <h4 style={{color: 'red'}}>{errors.Description.message}</h4>}
        </div>
        <div><input className="addproduct_container" type="number"  value ={price}placeholder="Add Product Price" onChange={e => setPrice(e.target.value)}></input>
        {errors.price && <h4 style={{color: 'red'}}>{errors.price.message}</h4>}
        </div>

        <div><input className="addproduct_container" type="number"  value ={offer}placeholder="Add Offers in%" onChange={e => setOffer(e.target.value)}></input>
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
            <option value="clayproducts">Clat Products</option>
          </select>
         
        </div>
        {errors.producttype && <h4 style={{color: 'red'}}>{errors.producttype.message}</h4>}
        </div>
        

        <input className="addproduct_container" type="file" value={img}name="filename" onChange={e => setImage(e.target.value) }/>
        {errors.img && <h4 style={{color: 'red'}}>{errors.img.message}</h4>}
        <div>
        <Link to='/AdminDashbord'>
          <button className="submit_addproduct" type="submit" onClick={()=>updateproduct()} >Update Product </button>
        </Link>
        </div>
      </form>


    </div>
  )
}

export default Adminupdateproduct
