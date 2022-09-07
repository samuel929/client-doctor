import React,{useEffect, useState} from 'react'
import Layout from '../../components/Layout';
import {useDispatch} from 'react-redux';
import {showLoading,hideLoading} from '../../redux/alerts.reducer'
import axios from 'axios';
import {Table} from 'antd'
function UsersList() {
   const [users,setUser]=useState([])
   const dispatch=useDispatch()
    const getUserData=async()=>{
       try{
        dispatch(showLoading())
        const res=await axios.get('https://server-doctor-app.herokuapp.com/api/admin/get-all-users',{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem("token")}`
            }
        })
        console.log(res)
        dispatch(hideLoading())
        if(res.data.success){
            setUser(res.data.data)
        }
       }catch(err){
            dispatch(hideLoading())
       }
    }

    useEffect(()=>{
       getUserData()
    },[])

    const columns=[
       {
           title:"Name",
           dataIndex:"name"
       },{
           title:"Email",
           dataIndex:"email"
       },
       {
           title:"Created At",
           dataIndex:"createdAt"
       },
       {
           title:"Actions",
           dataIndex:"actions",
           render:(text,record)=>(
               <div className='d-flex'>
                       <h1 className='anchor'>Block</h1>
               </div>
           )
       }
    ]
  return (
    <Layout>
        <h1 className='page-header'>Users List</h1>
        <Table columns={columns} dataSource={users}/>
    </Layout>
  )
}

export default UsersList