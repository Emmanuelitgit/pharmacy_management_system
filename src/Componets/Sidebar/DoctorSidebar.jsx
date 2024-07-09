import React from 'react';
import "./style.css";
import { Dashboard,
        Logout, 
        Settings, 
        Person, 
        Science, 
        LocalPharmacy,
        MedicalServices,
        PeopleAlt,
        Bloodtype,
        ArrowDropDown,
        PersonAdd,
        Healing } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import LogoutBtn from '../Buttons/LogoutBtn';


const DoctorSidebar = () => {

  return (
    <div className='sidebar-container'>
      <div className='sidebar-items-container'>
        <div className='item'>
          <Link className='link' to={"/doctor/dashboard"}>
          <Dashboard className='sidebar-icon'/>
          <span className='item-name'>Dashboard</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/doctor/patient-list"}>
          <PersonAdd className='sidebar-icon'/>
          <span className='item-name'>Patient</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/doctor/appointment-list"}>
          <Healing className='sidebar-icon'/>
          <span className='item-name'>Manage Appointment</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/doctor/bed-allotment-list"}>
          <PeopleAlt className='sidebar-icon'/>
          <span className='item-name'>Bed Allotment</span>
          </Link>
        </div>
        <div className='item'>
         <Link className='link' to={"/doctor/blood-bank"}>
         <MedicalServices className='sidebar-icon'/>
         <span className='item-name'>View Blood Bank</span>
         </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/doctor/lab-request"}>
          <LocalPharmacy className='sidebar-icon'/>
          <span className='item-name'>Lab Request</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/doctor/lab-result"}>
          <LocalPharmacy className='sidebar-icon'/>
          <span className='item-name'>Lab Result</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/doctor/prescription-list"}>
          <LocalPharmacy className='sidebar-icon'/>
          <span className='item-name'>Manage Prescription</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/doctor/birth-report"}>
          <LocalPharmacy className='sidebar-icon'/>
          <span className='item-name'>Birth Report</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/doctor/death-report"}>
          <LocalPharmacy className='sidebar-icon'/>
          <span className='item-name'>Death Report</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/doctor/operation-report"}>
          <LocalPharmacy className='sidebar-icon'/>
          <span className='item-name'>Operation Report</span>
          </Link>
        </div>
        <div className='item'>
          <Link className='link' to={"/doctor/profile"}>
          <Person className='sidebar-icon'/>
          <span className='item-name'>Profile</span>
          </Link>
        </div>
      </div>
      <LogoutBtn/>
    </div>
  )
}

export default DoctorSidebar