import React from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <>
      <div className='font-bold flex gap-3'>
      <Link to={'/equipos'}>
        <button className='font-bold bg-blue-500 p-2 text-white'>EQUIPOS</button>
      </Link>
      <Link to={'/categorias'}>
        <button className='font-bold bg-blue-500 p-2 text-white'>CATEGORIAS</button>
      </Link>
      <Link to={'/ubicaciones'}>
        <button className='font-bold bg-blue-500 p-2 text-white'>UBICACIONES</button>
      </Link>
      </div>
      
    </>
  )
}

export default Dashboard