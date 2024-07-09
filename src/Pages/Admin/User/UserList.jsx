import React, { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import Button from '../../../Componets/Buttons/Button';
import ManageUser from '../Add User/ManageUser';
import AddUser from '../Add User/AddUser';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';



const DoctorList = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const role = location.pathname.split("/")[2].replace("-list", "");
  
  const [data, setData] = useState({ columns: [], rows: [] });
  const staffData = useSelector(state => state.staff?.staff) || [];
  const dep = useSelector(state => state.count?.depValue) || [2];



  useEffect(() => {
    const fetchData = async()=>{
      try {

        const response = await fetch(`http://localhost:5000/all_staff`)
        if(!response.ok){
          throw new Error("faild to fetch")
        }
        const fetchedData = await response.json()

        const transformedData = {
          columns: [
            { label: 'ID', field: 'id', sort: 'asc' },
            { label: 'USER NAME', field: 'name', sort: 'asc' },
            { label: 'EMAIL', field: 'email', sort: 'asc' },
            { label: 'PHONE', field: 'phone', sort: 'asc' },
            { label: 'ACTIONS', field: 'actions', sort: 'disabled' },
          ],
          rows: fetchedData.map(item => ({
            id: item?.staff_id,
            name: item?.name,
            email: item?.email,
            phone: item?.phone,
            actions: (
              <ManageUser
                name={"Doctor"}
                staff_name={item.name}
                id={item?.staff_id}
                profile={item.profile}
                role={item.role}
                phone={item.phone}
                address={item.address}
                email={item.email}
                password={item.password}
                department={item.department}
              />
            ),
          })),
        };
    
        setData(transformedData);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[dep]);

  return (
    <div className='main-border'>
      <div className='add-btn-container'>
        <AddUser
          name={"User"}
        />
      </div>
      <MDBDataTable
        striped
        bordered
        searchLabel='Search a name'
        className='table-component'
        data={data}
        theadColor='black'
        theadTextWhite
        noBottomColumns
        searching
        displayEntries
        info
      />
    </div>
  );
}

export default DoctorList;
