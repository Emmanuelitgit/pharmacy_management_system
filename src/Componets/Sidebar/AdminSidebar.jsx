import React, { useEffect } from 'react';
import "./style.css";
import { Dashboard,Settings, Person,PersonAdd,ShoppingCart} from '@mui/icons-material';
import AddCardIcon from '@mui/icons-material/AddCard';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import LogoutBtn from '../Buttons/LogoutBtn';
import { useDispatch, useSelector } from 'react-redux';
import { handleSidebarToggle } from '../../store/modalState';
import axios from 'axios';



const AdminSidebar = () => {

  const [visible, setVisible] = useState(false)
  const sidebarVisible = useSelector((state)=>state.modal?.sidebar_toggle)
  const [windowSize, setWindowSize] = useState()
  const [profile, setProfile] = useState(null)
  const dep = useSelector(state => state.count?.depValue) || [2];


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
    <div className={sidebarVisible && windowSize < 1000? 'sidebar-toggle' : 'sidebar-container'}>
      <div className='sidebar-items-container'>
       <div className='item'>
          {/* {profile?.user_image !== null && <img 
           src={profile?.user_image}
           alt="" 
           className='sidebar-img'
           />} */}
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


