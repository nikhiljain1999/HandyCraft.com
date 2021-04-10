import './App.css';
import React ,{useEffect} from 'react'
import Header from "./Header"
import Home from "./Home"
import Checkout from "./Checkout"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./Login"
import Test from "../src/admin/test"
import Signup from "./signup"
import AdminLogin from "./AdminLogin"
import AdminSignup from "./signup-Admin"
import Footer from "./footer"
import AdminDashbord from "../src/admin/adminpagebody"
import Adminaddproduct from '../src/admin/adminaddproduct';
import AdminHeader from "../src/admin/adminHeader"
import AddedItems from "../src/admin/productAdded"
import AdmineditProduct from "../src/admin/Editproductdetails"
import UserProfile from '../src/userporductlist/userprofile'
import ProductbyTypes from '../src/userporductlist/productbytype';

function App() {
  useEffect(()=>{

  },[])
  return (
    <Router>
      <div className="app">
        <Switch>
        <Route path="/checkout" strict>
            <Header />
            <Checkout />
            
            
          </Route>
          <Route path="/product" strict>
            <Header />
            <ProductbyTypes />
            
            <Footer/>
          </Route>
          <Route path="/login" strict>
           
            <Login/>
            
            
          </Route>
          <Route path='/products/:type' strict>
          <Header />
            <ProductbyTypes/>
            <Footer/>
         </Route>




          <Route path="/signup" strict>
            <Signup/>
          </Route>
          <Route path="/userprofile" strict>
            <Header />
            <UserProfile />
            <Footer />
          </Route>
          <Route path="/loginAdmin" strict>
            <AdminLogin/> 
          </Route>
          <Route path="/AdminSignin" strict>
            <AdminSignup/>
          </Route>
          <Route path="/AdminDashbord/addproduct" strict>
          <AdminHeader/>
            <Adminaddproduct />
            
          </Route>
          <Route path="/test" strict>
          
            <Test></Test>
          </Route>
          <Route path="/AdminDashbord/addeditems" strict>
          <AdminHeader/>
            <AddedItems />
            
          </Route>
          <Route path="/AdminDashbord/editproduct" strict>
          <AdminHeader/>

          <AdmineditProduct/>
            
            
          </Route>
          <Route path="/AdminDashbord" strict>
            <AdminHeader/>
            <AdminDashbord />
          </Route>
          <Route path="/" >
            <Header />
            <Home />
            <Footer />
          </Route>
          </Switch>

      </div>
    </Router>

  );
}

export default App;
