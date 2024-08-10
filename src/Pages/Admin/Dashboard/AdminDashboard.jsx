import { useMemo, useState, useEffect } from 'react';
import {MaterialReactTable,useMaterialReactTable} from 'material-react-table';
import AddUser from "../AddUser/AddUser";
import ManageUser from "../AddUser/ManageUser";
import DashboardBoxes from '../../../Componets/DashboardBoxes/DashboardBoxes';
import Charts from "../../../Componets/Charts/Charts"
import axios from 'axios';
import ManageMedicine from '../../../Componets/Medicine/ManageMedicine';

const AdminDashboard = () => {

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
               medicine_name={row.original?.name}
               price={row.original?.price}
               quantity={row.original?.quantity}
               manufacturer={row.original?.manufacturer}
               desc={row.original?.description}
               category={row.original?.category} 
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
      <Charts/>
      <div className="dashboard-table-component">
          <MaterialReactTable table={table} />
        </div>
    </div>
  )
}

export default AdminDashboard