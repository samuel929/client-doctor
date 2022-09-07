import React from 'react'
import {Button, Form, Input} from 'antd'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import {showLoading,hideLoading} from '../redux/alerts.reducer'
function Login() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const onFinish=async(values)=>{

    try{
      dispatch(showLoading())
     const res=await axios.post('http://localhost:8800/api/user/login',values);
     dispatch(hideLoading())
     if(res.data.message === "login succesfully"){
         toast.success(res.data.message)
         toast("redirecting to home page")
         localStorage.setItem("token",res.data.data)
         navigate('/')
     }else{
      toast.error(res.data.message)
     }
    }catch(err){
      dispatch(hideLoading())
       toast.error("Something went wrong")
    }
  }
  return (
    <div className='authentication'>
         <div className='auth-form card p-3'>
             <h1 className='card-title'>Welcome Back</h1>
             <Form layout='vertical' onFinish={onFinish}>
              <Form.Item label="Email" name='email'>
                  <Input placeholder='Email'/>
              </Form.Item>
              <Form.Item label="Password" name='password'>
                  <Input placeholder='Password' type="password"/>
              </Form.Item>
              <div className='d-flex flex-column'>
              <Button className='primary-button my-2 full-width-button' htmlType='submit'>LOGIN</Button>
              <Link className='anchor ' to="/register">CLICK HERE TO Register</Link>
              </div>
            
             </Form>
         </div>
    </div>
  )
}

export default Login