import React,{useState,useEffect} from 'react'
import CurrencyFormat from "react-currency-format"
import { useStateValue } from "./StateProvider"
import { getBasketTotal } from './Reducer'
import { useHistory } from "react-router-dom"
import Card from "@material-ui/core/Card" 
import Grid from "@material-ui/core/Grid"  
import logo from "./assets/logo.png"
import { Checkbox } from '@material-ui/core'
import axios from '../src/axios/instance'
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button"
function Bankpayment() {
    const [{ basket }, { price }, dispatch] = useStateValue();
    let value=getBasketTotal(basket)

    let config = {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
      }
      const [profile, setProfile] = useState({})
      useEffect(() => {
        axios.get(`/users/getprofile`, config)
          .then(resp =>{ 
      // console.log(resp.data[0])
         setProfile(resp.data[0])
         console.log(profile)
        })
          .catch(error => console.log(error))
    
      }, []);
console.log(profile.name)
    return (
        <div>
          <Card style={{marginLeft:"20%", marginRight:"25%" ,marginTop:"50px"}}>
              <Grid style={{marginLeft:"20%" ,marginTop:"50px" ,marginBottom: "50px"}}>
                <img  style={{marginLeft:"20%"}}src={logo}/>
                <Grid style={{marginTop:"20px"}}>
                <TextField id="outlined-basic" label="Name" variant="outlined" value={profile.name} />
                <TextField  style={{marginLeft:"50px"}} id="outlined-basic" label="Email" variant="outlined" value={profile.email} type="email"/>
                </Grid>
                <p style={{marginTop:"20px"}}>Delivery Address</p>
                <Grid style={{marginTop:"20px"}}>
                <TextField id="outlined-basic" label="House Number" variant="outlined" type="number" />
                <TextField  style={{marginLeft:"50px"}} id="outlined-basic" label="Area" variant="outlined" />
                </Grid>

                <Grid style={{marginTop:"20px"}}>
                <TextField id="outlined-basic" label="City" variant="outlined"  />
                <TextField  style={{marginLeft:"50px"}} id="outlined-basic" label="State" variant="outlined" />
                </Grid>
                <TextField  style={{marginTop:"20px" ,width:"84%"}}id="outlined-basic" label="Phone Number" variant="outlined" type="number" defaultValue="dsafv" />
    <Grid style={{display:"flex" ,flexDirection:"row" ,marginTop:"20px"}}>
   <p style={{fontSize:"30px" ,marginTop:"10px", marginRight:"10px"}}>Total </p> <strong style={{fontSize:"40px"}}>₹
{value}</strong>
               
                </Grid>
                <p style={{marginTop:"20px"}}>Payment Mode</p>
                <Grid style={{display:"flex" ,flexDirection:"row",marginTop:"20px"}}>
                <input style={{marginTop:"8px", marginLeft:"20px"}} type="radio" id="card" name="gender" value="card"/>
                
                
                <label style={{fontSize:"20px"}} for="card">Card</label><br></br>
                <input style={{marginTop:"8px", marginLeft:"20px"}} type="radio" id="COD" name="gender" value="COD" type="radio"/>
                <label style={{fontSize:"20px"}} for="COD">COD</label><br></br>
                </Grid>
                <Button style={{width:"84%", backgroundColor: "#f0c14b" ,marginTop:"20px" ,marginRight:"100px"}}>Proceed</Button>
              </Grid>
              
          </Card>
        </div>
    )
}

export default Bankpayment
