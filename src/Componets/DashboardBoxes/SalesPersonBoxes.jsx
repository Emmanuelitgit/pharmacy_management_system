import React, { useState } from 'react'
import "./style.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPrescription, getPatients, getReports, getAppointmentList, getBloodGroup, getBedAllotment } from '../../store/data';
import { depCountActions } from '../../store/depCount';
import axios from 'axios';

const SalesPersonBoxes = () => {

    const role = localStorage.getItem('role').toLowerCase()
    const [orders, setOrders] = useState('')
    const [medicine, setMedicine] = useState('')
    const dep = useSelector((state)=>state.count?.depValue)


    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem("token")
            const response = await axios.get('https://pharmacy-v2qn.onrender.com/api/medicine/order/all/', {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
            });
            const {orders} = await response.data;           
            setOrders(orders);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, [dep]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://pharmacy-v2qn.onrender.com/api/medicine/all/');
            const { medicines } = response.data;
            setMedicine(medicines);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [dep]);


  const salesBoxes = [
    {
        id:3,
        name:"Orders",
        background:"orange",
        link:'/admin/order-list',
        total: orders?.length,
        image:'https://cdn-icons-png.flaticon.com/128/4290/4290854.png'
      },
      {
        id:4,
        name:"Drugs",
        background:"red",
        link:'/admin/medicine-list',
        total: medicine?.length,
        image:'https://cdn-icons-png.flaticon.com/128/4320/4320365.png'
      }
      ]

  return (
    <div className=''>

    {role === "sales_person" &&
    <div class="row">
        {salesBoxes.map((box)=>(
        <div className="col-xl-3 col-md-6">
            <div className={`card  text-black mb-4`} style={{
                height:'18vh'
            }}>
                <div class="card-body">
                    <span className='text-lg'>{box.name}</span>
                    <img 
                     src={box.image} 
                     alt="" 
                     width={'22%'}
                     height={'21%'}
                     />
                    <span style={{
                         position:"absolute",
                         top:"10%",
                         left:'80%',
                         fontSize:'18px',
                         fontWeight:600
                    }}>{box.total}</span>
                </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="text-sm text-black stretched-link" href={box.link}>View Details</a>
                    <div class="text-sm text-black"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        ))}
        </div>
        }
</div>
  )
}

export default SalesPersonBoxes