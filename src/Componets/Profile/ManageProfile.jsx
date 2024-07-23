import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { depCountActions } from '../../store/depCount';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { handleToastError, handleToastSuccess } from '../../store/modalState';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ManageProfile({ name, id,email,padding,color,width,marginRight,btnName,phone,full_name,role, password }) {
  const location = useLocation();
  const dep = useSelector(state => state.count?.depValue) || [2];
  const profile = localStorage.getItem("profile")
  const[user_image, setUserImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    full_name: "",
    role: "",
    phone: "",
    email: "",
    password:''
  });


  const handleClickOpen = () => {
    setOpen(true);
    setData({
    full_name:full_name,
    email:email,
    role:role,
    phone:phone,
    password:password,
    user_image:profile
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDepCount = () => {
    dispatch(depCountActions.handleCount());
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token")
      const formData = new FormData();
      formData.append("full_name", data.full_name);
      formData.append("role", data.role);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("password", data.password)
      if (user_image) {
        formData.append("user_image", user_image);
      }
      const response = await axios.post(`https://pharmacy-v2qn.onrender.com/api/accounts/update/${id}/`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        handleDepCount();
        handleClose();
        dispatch(handleToastSuccess("Successfully Updated"))
      }
    } catch (error) {
      dispatch(handleToastError("Error! cannot perform operation"))
    }
  };

  return (
    <React.Fragment>
      <button className='add-btn'
        onClick={handleClickOpen}
        style={{
          padding: padding,
          width: width,
          color: color,
          marginRight:marginRight
        }}
      >
        {btnName}
      </button>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Update Profile
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: "red",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <div className='input-container'>
            <label htmlFor="">Full Name</label>
            <input type="text"
              className='input'
              placeholder='eg Emmanuel Yidana'
              name='full_name'
              onChange={handleChange} 
              value={data.full_name}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Email</label>
            <input type="text"
              className='input'
              placeholder='eg eyidana001@gmial.com'
              name='email'
              onChange={handleChange}
              value={data.email}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Phone</label>
            <input type="text"
               className='input'
               placeholder='eg 0597893082'
               name='phone'
               onChange={handleChange}
               value={data.phone}
            />
          </div>
          {/* <div className='input-container'>
          <label htmlFor="">Role</label>
            <select name="role" onChange={handleChange}  className='dropdown' value={data.role}>
              <option value="">--Select role--</option>
              <option value="sales_person">Sales Person</option>
              <option value="Admin">Admin</option>
            </select>
        </div> */}
        <div className='input-container'>
            <label htmlFor="">Password</label>
            <input type="text"
               className='input'
               placeholder='eg fj8sdoi'
               name='password'
               onChange={handleChange}
               value={data.password}
            />
          </div>
          <div className='input-container'>
              <label htmlFor="" className='label'>Profile Image</label>
              <input type="file" name="file" id="file" onChange={e=>setUserImage(e.target.files[0])} />
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