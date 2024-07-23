import { useMemo, useState, useEffect } from 'react';
import {MaterialReactTable,useMaterialReactTable} from 'material-react-table';
import ManageOrders from "./ManageOrders"
import AddOrders from "./AddOrders"
import axios from 'axios';
import { data } from 'autoprefixer';
import { useDispatch, useSelector } from 'react-redux';



const Orders = () => {

  const role = localStorage.getItem("role");
  const [tableData, setTableData] = useState([]);
  const [medicineOrdered, setMedicineOrdered] = useState('')
  const dep = useSelector((state)=>state.count?.depValue)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get('https://pharmacy-v2qn.onrender.com/api/medicine/order/all/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
        });
      console.log(response.data)
        const {orders} = await response.data;

        const mappedData = orders?.map((order) => ({
          order_id: order.order_id,
          medicine_id: order.medicine.medicine_id,
          name: order.medicine.name,
          category: order.medicine.category,
          price: order.medicine.price,
          quantity: order.quantity,
          status: order.status,
          customer_id: order.customer.user_id,
          email: order.customer.email,
          full_name: order.customer.full_name,
          phone: order.customer.phone,
          address: order.address,
        }));
        
        const dataWithIds = mappedData?.map((order, index) => ({
          ...order,
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
        header: 'Order ID',
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
        size: 150,
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        size: 150,
      },
      {
        accessorKey: 'full_name',
        header: 'Customer Name',
        size: 150,
      },
      {
        id: 'actions',
        header: 'ACTIONS',
        size: 200,
        Cell: ({ row }) => {
          const orderId = row.original.order_id;
          return (
            <div>
              <ManageOrders
               name={'Order'}
               id={orderId}
               status={row.original.status} 
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
