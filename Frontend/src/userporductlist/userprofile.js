import React ,{useState,useEffect}from 'react';
import axios from '../../src/axios/instance'
import Profile from "./profile" 
import Header from "../Header"
import Footer from "../footer"
export default function RecipeReviewCard(props) { 
  let config = {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    }
  }
  const [profile, setProfile] = useState({})
  useEffect(() => {
    axios.get(`/users/getprofile`, config)
      .then(resp =>{ 
  // console.log(resp.data[0])
     setProfile(resp.data[0])
     console.log(profile)
    })
      .catch(error => console.log(error))

  }, []);
  return (
    <div>
      <Header/>
        <Profile name={profile.name} email={profile.email} phone={profile.phone} age={profile.age} createdAt={profile.createdAt}/>
    <Footer/>
    </div>
  );
}