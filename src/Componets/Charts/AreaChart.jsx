import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import "./style.css"
import { getAppointmentList } from '../../store/data';
import axios from 'axios';




const AreaChart = () => {

  const dispatch = useDispatch()
  const [windowSize, setWindowSize] = useState()
  const appointments = useSelector((state)=>state.data?.appointments);

  const role = localStorage.getItem("role");
  const [sales, setData] = useState([])
  const [medicineOrdered, setMedicineOrdered] = useState('')
  const dep = useSelector((state)=>state.count?.depValue)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pharmacy-v2qn.onrender.com/api/medicine/order/all/', {
          headers: {
            // 'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
        });

        console.log(response)

        const {orders} = await response.data;


        const mappedData = orders?.map((order) => ({
          order_id: order.order_id,
          medicine_id: order.medicine.medicine_id,
          name: order.medicine.name,
          category: order.medicine.category,
          price: order.medicine.price,
          quantity: order.quantity,
          status: order.status,
          full_name:order.full_name,
          address: order.address,
        }));
        
        const dataWithIds = mappedData?.map((order, index) => ({
          ...order,
          id: index + 1,
        }));
        setData(dataWithIds);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dep]);

  const year = new Date().getFullYear()

  // const januaryAppointments = appointments.filter((data) => data?.date >= `${year}-01-01` &&  data?.date <= `${year}-01-31`);
  // const februaryAppointments = appointments.filter((data) => data?.date >= `${year}-02-01` &&  data?.date <= `${year}-02-29`);
  // const marchAppointments = appointments.filter((data) => data?.date >= `${year}-03-01` &&  data?.date <= `${year}-03-31`);
  // const aprilAppointments = appointments.filter((data) => data?.date >= `${year}-04-01` &&  data?.date <= `${year}-04-30`);
  // const mayAppointments = appointments.filter((data) => data?.date >= `${year}-05-01` &&  data?.date <= `${year}-05-31`);
  // const juneAppointments = appointments.filter((data) => data?.date >= `${year}-06-01` &&  data?.date <= `${year}-06-30`);
  // const julyAppointments = appointments.filter((data) => data?.date >= `${year}-07-01` &&  data?.date <= `${year}-07-31`);
  // const augustAppointments = appointments.filter((data) => data?.date >= `${year}-08-01` &&  data?.date <= `${year}-08-31`);
  // const septemberAppointments = appointments.filter((data) => data?.date >= `${year}-09-01` &&  data?.date <= `${year}-09-30`);
  // const octoberAppointments = appointments.filter((data) => data?.date >= `${year}-10-01` &&  data?.date <= `${year}-10-31`);
  // const novemberAppointments = appointments.filter((data) => data?.date >= `${year}-11-01` &&  data?.date <= `${year}-11-30`);
  // const decemberAppointments = appointments.filter((data) => data?.date >= `${year}-12-01` &&  data?.date <= `${year}-12-31`);


  useEffect(()=>{
    dispatch(getAppointmentList())
   },[dep]);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setWindowSize(windowWidth);
    };
  
    window.addEventListener('resize', handleResize);
    
    handleResize();
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  Chart.register(...registerables);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Sales',
      data: [35, 25, 30, 35, 40, 45, 50, 55, 60, 25, 22, 20],
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false,
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Month',
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Value',
      },
    },
  },
};


  return (
  <Card style={{ width: windowSize < 730 ? "100%" : '72%' }}>
  <Card.Body style={{ width: '100%', height:'30%' }}>
    <Card.Title>Monthly Sales</Card.Title>
    <Line data={data} options={options} style={{height:'100vh', width:'100%'}}/>
  </Card.Body>
</Card>
  );
};

export default AreaChart;
