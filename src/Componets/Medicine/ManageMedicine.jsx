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
import Button from '../Buttons/Button';
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from 'react';
import { depCountActions } from '../../store/depCount';
import axios from "axios";
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

export default function ManageMedicine({name, id, medicine_name, price, quantity, manufacturer, desc, category}) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const route = location.pathname.split("/")[1]

  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem("token")
  const[categories, setCategories] = useState()
  const[description, setDescription] = useState()
  const [data, setData] = useState({
    name:'',
    category:'',
    description:description,
    price:'',
    quantity:'',
    manufacturer:'',
  });

  const dep = useSelector(state => state.count?.depValue) || [2];

  useEffect(() => {
    setData((prevData) => ({ ...prevData, description }));
  }, [description]);

  useEffect(()=>{
    const getCategories =async()=>{
      try {
        const response = await axios.get('https://pharmacy-v2qn.onrender.com/api/category/all/');
      
        const {categories} = await response.data;
        setCategories(categories)
      } catch (error) {
        console.log(error)
      }
    }
    getCategories()
  }, [dep])

  useEffect(()=>{
    setDescription(desc)
  }, [open])

  const handleClickOpen = () => {
    setOpen(true);
    setData({
      name:medicine_name,
      category:category,
      description:desc,
      price:price,
      quantity:quantity,
      manufacturer:manufacturer
    })
  };

  const handleNavigate = () =>{
    navigate(`/${route}/view-medicine/${id}`)
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
      const response = await axios.post(`https://pharmacy-v2qn.onrender.com/api/medicine/update/${id}/`, data,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
      }
      });
      if(response.status === 200){
        handleDepCount()
        handleClose()
        dispatch(handleToastSuccess("Updated Successfully"))
      }
    } catch (error) {
      dispatch(handleToastError('Error! cannot perform operation'))
    }
  };

  const handleDelete = async() => {
    try {
      const response = await axios.delete(`https://pharmacy-v2qn.onrender.com/api/medicine/delete/${id}/`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
      }
      });
      if(response.status === 200){
        handleDepCount()
        dispatch(handleToastSuccess("Deleted Successfully"))
      }
    } catch (error) {
      dispatch(handleToastError('Error! cannot perform operation'))
    }
  };


  return (
    <React.Fragment>
      <Button
       handleClickOpen={handleClickOpen}
       handleDelete={ handleDelete}
       handleNavigate={handleNavigate} 
      />
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
         Update {name}
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
            <label htmlFor="">Medicine Name</label>
            <input type="text"
              className='input'
              placeholder='eg Tenonvovir'
              name='name'
              onChange={handleChange}
              value={data?.name}
            />
          </div>
          <div className='input-container'>
          <label htmlFor="">Category Name</label>
            <select name="category" onChange={handleChange} value={data?.category}  className='dropdown'>
              <option value="">--Select Category--</option>
              {categories?.map((item)=>(
                <option value={item.name} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
        </div>
          <div className='input-container'>
            <label htmlFor="">Price</label>
            <input type="number"
              className='input'
              placeholder='eg 25'
              name='price'
              onChange={handleChange}
              value={data?.price}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Manufacturer</label>
            <input type="text"
               className='input'
               placeholder='eg Himalaya'
               name='manufacturer'
               onChange={handleChange}
               value={data?.manufacturer}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Quantity</label>
            <input type="number"
               className='input'
               placeholder='eg 50'
               name='quantity'
               onChange={handleChange}
               value={data?.quantity}
            />
          </div>
          <div className="editor-container">
            <label htmlFor="" className='edtor-label'>Description</label>
            <ReactQuill className="editor-input" 
             theme="snow" value={description} 
             onChange={setDescription}
             placeholder='Write medicine description here..'  
             />
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