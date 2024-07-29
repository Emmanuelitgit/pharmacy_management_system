import React, { useEffect, useState } from 'react'
import doctor from "../../Componets/images/staff/doctor 1.png";
import { useLocation } from 'react-router-dom';
import AddStaff from "../../Pages/Admin/AddUser/AddUser";
import ManageProfile from './ManageProfile';
import { Man } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Profile = () => {

    const[data, setData] = useState();
    const[profile, setProfile] = useState();
    const dep = useSelector(state => state.count?.depValue) || [2];
    const location = useLocation();

    const role = data?.role
    const name = data?.full_name

    function getFirstWord(str, num) {
        let words = str?.trim().split(/\s+/);
        return words?.length > num ? words[num] : "";
    }
    
    let sentence = name?.toString();
    let firstName = getFirstWord(sentence, 0);
    let lastName = getFirstWord(sentence, 1);

   
    useEffect(()=>{
      const getStaff = async()=>{
        const id = localStorage.getItem('user_id')
          try {
          const response = await axios.get(`https://pharmacy-v2qn.onrender.com/api/accounts/retrieve/${id}/`)

          if(response.status === 200){
            const user = response.data
            setData(user)
          }
          } catch (error) {
              console.log(error)
          }
      }
      getStaff()
  }, [dep])

    // const userData = [{
    //   first_name:'Ofori',
    //   last_name:'Justice',
    //   email:'oforijustice@gmail.com',
    //   phone:'0597893082',
    //   address:'Accra, Legon'
    // }]

    console.log(data?.user_image)

  return (
    <div className='view-staff-container'>
         <div className='view-staff-sub-container'>
            <div className="view-staff-profile-items">
                {/* <span className="view-staff-profile-item ">{name}</span> */}
                  {data?.user_image !== null && <img 
                   src={data?.user_image}
                   alt=""  
                   className='view-staff-profile'/>}
                  {data?.user_image === null && <img 
                   src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSusvPVRdrInwIDn6yQygRR4Asmf2uRXgZJQ&s'} 
                   alt=""  className='view-staff-profile'/>}
                {/* <span className="view-staff-profile-item profile-item-role">{role}</span> */}
            </div>
         </div>
         <div className="view-staff-horozontally-line"></div>
         <h3 className='bio-title'>Bio Info:</h3>
            <div className='bio-info-container' key={data?.user_id}>
                <div className="bio-info-items">
                  <div className="bio-info-item">
                    <span className='bio-info-item-text-title'>Staff ID:</span>
                    <span>10445445</span>
                  </div>
                  <div className="bio-info-item">
                    <span className='bio-info-item-text-title'>First Name:</span>
                    <span>{firstName}</span>
                  </div>
                  <div className="bio-info-item">
                    <span className='bio-info-item-text-title'>Last Name:</span>
                    <span>{lastName}</span>
                  </div>
                </div>
                <div className="bio-info-items">
                  <div className="bio-info-item">
                    <span className='bio-info-item-text-title'>Email:</span>
                    <span>{data?.email}</span>
                  </div>
                  <div className="bio-info-item">
                    <span className='bio-info-item-text-title'>Phone:</span>
                    <span>{data?.phone}</span>
                  </div>
                  <div className="bio-info-item">
                    <span className='bio-info-item-text-title'>Address</span>
                    <span>{data?.address? data?.address:'null'}</span>
                  </div>
                </div>
            </div>
            <div style={{
              position:'absolute',
              top:"90%",
              left:'90%'
            }}>
              <ManageProfile
               btnName={"Update"}
               padding={'15%'}
               width={'150%'}
               color={ 'white'}
               role={data?.role}
               email={data?.email}
               phone={data?.phone}
               password={data?.password}
               full_name={data?.full_name}
               id={data?.user_id}
              />
            </div>
    </div>
  )
}

export default Profile