import React,{useState} from 'react'
import logo from "./assets/logo.png"
import "./Login.css"
import {Link,useHistory} from "react-router-dom"

import axios from '../src/axios/instance'
function Login() {
    const history =useHistory()
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('')
   
    const signIn=(e)=>{
        e.preventDefault()
        axios.post('/admin/login',{
            email,
            password
        })
        .then(auth=>{
            localStorage.setItem("token", auth.data.token);
            history.push('/AdminDashbord')
        }).catch(error=>
            setError(error.response.data)
            )
      

    }

    return (
        <div className="login">
            <Link to ="/">
            <img className="login_logo" src={logo} alt=""/>
            </Link>
            <div className="login_container">
                <h1>Sign-in</h1>
                {error && <h4 style={{ color: "red" }}>invalid credentials</h4>}
                <form>
                    <h5>E-mail</h5>
                    <input type="text" value={email} onChange={e=>setEmail(e.target.value)}/>
                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                    <button type="submit" onClick={signIn} className="login_signinButton">Sign In</button>
                </form>
               
                <button className="login_registerButton"> <Link to="/AdminSignin">Don't have account? Signup</Link></button>
            </div>
        </div>
    )
}

export default Login
