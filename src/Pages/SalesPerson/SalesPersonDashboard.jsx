import React from 'react';
import DashboardBoxes from '../../Componets/DashboardBoxes/DashboardBoxes';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useState, useEffect } from 'react';
import {MaterialReactTable,useMaterialReactTable} from 'material-react-table';
import ManageOrders from "../../Componets/Orders/ManageOrders"
import axios from 'axios';
import ManageMedicine from '../../Componets/Medicine/ManageMedicine';

const SalesPersonDashboard = () => {

  const role = localStorage.getItem("role");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pharmacy-v2qn.onrender.com/api/medicine/all/');
      
        const {medicines} = await response.data;
        const dataWithIds = medicines.map((medicine, index) => ({
          ...medicine,
          id: index + 1,
        }));
        setTableData(dataWithIds);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'User ID',
        size: 100,
      },
      {
        accessorKey: 'name',
        header: 'Medicine Name',
        size: 150,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        size: 100,
      },
      {
        accessorKey: 'quantity',
        header: 'Status',
        size: 100,
      },
      {
        accessorKey: 'manufacturer',
        header: 'Manufacturer',
        size: 100,
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 200,
        Cell: ({ row }) => {
          return (
            <div>
              <ManageMedicine
               name={'User'}
               id={row.original.medicine_id} 
              />
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({ columns, data: tableData });

  return (
    <div className='admin-container'>
      <DashboardBoxes/>
      <div>
        <div className="sales-person-table-component">
          <MaterialReactTable table={table} />
        </div>
    </div>
    </div>
  )
}

export default SalesPersonDashboard