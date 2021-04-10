import React from 'react'
import './headeradmin.css';
import {makeStyles}  from "@material-ui/core/styles"
import {Grid, Typography,} from "@material-ui/core"
import {NavLink} from "react-router-dom"
import pie from "../assets/piechart.png"
import axios from "axios"
import Button from"@material-ui/core/Button"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import {Link,useHistory} from "react-router-dom"
const useStyle=makeStyles((theme)=>({
    // grid:{
    //     width: '100%',
    //     margin: "0px"
    // },
    
    rowStyles: {
        width: '100%',
        display: 'flex',
        minWidth:'300px',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
        height: '8rem',
        flex: 1,
        marginTop: '4px',
        marginBottom: '0px',
        marginLeft: '0px',
    },
    columnStyles:{
        width: '100%',
        
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
        // maxWidth: '24rem'
    },
    // contentStyles: {
    //     display: 'flex',
    //     flex: 1
    // },
    // main: {
    //     width: '100vw',
    //     height: '100vh',
    //     overflow: 'hidden'
    // }
}))


function Header() {
   const classes=useStyle()
   const history =useHistory()
  const logout=()=>{
    confirmAlert({
        title: 'LogOut',
        message: 'Are you sure you want to Logout.',
        
        buttons: [
          {
            label: 'Yes',
            style:{color:'Red'},
            onClick: () =>{
                localStorage.clear('token');
                history.push('/')
               
              }
          },
          {
            label: 'No',
            onClick: () => {}
          }
        ]
      });
   

  }
    return (
        <div >
        
        <Grid className={classes.columnStyles} >

            <Grid container className={classes.container}>
                <NavLink to='/AdminDashbord/addproduct'  style={{textDecoration:"none"}}>
                <Grid className={classes.rowStyles} item >
                    <Typography style={{
                        width: '4rem',
                        color:"black"
                    }}>AddProduct</Typography>
                    
                </Grid>
                </NavLink>
                <NavLink to='/AdminDashbord/addeditems'  style={{textDecoration:"none"}}>
                <Grid className={classes.rowStyles} item >
                    <Typography style={{
                        width: '4rem',
                        color:"black"
                    }}>ProductAdded</Typography>
                </Grid>
                </NavLink>
                <NavLink to='/AdminDashbord/addeditems'  style={{textDecoration:"none"}}>
                <Grid className={classes.rowStyles} item >
                    <Typography style={{
                        width: '4rem',
                        color:"black"
                    }}>DeleteProduct</Typography>
                </Grid>
                </NavLink>
                <NavLink to='/AdminDashbord/addeditems'  style={{textDecoration:"none"}}>
                <Grid className={classes.rowStyles} item >
                    <Typography style={{
                        width: '4rem',
                        color:"black"
                    }}>EditProduct</Typography>
                </Grid>
                </NavLink>
                <Button onClick={logout} style={{margin: 0, padding: 0}} >
                
                    
                <Grid className={classes.rowStyles} item >
                    <Typography style={{
                        width: '4rem',
                        color:"black"
                    }}>LogOut</Typography>
                </Grid>
                
                </Button>
            </Grid>
            <Grid>
                <img src={pie}/>
            </Grid>
        </Grid>
        
        
       
            
</div>
        

        
    
    )
}

export default Header
