import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import ManageMedicine from '../Medicine/ManageMedicine';
import AddMedicine from '../Medicine/AddMedicine';
import axios from 'axios';
import { useSelector } from 'react-redux';

const MedicineList = () => {

  const role = localStorage.getItem('role');
  const [tableData, setTableData] = useState([]);

  const dep = useSelector((state)=>state.count?.depValue)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pharmacy-v2qn.onrender.com/api/medicine/all/');
        const { medicines } = response?.data;

        // Add a sequential ID to each medicine item
        const dataWithIds = medicines?.map((medicine, index) => ({
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


  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: '#ID',
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
        header: 'Quantity',
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
          const categoryId = row.original?.medicine_id;
          return (
            <div>
              <ManageMedicine 
               name={'Medicine'} 
               id={categoryId}
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
    <div>
        <div className="add-btn-container">
          <AddMedicine name={'Medicine'} />
        </div>
    
      <div className="table-component">
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
};

export default MedicineList;