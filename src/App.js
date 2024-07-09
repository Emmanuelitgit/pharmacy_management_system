import React from 'react';
import "../src/Componets/Style/style.css"
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import AdminNavs from "./Componets/Navs/AdminNavs"
import Login from "./Pages/Login/Login";
import AdminDashboard from "./Pages/Admin/Dashboard/AdminDashboard"
import Register from "./Pages/Register/Register";
import Payment from "./Componets/Payment/Payment"
import UserList from "./Pages/Admin/User/UserList"
import DoctorNavs from './Componets/Navs/DoctorNavs';
import DoctorDashboard from "./Pages/Doctor/DoctorDashboard"
import InvoiceList from './Componets/Payment/InvoiceList';
import Profile from './Componets/Profile/Profile';
import Settings from './Pages/Admin/Settings/Settings';
import ViewUser from './Pages/Admin/Add User/ViewUser';
import ViewMedCategory from './Componets/Medicine/ViewMedCategory';
import ViewMedicine from './Componets/Medicine/ViewMedicine';
import ViewInvoice from './Componets/Payment/ViewInvoice';
import MedicineList from "./Componets/Medicine/MedicineList";
import MedicineCategory from "./Componets/Medicine/MedicineCategory"
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@coreui/coreui/dist/css/coreui.min.css'
import Chat from "./Componets/Chat/ChatContainer/Chat"


const Admin =()=>{
 return(
  <> 
  <AdminNavs/>
  <Outlet/>
  </>
 )
}

const Doctor =()=>{
  return(
   <> 
   <DoctorNavs/>
   <Outlet/>
   </>
  )
 }



const router = createBrowserRouter([

    // ADMIN MODULE NAVOGATION HERE
  {
    path: "/admin",
    element: <Admin/>,
    children: [
      { path: "/admin/dashboard", element: <AdminDashboard /> },
      { path: "/admin/user-list", element: <UserList /> },
      { path: "/admin/payment-list", element: <Payment /> },
      { path: "/admin/medicine-list", element: <MedicineList /> },
      { path: "/admin/medicine-category", element: <MedicineCategory /> },
      { path: "/admin/user-list", element: <UserList /> },
      { path: "/admin/view-staff/:id", element: <ViewUser /> },
      { path: "/admin/profile", element: <Profile /> },
      { path: "/admin/settings", element: <Settings /> },
      { path: "/admin/chat", element: <Chat /> },
    ]
  },

  // DOCTOR MODULE NAVIGATION HERE
  {  
    path: "/doctor",
    element: <Doctor/>,
    children:[
      {path: "/doctor/dashboard",element: <DoctorDashboard/>},
    ]
  },
  {path: "/register",element: <Register/>},
  {path: "/login",element: <Login/>},
])

function App() {
  return (
    <div className="App">
      <div className=''>
        <RouterProvider router={router}/>
      </div>
    </div>
  );
}



export default App;


