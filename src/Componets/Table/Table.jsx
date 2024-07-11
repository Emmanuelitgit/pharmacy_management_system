import { useMemo, useState, useEffect } from 'react';
import {MaterialReactTable,useMaterialReactTable} from 'material-react-table';

const Table = () => {
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

  const handleDelete = (categoryId) => {
    console.log('Delete category with ID:', categoryId);
    // Add your delete logic here
  };

  const handleUpdate = (categoryId) => {
    console.log('Update category with ID:', categoryId);
    // Add your update logic here
  };

  const handleView = (categoryId) => {
    console.log('View category with ID:', categoryId);
    // Add your view logic here
  };

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
        header: 'Category ID',
        size: 100,
      },
      {
        accessorKey: 'category_name',
        header: 'Category Name',
        size: 150,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 300,
        Cell: ({ cell }) => (
          <span>{truncateText(cell.getValue(), 40)}</span>
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 200,
        Cell: ({ row }) => {
          const categoryId = row.original.category_id;
          return (
            <div>
              <button onClick={() => handleView(categoryId)}>View</button>
              <button onClick={() => handleUpdate(categoryId)}>Update</button>
              <button onClick={() => handleDelete(categoryId)}>Delete</button>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({ columns, data: tableData });

  return (
    <MaterialReactTable table={table} />
  );
};

export default Table;
