import React, { useState, useEffect } from 'react';
import "./style.css";
import { Dashboard,
        Person, 
        PersonAdd, } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import LogoutBtn from '../Buttons/LogoutBtn';
import axios from 'axios';
import { useSelector } from 'react-redux';


const DoctorSidebar = () => {

  const [profile, setProfile] = useState()
  const dep = useSelector(state => state.count?.depValue) || [2];

  useEffect(()=>{
    const getStaff = async()=>{
      const id = localStorage.getItem('user_id')
        try {
        const response = await axios.get(`https://pharmacy-v2qn.onrender.com/api/accounts/retrieve/${id}/`)

        if(response.status === 200){
          const user = response.data
          setProfile(user)
        }
        } catch (error) {
            console.log(error)
        }
    }
    getStaff()
}, [dep])


  return (
    <div className='sidebar-container'>
      <div className='sidebar-items-container'>
        <div className='item'>
        {profile !== null && <img 
            src={profile?.user_image}
           alt="" 
           className='sidebar-img'
           />}
           {profile === 'null' && <img 
           src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSusvPVRdrInwIDn6yQygRR4Asmf2uRXgZJQ&s'} 
           alt="" 
           className='sidebar-img'
           />}
        </div>
        <div className='item'>
          <Link className='link' to={"/sales-person/dashboard"}>
          <Dashboard className='sidebar-icon'/>
          <span className='item-name'>Dashboard</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/sales-person/medicine-list"}>
          <PersonAdd className='sidebar-icon'/>
          <span className='item-name'>Medidcine List</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/sales-person/order-list"}>
          <PersonAdd className='sidebar-icon'/>
          <span className='item-name'>Orders</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/sales-person/profile"}>
          <Person className='sidebar-icon'/>
          <span className='item-name'>Profile</span>
          </Link>
        </div>
      </div>
      <LogoutBtn/>
    </div>
  )
}

export default DoctorSidebar