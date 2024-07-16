import React from 'react'
import "./style.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStaff, getPatients, getReports } from '../../store/data';
import { depCountActions } from '../../store/depCount';
import { Dashboard,Settings, Person,PersonAdd,ShoppingCart} from '@mui/icons-material';
import {Card,Row, Col} from "react-bootstrap";

const AdminBoxes = () => {


    // const role = useSelector((state) => state.auth?.role?.toLowerCase());
    const dispatch = useDispatch()
    const role = localStorage.getItem('role').toLowerCase()
    const getAllStaff = useSelector((state)=>state.data?.staff)
    const patients = useSelector((state)=>state.data?.patients)
    const reports = useSelector((state)=>state.data?.reports)
    const dep = useSelector(state => state.count?.depValue) || [2];


    // const doctor = getAllStaff.filter((data) => data?.role?.toLowerCase() === "doctor");
    // const nurse = getAllStaff.filter((data) => data?.role?.toLowerCase() === "nurse");
    // const laboratorist = getAllStaff.filter((data) => data?.role?.toLowerCase() === "laboratorist");
    // const pharmacist = getAllStaff.filter((data) => data?.role?.toLowerCase() === "pharmacist");
    // const radiographer = getAllStaff.filter((data) => data?.role?.toLowerCase() === "radiographer");
    // const accountant = getAllStaff.filter((data) => data?.role?.toLowerCase() === "accountant");
    


    useEffect(()=>{
        dispatch(getStaff())
       },[dep]);

    useEffect(()=>{
        dispatch(getPatients())
       },[dep]);

    useEffect(()=>{
        dispatch(getReports())
       },[dep])

   const adminBoxes = [
        {
        id:1,
        name:"Users",
        background:"purple",
        link:'/admin/doctor-list',
        total: 10,
        image:'https://cdn-icons-png.flaticon.com/128/476/476863.png'
      },
      {
        id:2,
        name:"Sales",
        background:"pink",
        link:'/admin/nurse-list',
        total: 25,
        image:'https://cdn-icons-png.flaticon.com/128/3271/3271314.png'
      },
      {
        id:3,
        name:"Orders",
        background:"orange",
        link:'/admin/patient-list',
        total: 17,
        image:'https://cdn-icons-png.flaticon.com/128/4290/4290854.png'
      },
      {
        id:4,
        name:"Drugs",
        background:"red",
        link:'/admin/medicine-list',
        total: 9,
        image:'https://cdn-icons-png.flaticon.com/128/4320/4320365.png'
      },
      // {
      //   id:5,
      //   name:"Laboratorist",
      //   background:"bg-danger",
      //   link:'/admin/laboratorist-list',
      //   total: laboratorist.length
      // },
      // {
      //   id:6,
      //   name:"Accountant",
      //   background:"teal",
      //   link:'/admin/accountant-list',
      //   total: accountant.length
      // },
      // {
      //   id:7,
      //   name:"Radiographer",
      //   background:"brown",
      //   link:'/admin/radiographer-list',
      //   total: radiographer.length
      // },
      // {
      //   id:8,
      //   name:"Reports",
      //   background:"bg-info",
      //   link:'/admin/birth-report',
      //   total: reports.length
      // },  
      ]

  return (
    <div className=''>

        {role === "admin" &&
        <div class="row">
            {adminBoxes.map((box)=>(
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

//     <Row>
//      {adminBoxes.map((box)=>(
//        <Col lg="3" sm="6">
//        <Card className="card-stats">
//          <Card.Body>
//            <Row>
//              <Col xs="5">
//                <div className="icon-big text-center icon-warning">
//                  <Person/>
//                </div>
//              </Col>
//              <Col xs="7">
//                <div className="numbers">
//                  <p className="card-category">{box.total}</p>
//                  <Card.Title as="h4">{box.name}</Card.Title>
//                </div>
//              </Col>
//            </Row>
//          </Card.Body>
//          <Card.Footer>
//            <div className="stats">
//              <i className="fas fa-redo mr-1"></i>
//              Update Now
//            </div>
//          </Card.Footer>
//        </Card>
//      </Col>
//      ))}
//  </Row>
  )
}

export default AdminBoxes;