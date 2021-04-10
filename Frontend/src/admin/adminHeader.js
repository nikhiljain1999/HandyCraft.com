import React from 'react'
import './headeradmin.css';
import {Link} from "react-router-dom"
function HeaderAdmin() {
     return (
         <div className="header_admin">
             <Link to ='/AdminDashbord'  style={{textDecoration:"none"}}>
             <h1 className="text_align">ADMIN PAGE</h1>
             </Link>
         </div >
         )}
export default HeaderAdmin