import React from 'react'
import "./style.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPrescription, getPatients, getReports, getAppointmentList, getBloodGroup, getBedAllotment } from '../../store/data';
import { depCountActions } from '../../store/depCount';


const SalesPersonBoxes = () => {


    // const role = useSelector((state) => state.auth?.role?.toLowerCase());
    const dispatch = useDispatch()
    const role = localStorage.getItem('role').toLowerCase()
    const patients = useSelector((state)=>state.data?.patients)
    const dep = useSelector(state => state.count?.depValue) || [2];
    const reports = useSelector((state)=>state.data?.reports);
    const appointments = useSelector((state)=>state.data?.appointments);
    const prescriptions = useSelector((state)=>state.data?.prescriptions);
    const bloodBank = useSelector((state)=>state.data?.bloodBank);
    const bedAllotments = useSelector((state)=>state.data?.bedAllotment);


    const birth_report = reports.filter((data) => data?.report_type?.toLowerCase() === "birth report");
    const death_report = reports.filter((data) => data?.report_type?.toLowerCase() === "death report");
    const operation_report = reports.filter((data) => data?.report_type?.toLowerCase() === "operation report");


    useEffect(()=>{
        dispatch(getPatients())
       },[dep]);

    useEffect(()=>{
        dispatch(getReports())
       },[dep]);

    useEffect(()=>{
        dispatch(getAppointmentList())
       },[dep]);

    useEffect(()=>{
        dispatch(getPrescription())
       },[dep]);

    useEffect(()=>{
        dispatch(getBloodGroup())
       },[dep]);

    useEffect(()=>{
        dispatch(getBedAllotment())
       },[dep]);



  const salesBoxes = [
    {
      id:1,
      name:"Drug",
      background:"purple",
      link:'/admin/doctor-list',
      total: patients.length,
      image:require("../../uploads/drug.png")
    },
    {
      id:2,
      name:"Orders",
      background:"pink",
      link:'/admin/nurse-list',
      total: appointments.length,
      image:require("../../uploads/order.png")
    },
      // {
      //   id:8,
      //   name:"Prescription",
      //   background:"bg-success",
      //   link:'/doctor/prescription-list',
      //   total: prescriptions?.length
      // },
      // {
      //   id:9,
      //   name:"Blood Bank",
      //   background:"purple",
      //   link:'/doctor/blood-bank',
      //   total: bloodBank?.length
      // },
      // {
      //   id:11,
      //   name:"Operation Report",
      //   background:"bg-danger",
      //   link:'/doctor/operation-report',
      //   total: operation_report?.length
      // },
      // {
      //   id:12,
      //   name:"Birth Report",
      //   background:"teal",
      //   link:'/doctor/birth-report',
      //   total: birth_report?.length
      // },
      // {
      //   id:13,
      //   name:"Death Report",
      //   background:"brown",
      //   link:'/doctor/death-report',
      //   total: death_report?.length
      // },
      // {
      //   id:14,
      //   name:"Bed Allotment",
      //   background:"bg-info",
      //   link:'/doctor/bed-allotment-list',
      //   total: bedAllotments?.length
      // },
      ]

  return (
    <div className=''>

    {role === "doctor" &&
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