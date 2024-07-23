import React, { useEffect, useState } from 'react';
import "./style.css";
import { Menu} from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { handleSidebarToggle } from '../../store/modalState';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import ProfileModal from "../Profile/ProfileModal";

const Navbar = () => {

  //  const user = useSelector((state)=>state.auth?.currentUser) || []
  //  const role = useSelector((state)=>state.auth?.role) || []
  const dispatch = useDispatch()
  const [settings, setSettings] = useState('');
  const [count, setCount] = useState()
   const visible = useSelector((state)=>state.modal?.sidebar_toggle) || [];
   const role = localStorage.getItem('role');
  //  const role = roleValue?.charAt(0).toUpperCase() + roleValue.slice(1);
   const location = useLocation();
   const route = location.pathname.split("/")[1];
   const dep = useSelector(state => state.count?.depValue) || [2];


   useEffect(()=>{
    const getsettings = async()=>{
      try {
        const response = await fetch('http://localhost:5000/settings');
        if(!response.ok){
          console.log('faild to fetch data..')
        }
        const fetchedData = await response.json();
        setSettings(fetchedData)
      } catch (error) {
        console.log(error)
      }
    }
    getsettings()
  }, [dep])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/staff/${role}`);
        const data = response.data;
        setCount(data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dep]);

  const handleToggle = () =>{
    dispatch(handleSidebarToggle())
   }


  return (
    <div className='navbar-container'>
      <div className='menu-title-container'>
           <span className='menu-icon-container'>
             <Menu 
              onClick={handleToggle} 
               className='menu-icon'
               />
           </span>
            <span className='navbar-title'>
             <img 
              src={'data:image/png;base64,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'} 
              alt=""
              className='navbar-logo'
               /> 
             PHARMASYS
            </span>
      </div>
      <div className='panel-type-container'>
         <h4 className='panel-type-text'>
          {role === "sales_person"? "Sales Person" : "Admin" + " "}  Dashboard</h4>
      </div>
      <div className='nav-profile-container'>
         <Badge badgeContent={4} color="warning" className='icons'>
              <NotificationsIcon color="action" className='profile-icon' style={{color:'black'}} />
         </Badge>
         <div className='user-profile-container'>
             <ProfileModal/>
         </div>
      </div>
    </div>
  )
}

export default Navbar