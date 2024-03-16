import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/organismos/NavBar'
import SideBar from '../components/organismos/SideBar'

function Dashboard() {
  return (
    <>
       <div className="relative">
    <div className="absolute top-0 left-0 right-0 z-50">
        <NavBar></NavBar>
    </div>
   <div className="flex">
   <div>
    <SideBar></SideBar>
    </div>
  
   </div>
   </div>
      
    </>
  )
}

export default Dashboard