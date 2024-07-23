import React from 'react';
import "./style.css"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import 'semantic-ui-css/semantic.min.css';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { login } from '../../store/auth';
import { useDispatch, useSelector } from 'react-redux';
import { handleToastError, handleToastSuccess } from '../../store/modalState';
import Spinner from 'react-bootstrap/Spinner';


const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [credential, setCrdential] = useState({
    email:'',
    password:'',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)


  const handleChange = (e, data) => {
    const { name, value } = data || e.target; 
  
    setCrdential(prevValue => ({
      ...prevValue,
      [name]: value
    }));
  };
  
const handleLogin = async () => {
       setLoading(true)
    try {
        const response = await axios.post("https://pharmacy-v2qn.onrender.com/api/login/", credential, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const {full_name, email, is_admin, user_id, user_image,role} = response.data?.user
        const {access} = response.data?.token
        localStorage.setItem("token",access)
        localStorage.setItem("user_id",user_id)
        localStorage.setItem("user",full_name)
        localStorage.setItem("profile",user_image)
        is_admin?localStorage.setItem("role","Admin"):localStorage.setItem("role",role)
        if (response?.status === 200) {
          if(is_admin){
            navigate("/admin/dashboard")
          }else if(role === "sales_person"){
            navigate("/sales-person/dashboard")
          }else{
            navigate("/login")
          }
          dispatch(handleToastSuccess("Login Success"))
        }
    
    } catch (error) {
        if (error.response?.status === 404) {
            dispatch(handleToastError("Account not found"));
        }
    }finally{
      setLoading(false)
    }
};

const handleShowPassword = () => {
    setShowPassword(!showPassword);
};


  return (
    <div className='login-container'>
      <div className="login-input-container">
      <div className="header-container">
        <img 
         src={'data:image/png;base64,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'} 
         alt="" 
         className='login-logo'
         />
        <span className='welcome-text'>PHARMASYS</span>
      </div>
        <div className="input-field">
          <input type="email" 
          className='login-input' 
          placeholder='Email Address' 
          name="email"
          onChange={handleChange}
          autoComplete="true"
          style={{marginRight:"35px"}}
          />
        </div>
        <div className="input-field">
          <input type={showPassword? "text" : "password"} 
          className='login-input' 
          placeholder='Password'
          name="password"
          onChange={handleChange}
          autoComplete="true"
          />
          {!showPassword &&
           <Visibility 
           onClick={handleShowPassword}
            style={{
             marginRight:"6px",
             fontSize:'20px',
             cursor:'pointer'
           }}
         /> 
          }
          {showPassword &&
            <VisibilityOff 
            onClick={handleShowPassword}
             style={{
              marginRight:"6px",
              fontSize:'20px',
              cursor:'pointer'
            }}
          /> 
          }
        </div>
        <div className="button-container">
          <button className='button' 
           type='submit'
           onClick={handleLogin} 
           >
           Login
          </button>
          {loading && 
          <Spinner animation="border"
          style={{
          position:'absolute',
          color:'green',
          top:'62.5%',
          left:'49%'
          }}/>
          }
        </div>
        <p className='copyright'>@2024 Pharmacy Management System. Developed by Justice Ofori</p>
      </div>
    </div>
  )
}

export default Login;