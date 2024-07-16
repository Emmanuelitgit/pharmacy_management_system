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



const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [credential, setCrdential] = useState({
    email:'',
    password:'',
  });

  const [err, setErr] = useState();
  const [showPassword, setShowPassword] = useState(false)


  const handleChange = (e, data) => {
    const { name, value } = data || e.target; 
  
    setCrdential(prevValue => ({
      ...prevValue,
      [name]: value
    }));
  };
  
const handleLogin = async () => {
    try {
        const response = await axios.post("https://pharmacy-v2qn.onrender.com/api/login/", credential, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const {full_name, email, is_admin, user_id, user_image,role} = response.data?.user
        const {access} = response.data?.token
        localStorage.setItem("token",access)
        localStorage.setItem("user",full_name)
        is_admin?localStorage.setItem("role","Admin"):localStorage.setItem("role",role)

       setTimeout(()=>{
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
       }, 1000)
    } catch (error) {
        if (error.response?.status === 404) {
            dispatch(handleToastError("Account not found"));
        }
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
         src={require("../../uploads/logo 2.png")} 
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
          <input type="submit" 
          title='Sigin' 
          className='button' 
          onClick={handleLogin} 
          />
        </div>
        <p className='copyright'>@2024 Pharmacy Management System. Developed by Justice Ofori</p>
      </div>
    </div>
  )
}

export default Login;