import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import ManageMedicine from '../Medicine/ManageMedicine';
import AddMedicine from '../Medicine/AddMedicine';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { data } from 'autoprefixer';

const MedicineList = () => {

  const role = localStorage.getItem('role');
  const [tableData, setTableData] = useState([]);

  const dep = useSelector((state)=>state.count?.depValue)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pharmacy-v2qn.onrender.com/api/medicine/all/');
        const { medicines } = response.data;

        // Add a sequential ID to each medicine item
        const dataWithIds = medicines.map((medicine, index) => ({
          ...medicine,
          id: index +1,
        }));

        setTableData(dataWithIds);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dep]);

  console.log(tableData)

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
        header: '#ID',
        size: 100,
      },
      {
        accessorKey: 'category',
        header: 'Medicine Name',
        size: 150,
      },
      {
        accessorKey: 'quantity',
        header: 'Status',
        size: 100,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        size: 100,
      },
      {
        accessorKey: 'manufacturer',
        header: 'Manufacturer',
        size: 100,
      },
      // {
      //   accessorKey: 'description',
      //   header: 'Description',
      //   size: 300,
      //   Cell: ({ cell }) => <span>{truncateText(cell.getValue(), 40)}</span>,
      // },
      {
        id: 'actions',
        header: 'Actions',
        size: 300,
        Cell: ({ row }) => {
          const categoryId = row.original.medicine_id;
          return (
            <div>
              <ManageMedicine name={'Medicine'} id={categoryId} />
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
      {role === 'Admin' && (
        <div className="add-btn-container">
          <AddMedicine name={'Medicine'} />
        </div>
      )}
      <div className="table-component">
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
};

export default MedicineList;