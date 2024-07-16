import { useMemo, useState, useEffect } from 'react';
import {MaterialReactTable,useMaterialReactTable} from 'material-react-table';
import ManageOrders from "./ManageOrders"
import AddOrders from "./AddOrders"
import axios from 'axios';



const Orders = () => {

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
        header: 'ORDER ID',
        size: 100,
      },
      {
        accessorKey: 'category',
        header: 'CATEGORY NAME',
        size: 150,
      },
      {
        accessorKey: 'description',
        header: 'DESCRIPTION',
        size: 100,
        Cell: ({ cell }) => (
          <span>{truncateText(cell.getValue(), 40)}</span>
        ),
      },
      {
        id: 'actions',
        header: 'ACTIONS',
        size: 200,
        Cell: ({ row }) => {
          const categoryId = row.original.medicine_id;
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
    <div>
        <div className="orders-table-component">
          <MaterialReactTable table={table} />
        </div>
    </div>
  );
};

export default Orders;
