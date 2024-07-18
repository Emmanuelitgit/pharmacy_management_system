import { useMemo, useState, useEffect } from 'react';
import {MaterialReactTable,useMaterialReactTable} from 'material-react-table';
import AddMedicineCategory from './AddMedicineCategory';
import ManageMedicineCategory from "./ManageMedicineCategory";
import axios from 'axios';
import { useSelector } from 'react-redux';


const MedicineCategory = () => {

  const role = localStorage.getItem("role");
  const [tableData, setTableData] = useState([]);

  const dep = useSelector((state)=>state.count?.depValue)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pharmacy-v2qn.onrender.com/api/category/all/');
      
        const {categories} = await response.data;
        const dataWithIds = categories.map((category, index) => ({
          ...category,
          id: index + 1,
        }));
        setTableData(dataWithIds);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dep]);


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
        header: 'Category ID',
        size: 100,
      },
      {
        accessorKey: 'name',
        header: 'Category Name',
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
          const categoryId = row.original.id;
          return (
            <div>
              <ManageMedicineCategory
               name={'Category'}
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
          {role === "Admin"  &&
              <div className='add-btn-container'>
                  <AddMedicineCategory name={"Category"}/>
              </div>
          }
        <div className="table-component">
          <MaterialReactTable table={table} />
        </div>
    </div>
  );
};

export default MedicineCategory;
