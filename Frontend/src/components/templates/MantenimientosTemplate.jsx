import SideBar from '../organismos/SideBar'
import NavBar from '../organismos/NavBar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function MantenimientosTemplate() {

    const endpoint = 'http://localhost:3000/mantenimientos';
    const [mantenimientos, setMantenimientos] = useState([]);

    const getMantenimientos = async () => {
        try {
            const respuesta = await axios.get(`${endpoint}`);
            setMantenimientos(respuesta.data);
            
        } catch (error) {
            console.log("error al listar categorias", error);
        }
    };

    useEffect(()=>{
        getMantenimientos();
    }, []);


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
    <div className="flex gap-3 w-full  justify-center items-center ">
    <div className="flex flex-col w-full  p-3 pt-24 h-screen">
    <div className="flex gap-2 justify-between w-full p-3 mt-5 mb-5">
                <div className="flex gap-2 justify-between items-center p-2">
                    <h2 className="font-medium">CATEGORÍAS</h2>
                </div>
                <div className="p-1 flex bg-gray-300 justify-between items-center rounded-md w-1/2">
                <input type="search"  
                 className="border p-1 rounded-lg bg-gray-300 outline-none border-gray-300" placeholder="Buscar categoría por ID" />
               <FontAwesomeIcon icon={faSearch}   className="text-2xl text-gray-500" />
            
                    </div>
                <button 
                className='bg-greenSena font-semibold text-white rounded-md p-2'
    >REGISTRAR MANTENIMIENTO</button>
            </div>
            <div className="w-full flex justify-center pr-3 pl-3 ">
            <table className="w-full bg-white rounded-xl shadow-lg">
                <thead> 
                    <tr className='bg-gray-300'>
                        <th className="p-2 font-medium text-sm">ID</th>
                        <th className="p-2 font-medium text-sm">MANTENIMIENTO</th>
                        <th className="p-2 font-medium text-sm">FECHA</th>
                        <th className="p-2 font-medium text-sm">DESCRIPCIÓN</th>
                        <th className="p-2 font-medium text-sm">RESULTADO</th>
                        <th className="p-2 font-medium text-sm">RESPONSABLE</th>
                        <th className="p-2 font-medium text-sm">EQUIPO</th>
                        <th className="p-2 font-medium text-sm">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                   
                            {
                                mantenimientos.map((mantenimiento) => (
                                    <tr key={mantenimiento.id_mantenimiento} className='border-b'>
                                <th className="p-1 font-normal">{mantenimiento.id_mantenimiento}</th>
                                <th className="p-1 font-normal">{mantenimiento.tipo_mantenimiento}</th>
                                <th className="p-1 font-normal">{mantenimiento.fecha_realizacion_mantenimiento}</th>
                                <th className="p-1 font-normal">{mantenimiento.descripcion}</th>
                                <th className="p-1 font-normal">{mantenimiento.resultado}</th>
                                <th className="p-1 font-normal">{mantenimiento.nombres}</th>
                                <th className="p-1 font-normal">{mantenimiento.nombre_equipo}</th>
                                <th className="p-1 font-normal">
                                <button className='bg-blue-500 font-normal w-20 p-1 text-white rounded-md'
                                
                                  >EDIT</button>
                                </th>
                            </tr>
                                ))
                            }
                     
                </tbody>
            </table>
        </div>
            </div>
    </div>
   </div>
   </div>
    </>
  )
}

export default MantenimientosTemplate