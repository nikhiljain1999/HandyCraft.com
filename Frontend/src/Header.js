import React, {useState}from 'react'
import './Header.css';
import SearchIcone from "@material-ui/icons/Search"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link } from "react-router-dom"
import {useStateValue} from "./StateProvider"
import logo from "./assets/logo.png"
import "./Header.css"
import { useHistory } from "react-router-dom"
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from "axios"
import Pin from "./pincode"
// import {ConformAlert}
function Header() {
    const [search, setSearch] = useState('')
    const history = useHistory()
    const[{basket},dispatch]=useStateValue();
    const[city,setCity]=useState('')
    const[area,setArea]=useState('')
    let config = {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
      }
const searchoption=()=>{
    console.log(search)
    history.push('/product')
    localStorage.setItem('search',search);
    console.log(history.location.pathname)
    const url1=history.location.pathname
    const url=history.location.pathname.lastIndexOf('/')
    const newUrl=url1.slice(0,url)
    if(history.location.pathname ==='/product' || newUrl==='/products' ){
        window.location.reload(false)
    }
}
    const logout=()=>{
        confirmAlert({
            title: 'LogOut',
            message: 'Are you sure you want to Logout.',
            
            buttons: [
              {
                label: 'Yes',
                style:{color:'Red'},
                onClick: () =>{
                    history.push('/login')
                    localStorage.removeItem('token')
                    // window.location.reload(false);
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
        
        <div className="header">
          
            <Link to="/" style={{textDecoration:"none"}}>
            <img className="header_logo"
                src={logo} />
            </Link>
          
            <div className="header_nav"> 
            <Pin/>                
                </div>
               
                   
            <div className="header_search">          
                <input className="header_searchInput"
                    type="text"  placeholder="What are you looking for?" value={search} onChange={e =>setSearch(e.target.value)} />                             
               <SearchIcone className="header_searchIcon"  onClick={searchoption}/>               
            </div>
                                
            <div className="header_nav">                
            { config.headers.Authorization==='Bearer null' ?(
                <Link to="/login" style={{textDecoration:"none"}}>
                    <div  className="header_option">
                    <span className="header_optionLineOne">Hello Guest</span>
                    <span className="header_optionLineTwo">Sign In</span>
                    </div>
                    </Link>
                    
                ):(
                   
                <div onClick={()=>logout()} style={{cursor: 'pointer'}}>  
                <div  className="header_option">  
                <span className="header_optionLineOne"  >Logout</span>
                <span className="header_optionLineTwo">Account</span>                 
                </div>  
                </div> 
                )}
            </div>
            { config.headers.Authorization==='Bearer null' ?(
                    <Link to="/login">
                        <div  className="header_option">
                        <AccountBoxIcon  style={{ fontSize:"45px" }}/>
                        </div>
                        </Link>
                        
                    ):(
                    <Link to ='/userprofile' style={{textDecoration:"none"}}>
                    <div  className="header_option">  
                    <AccountBoxIcon  style={{ fontSize:"45px" }}/>
                    </div>  
                    </Link> 
                    )}                             
            <Link to="/loginAdmin" style={{textDecoration:"none"}} >
            <div className="header_option">                
                <span className="header_optionLineOne">Login as</span>
                <span className="header_optionLineTwo">Admin</span>   
            </div>
            </Link>          
            <Link to ="/checkout" style={{textDecoration:"none"}}>
            <div className="header_optionBasket">
                    <ShoppingCartIcon />
                    <span className="header_optionLineTwo header_basketCount">   
                    {basket?.length}</span>                   
            </div>
            </Link>            

  </div> )    
    
}

export default Header