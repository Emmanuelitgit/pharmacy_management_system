import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { depCountActions } from '../../store/depCount';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {handleToastSuccess, handleToastError} from "../../store/modalState"


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AddOrders({name}) {

  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false);
  const[medicine, setMedicine] = useState()
  const [data, setData] = useState({
    medicine_id:'',
    quantity:null,
    address:''
  });

  const dep = useSelector(state => state.count?.depValue) || [2];

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  useEffect(()=>{
    const getMedicines =async()=>{
      try {
        const response = await fetch('https://pharmacy-v2qn.onrender.com/api/medicine/all/');
        if(!response.ok){
          throw new Error('Failed to fetch data');
        }
        const fetchedData = await response.json();
        const {medicines} = fetchedData
        setMedicine(medicines)
      } catch (error) {
        console.log(error)
      }
    }
    getMedicines()
  }, [dep])

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
  
  const handleSubmit = async () => {
    try {
      const accessToken = await localStorage.getItem('token')
  
      const response = await axios.post('https://pharmacy-v2qn.onrender.com/api/medicine/order/',
        {
          medicine_id:data?.medicine_id,
          quantity:data?.quantity,
          address:data?.address
        },
        {
            headers: {
             'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
      );
      
      if (response.status === 200) {
        handleDepCount()
        const {authorization_url} = response.data.data
        window.location.href = authorization_url;    }
    } catch (error) {
        console.log(error)
    }finally{
      handleDepCount()
    }
  };


  return (
    <React.Fragment>
        <button variant="outlined" 
          onClick={handleClickOpen}
          className='add-btn'
      >
        <Add style={{fontSize:'25px'}}/>
        {name}
      </button>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2, width:"400px" }} id="customized-dialog-title">
         Add New Medicine
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
        <DialogContent dividers >
          <div className='input-container'>
          <label htmlFor="">Doctor</label>
            <select name="category" onChange={handleChange} value={data.doctor}  className='dropdown'>
              <option value="">--Select Medicine--</option>
              {medicine?.map((item)=>(
                <option value={item.medicine_id} key={item.medicine_id}>
                  {item.name}
                </option>
              ))}
            </select>
        </div> 
        <div className='input-container'>
            <label htmlFor="">Quantity</label>
            <input type="number"
              className='input'
              placeholder='eg 10'
              name='quantity'
              onChange={handleChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Customer's Address</label>
            <input type="text"
              className='input'
              placeholder='eg University of Ghana, Legon'
              name='address'
              onChange={handleChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button autoFocus 
            onClick={handleSubmit}
            className='modal-btn'
            >
            Save changes
          </button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}