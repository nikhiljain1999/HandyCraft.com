import React, { useState } from 'react'
import logo from "./assets/logo.png"
import "./Login.css"
import {  Link, useHistory } from "react-router-dom"
import axios from 'axios'
function Signup() {
    const history = useHistory()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('')
    const [errors, setErrors] = useState({})
    const register = e => {
        e.preventDefault()
        axios.post('http://localhost:3001/users', {
            name,
            email,
            password,
            age,
            phone


        })
            .then(auth => {
                localStorage.setItem("token", auth.data.token);
                setErrors({})
                window.history.go(-2);
            }).catch(error =>{
                console.log(error.response)
                if(error.response.data.errors){

                    setErrors(error.response.data.errors);
                    console.log(errors)
                }else{

                    setErrors({})
                }
            }
            )


    }
    return (
        <div className="login">
            <Link to="/">
                <img className="login_logo" src={logo} alt="" />
            </Link>
            <div className="login_container">
                <h1>Sign-Up</h1>
                <form>
                    <h5>Name</h5>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    <h5>E-mail</h5>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    {errors.email  && <h4 style={{color: 'red'}}>{errors.email}</h4>}
                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    {errors.password && <h4 style={{color: 'red'}}>{errors.password.message}</h4>}  <h5>Age</h5>
                    <input type="number" value={age} onChange={e => setAge(e.target.value)} />
                    {errors.age && <h4 style={{color: 'red'}}>{errors.age.message}</h4>}
                    <h5>Phone</h5>
                    <input type="number" value={phone} onChange={e => setPhone(e.target.value)} />
                    {errors.phone && <h4 style={{color: 'red'}}>{errors.phone}</h4>}
                    <button type="submit" onClick={register} className="login_signinButton">SignUp </button>
                </form>
            </div>
        </div>
    )
}

export default Signup
