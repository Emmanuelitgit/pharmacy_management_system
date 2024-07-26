import React from 'react';
import "./style.css";
import { Dashboard,
        Logout, 
        Settings, 
        Person, 
        Science, 
        LocalPharmacy,
        MedicalServices,
        PeopleAlt,
        Bloodtype,
        ArrowDropDown,
        PersonAdd,
        Healing } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import LogoutBtn from '../Buttons/LogoutBtn';


const DoctorSidebar = () => {

  const profile = localStorage?.getItem("profile")

  return (
    <div className='sidebar-container'>
      <div className='sidebar-items-container'>
        <div className='item'>
        {profile !== 'null' && <img 
            src={`https://pharmacy-v2qn.onrender.com/media/${profile}/`}
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