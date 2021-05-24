import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom"
import { useStateValue } from "../StateProvider"
import axios from '../../src/axios/instance'
import { confirmAlert } from 'react-confirm-alert';
import Grid from "@material-ui/core/Grid"
import Header from "../Header"
import Footer from "../footer"
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    marginTop: 20,
    marginLeft: 20
  },
  media: {

    height: 400,
  },
  align: {
    display: 'flex',
    flexDirection: 'row',
  }, expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

function ProductbyTypes(props) {
  const [state, dispatch] = useStateValue();
  const history = useHistory()
  const classes = useStyles();
  const [items, setItems] = useState([])
  const search = localStorage.getItem('search')
  const [high, setHigh] = useState()
  const [low, setLow] = useState()
  let config = {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    }
  }

  const url1 = history.location.pathname
  const urlindex = history.location.pathname.lastIndexOf('/')
  const newUrl = url1.slice(0, urlindex)
  useEffect(() => {
    if (newUrl === '/products') {
      axios.get(`${history.location.pathname}`)
        .then(resp => {

          setItems(resp.data)
          window.scrollTo(0, 0);
        })
        .catch(error => console.log(error))
    }
    else {
      axios.get(`/productstitle/${search}`)
        .then(resp => {
          {
            setItems(resp.data)
          }
        })
        .catch(error => console.log(error))
    }
  }, []);

  const url = history.location.pathname.lastIndexOf('/')
  const product = history.location.pathname.slice(url)
  const addToBasket = (item1, index) => {
    const alreadyInBasket = state.basket.some(item => item.id === item1._id);
    if (alreadyInBasket) {
      console.log("we are in")
      if (item1.stock > 0) {
        axios.get(`product/addtocart/${item1._id}`).then(resp => {
          let updatedItems = [...items];
          updatedItems[index] = resp.data;
          setItems(updatedItems)
        })

        dispatch({
          type: "UPDATE_QUANTITY",
          id: item1._id,
          quantity: 1,
          stock: item1.stock,

        })
        return;
      }
    }
    if (item1.stock > 0) {
      axios.get(`product/addtocart/${item1._id}`).then(resp => {
        let updatedItems = [...items];
        updatedItems[index] = resp.data;
        setItems(updatedItems)
      })
      console.log(item1.stock)
      dispatch({
        type: "ADD_TO_CART",
        item: {
          id: item1._id,
          title: item1.title,
          image: item1.image,
          price: Math.floor(item1.price - item1.price * (item1.offer / 100)),
          Description: item1.Description,
          producttype: item1.producttype,
          stock: item1.stock,
          quantity: 1
        }
      })

    } else {
      confirmAlert({
        title: 'Out Of Stock',
        message: 'Item you are trying to purchase is Out of Stock.We will send you mail once it will be back',
        buttons: [{
          label: 'Ok',
          onClick: () => { }
        }
        ]
      })
    }

  }
  const range = () => {
    axios.get(`/filter${product}/?min=${low}&max=${high}`).then(resp => {
      setItems(resp.data)
    })
  }

  const setFilteration = (e) => {
    if (e.target.value === "High to Low Price") {
      axios.get(`/producttype${product}/highprice`).then(resp => { setItems(resp.data) })
        .catch(e => alert("Product not found"))
    } if (e.target.value === "Low to High Price") {
      axios.get(`/producttype${product}/lowprice`).then(resp => {
        setItems(resp.data)

      })
    } if (e.target.value === "Most Liked") {
      axios.get(`/producttype${product}/mostliked`)
        .then(resp => setItems(resp.data))
        .catch(e => alert("no product found"))
    } if (e.target.value === "Offers") {
      axios.get(`/producttype${product}/offers`).then(resp => { setItems(resp.data) })
        .catch(e => alert("Product not found"))
    }
  }
  const abc = (item) => {
    history.push(`/product/${item._id}`)
  }
  return (


    <div>
      <Header/>
      { newUrl === '/products' && (
        <>
          <select variant="contained" color="blue" style={{ height: "30px", color: "black", width: "180px", marginTop: '15px', marginLeft: "30%", marginRight: "30px" }} onChange={setFilteration}>
            <option>Select Options</option>
            <option >Low to High Price</option>
            <option  >Most Liked</option>
            <option >High to Low Price</option>
            <option >Offers</option>
          </select>
           Select Range :
          <input type="number" placeholder="Min" style={{ width: "100px", marginLeft: "10PX", }} onChange={e => setLow(e.target.valueAsNumber)} />
          <input type="number" placeholder="Min" style={{ width: "100px", marginLeft: "10PX" }} onChange={e => setHigh(e.target.valueAsNumber)} />
          {low >= 0 && low < high && <Button onClick={() => range()}>GO</Button>}{console.log(high)}&nbsp;
          {(low < 0 || low > high) && <h4 style={{ color: "red", marginLeft: "50%" }}>Please enter correct values</h4>}

        </>)
      }
      {items.length === 0 && (

        <img src="https://static-cse.canva.com/blob/133595/5.7ee9bab6.png" style={{ width: "70%", height: "80%", marginTop: "10%", marginLeft: "15%", marginRight: "15%", marginBottom: "10%", }} onClick={() => { history.push('/') }} />
      )}
      {
        items && items.map((item, index) => {
          return (
            <Card name={item._id} key={item._id} className={classes.root}>
              <CardActionArea>
                <CardContent  ><Grid style={{
                  display: "flex",
                  flexDirection: "row",
                }}> <img src={item.image} style={{
                  display: "flex",
                  flexDirection: "row",
                  objectfit: "contain",
                  width: '200px',
                  height: '200px',
                }} onClick={() => abc(item)} /><Grid style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "40px",
                  marginBottom: "0px",
                }}>
                    <Typography gutterBottom variant="h5" component="h2" onClick={() => abc(item)}>
                      {item.title.length > 80 ? item.title.slice(0, 80) + "..." : item.title}
                    </Typography>

                    <p>Likes:{item.like}</p>

                    <Typography variant="body2" component="p" variant="h6"  >
                      ₹<strong style={{ color: "red" }}>{item.afterDis ? item.afterDis : Math.floor(item.price - item.price * (item.offer / 100))} </strong><small><del>{item.price}₹</del></small>
                    </Typography>
                    <Typography variant="body2"   >
                      ({item.offer}%)
                       </Typography>
                      Save extra with No Cost EMI
                      {(
                      item.stock > 4 &&
                      <Typography>Available in stock</Typography>
                    )}

                    {(item.stock < 5 && item.stock > 0) &&
                      <Typography style={{ color: "red" }}>
                        <strong> Hurry up Only {item.stock} Left in Stock</strong>
                      </Typography>
                    }
                    {item.stock === 0 &&
                      <Typography style={{ color: "red" }}>
                        <strong> Out of Stock</strong>
                      </Typography>
                    }
                    <p style={{ position: "absolute", bottom: "60px" }}> Free Delivery on order above 500</p>
                    <br />
                    <CardActions>
                      <Button variant="contained" onClick={() => addToBasket(item, index)} style={{ width: "200px", position: "absolute", bottom: "20px", backgroundColor: "#f0c14b", border: "1px solid", marginTop: "10px", borderColor: "#a88734 #9c7e31 #846a29", color: "#111" }}>Add to Cart</Button>

                    </CardActions>
                  </Grid>
                </Grid>
                </CardContent>
              </CardActionArea>
              
            </Card>
          )
        })
      }
      <Footer/>
    </div>
  )
}
export default ProductbyTypes