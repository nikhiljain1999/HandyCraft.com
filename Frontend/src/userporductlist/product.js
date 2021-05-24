import React, { useState, useEffect } from 'react'
import Grid from "@material-ui/core/Grid"
import CardActionArea from "@material-ui/core/CardActionArea"
import { useHistory } from "react-router-dom"
import axios from "../../src/axios/instance"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Test from "./testrandom"
import { Checkbox, TextField } from '@material-ui/core'
import { useStateValue } from "../StateProvider"
import { confirmAlert } from 'react-confirm-alert';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ScrollUpButton from "react-scroll-up-button"
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import ImageZoom from 'react-medium-image-zoom'
import AddBoxIcon from '@material-ui/icons/AddBox';
import Header from "../Header"
import Footer from "../footer"

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Product=() =>{
  const classes = useStyles();
  const [state, dispatch] = useStateValue();
  const history = useHistory()
  const [item, setItem] = useState('')
  const [images,setImage]=useState('')
  const [commentonproduct, setComment] = useState('')
  const [errors, setErrors] = useState({})
  const [quantity ,setQuant]=useState(1)
  
  let config = {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    }
  }
  useEffect(() => {
    axios.get(`${history.location.pathname}`)
      .then(resp => {
        
        setItem(resp.data)
        
        // window.scrollTo(0, 0);
      })
      .catch(error => console.log(error))
  })

  const addToBasket = (item1) => {
    console.log("this is state",state)
    const alreadyInBasket=state.basket.some(item=> item.id===item1._id);
    if(alreadyInBasket){
      console.log("we are in")
      if (item1.stock > 0) {
        axios.get(`product/addtocart/${item1._id}`)
          
      dispatch({
        type: "UPDATE_QUANTITY",
        id:item1._id,
        quantity:quantity,
        stock: item1.stock,
      
      })
      return ;
    }}
    if (item1.stock > 0) {
      axios.get(`product/addtocart/${item1._id}`)
      dispatch({
        type: "ADD_TO_CART",
        item: {
          id: item1._id,
          title: item1.title,
          image: item1.image,
          price: Math.floor(item1.price - item1.price * (item1.offer / 100))*quantity,
          Description: item1.Description,
          producttype: item1.producttype,
          stock: item1.stock,
          quantity:quantity
        }
      })

    }
    else {
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
  const liked = (item1) => {
    axios.get(`/product/like/${item1._id}`, config).then(resp => {
      console.log(resp.data)
      let updatedItems = resp.data;

      setItem(updatedItems)
    })
      .catch(error => {
        alert("Cannot like please Login First")
        history.push("/login")
      }
      )
  }
  const disliked = (item1) => {
    axios.get(`/product/dislike/${item1._id}`, config).then(resp => {
      console.log(resp.data)
      let updatedItems = resp.data;

      setItem(updatedItems)
    })
      .catch(error => {
        alert("Cannot like please Login First")
        history.push("/login")
      }
      )
  }
  const postcomment = (item) => {
    if (config.headers.Authorization === 'Bearer null') {
      alert("Please Login First")
      history.push("/login")
    }
    const comment = commentonproduct
    axios.post(`/product/comment/${item._id}`, {
      comment
    }, config)
      .then(resp => {
        let updatedItems = [...item];
        updatedItems.comments[updatedItems.comments.length] = resp.data;
        console.log(updatedItems)
        setItem(resp.data)
        alert("Submitted Successfully")
        setErrors({})
      }).catch(error => {
        console.log(error)
        if (error.response.data.errors) {
          setErrors(error.response.data.errors)
        }
      }
      )
  }
  const deletecomment = ( comment) => {
    if (config.headers.Authorization === 'Bearer null') {
      alert("Please Login First")
      history.push("/login")
    }
    else {
      confirmAlert({
        title: 'Conform To Delete',
        message: 'Are you sure you want to delete.',

        buttons: [
          {
            label: 'Delete',
            style: { color: 'Red' },
            onClick: () => {
              axios.delete(`/comment/${comment._id}`, config)
                .then(resp => {
                  let updatedItems =resp.data
                  setItem(updatedItems)
                }).catch(e => {
                  alert("Cannot Delete Comment of Others")
                })
            }
          },
          {
            label: 'No',
            onClick: () => { }
          }
        ]
      })
    };
  }
  const abc=(img)=>{
    setImage(img)
  }
  const updatequent=(item1)=>{
    if (item1.stock > 0){
    axios.get(`product/addtocart/${item1._id}`).then(resp => {
      let total =Number(quantity)+1
      setQuant(total)})}
      else {
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
  const deletequent=(item1)=>{
    let total =Number(quantity)
    if(total <= 1){
     return  setQuant("1")
    }
    axios.get(`/product/removefromcart/${item1._id}`).then(resp=>{
      total =Number(quantity)-1
      setQuant(total)
    })
    
  }

  return (
    <Card name={item._id} key={item._id} className={classes.root}>
      <Header/>
      <CardActionArea>
        <CardContent  ><Grid style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "40px"
        }}>
          <Grid style={{
          display: "flex",
          flexDirection: "column",
          
        }}><img src={item.image} onMouseOver={()=>abc(item.image) }style={{
          marginTop: "20px",
          marginLeft: "10px",
          display: "flex",
          flexDirection: "row",
          objectfit: "contain",
          width: '40px',
          height: '40px',
          border: "0.5px solid black"
        }} />
        <img src={item.image1} onMouseOver={()=>abc(item.image1)} style={{
          marginTop: "30px",
          marginLeft: "10px",
          display: "flex",
          flexDirection: "row",
          objectfit: "contain",
          width: '40px',
          height: '40px',
          border: "0.5px solid black"
        }} />
      </Grid>
         {images===""?<ImageZoom
        image={{
          src: `${item.image}`,
          alt: 'Golden Gate Bridge',
          className: 'img',
          style: {marginLeft: "60px",
          display: "flex",
          flexDirection: "row",
          objectfit: "contain",
          width: '400px',
          height: '400px', }
        }}
        zoomImage={{
          src: `${item.image}`,
          zoomMargin:50,
          alt: 'Golden Gate Bridge'
        }}
      />:    <ImageZoom
        image={{
          src: `${images}`,
          alt: 'Golden Gate Bridge',
          className: 'img',
          style: {marginLeft: "60px",
          display: "flex",
          flexDirection: "row",
          objectfit: "contain",
          width: '400px',
          height: '400px', }
        }}
        zoomImage={{
          src: `${images}`,
          alt: 'Golden Gate Bridge'
        }}
      />}
        
          <Grid style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "60px",
            marginBottom: "0px",
          }}>
            <Typography gutterBottom variant="h5" component="h2">
              {item.title}
            </Typography>
            <h4>MRP:<del> ₹ {item.price}</del></h4>
            <Typography variant="body2" component="p" variant="h6"  >
              Price: ₹ <strong style={{ color: "red" }}>{item.afterDis ? item.afterDis : Math.floor(item.price - item.price * (item.offer / 100))} </strong>
            </Typography>
            <Typography variant="body2" component="p" variant="h6"  >
              <p style={{ color: "red" }}>You Save: ₹ {item.price - Math.floor(item.price - item.price * (item.offer / 100))}({item.offer}%) </p>
            </Typography>
            <Typography variant="body2"   >
              <br />
        FREE delivery:Within 5 day from the date of order
             </Typography>
            <br />
            {item.price > 1000 && <h4>EMI starts with:{(item.price) / 10}₹ per month</h4>}
            {item.price < 1000 && <h4>EMI not Available on product</h4>}
            <br />
            {(
              item.stock > 4 && (
                <div>
                  <Typography>Available in stock</Typography>
                  <p> Order it now</p></div>)

            )}
            {(item.stock < 5 && item.stock > 0) &&
              <div>
                <Typography variant="body2" component="h4" variant="h6">
                  <strong style={{ color: "red" }}> Hurry up Only {item.stock} Left in Stock</strong>
                </Typography>
                <p>Order it now</p></div>
            }
            {item.stock === 0 &&
              <Typography variant="body2" component="h4" variant="h6">
                <strong> Out of Stock</strong>
              </Typography>
            }
            <br />
            <Typography >
              <strong>Product Type:</strong> <strong style={{ color: "green" }}>{item.producttype}</strong>
            </Typography>
            <br />
            <Typography style={{ marginBottom: '40px', }}>
              10 Days Replacement Available
        </Typography>
            <br />
            <CardActions>
            </CardActions>
          </Grid>
          <Grid style={{ width: "400px", marginLeft: "40px", marginTop: "40px" }}>
            <Typography style={{}}>Positive Reviews :{item.like}</Typography>
            <br />
            <Typography>Negative Reviews :{item.dislike}</Typography>
            <br />
            <br />
            <div>
              <Button   onClick={()=>updatequent(item)} ><AddBoxIcon fontSize="large"/></Button>
              <Button style={{border:"2px solid"}} >
                {quantity}</Button>
                <Button onClick={()=>deletequent(item)}><IndeterminateCheckBoxIcon fontSize="large"/></Button>
              </div>
            <br />
            <Button style={{ width: "250px", backgroundColor: "#f0c14b", border: "1px solid", color: "#111" }} onClick={() => addToBasket(item)}>Add to Cart</Button>
            <Typography style={{ marginTop: "20px" }}  >
              Price: ₹ <strong style={{ color: "red" }}>{item.afterDis ? item.afterDis : Math.floor(item.price - item.price * (item.offer / 100))} </strong><small><del>{item.price}₹</del></small>
            </Typography>
            <p style={{ marginTop: "20px", align: "left" }}><Checkbox />Add gift options</p>
          </Grid>
        </Grid>
          <hr />
          <h2 style={{ marginTop: "50px", color: "red", marginBottom: "20px", }}>Save Extra with 5 offers</h2>
          <p style={{ marginTop: "20px", color: "green", marginBottom: "20px", }}>Partner Offers (1): Get GST invoice and save up to 28% on business purchases. Sign up for free Here's how </p>
          <p style={{ marginTop: "20px", color: "green", marginBottom: "20px", }}>No Cost EMI (2): No cost EMI available on select cards. Please check 'EMI options' </p>
          <p style={{ marginTop: "20px", color: "green", marginBottom: "20px", }}>Bank Offer (3): Flat INR 100 Instant Discount on HDFC Bank Credit Card Transactions Here's how </p>
          <p style={{ marginTop: "20px", color: "green", marginBottom: "20px", }}>Cashback (4): Get Flat Rs 100 back with Handycraft Pay Later. Offer applicable on 1st sign-up. Check eligibility ! </p>
          <p style={{ marginTop: "20px", color: "green", marginBottom: "20px", }}>Get ₹50 back on min. shopping of ₹1500, Valid once per customer . Click here  </p>
          <Grid style={{
            display: "flex",
            marginLeft: "30px",
            flexDirection: "row",
            marginTop: "80px"
          }}>
            <Test /><Test /><Test /><Test /><Test /></Grid>
          <Typography style={{ marginTop: "80px", }} variant="body2" component="h4" variant="h6">
            <strong style={{ marginLeft: "40%", }}> Product Description</strong>
            <p style={{ marginBottom: "50px" }}>{item.Description}</p>
          </Typography>
          <br />
          <Grid style={{ display: "flex", flexDirection: "row" }}>
            <h2> Customer questions & answers</h2>
            <h2 style={{ marginLeft: "660px" }}> Share Your Experience</h2>
          </Grid>
          <Grid style={{ display: "flex", flexDirection: "row" }}>
            <TextField style={{ marginRight: "50px", marginTop: "10px", width: "900px" }}
              placeholder="Post Question and Answers"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              onChange={e => setComment(e.target.value)}
            />
            <Typography variant="body2" component="h4" >
              <ThumbUpAltIcon onClick={() => liked(item)} style={{ color: "blue", marginLeft: "80px", marginTop: "40px" }}></ThumbUpAltIcon>
              <ThumbDownAltIcon onClick={() => disliked(item)} style={{ color: "blue", marginLeft: "40px" }}></ThumbDownAltIcon>
            </Typography>
          </Grid>
          <Grid style={{ display: "flex", flexDirection: "row", }}>
            <Button onClick={() => postcomment(item)}>Post</Button>
            <h2 style={{ marginLeft: "970px" }}>{item.like}</h2>
            <h2 style={{ marginLeft: "60px" }}>{item.dislike}</h2>
          </Grid>
          {(item.comments) && item.comments.map(comment => {
            return (<div><br />
              <h4>
                <h3>Commented By : {comment.name}</h3>
                {comment.comment}
                <Button color="secondary" onClick={()=>deletecomment(comment)} Style={{ marginLeft: "30px" }} >Delete</Button>

              </h4>
            </div>
            )
          })}
        </CardContent>

      </CardActionArea>
      <ScrollUpButton />
      <Footer/>
    </Card>
  );
}


export default Product;