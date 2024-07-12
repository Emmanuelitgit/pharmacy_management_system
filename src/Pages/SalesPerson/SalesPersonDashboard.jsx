import React from 'react';
import DashboardBoxes from '../../Componets/DashboardBoxes/DashboardBoxes';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useState, useEffect } from 'react';
import {MaterialReactTable,useMaterialReactTable} from 'material-react-table';
import ManageOrders from "../../Componets/Orders/ManageOrders"



const SalesPersonDashboard = () => {

  const role = localStorage.getItem("role");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/medicine_categories');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const fetchedData = await response.json();
        setTableData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'category_id',
        header: 'ORDER ID',
        size: 100,
      },
      {
        accessorKey: 'category_name',
        header: 'CATEGORY NAME',
        size: 150,
      },
      {
        accessorKey: 'description',
        header: 'DESCRIPTION',
        size: 300,
        Cell: ({ cell }) => (
          <span>{truncateText(cell.getValue(), 40)}</span>
        ),
      },
      {
        id: 'actions',
        header: 'ACTIONS',
        size: 200,
        Cell: ({ row }) => {
          const categoryId = row.original.category_id;
          return (
            <div>
              <ManageOrders
               name={'Order'}
               id={categoryId} 
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