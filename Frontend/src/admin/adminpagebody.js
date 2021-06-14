import React from 'react'
import 'react-confirm-alert/src/react-confirm-alert.css';
import Griditems from "./productAdded"
import AdminHeader from "./adminHeader"
import Footer from "../../src/footer"
function Adminpagebody() {
    return (
        <div>
            <AdminHeader/>
            <Griditems/>
            <Footer/>
        </div>
    )
}
export default Adminpagebody