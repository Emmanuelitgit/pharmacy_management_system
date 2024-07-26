import React, { useEffect, useState } from 'react'
import doctor from "../../Componets/images/staff/doctor 1.png";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ViewMedCategory = () => {

    const[data, setData] = useState()
    const location = useLocation();
    const id = location.pathname.split("/")[3];


    useEffect(()=>{
        const getStaff = async()=>{
            try {
            const response = await axios.get(`https://pharmacy-v2qn.onrender.com/api/category/retrieve/${id}/`, {
              headers: {
                'Content-Type': 'application/json',
            }
            })
            const {category} = await response.data
            setData(category)
            } catch (error) {
                console.log(error)
            }
        }
        getStaff()
    }, [])

    const getText = (html) =>{
      const doc = new DOMParser().parseFromString(html, "text/html")
      return doc.body.textContent
   }

  return (
    <div className='view-result-container'>
                <div className="medical-history-container">
                <table className='medical-history-table'>
                  <thead className='table-head'>
                     <tr className='medical-history-td-tr view-patient-tr'>
                         <th className='view-patient-th '>Category Description</th>
                         <th className='view-patient-th '>Category</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr className='medical-history-td-tr view-patient-tr' key={data?.id}>
                       <td className='medical-history-td-tr'>{getText(data?.description)}</td>
                       <td className='medical-history-td-tr'>{data?.name}</td>
                     </tr>
                   </tbody>
                </table>
             </div>  
    </div>
  )
}

export default ViewMedCategory