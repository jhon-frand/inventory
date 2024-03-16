import React from 'react'
import { Link } from 'react-router-dom'

function SideBar() {
  return (
    <>
    <div className='w-64 pt-20 bg-green-500 h-screen flex flex-col justify-center'>
        <div className='hover:bg-white p-2 border-b cursor-pointer border-green-300 text-center font-semibold text-white hover:text-black'>ADMIN</div>
        <div className='hover:bg-white p-2 border-b cursor-pointer border-green-300 text-center font-semibold text-white hover:text-black'>DASHBOARD</div>
        <div className='hover:bg-white p-2 border-b cursor-pointer border-green-300 text-center font-semibold text-white hover:text-black'>USUARIOS</div>
        <div className='hover:bg-white p-2 border-b cursor-pointer border-green-300 text-center font-semibold text-white hover:text-black'>MANTENIMIMIENTOS</div>
        <div className='hover:bg-white p-2 border-b cursor-pointer border-green-300 text-center font-semibold text-white hover:text-black'>
          <Link to={'/categorias'}>
          CATEGORÍAS
          </Link>
          </div>
        <div className='hover:bg-white p-2 border-b cursor-pointer border-green-300 text-center font-semibold text-white hover:text-black'>
        <Link to={'/equipos'}>
          EQUIPOS
          </Link>
        </div>
        <div className='hover:bg-white p-2 border-b cursor-pointer border-green-300 text-center font-semibold text-white hover:text-black'>
        <Link to={'/ubicaciones'}>
          UBICACIONES
          </Link>
        </div>
    </div>
    
    </>
  )
}

export default SideBar