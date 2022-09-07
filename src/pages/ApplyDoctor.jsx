import  Layout  from '../components/Layout'
import React from 'react'
import { Col, Form, Input, Row,TimePicker,Button } from 'antd'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import {showLoading,hideLoading} from '../redux/alerts.reducer'
import toast from 'react-hot-toast'
import { Link,useNavigate } from 'react-router-dom';
import DoctorForm from '../components/DoctorForm';
import moment from "moment";

function ApplyDoctor() {
    const navigate=useNavigate()
    const {user}=useSelector(state=>state.user)
    const dispatch=useDispatch()
    const onFinish=async(values)=>{
        try{
            dispatch(showLoading())
           const res=await axios.post('https://server-doctor-app.herokuapp.com/api/user/apply-doctor',{...values,userId:user._id,timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],},{
               headers:{
                   Authorization:`Bearer ${localStorage.getItem("token")}`
               }
           });
           console.log(res)
           dispatch(hideLoading())
           if(res.data.success){
               toast.success(res.data.message)
               navigate('/')
           }else{
            toast.error(res.data)
           }
          }catch(err){
            dispatch(hideLoading())
             toast.error("Something went wrong")
          }
    }
  return (
    <Layout>
        <h1 className='page-title'>Apply Doctor</h1>
     <hr/>
        <DoctorForm onFinish={onFinish} />
    </Layout>
  )
}

export default ApplyDoctor