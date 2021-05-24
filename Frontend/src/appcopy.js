import React, { useEffect } from 'react'
import Header from "./Header"
import Home from "./Home"
import Checkout from "./Checkout"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./Login"
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
import OrderPlaced from './OrderPlaced'
import AdminProfile from "./admin/adminProfile"
import Product from "../src/userporductlist/product"
function App() {
  useEffect(() => {

  }, [])
  return (
    <Router>
      <div className="app">
        <Switch>

          <Route path="/checkout" exact>
            <Header />
            <Checkout />
          </Route>
          <Route path='/product/:id' exact>
            <Header />
            <Product />
            <Footer />
          </Route>
          <Route path='/products/:type' exact>
            <Header />
            <ProductbyTypes />
            <Footer />
          </Route>
          <Route path="/product" exact>
            <Header />
            <ProductbyTypes />
            <Footer />
          </Route>

          <Route path="/orderplaced" exact>
            <Header />
            <OrderPlaced />
          </Route>

          <Route path="/login" exact>
            <Login />
          </Route>



          <Route path='/AdminDashbord/adminprofile' >
            <AdminHeader />
            <AdminProfile />
            <Footer />
          </Route>

          <Route path="/signup" exact>
            <Signup />
          </Route>

          <Route path="/userprofile" exact>
            <Header />
            <UserProfile />
            <Footer />
          </Route>

          <Route path="/loginAdmin" exact>
            <AdminLogin />
          </Route>

          <Route path="/AdminSignin" exact>
            <AdminSignup />
          </Route>

          <Route path="/AdminDashbord/addproduct" exact>
            <AdminHeader />
            <Adminaddproduct />
          </Route>

          <Route path="/AdminDashbord/addeditems" exact>
            <AdminHeader />
            <AddedItems />
          </Route>

          <Route path="/AdminDashbord/editproduct" exact>
            <AdminHeader />
            <AdmineditProduct />
          </Route>

          <Route path="/AdminDashbord" exact>
            <AdminHeader />
            <AdminDashbord />
          </Route>

          <Route path="/" exact>
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
