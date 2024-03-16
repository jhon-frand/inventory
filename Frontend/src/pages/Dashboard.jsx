import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/organismos/NavBar'
import SideBar from '../components/organismos/SideBar'

function Dashboard() {
  return (
    <>
      <div className='bg-red-300 flex flex-col w-full h-screen'>
     <NavBar/>
     <SideBar/>
      </div>
      
    </>
  )
}

export default Dashboard