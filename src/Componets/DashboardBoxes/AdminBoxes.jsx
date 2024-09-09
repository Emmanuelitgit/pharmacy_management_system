import React from 'react'
import "./style.css";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStaff, getPatients, getReports } from '../../store/data';
import { depCountActions } from '../../store/depCount';
import { Dashboard,Settings, Person,PersonAdd,ShoppingCart} from '@mui/icons-material';
import {Card,Row, Col} from "react-bootstrap";
import axios from 'axios';


const AdminBoxes = () => {

    const role = localStorage.getItem('role').toLowerCase()
    
    const [orders, setOrders] = useState('')
    const [medicine, setMedicine] = useState('')
    const [user, setUser] = useState('')
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

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://pharmacy-v2qn.onrender.com/api/accounts/sales-person/');
          
            const sales_person = await response.data;
            setUser(sales_person)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, [dep]);


   const adminBoxes = [
        {
        id:1,
        name:"Users",
        background:"purple",
        link:'/admin/user-list',
        total: user?.length,
        image:'https://cdn-icons-png.flaticon.com/128/476/476863.png'
      },
      {
        id:2,
        name:"Monthly Sales",
        background:"pink",
        link:'/admin/report',
        total: 5,
        image:'https://cdn-icons-png.flaticon.com/128/3271/3271314.png'
      },
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