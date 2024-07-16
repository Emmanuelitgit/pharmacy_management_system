import React, { useEffect } from 'react';
import "./style.css";
import { Dashboard,Settings, Person,PersonAdd,ShoppingCart} from '@mui/icons-material';
import AddCardIcon from '@mui/icons-material/AddCard';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import LogoutBtn from '../Buttons/LogoutBtn';
import { useDispatch, useSelector } from 'react-redux';
import { handleSidebarToggle } from '../../store/modalState';



const AdminSidebar = () => {

  const [visible, setVisible] = useState(false)
  const sidebarVisible = useSelector((state)=>state.modal?.sidebar_toggle)
  const [windowSize, setWindowSize] = useState()


  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setWindowSize(windowWidth);
    };
  
    window.addEventListener('resize', handleResize);
    
    handleResize();
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const dispatch = useDispatch()
  
  const handleToggle = () =>{
    dispatch(handleSidebarToggle())
   }

  return (
    <div className={sidebarVisible && windowSize < 1000? 'sidebar-toggle' : 'sidebar-container'}>
      <div className='sidebar-items-container'>
       <div className='item'>
          <img 
           src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSusvPVRdrInwIDn6yQygRR4Asmf2uRXgZJQ&s'} 
           alt="" 
           className='sidebar-img'
           />
        </div>
        <div className='item'>
          <Link to={"/admin/dashboard"} className='link' onClick={handleToggle}>
          <Dashboard className='sidebar-icon'/>
          <span className='item-name'>Dashboard</span>
          </Link>
        </div>
        <div className='item'>
          <Link to={"/admin/user-list"} className='link' onClick={handleToggle}>
          <PersonAdd className='sidebar-icon'/>
          <span className='item-name'>Users</span>
          </Link>
        </div>
        <div className='item'>
          <Link to={"/admin/medicine-category"} className='link' onClick={handleToggle}>
          <AddCardIcon className='sidebar-icon'/>
          <span className='item-name'>Medicine Category</span></Link>
        </div>
        <div className='item'>
          <Link to={"/admin/medicine-list"} className='link' onClick={handleToggle}>
          <AddCardIcon className='sidebar-icon'/>
          <span className='item-name'>Medicine List</span></Link>
        </div>
        <div className='item'>
          <Link to={"/admin/order-list"} className='link' onClick={handleToggle}>
          <ShoppingCart className='sidebar-icon'/>
          <span className='item-name'>Orders</span></Link>
        </div>
        <div className='item' style={{marginTop: visible ? "300px" : "0px"}}>
         <Link to={"/admin/settings"} className='link' onClick={handleToggle}>
         <Settings className='sidebar-icon'/>
          <span className='item-name'>Settings</span>
         </Link>
        </div>
        <div className='item'>
          <Link to={"/admin/profile"} className='link' onClick={handleToggle}>
          <Person className='sidebar-icon'/>
          <span className='item-name'>Profile</span></Link>
        </div>
      </div>
        <LogoutBtn visible={visible}/>
    </div>
  )
}

export default AdminSidebar


