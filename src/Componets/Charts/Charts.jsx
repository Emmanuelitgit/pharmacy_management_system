 import React from 'react'
 import AreaChart from './AreaChart';
 import Bar from './Bar';
 import "./style.css"
 
 const Charts = () => {
   return (
     <div className='charts-container' style={{
      display:'flex',
      width:'100%',
      gap:'20px',
      marginBottom:'10%',
      marginTop:'3%',
      height:'70%'
     }}>
        <AreaChart/>
        <Bar/>
     </div>
   )
 }
 
 export default Charts
