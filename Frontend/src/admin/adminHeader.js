import React from 'react'
import './headeradmin.css';
import {Link} from "react-router-dom"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Grid from "@material-ui/core/Grid"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Button from "@material-ui/core/Button"
import { confirmAlert } from 'react-confirm-alert'
import { useHistory } from "react-router-dom";
function HeaderAdmin() {
    const history =useHistory()
    const logout = () => {
        confirmAlert({
            title: 'LogOut',
            message: 'Are you sure you want to Logout.',

            buttons: [
                {
                    label: 'Yes',
                    style: { color: 'Red' },
                    onClick: () => {
                        localStorage.clear('token');
                        history.push('/')

                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

     return (
        <div>
         <div className="header_admin">
             <Grid style={{display:"flex", flexDirection:"row"}}>
             <Link to ='/AdminDashbord'  style={{textDecoration:"none"}}>
             <h1 className="text_align">ADMIN PAGE</h1>
             </Link>
             <Link to="/AdminDashbord/addproduct" style={{textDecoration:"none"}}>
             <AddCircleIcon  fontSize="large"  style={{marginLeft:"200px" ,color:"white"}}/>
             <h4  className="icon_align">Add Product</h4>
             </Link>
             <Link to="/AdminDashbord/adminprofile" style={{textDecoration:"none"}}>
             <AccountBoxIcon  fontSize="large"  style={{marginLeft:"200px" ,color:"white"}}/>
             <h4  className="icon_align">Check Profile</h4>
             </Link>
             <Button onClick={logout} style={{textDecoration:"none"}}>
             <ExitToAppIcon color="error" fontSize="large"  style={{marginLeft:"200px" ,Color:"red"}}/>
             <h4  style={{color:"white"}}>Log Out</h4>
             </Button>
             </Grid>
             </div>
         </div >
         )}
export default HeaderAdmin