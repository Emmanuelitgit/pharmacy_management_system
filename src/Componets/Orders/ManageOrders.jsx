import * as React from 'react';
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from "react-router-dom"
import { depCountActions } from '../../store/depCount';
import axios from "axios";
import { useEffect, useState } from 'react';
import { ArrowDropDown } from '@mui/icons-material';
import {handleToastSuccess, handleToastError} from "../../store/modalState"



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ManageOrders({name, id, status}) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const route = location.pathname.split("/")[1]

  const [open, setOpen] = React.useState(false);
  const[description, setDescription] = useState()
  const [data, setData] = useState({
    status:'False'
  });
  
  const dep = useSelector((state)=>state.count?.depValue)

  useEffect(() => {
    setData((prevData) => ({ ...prevData, description }));
  }, [description]);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleNavigate = () =>{
    navigate(`/${route}/view-order/${id}`)
  }

  const handleClose = () => {
    setOpen(false);
  };
  
  if (id === undefined) {
    return null; 
  }

  if (name === undefined) {
    return null; 
  }

  const handleChange = (e) => {
    const { name, value } = e.target; 
  
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDepCount =()=>{
    dispatch(depCountActions.handleCount())
  }

  const handleUpdate = async() => {
    try {
      const response = await axios.put(`https://pharmacy-v2qn.onrender.com/api/medicine/order/update/${id}/`,
        {status:data.status}
      );
      console.log(response)
      if(response.status === 200){
        handleDepCount()
        handleClose()
        dispatch(handleToastSuccess("Updated Successfully"))
      }
    } catch (error) {
      dispatch(handleToastError('Error! cannot perform operation'))
    }
  };

  return (
    <React.Fragment>
      <button
      onClick={handleClickOpen}
      style={{
        backgroundColor:status===true?'green':'purple',
        color:'white',
        padding:'5px',
        borderRadius:'5px'
      }}
      >
        {status === true ? 'Delivered' : 'Pending'}<ArrowDropDown/>
      </button>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
         Update {name} status
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color:"red",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <div className='input-container'>
          <label htmlFor="">Category</label>
            <select name="status" onChange={handleChange}  className='dropdown'>
              <option value="">--Select order status--</option>
              <option value={'False'}>Pending</option>
              <option value={'True'}>Delivered</option>
            </select>
        </div>
        </DialogContent>
        <DialogActions>
          <button autoFocus 
            onClick={handleUpdate}
            className='modal-btn'
            >
            Save changes
          </button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}