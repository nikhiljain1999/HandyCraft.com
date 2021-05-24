import React ,{useState,useEffect}from 'react';
import axios from "../../src/axios/instance"
import Profile from "../userporductlist/profile" 
import AdminHeader from "./adminHeader"
export default function RecipeReviewCard(props) {
   
  let config = {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    }
  }
  const [profile, setProfile] = useState({})
  useEffect(() => {
    axios.get(`/admin/profile`, config)
      .then(resp =>{ 
  console.log(resp.data)
     setProfile(resp.data)
     console.log(profile)
    })
      .catch(error => console.log(error))

  }, []);
  return (
    <div>
      <AdminHeader/>
        <Profile name={profile.name} email={profile.email} phone={profile.phone} age={profile.age} createdAt={profile.createdAt} address={profile.address}/>
    </div>
  );
}