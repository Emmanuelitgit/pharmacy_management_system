import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import axios from 'axios';
import ReportGenerator from './ReportGenerator';
import { useSelector } from 'react-redux';


const Report = () => {
  const [tableData, setTableData] = useState([]);
  const dep = useSelector((state) => state.count?.depValue);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('https://pharmacy-v2qn.onrender.com/api/medicine/order/all/', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const { orders } = response.data;

        // Map and format the data
        const mappedData = orders?.map((order) => ({
          order_id: order.order_id,
          medicine_id: order.medicine.medicine_id,
          name: order.medicine.name,
          category: order.medicine.category,
          price: parseFloat(order.medicine.price), // Ensure price is a number
          quantity: parseInt(order.quantity), // Ensure quantity is a number
          status: order.status,
          full_name: order.full_name,
          address: order.address,
          date: new Date(order.created_at), // Convert to Date object for easier sorting and grouping
        }));

        // Group orders by year and month
        const groupedData = mappedData?.reduce((acc, order) => {
          const yearMonth = `${order.date.getFullYear()}-${String(order.date.getMonth() + 1).padStart(2, '0')}`; // Group by YYYY-MM
          if (!acc[yearMonth]) {
            acc[yearMonth] = {
              yearMonth,
              totalSales: 0,
              totalRevenue: 0,
              orders: [],
            };
          }
          // Aggregate totals for the month
          acc[yearMonth].totalSales += order.quantity; // Sum the quantities
          acc[yearMonth].totalRevenue += order.price * order.quantity; // Sum the price * quantity for total revenue
          acc[yearMonth].orders.push(order); // Keep the individual orders in case you need them
          return acc;
        }, {});

        // Convert the grouped data to an array and sort by latest month
        const sortedGroupedData = Object.values(groupedData).sort((a, b) => new Date(b.yearMonth) - new Date(a.yearMonth));

        // Add ID for each row (optional)
        const dataWithIds = sortedGroupedData?.map((group, index) => ({
          ...group,
          id: index + 1,
        }));

        setTableData(dataWithIds);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dep]);

  console.log(tableData)

  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'yearMonth',
        header: 'Date',
        size: 150,
        Cell: ({ cell }) => {
          const [year, month] = cell.getValue().split('-');
          return `${month}-${year}`; // Display Month-Year
        },
      },
      {
        accessorKey: 'totalSales',
        header: 'Total Sales',
        size: 150,
      },
      {
        accessorKey: 'totalRevenue',
        header: 'Total Revenue',
        size: 150,
      },
      {
        id: 'actions',
        header: 'ACTIONS',
        size: 200,
        Cell: ({ row }) => {
          const ordersInMonth = row.original.orders; // All orders for that month
          return (
            <div>
              <ReportGenerator
                name={'Monthly Report'}
                orders={ordersInMonth}
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
      <div className="table-component">
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
};

export default Report;