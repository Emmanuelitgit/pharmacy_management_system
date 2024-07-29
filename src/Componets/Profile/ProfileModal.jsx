import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import {  ArrowDropDown } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/auth';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import ManageProfile from "./ManageProfile";
import axios from 'axios';

function ProfileModal() {

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const name = localStorage.getItem("user")
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState()
  const dep = useSelector(state => state.count?.depValue) || [2];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const location = useLocation();
  const route = location.pathname.split("/")[1]

   const handleLogout = () =>{
    dispatch(logout());
    handleClose()
    navigate("/login")
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
    <>
        {profile?.user_image !== null &&  <img 
            className='nav-profile-img'
            src={profile?.user_image}
            onClick={handleShow} 
            />}
            {profile?.user_image === null &&  <img 
            className='nav-profile-img'
            src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSusvPVRdrInwIDn6yQygRR4Asmf2uRXgZJQ&s'}
            onClick={handleShow} 
            />}
            {name !=='null' && <span className='user-name' style={{color:"black"}}>{name}</span>}
            {name === 'null' && <span className='user-name' style={{color:"black"}}>Admin</span>} 
            <ArrowDropDown 
             className='dropdown-icon'
             style={{
               fontWeight:'600',
               fontSize:'25px'
             }}
             />
      <Modal show={show} onHide={handleClose} 
        animation={false} style={{
            marginLeft:"65%",
            width:'10%',
            marginTop:'1.5%',
        }}
        >
        <Modal.Header closeButton>
        {profile?.user_image === null &&  <img 
            className='nav-profile-img'
            src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSusvPVRdrInwIDn6yQygRR4Asmf2uRXgZJQ&s'}
            onClick={handleShow} 
            />}
           {profile !==null &&  <img 
            className='nav-profile-img'
            src={profile?.user_image}
            onClick={handleShow} 
            />}
        </Modal.Header>
        <Modal.Body style={{display:'flex', flexDirection:"column", gap:"10px"}}>
            <Link to={`/${route}/profile`} 
             onClick={handleClose}
             style={{textDecoration:'none', color:'black'}}
             >
               <span 
                 style={{
                  cursor:'pointer',
                  marginLeft:'10%',
                  color:"black"
                 }} 
               >
                  View Profile
                </span>
            </Link>
            <div style={{
              width:"100%"
            }}>
              <ManageProfile 
              btnName={"Update Profile"}
              color={"black"}
              handleProfileClose={handleClose}
              />
            </div>
            <span onClick={handleLogout}
             style={{
              cursor:'pointer',
              marginLeft:'10%',
              color:"black"
             }}
            >
              Logout
            </span>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProfileModal;