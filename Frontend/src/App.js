import React, { useEffect } from 'react'
import Header from "./Header"
import Footer from "./footer"
import Home from "./Home"
import Checkout from "./Checkout"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./Login"
import Signup from "./signup"
import AdminLogin from "./AdminLogin"
import AdminSignup from "./signup-Admin"

import AdminDashbord from "../src/admin/adminpagebody"
import Adminaddproduct from '../src/admin/adminaddproduct';
import AdminHeader from "../src/admin/adminHeader"
import AddedItems from "../src/admin/productAdded"
import AdmineditProduct from "../src/admin/Editproductdetails"
import UserProfile from '../src/userporductlist/userprofile'
import ProductbyTypes from '../src/userporductlist/productbytype';
import OrderPlaced from './OrderPlaced'
import AdminProfile from "./admin/adminProfile"
import Product from "../src/userporductlist/product"
import { useHistory } from "react-router-dom"
function App() {
  const history = useHistory()
  useEffect(() => {

  }, [])

  return (
    <Router>
      <div className="app">
        <Switch>

          <Route path='/product/:id' exact>
            <Product />
          </Route>

          <Route path='/products/:type' exact>
            <ProductbyTypes />
          </Route>

          <Route path="/product" exact>
            <ProductbyTypes />
          </Route>

          <Route path="/userprofile" exact>
            <UserProfile />
          </Route>

          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/AdminDashbord/addproduct" exact>
            <Adminaddproduct />
          </Route>

          <Route path="/AdminDashbord/addeditems" exact>

            <AddedItems />
          </Route>

          <Route path="/AdminDashbord/editproduct" exact>
            <AdmineditProduct />
          </Route>

          <Route path="/AdminDashbord" exact>
            <AdminDashbord />
          </Route>

          <Route path='/AdminDashbord/adminprofile' >
            <AdminProfile />
          </Route>

          <Route path="/checkout" exact>
            <Checkout />
          </Route>

          <Route path="/orderplaced" exact>
            <OrderPlaced />
          </Route>


          <Route path="/login" exact>
            <Login />
          </Route>

          <Route path="/signup" exact>
            <Signup />
          </Route>

          <Route path="/loginAdmin" exact>
            <AdminLogin />
          </Route>

          <Route path="/AdminSignin" exact>
            <AdminSignup />
          </Route>

        </Switch>
      </div>
    </Router>

  );
}

export default App;
