import React from 'react'
import Layout from '../components/Layout'
import {notification, Tabs} from 'antd'
import { useSelector,useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { setUser } from '../redux/userSlice'
import {showLoading,hideLoading} from '../redux/alerts.reducer'
import toast from 'react-hot-toast'
function Notifications() {
    const {user}=useSelector(state=>state.user)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const markAllAsSeen=async()=>{
        try{
            dispatch(showLoading())
           const res=await axios.post('http://localhost:8800/api/user/mark-notifications-as-seen',{userId:user._id},{
               headers:{
                   Authorization:`Bearer ${localStorage.getItem("token")}`
               }
           });
           dispatch(hideLoading())
           console.log(res)
           if(res.data.message === 'All notifications marked as seen'){
               toast.success(res.data.message)
               dispatch(setUser(res.data.data))
           }else{
            toast.error(res.data.message)
           }
          }catch(err){
            dispatch(hideLoading())
             toast.error("Something went wrong")
          }
    }

    const deleteAll=async()=>{
        try{
            dispatch(showLoading())
           const res=await axios.post('http://localhost:8800/api/user/delete-all-notifications',{userId:user._id},{
               headers:{
                   Authorization:`Bearer ${localStorage.getItem("token")}`
               }
           });
           dispatch(hideLoading())
           console.log(res)
           if(res.data.message){
               toast.success(res.data.message)
               dispatch(setUser(res.data.data))
           }else{
            toast.error(res.data.message)
           }
          }catch(err){
            dispatch(hideLoading())
             toast.error("Something went wrong")
          }
    }
  return (
    <Layout className="page-title">
        <h1>Notifications</h1>
        <Tabs>
            <Tabs.TabPane tab="unseen" key={0}>
              <div className='d-flex justify-content-end'>
                <h1 className='anchor' onClick={()=>markAllAsSeen()}>Mark all as seen</h1>      
            </div>
            {user?.unseenNotifications.map((item)=>(
                <div className='card p-2 m-3' onClick={()=>navigate(item.onClickPath)}>
                    <div className='card-text'>
                        {item.message}
                    </div>
                </div>
            ))}
            </Tabs.TabPane>
            <Tabs.TabPane tab="seen" key={1}>
            <div className='d-flex justify-content-end'>
                <h1 className='anchor' onClick={deleteAll}>Delete all</h1>      
            </div>
            {user?.seenNotifications.map((item)=>(
                <div className='card p-2 m-3' onClick={()=>navigate(item.onClickPath)}>
                    <div className='card-text'>
                        {item.message}
                    </div>
                </div>
            ))}
            </Tabs.TabPane>
        </Tabs>
    </Layout>
  )
}

export default Notifications