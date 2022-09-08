import React,{useEffect, useState} from 'react'
import Layout from '../../components/Layout';
import {useDispatch} from 'react-redux';
import {showLoading,hideLoading} from '../../redux/alerts.reducer'
import axios from 'axios';
import {Table} from 'antd'
import moment from "moment";

function DoctorsList() {

    const [doctors,setDoctors]=useState([])
    const dispatch=useDispatch()
     const getUserData=async()=>{
        try{
         dispatch(showLoading())
         const res=await axios.get('https://server-doctor-app.herokuapp.com/api/admin/get-all-doctors',{
             headers:{
                 'Authorization':`Bearer ${localStorage.getItem("token")}`
             }
         })
         console.log(res)
         dispatch(hideLoading())
         if(res.data.success){
             setDoctors(res.data.data)
         }
        }catch(err){
             dispatch(hideLoading())
        }
     }
 
     const changeDoctorStatus=async(record,status)=>{
        try{
            dispatch(showLoading())
            const res=await axios.post('https://server-doctor-app.herokuapp.com/api/admin/change-doctor-account-status',{doctorId:record._id, userId:record.userId,status:status},{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(res)
            dispatch(hideLoading())
            if(res.data.success){
                getUserData()
            }
           }catch(err){
                dispatch(hideLoading())
           }
     }
     useEffect(()=>{
        getUserData()
     },[])
 
     const columns = [
        {
          title: "Name",
          dataIndex: "name",
          render: (text, record) => (
            <span>
              {record.firstName} {record.lastName}
            </span>
          ),
        },
        {
          title: "Phone",
          dataIndex: "phoneNumber",
        },
        {
          title: "Created At",
          dataIndex: "createdAt",
          render: (record , text) => moment(record.createdAt).format("DD-MM-YYYY"),
        },
        {
          title: "status",
          dataIndex: "status",
        },
        {
          title: "Actions",
          dataIndex: "actions",
          render: (text, record) => (
            <div className="d-flex">
              {record.status === "pending" && (
                <h1
                  className="anchor"
                  onClick={() => changeDoctorStatus(record, "approved")}
                >
                  Approve
                </h1>
              )}
              {record.status === "approved" && (
                <h1
                  className="anchor"
                  onClick={() => changeDoctorStatus(record, "blocked")}
                >
                  Block
                </h1>
              )}
            </div>
          ),
        },
      ];
  return (
    <Layout>
      <h1 className="page-header">Doctors List</h1>
      <hr />
      <Table columns={columns} dataSource={doctors}/>
    </Layout>
  )
}

export default DoctorsList