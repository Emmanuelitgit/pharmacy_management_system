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
              src={require("../../uploads/logo 2.png")} 
              alt=""
              className='navbar-logo'
               /> 
             PHARMASYS
            </span>
      </div>
      <div className='panel-type-container'>
         <h4 className='panel-type-text'>{role} Dashboard</h4>
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