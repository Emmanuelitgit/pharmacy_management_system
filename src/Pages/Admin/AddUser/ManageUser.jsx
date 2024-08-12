import React, { useState} from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch} from 'react-redux';
import Button from '../../../Componets/Buttons/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { depCountActions } from '../../../store/depCount';
import { handleToastError, handleToastSuccess } from '../../../store/modalState';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ManageStaff({ staff_name,name,id,profile,role,phone,email}) {

  const navigate = useNavigate();
  const existingProfile = profile !== null? profile : ''
  const[user_image, setUserImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    full_name: "",
    role: "",
    phone: "",
    email: "",
  });

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
    setData({
      full_name:staff_name,
      role:role,
      phone:phone,
      email:email,
      user_image:profile
    })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev, [name]: value
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

  const handleDelete = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');

    if (!isConfirmed) {
      return; 
    }
    try {
      const response = await axios.delete(`https://pharmacy-v2qn.onrender.com/api/accounts/delete/${id}/`);
      if (response.status === 200) {
        handleDepCount();
        dispatch(handleToastSuccess("Successfully Deleted"))
      }
    } catch (error) {
      dispatch(handleToastError("Error! cannot perform operation"))
    }
  };

  const handleNavigate = () => {
    navigate(`/admin/view-staff/${id}`);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (id === undefined) {
    return null;
  }

  if (name === undefined) {
    return null;
  }

  return (
    <React.Fragment>
      <Button
        handleClickOpen={handleClickOpen}
        handleDelete={handleDelete}
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
          <div className='input-container'>
          <label htmlFor="">Role</label>
            <select name="role" onChange={handleChange}  className='dropdown' value={data.role}>
              <option value="">--Select role--</option>
              <option value="sales_person">Sales Person</option>
              <option value="Admin">Admin</option>
            </select>
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
