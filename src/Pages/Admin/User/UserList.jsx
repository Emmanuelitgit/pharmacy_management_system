import { useMemo, useState, useEffect } from 'react';
import {MaterialReactTable,useMaterialReactTable} from 'material-react-table';
import AddUser from "../AddUser/AddUser"
import ManageUser from "../AddUser/ManageUser"
import axios from 'axios';
import { useSelector } from 'react-redux';



const UserList = () => {

  const role = localStorage.getItem("role");
  const [tableData, setTableData] = useState([]);
  const dep = useSelector((state)=>state.count?.depValue)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pharmacy-v2qn.onrender.com/api/accounts/sales-person/');
      
        const sales_person = await response.data;
        const dataWithIds = sales_person.map((user, index) => ({
          ...user,
          id: index + 1,
        }));
        setTableData(dataWithIds);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dep]);


  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'User ID',
        size: 100,
      },
      {
        accessorKey: 'full_name',
        header: 'Full Name',
        size: 150,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 150,
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
        size: 150,
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 220,
        Cell: ({ row }) => {
          return (
            <div>
              <ManageUser
               name={'User'}
               staff_name={row.original.full_name}
               email={row.original.email}
               phone={row.original.phone}
               id={row.original.user_id} 
               profile={row.original.user_image}
               role={row.original.role}
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
    <div>
          {role === "Admin"  &&
              <div className='add-btn-container'>
                  <AddUser name={"User"}/>
              </div>
          }
        <div className="table-component">
          <MaterialReactTable table={table} />
        </div>
    </div>
  );
};

export default UserList;
