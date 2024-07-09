import React from 'react'
import "./style.css";
import Calender from '../Calender/Calender';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStaff } from '../../store/data';
import AdminBoxes from './AdminBoxes';
import SalesPersonBoxes from './SalesPersonBoxes';


const DashboardBoxes = () => {


    // const role = useSelector((state) => state.auth?.role?.toLowerCase());
    const dispatch = useDispatch()
    const role = localStorage.getItem('role').toLowerCase()



    useEffect(()=>{
        dispatch(getStaff())
       },[])

  return (
    <div className=''>
        <AdminBoxes/>  
        <SalesPersonBoxes/>
    </div>
  )
}

export default DashboardBoxes