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

export default function AddMedicine({name}) {

  const dispatch = useDispatch()

  const token = localStorage.getItem("token")
  const [open, setOpen] = React.useState(false);
  const[categories, setCategories] = useState()
  const[description, setDescription] = useState()
  const [thumbnail, setThumbnail] = useState(null)
  const [data, setData] = useState({
    name:'',
    category:'',
    description:description,
    price:'',
    quantity:'',
    manufacturer:'',
  });

  const dep = useSelector(state => state.count?.depValue) || [2];

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setData((prevData) => ({ ...prevData, description }));
  }, [description]);

  useEffect(()=>{
    const getCategories =async()=>{
      try {
        const response = await axios.get('https://pharmacy-v2qn.onrender.com/api/category/all');
        if(response.status === 200){
          const {categories} = await response.data;
          setCategories(categories)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getCategories()
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
  
  const handleSubmit = async() => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.append("manufacturer", data.manufacturer);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
    try {
      const response = await axios.post(`https://pharmacy-v2qn.onrender.com/api/medicine/create/`, formData,{
        headers: {
          'Authorization': `Bearer ${token}`
      }
      });
      console.log(response)
      if(response.status === 201){
        handleDepCount()
        handleClose()
        dispatch(handleToastSuccess("Created Successfully"))
      }
    } catch (error) {
      dispatch(handleToastError('Error! cannot perform operation'))
      console.log(error)
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
            <label htmlFor="">Medicine Name</label>
            <input type="text"
              className='input'
              placeholder='eg Tenonvovir'
              name='name'
              onChange={handleChange}
            />
          </div>
          <div className='input-container'>
          <label htmlFor="">Category</label>
            <select name="category" onChange={handleChange}  className='dropdown'>
              <option value="">--Select category--</option>
              {categories.map((category)=>(
                <option value={category.name}>{category.name}</option>
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
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Manufacturer</label>
            <input type="text"
               className='input'
               placeholder='eg Himalaya'
               name='manufacturer'
               onChange={handleChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Quantity</label>
            <input type="number"
               className='input'
               placeholder='eg 50'
               name='quantity'
               onChange={handleChange}
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
          <div className='input-container'>
              <label htmlFor="" className='label'>Product Image</label>
              <input type="file" name="thumbnail" id="file" onChange={e=>setThumbnail(e.target.files[0])} />
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