import React, { useEffect, useState } from 'react'
import { UserLoginAction } from '../../store/asyncMethods/AuthMethods';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import "./auth.css"
import { setRedirectFalse } from '../../store/reducers/AuthReducer';
import { Helmet } from "react-helmet";
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { redirect, loginErrorsArray } = useSelector(state => state.auth);

  useEffect(() => {
    if (redirect) {
      navigate("/feed");
    }
    dispatch(setRedirectFalse())
  }, [redirect])

  useEffect(() => {
    if (loginErrorsArray?.length > 0) {
      loginErrorsArray.map((error) => {
        toast.error(error.msg);
      })
    }
  }, [loginErrorsArray])


  const [loginDetails, setLoginDetails] = useState({
    email: "",
    username: "",
  })

  const handleLoginDetailsChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleLoginSubmit = () => {
    dispatch(UserLoginAction(loginDetails));
  }

  return (
    <div className='auth'>
      <Helmet>
        <title>User Login</title>
        <meta
          name="description"
          content="User Login"
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
        <h2>Login</h2>
        <div className='auth_input'>
          <input type="email" name="email" placeholder="Enter email" onChange={(e) => handleLoginDetailsChange(e)} />
        </div>
        <div className='auth_input'>
          <input type="password" name="password" placeholder="Enter password" onChange={(e) => handleLoginDetailsChange(e)} />
        </div>
        <p>Dont't have an account. <span onClick={() => navigate("/user-register")}>Register</span></p>

        <div className='auth_input'>
          <button onClick={() => handleLoginSubmit()}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Login