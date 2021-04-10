import React, { useState,useEffect } from 'react'
import "./productadded.css"
import { useStateValue } from '../StateProvider';
import './addproduct.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import leather from "../assets/leather.jpg"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from "axios"
import {NavLink} from "react-router-dom"
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

function AddedItems() {
  const classes = useStyles();
  const [title, getTitle] = useState("title")
  const [items, setItems] = useState([])

  
  console.log(items)
 
  let config = {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    }
  }

  

 const submit = (id) => {
    confirmAlert({
      title: 'Conform To Delete',
      message: 'Are you sure you want to delete.',
      
      buttons: [
        {
          label: 'Delete',
          style:{color:'Red'},
          onClick: () =>{
              axios.delete(`http://localhost:3001/admin/delete/${id}`,config)
              .then(resp=> {
                const updatedItemsList=items.filter(item=> item._id.toString()!==id)
                setItems(updatedItemsList)
              })
              .catch(error=> console.log(error))
            }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };
const editproduct=(id)=>{
  console.log(id)
  localStorage.setItem('id',id);
}

  useEffect(()=>{
    
    axios.get('http://localhost:3001/admin/getAddedidems', config)
      .then(resp => setItems(resp.data))
      .catch(error => console.log(error))
    console.log(title)
 },[]);
  return (
    <div>
      {
        items && items.map(item => {
          return (
            <Card name={item._id} key={item._id} className={classes.root}>
              <CardActionArea>
                <CardMedia
                style={{width:'40%',
              height:"300px"}}
          className={classes.media}
          image={leather}
          title={item.producttype}
             />
                <CardContent >
                
                 
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.title}
                  </Typography>
                  <br></br>
                   <Typography variant="body2"component="h4" variant="h6">
                  Product Description:{item.Description}
          </Typography>
          <br></br>
          <Typography variant="body2" component="h4" variant="h6">
             Product Type:     {item.producttype}
          </Typography>
          <br></br>
          <Typography variant="body2"  component="p" >
          Price: {item.price}
          </Typography>
          <br></br>
          <Typography variant="body2"  component="h4" >
              Liked By:   {item.like}
          </Typography>
          <br></br>
          <Typography variant="body2"component="p">
              Disliked By:{item.dislike}
          </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
        <Button size="small" color="secondary" onClick={()=>submit(item._id)}>
          Delete Product
        </Button>
        <NavLink to='/AdminDashbord/editproduct' style={{textDecoration:"none"} }>
        <Button size="small" color="primary" onClick={()=>editproduct(item._id)}>
           Edit Product
        </Button>
        </NavLink>
      </CardActions>
            </Card>
          )
        })
      }

    </div>
  )
}

export default AddedItems
