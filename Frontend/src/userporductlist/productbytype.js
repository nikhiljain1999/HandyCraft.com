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
import axios from "axios"
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import Box from '@material-ui/core/Box';
const useStyles = makeStyles({
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
  }
});

function ProductbyTypes(props) {
  const [state, dispatch] = useStateValue();
  const history = useHistory()
  const classes = useStyles();
  const [items, setItems] = useState([])
  const search = localStorage.getItem('search')
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
      axios.get(`http://localhost:3001${history.location.pathname}`)
        .then(resp => {
          setItems(resp.data)
          localStorage.removeItem('search')
        })
        .catch(error => console.log(error))
    }
    else {
      axios.get(`http://localhost:3001/product/${search}`)
        .then(resp => {
          {
            setItems(resp.data)
          }
        })
        .catch(error => console.log(error))
    }
  }, []);
  const liked = (item1, index) => {
    axios.get(`http://localhost:3001/product/like/${item1._id}`, config).then(resp => {
      console.log(resp.data)
      // setItems(resp.data) 
      let updatedItems = [...items];
      updatedItems[index] = resp.data;
      setItems(updatedItems)
    })
      .catch(error => {
        alert("Cannot like please Login First")
        history.push("/login")
      }
      )
  }
  const disliked = (item1, index) => {
    axios.get(`http://localhost:3001/product/dislike/${item1._id}`, config).then(resp => {
      let updatedItems = [...items];
      updatedItems[index] = resp.data;
      setItems(updatedItems)
    })
      .catch(error => {
        alert("Cannot Dislike please Login First")
        history.push("/login")
      }
      )
  }
  const url = history.location.pathname.lastIndexOf('/')
  const product = history.location.pathname.slice(url)
  const mostliked = () => {

    axios.get(`http://localhost:3001/producttype${product}/mostliked`)
      .then(resp => setItems(resp.data))
      .catch(e => alert("no product found"))
  }
  const lessprice = () => {
    axios.get(`http://localhost:3001/producttype${product}/lowprice`).then(resp => {
      setItems(resp.data)

      console.log(product)
    })
      .catch(e => alert("Product not found"))
  }
  const highprice = () => {
    axios.get(`http://localhost:3001/producttype${product}/highprice`).then(resp => { setItems(resp.data) })
      .catch(e => alert("Product not found"))
  }
  const offerprice = () => {
    axios.get(`http://localhost:3001/producttype${product}/offers`).then(resp => { setItems(resp.data) })
      .catch(e => alert("Product not found"))
  }

  const discount = (item1, index) => {
    let dis = item1.price * (item1.offer / 100)
    const updatedItems = [...items];
    console.log(index)
    updatedItems[index] = {
      ...updatedItems[index],
      afterDis: Math.floor(item1.price - dis)
    }
    console.log(updatedItems)
    setItems(updatedItems)

  }

  const addToBasket = (item1) => {

    if (config.headers.Authorization === 'Bearer null') {
      alert("Please Login First")
      history.push("/login")
    } else {
      dispatch({
        type: "ADD_TO_CART",

        item: {
          id: item1._id,
          title: item1.title,
          price: item1.afterDis ? item1.afterDis : item1.price,
          Description: item1.Description,
          producttype: item1.producttype
        }
      })

    }
  }
  
  return (
    <div>
      { newUrl === '/products' && (
        <>
          <Button variant="contained" color="blue" style={{ height: "30px", color: "black", width: "180px", marginTop: '15px', marginLeft: "70px" }} onClick={lessprice}>Low to High Price</Button>
          <Button variant="contained" color="blue" style={{ height: "30px", color: "black", width: "180px", marginTop: '15px', marginLeft: "70px" }} onClick={mostliked}>Most Liked</Button>
          <Button variant="contained" color="blue" style={{ height: "30px", color: "black", width: "180px", marginTop: '15px', marginLeft: "70px" }} onClick={highprice}>High to Low Price</Button>
          <Button variant="contained" color="blue" style={{ height: "30px", color: "black", width: "180px", marginTop: '15px', marginLeft: "70px" }} onClick={offerprice}>Offers</Button>
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
                <CardContent >
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.title}
                  </Typography>
                  <br></br>
                  <Typography variant="body2" component="h4" variant="h6">
                    <strong> Product Description:</strong>{item.Description}
                  </Typography>
                  <br></br>
                  <br></br>
                  <Typography variant="body2" component="p" variant="h6"  >
                    <strong>Price:</strong>{item.price}₹
          </Typography>
                  <Typography variant="body2" component="p" variant="h6"  >
                    <strong>Offered Price:</strong>{item.afterDis ? item.afterDis : item.price}₹
          </Typography>
                  <Typography variant="body2" component="p" variant="h6"  >
                    <strong>Discount:</strong>{item.offer}%
          </Typography>
                  <Typography variant="body2" component="h4" variant="h6">
                    <strong> Product Type:</strong>{item.producttype}
                  </Typography>
                  <br></br>
                  <Typography variant="body2" component="h4" >
                    <ThumbUpAltIcon onClick={() => liked(item, index)} style={{ color: "blue" }}></ThumbUpAltIcon>
                    <ThumbDownAltIcon onClick={() => disliked(item, index)} style={{ color: "blue", marginLeft: "40px" }}></ThumbDownAltIcon>
                  </Typography>

                  <Typography variant="body2" component="h4"  >
                    <Box component="div" display="inline" style={{ marginLeft: '5px' }}>{item.like}</Box>
                    <Box component="div" display="inline" style={{ marginLeft: '55px' }}>{item.dislike}</Box>
                    <h6> </h6>
                    <h6 style={{ marginLeft: "50px" }}> </h6>
                  </Typography>
                  <br />
                  <Button onClick={() => discount(item, index)}>Click To Check Offers</Button>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button color="primary" onClick={() => addToBasket(item)} style={{ marginLeft: "45%" }}>Add to Cart</Button>
              </CardActions>
            </Card>
          )
        })
      }
    </div>
  )
}
export default ProductbyTypes