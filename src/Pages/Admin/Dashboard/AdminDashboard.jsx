import { useMemo, useState, useEffect } from 'react';
import {MaterialReactTable,useMaterialReactTable} from 'material-react-table';
import AddUser from "../AddUser/AddUser";
import ManageUser from "../AddUser/ManageUser";
import DashboardBoxes from '../../../Componets/DashboardBoxes/DashboardBoxes';
import Charts from "../../../Componets/Charts/Charts"
import axios from 'axios';


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


  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'User ID',
        size: 100,
      },
      {
        accessorKey: 'category',
        header: 'Full Name',
        size: 150,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 100,
        Cell: ({ cell }) => (
          <span>{truncateText(cell.getValue(), 40)}</span>
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 200,
        Cell: ({ row }) => {
          const categoryId = row.original.medicine_id;
          return (
            <div>
              <ManageUser
               name={'User'}
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
      <Charts/>
      <div className="dashboard-table-component">
          <MaterialReactTable table={table} />
        </div>
    </div>
  )
}

export default AdminDashboard