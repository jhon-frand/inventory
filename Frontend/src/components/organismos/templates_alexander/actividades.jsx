import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from '../NavBar'
import SideBar from '../SideBar'

function Actividades() {
    
    //ESTADOS PARA LOS DATOS
    const [useUsuarios, setUsuarios] = useState([]);

    //ESTADOS PARA LA BUSQUEDA
    const [foundUser, setFoundUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    //VALORES GLOBALES Y VALORES EN EL REGISTRO
    const [values, setValues] = useState({

        id_actividad: "",
        fecha_realizacion_actividad: "",
        descripcion: "",
        fk_mantenimiento: "",
        fk_tecnico: "",

    });

    const handleInputChange = (event) => {
        setValues({...values,

        [event.target.name] : event.target.value,
    
        });

    };

 // FUNCION DE REGISTRAR
    const handleForm = async (event) => {
        event.preventDefault();
        try {
            console.log(values);

            const response = await axios({
                method: 'post',
                url: 'http://localhost:3000/actividades/registrar',
                data: values
            });

            if (response.status === 200) {
                alert('Actividad registrada');
                setIsOpen(false);
                listarTodosUsuarios();
            }
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    //FUNCION DE ACTUALIZAR
    const handleFormActualizar=async(event, id_actividad)=>{
        event.preventDefault();
        try {
            console.log(values);

            const response = await axios.put(`http://localhost:3000/actividades/actualizar/${id_actividad}`, values);
            ;

            if(response.status==200){
                alert('Actividad actualizada');
                setIsOpenUpdate(false);
            }
    
            listarTodosUsuarios(); 
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    //DATOS ENCONTRADOS EN LA BUSQUEDA
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
      };

    //FUNCIO DE BUSCAR
        const handleSearchSubmit = () => {
        const found = useUsuarios.find((user) => user.id_actividad.toString() === searchTerm);
        setFoundUser(found);
        };

    //FUNCION PARA LISTAR USUARIOS
    const listarTodosUsuarios=() =>{
        axios.get('http://localhost:3000/actividades/listar')
        .then(response=>{
            setUsuarios(response.data);
        })
    }

    // FUNCION DE ELIMINAR USUARIOS
    const eliminarUsuarios=async(id_actividad) =>{
        await axios.delete(`http://localhost:3000/actividades/eliminar/${id_actividad}`)
        .then(response=>{
            listarTodosUsuarios();
            alert('Usuario eliminado exitosamente');
        })
        .catch (error => {
            console.error('Error al eliminar usuario', error);
        });
    }

    // FUNCIONES QUE SON CONSTANTES
    useEffect(()=>{
      listarTodosUsuarios();
    }, []);

    //MODALES REGISTRAS Y ACTUALIZAR
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    
  return (
    //CONTENEDOR DEL TODO
  <div className="relative">
    {/* IMPORTANCION DEL NAVBAR */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <NavBar />
      </div>
    {/* //CONTENEDOR PRINCIPAL */}
    <div className="flex">
      {/* IMPORTACIÓN DEL SIDEBAR */}
      <div>
        <SideBar />
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        {/* BOTÓN DE REGISTRO */}
        <div className="flex flex-col items-center mb-4">

          {/* INPUT Y BOTÓN DE BÚSQUEDA */}
          <div className="flex items-center m-8 gap-2">
            <input
              type="text"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              placeholder="Buscar por ID"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSearchSubmit}>
              BUSCAR
            </button>
          </div>

        </div>

        {/* Tabla de datos */}
        <div className="w-full">
          <table className="min-w-full divide-y divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  REALIZACIÓN
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  DESCRIPCIÓN
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  MANTENIMIENTO
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  TÉCNICO
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ACCIONES
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {foundUser ? (
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">{foundUser.id_actividad}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{foundUser.fecha_realizacion_actividad}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{foundUser.descripcion}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{foundUser.fk_mantenimiento}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{foundUser.fk_tecnico}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-3 rounded" onClick={() => eliminarUsuarios(foundUser.id_actividad)}>
                      ELIMINAR
                    </button>

                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"

                      onClick={(event) => {
                        setValues({
                          id_actividad: foundUser.id_actividad,
                          fecha_realizacion_actividad: foundUser.fecha_realizacion_actividad,
                          descripcion: foundUser.descripcion,
                          fk_mantenimiento: foundUser.fk_mantenimiento,
                          fk_tecnico: foundUser.fk_tecnico,
                        });
                        setIsOpenUpdate(true);
                      }}
                    >
                      ACTUALIZAR
                    </button>
                  </td>
                </tr>
              ) : (
                useUsuarios.map((user) => (
                  <tr key={user.id_actividad}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.id_actividad}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.fecha_realizacion_actividad}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.descripcion}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.fk_mantenimiento}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.fk_tecnico}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-3 rounded" onClick={() => eliminarUsuarios(foundUser.id_actividad)}>
                        ELIMINAR
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={(event) => {
                          setValues({
                            id_actividad: user.id_actividad,
                            fecha_realizacion_actividad: user.fecha_realizacion_actividad,
                            descripcion: user.descripcion,
                            fk_mantenimiento: user.fk_mantenimiento,
                            fk_tecnico: user.fk_tecnico,
                          });
                          setIsOpenUpdate(true);
                        }}
                      >
                        ACTUALIZAR
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="flex justify-center m-8">
            <button
              type="button"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-3"
              onClick={() => {
                setValues({
                  id_actividad: "",
                  fecha_realizacion_actividad: "",
                  descripcion: "",
                  fk_mantenimiento: "",
                  fk_tecnico: "",
                });
                setIsOpen(true);
              }}
              >
              REGISTRAR
            </button>
          </div>

        </div>
      </div>
    </div>

    {/* MODAL REGISTRAR */}
    {isOpen && (
      <form onSubmit={handleForm} className='fixed inset-0 flex bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center'>
          <div className='bg-white p-5 rounded-md flex flex-col justify-center items-center gap-5'>
              <div className="flex w-full border-b-2">
                  <h2 className="p-1 font-semibold">REGISTRAR NUEVA ACTIVIDAD</h2>
              </div>
              <div className='flex justify-center items-center gap-2'>
                  <label className='font-medium'>ID:</label>
                  <input
                      type="text"
                      name="id_actividad"
                      className='border-gray-400 border outline-none rounded-sm p-1'
                      value={values.id_actividad}
                      onChange={handleInputChange}
                  />
              </div>
              <div className='flex justify-center items-center gap-2'>
                  <label className='font-medium'>Realización:</label>
                  <input
                      type="date"
                      name="fecha_realizacion_actividad"
                      className='border-gray-400 border outline-none rounded-sm p-1'
                      value={values.fecha_realizacion_actividad}
                      onChange={handleInputChange}
                  />
              </div>
              <div className='flex justify-center items-center gap-2'>
                  <label className='font-medium'>Descripción:</label>
                  <input
                      type="text"
                      name="descripcion"
                      className='border-gray-400 border outline-none rounded-sm p-1'
                      value={values.descripcion}
                      onChange={handleInputChange}
                  />
              </div>
              <div className='flex justify-center items-center gap-2'>
                  <label className='font-medium'>Mantenimiento:</label>
                  <input
                      type="text"
                      name="fk_mantenimiento"
                      className='border-gray-400 border outline-none rounded-sm p-1'
                      value={values.fk_mantenimiento}
                      onChange={handleInputChange}
                  />
              </div>
              <div className='flex justify-center items-center gap-2'>
                  <label className='font-medium'>Técnico:</label>
                  <input
                      type="text"
                      name="fk_tecnico"
                      className='border-gray-400 border outline-none rounded-sm p-1'
                      value={values.fk_tecnico}
                      onChange={handleInputChange}
                  />
              </div>
              <div className="flex gap-14">
              <button type="button" className="bg-red-500 p-2 font-bold hover:bg-red-700 text-white rounded-md" onClick={()=> setIsOpen(false)}>
                  CANCELAR
              </button>
              <button type="submit" className="bg-green-500 p-2 font-bold hover:bg-green-700 text-white rounded-md">
                  REGISTRAR
              </button>
              </div>
          </div>
      </form>
    )}
    {/* MODAL REGISTRAR FIN */}

    {/* MODAL ACTUALIZAR */}
    {isOpenUpdate && (
      <form onSubmit={(event) => handleFormActualizar(event, values.id_actividad)} className='fixed inset-0 flex bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center'>
          <div className='bg-white p-5 rounded-md flex flex-col justify-center items-center gap-5'>
              <div className="flex w-full border-b-2">
                  <h2 className="p-1 font-semibold">EDITAR DATOS DE CATEGORÍA</h2>
              </div>
              <div className='flex justify-center items-center gap-2'>
                  <label className='font-medium'>ID:</label>
                  <input
                      type="text"
                      name="id_actividad"
                      className='border-gray-400 border outline-none rounded-sm p-1'
                      value={values.id_actividad}
                      onChange={handleInputChange}
                  />
              </div>
              <div className='flex justify-center items-center gap-2'>
                  <label className='font-medium'>Realización:</label>
                  <input
                      type="date"
                      name="fecha_realizacion_actividad"
                      className='border-gray-400 border outline-none rounded-sm p-1'
                      value={values.fecha_realizacion_actividad}
                      onChange={handleInputChange}
                  />
              </div>
              <div className='flex justify-center items-center gap-2'>
                  <label className='font-medium'>Descripción:</label>
                  <input
                      type="text"
                      name="descripcion"
                      className='border-gray-400 border outline-none rounded-sm p-1'
                      value={values.descripcion}
                      onChange={handleInputChange}
                  />
              </div>
              <div className='flex justify-center items-center gap-2'>
                  <label className='font-medium'>Mantenimiento:</label>
                  <input
                      type="text"
                      name="fk_mantenimiento"
                      className='border-gray-400 border outline-none rounded-sm p-1'
                      value={values.fk_mantenimiento}
                      onChange={handleInputChange}
                  />
              </div>
              <div className='flex justify-center items-center gap-2'>
                  <label className='font-medium'>Técnico:</label>
                  <input
                      type="text"
                      name="fk_tecnico"
                      className='border-gray-400 border outline-none rounded-sm p-1'
                      value={values.fk_tecnico}
                      onChange={handleInputChange}
                  />
              </div>
              <div className="flex gap-14">
              <button type="button" className="bg-red-500 p-2 font-bold hover:bg-red-700 text-white rounded-md" onClick={()=> setIsOpenUpdate(false)}>
                    CANCELAR
                </button>
                <button type="submit" className="bg-green-500 p-2 font-bold hover:bg-green-700 text-white rounded-md">
                    ACTUALIZAR
                </button>
              </div>
          </div>
      </form>
    )}
    {/* MODAL ACTUALIZAR FIN */}
  </div>
);

}

export default Actividades