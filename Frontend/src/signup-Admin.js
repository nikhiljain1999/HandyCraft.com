import React,{useState} from 'react'
import logo from "./assets/logo.png"
import "./Login.css"
import {Link,useHistory} from "react-router-dom"
import axios from '../src/axios/instance'
function AdminSignup() {
    const history =useHistory()
    const [name,setName]=useState('')
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [age,setAge]=useState('');
    const [phone,setPhone]=useState('')
    const [address,setAddress]=useState('')
    const [errors,setErrors]=useState({})
    const register =e=>{
        e.preventDefault()
        axios.post('/admin',{
            name,
            email,
            password,
            age,
            phone,
            address


        })
        .then(auth=>{
            setErrors("")
            localStorage.setItem("token", auth.data.token);
            history.push('/AdminDashbord')
        }).catch(error=> setErrors(error.response.data.errors))
        

    }
    return (
        <div className="login">
            <Link to ="/">
            <img className="login_logo" src={logo} alt=""/>
            </Link>
            <div className="login_container">
                <h1>Sign-Up</h1>
                <form>
                <h5>Name</h5>
                    <input type="text" value={name} onChange={e=>setName(e.target.value)}/>
                    {errors.name && <h4 style={{color: 'red'}}>{errors.name.message}</h4>}
                   <h5>E-mail</h5>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    {(errors.email ) && <h4 style={{color: 'red'}}>{errors.email}{errors.email.message}</h4>}
                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                    {errors.password && <h4 style={{color: 'red'}}>{errors.password.message}</h4>}
                    <h5>Age</h5>
                    <input type="number" value={age} onChange={e=>setAge(e.target.value)}/>
                    {errors.age && <h4 style={{color: 'red'}}>{errors.age.message}</h4>}
                    <h5>Phone</h5>
                    <input type="number" value={phone} onChange={e=>setPhone(e.target.value)}/>
                    {errors.phone && <h4 style={{color: 'red'}}>{errors.phone.message}</h4>}
                    <h5>Address</h5>
                    <input type="text" value={address} onChange={e=>setAddress(e.target.value)}/>
                    {errors.address && <h4 style={{color: 'red'}}>{errors.address.message}</h4>}
                    <button type="submit" onClick={register} className="login_signinButton">SignUp </button>
                </form>
                <p>
                    
                </p>
                
            </div>
        </div>
    )
}

export default AdminSignup
