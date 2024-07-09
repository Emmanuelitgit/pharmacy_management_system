import React from 'react';
import Navbar from "../NavBar/Navbar";
import DoctorSidebar from "../Sidebar/DoctorSidebar"
import { useLocation } from 'react-router-dom';

const DoctorNavs = () => {

  const location = useLocation();
  const route = location.pathname;

  return (
    <div>
      <Navbar/>
      {route !== "/doctor/chat" && <DoctorSidebar/> }
    </div>
  )
}

export default DoctorNavs