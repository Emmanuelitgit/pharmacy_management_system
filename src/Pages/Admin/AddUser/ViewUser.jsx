import React, { useEffect, useState } from 'react'
import doctor from "../../../Componets/images/staff/doctor 1.png";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ViewStaff = () => {

    const[data, setData] = useState()
    const location = useLocation();
    const id = location.pathname.split("/")[3]; 

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
    }, [])

  return (
    <div className='view-staff-container'>
         <div className='view-staff-sub-container'>
            <div className="view-staff-profile-items">
                <span className="view-staff-profile-item ">{name}</span>
                <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSusvPVRdrInwIDn6yQygRR4Asmf2uRXgZJQ&s'} alt=""  className='view-staff-profile'/>
            </div>
         </div>
         <div className="view-staff-horozontally-line"></div>
         <h3 className='bio-title'>Bio Info:</h3>
            <div className='bio-info-container' key={data?.user_id}>
                <div className="bio-info-items">
                  <div className="bio-info-item">
                    <span className='bio-info-item-text-title'>Staff ID:</span>
                    <span>10457272</span>
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
                    <span className='bio-info-item-text-title'>Role:</span>
                    {role==="sales_person"? "Sales Person": "Admin"}
                    </div>
                </div>
            </div>
    </div>
  )
}

export default ViewStaff