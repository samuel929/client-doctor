import React,{useEffect,useState} from 'react'
import DoctorForm from '../../components/DoctorForm'
import Layout from '../../components/Layout'
import { useNavigate, useParams } from "react-router-dom";
import toast from 'react-hot-toast'
import {showLoading,hideLoading} from '../../redux/alerts.reducer'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";

function Profile() {
    const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const onFinish=async(values)=>{
        try{
            dispatch(showLoading())
           const res=await axios.post('http://localhost:8800/api/user/apply-doctor',{...values,userId:user._id, timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],},{
               headers:{
                   Authorization:`Bearer ${localStorage.getItem("token")}`
               }
           });
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

    const getDoctorData=async()=>{
        try{
         dispatch(showLoading())
        const response=await axios.post('http://localhost:8800/api/doctor/get-doctor-info-by-user-id',{userId:params.userId},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        dispatch(hideLoading())
        if(response.data.success){
           setDoctor(response.data.data)
        }
        }catch(err){
          dispatch(hideLoading())
    
        }
   }
    useEffect(()=>{
       getDoctorData()
     },[])
  return (
    <Layout>
        <h1 className='page-title'>Doctor Profile</h1>
        <hr/>
        {doctor && <DoctorForm onFinish={onFinish} initivalValues={doctor} />}

    </Layout>
  )
}

export default Profile