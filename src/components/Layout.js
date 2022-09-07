import React, { useState } from 'react'
import './layout.css'
import { Avatar, Badge } from 'antd';
import {Link, useLocation,useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
function Layout({children}) {
    const {user}=useSelector((state)=>state.user)
   const [collapsed,setCollapsed]=useState(false)
    const location=useLocation()
    const navigate=useNavigate()
const userMenu=[
    {
        name:'Home',
        path:'/',
        icon:'ri-home-5-line'
    },
    {
        name:'Appointments',
        path: "/appointments",
        icon:'ri-file-list-line'
    },
    {
        name:"Apply Doctor",
        path:'/apply-doctor',
        icon:"ri-hospital-line"
    }
]

const adminMenu=[
    {
        name:'Home',
        path:'/',
        icon:'ri-home-5-line'
    },
    {
        name:"Users",
        path:"/admin/userslist",
        icon:'ri-shield-user-line'
    },
    {
        name:"Doctors",
        path:'/admin/doctorslist',
        icon:'ri-hospital-line'
    },
    {
        name:"Profile",
        path:'/profile',
        icon:'ri-profile-line'
    }
]


const DoctorMenu=[
    {
        name:'Home',
        path:'/',
        icon:'ri-home-5-line'
    },
    {
        name:'Appointments',
        path:'/doctor/appointments',
        icon:'ri-file-list-line'
    },
    {
        name:"Profile",
        path:`/doctor/profile/${user?._id}`,
        icon:'ri-profile-line'
    }
]
const menuToBeRendered=user?.isAdmin ? adminMenu : user?.isDoctor ? DoctorMenu :userMenu
  return (
    <div className='main p-2'>
        <div className='d-flex layout'>
             <div className={`${collapsed ? 'collapse-sidebar' : 'sidebar'}`}>
               <div className='sidebar-header'>
                    <h1 className='logo'>DB</h1>
               </div>
               <div className='menu'>
                   {menuToBeRendered.map((item)=>{
                       const isActive=location.pathname===item.path
                       return<div key={item.name} className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                            <i className={item.icon}></i>
                            {!collapsed &&  <Link to={item.path}>{item.name}</Link>}
                           
                        </div>
                   })}
                   <div className={`d-flex menu-item`} onClick={()=>{
                       localStorage.clear()
                       navigate('/')
                  }}>
                            <i className="ri-logout-circle-line"></i>
                            {!collapsed &&  <Link to="/login">logout</Link>}
                           
                 </div>
               </div>
             </div>
             <div className='content'>
                   <div className='header'>
                      {collapsed ? <i className='ri-menu-line header-action-icon' onClick={()=>setCollapsed(false)}></i> : <i className='ri-close-fill header-action-icon' onClick={()=>setCollapsed(true)}></i>}
                       <div className='d-flex align-items-center px-4'>
                           <Badge count={user?.unseenNotifications.length} onClick={()=>navigate("/notifications")}>
                           <i className="ri-notification-line header-action-icon px-2"></i>
                           </Badge>
                        <Link className='anchor mx-3' to="/profile">{user?.name}</Link>
                       </div>
                   </div>
                   <div className='body'>
                      {children}
                   </div>
             </div>
        </div>
    </div>
  )
}

export default Layout