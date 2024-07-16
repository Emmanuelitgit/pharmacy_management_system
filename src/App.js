import React from 'react';
import "../src/Componets/Style/style.css";
import { createBrowserRouter, Outlet, RouterProvider, Navigate } from "react-router-dom";
import AdminNavs from "./Componets/Navs/AdminNavs";
import Login from "./Pages/Login/Login";
import AdminDashboard from "./Pages/Admin/Dashboard/AdminDashboard";
import Register from "./Pages/Register/Register";
import Payment from "./Componets/Payment/Payment";
import UserList from "./Pages/Admin/User/UserList";
import SalesPersonNavs from './Componets/Navs/SalesPersonNavs';
import SalesPersonDashboard from "./Pages/SalesPerson/SalesPersonDashboard";
import InvoiceList from './Componets/Payment/InvoiceList';
import Profile from './Componets/Profile/Profile';
import Settings from './Pages/Admin/Settings/Settings';
import ViewUser from './Pages/Admin/AddUser/ViewUser';
import ViewMedCategory from './Componets/Medicine/ViewMedCategory';
import ViewMedicine from './Componets/Medicine/ViewMedicine';
import ViewInvoice from './Componets/Payment/ViewInvoice';
import MedicineList from "./Componets/Medicine/MedicineList";
import MedicineCategory from "./Componets/Medicine/MedicineCategory";
import '@coreui/coreui/dist/css/coreui.min.css';
import Orders from "./Componets/Orders/Orders"


const Admin = () => {
  return (
    <> 
      <AdminNavs/>
      <Outlet/>
    </>
  );
};

const SalesPerson = () => {
  return (
    <> 
      <SalesPersonNavs/>
      <Outlet/>
    </>
  );
};

const router = createBrowserRouter([
  // ADMIN MODULE NAVIGATION HERE
  {
    path: "/admin",
    element: <Admin/>,
    children: [
      { path: "/admin/dashboard", element: <AdminDashboard /> },
      { path: "/admin/user-list", element: <UserList /> },
      { path: "/admin/payment-list", element: <Payment /> },
      { path: "/admin/medicine-list", element: <MedicineList /> },
      { path: "/admin/medicine-category", element: <MedicineCategory /> },
      { path: "/admin/view-medicine", element: <ViewMedicine /> },
      { path: "/admin/view-category", element: <ViewMedCategory /> },
      { path: "/admin/user-list", element: <UserList /> },
      { path: "/admin/order-list", element: <Orders /> },
      { path: "/admin/view-staff/:id", element: <ViewUser /> },
      { path: "/admin/profile", element: <Profile /> },
      { path: "/admin/settings", element: <Settings /> },
    ]
  },

  // DOCTOR MODULE NAVIGATION HERE
  {
    path: "/sales-person",
    element: <SalesPerson/>,
    children: [
      { path: "/sales-person/dashboard", element: <SalesPersonDashboard /> },
      { path: "/sales-person/medicine-list", element: <MedicineList /> },
      { path: "/sales-person/order-list", element: <Orders /> },
      { path: "/sales-person/profile", element: <Profile /> },
    ]
  },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  
  // Redirect all unmatched routes to login
  {
    path: "/*",
    element: <Navigate to="/login" replace />
  }
]);

function App() {
  return (
    <div className="App">
      <div className=''>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;