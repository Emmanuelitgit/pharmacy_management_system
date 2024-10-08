import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import Button from '../Buttons/Button';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { handleToastSuccess, handleToastError } from "../../store/modalState";
import { depCountActions } from '../../store/depCount';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ManageMedicineCategory({ name, id, category_name, desc }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const route = location.pathname.split("/")[1];

  const token = localStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = useState();
  const [data, setData] = useState({
    name: '',
    description: description
  });

  useEffect(() => {
    setData((prevData) => ({ ...prevData, description }));
  }, [description]);

  useEffect(() => {
    setDescription(desc);
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
    setData({
      name: category_name,
    });
  };

  const handleNavigate = () => {
    navigate(`/${route}/view-category/${id}`);
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
      const response = await axios.post(`https://pharmacy-v2qn.onrender.com/api/category/update/${id}/`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      if (response.status === 200) {
        handleDepCount();
        handleClose();
        dispatch(handleToastSuccess("Updated Successfully"));
      }
    } catch (error) {
      dispatch(handleToastError('Error! cannot perform operation'));
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');

    if (!isConfirmed) {
      return; 
    }

    try {
      const response = await axios.delete(`https://pharmacy-v2qn.onrender.com/api/category/delete/${id}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      if (response.status === 200) {
        handleDepCount();
        dispatch(handleToastSuccess("Deleted Successfully"));
      }
    } catch (error) {
      dispatch(handleToastError('Error! cannot perform operation'));
    }
  };

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
            <label htmlFor="">Category Name</label>
            <input type="text"
              className='input'
              placeholder='eg Tablet'
              name='name'
              onChange={handleChange}
              value={data?.name}
            />
          </div>
          <div className="editor-container">
            <label htmlFor="" className='editor-label'>Description</label>
            <ReactQuill className="editor-input"
              theme="snow" value={description}
              onChange={setDescription}
              placeholder='Write medicine category description here..'
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