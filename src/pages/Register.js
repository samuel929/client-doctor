import React from 'react'
import {Button, Form, Input} from 'antd'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import {showLoading,hideLoading} from '../redux/alerts.reducer'
import toast from 'react-hot-toast'
function Register() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const onFinish=async(values)=>{

    try{
      dispatch(showLoading())
     const res=await axios.post('https://server-doctor-app.herokuapp.com/api/user/register',values);
     dispatch(hideLoading())
     if(res.data === 'User created succesfully'){
         toast.success(res.data)
         toast("redirecting to login page")
         navigate('/login')
     }else{
      toast.error(res.data)
     }
    }catch(err){
      dispatch(hideLoading())
       toast.error("Something went wrong")
    }
  }
  return (
    <div className='authentication'>
         <div className='auth-form card p-3'>
             <h1 className='card-title'>Nice to meet you</h1>
             <Form layout='vertical' onFinish={onFinish}>
              <Form.Item label="Name" name='name'>
                  <Input placeholder='Name'/>
              </Form.Item>
              <Form.Item label="Email" name='email'>
                  <Input placeholder='Email'/>
              </Form.Item>
              <Form.Item label="Password" name='password'>
                  <Input placeholder='Password' type="password"/>
              </Form.Item>

              <Button className='primary-button my-2 full-width-button' htmlType='submit'>Register</Button>
              <Link className='anchor ' to="/login">CLICK HERE TO LOGIN</Link>
             </Form>
         </div>
    </div>
  )
}

export default Register