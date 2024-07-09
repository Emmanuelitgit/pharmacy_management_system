import React from 'react';
import Navbar from "../NavBar/Navbar";
import SalesPersonSidebar from "../Sidebar/SalesPersonSidebar"
import { useLocation } from 'react-router-dom';

const SalesPersonNavs = () => {

  const location = useLocation();
  const route = location.pathname;

  return (
    <div>
      <Navbar/>
      {route !== "/doctor/chat" && <SalesPersonSidebar/> }
    </div>
  )
}

export default SalesPersonNavs