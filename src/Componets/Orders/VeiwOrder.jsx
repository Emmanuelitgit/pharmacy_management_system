import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';


const ViewOrder = () => {

    const[data, setData] = useState([{
      orderId:2,
      category:'Tablet',
      description:'Hello this is description',
      price:50,
      status:20,
      manufacturer:'Himalaya',
      name:'Tenofovir',
      customer_location:'Accra, Legon',
      customer:'Emmanuel Yidana'
    }])
    const location = useLocation();
    const id = location.pathname.split("/")[3];
    let medicine_name = data?.map((d)=>d?.name)


    useEffect(()=>{
        const getStaff = async()=>{
            try {
            const response = await fetch(`http://localhost:5000/medicine/${id}`)
            if(!response.ok){
            console.log("faild to fetch data...")
            }
            console.log(response)
            const fetchedData = await response.json()
            setData(fetchedData)
            } catch (error) {
                console.log(error)
            }
        }
        getStaff()
    }, [])

    
  return (
    <div className='view-satff-container'>
            <h3 className='result-title'>Medicine Category ({medicine_name})</h3>
                <div className="medical-history-container">
                <table className='medical-history-table'>
                  <thead className='table-head'>
                     <tr className='medical-history-td-tr view-patient-tr'>
                         <th className='view-patient-th '>Order Id</th>
                         <th className='view-patient-th '>Category</th>
                         <th className='view-patient-th '>Price</th>
                         <th className='view-patient-th '>Customer Name</th>
                         <th className='view-patient-th '>Cutomer Location</th>
                         <th className='view-patient-th '>Quantity</th>
                     </tr>
                   </thead>
                   <tbody>
                     {data?.map((medicine)=>(
                     <tr className='medical-history-td-tr view-patient-tr' key={medicine.medicine_id}>
                       <td className='medical-history-td-tr'>{medicine.orderId}</td>
                       <td className='medical-history-td-tr'>{medicine.category}</td>
                       <td className='medical-history-td-tr'>{medicine.price}</td>
                       <td className='medical-history-td-tr'>{medicine.customer}</td>
                       <td className='medical-history-td-tr'>{medicine.customer_location}</td>
                       <td className='medical-history-td-tr'>{medicine.status}</td>
                     </tr>
                     ))}
                   </tbody>
                </table>
             </div>  
    </div>
  )
}

export default ViewOrder