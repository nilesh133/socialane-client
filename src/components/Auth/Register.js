import React, { useEffect, useState } from 'react'
import { UserRegisterAction } from '../../store/asyncMethods/AuthMethods';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import "./auth.css"
import { Helmet } from "react-helmet";
import toast, { Toaster } from 'react-hot-toast';


const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { redirect, registerErrorsArray } = useSelector(state => state.auth);

  useEffect(() => {
    if (redirect) {
      navigate("/feed");
    }
  })

  useEffect(() => {
    if (registerErrorsArray?.length > 0) {
      registerErrorsArray.map((error) => {
        toast.error(error.msg);
      })
    }
  }, [registerErrorsArray])


  const [registerDetails, setRegisterDetails] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  })

  const handleRegisterDetailsChange = (e) => {
    setRegisterDetails({
      ...registerDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleRegisterSubmit = () => {
    dispatch(UserRegisterAction(registerDetails));
  }

  return (
    <div className='auth'>
      <Helmet>
        <title>User Register</title>
        <meta
          name="description"
          content="User Register"
        />
      </Helmet>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            border: '1px solid #713200',
            fontSize: "0.8rem"
          },
        }}
      />
      <div className='auth_input_container'>
        <h2>Register</h2>
        <div className='auth_input'>
          <input type="text" name="name" placeholder='Enter name' onChange={(e) => handleRegisterDetailsChange(e)} />
        </div>
        <div className='auth_input'>
          <input type="email" name="email" placeholder='Enter email' onChange={(e) => handleRegisterDetailsChange(e)} />
        </div>
        <div className='auth_input'>
          <input type="text" name="username" placeholder='Enter username' onChange={(e) => handleRegisterDetailsChange(e)} />
        </div>
        <div className='auth_input'>
          <input type="password" name="password" placeholder='Enter password' onChange={(e) => handleRegisterDetailsChange(e)} />
        </div>
        <p>Already registered. <span onClick={() => navigate("/")}>Login</span></p>
        <div className='auth_input'>
          <button onClick={() => handleRegisterSubmit()}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Register