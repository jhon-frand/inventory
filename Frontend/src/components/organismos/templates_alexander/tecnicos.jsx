import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from '../NavBar'
import SideBar from '../SideBar'

function Tecnicos() {

    //ESTADOS PARA LOS DATOS
    const [useUsuarios, setUsuarios] = useState([]);

    //ESTADOS PARA LA BUSQUEDA
    const [foundUser, setFoundUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    //VALORES GLOBALES Y VALORES EN EL REGISTRO
    const [values, setValues] = useState({
        id_tecnico: "",
        identificacion: "",
        nombres: "",
        apellidos: "",
        correo: "",
        telefono: "", 
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
                url: 'http://localhost:3000/tecnicos/registrar',
                data: values
            });

            if (response.status === 200) {
                alert('Usuario registrado');
                setIsOpen(false);
                listarTodosUsuarios();
            }
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    //FUNCION DE ACTUALIZAR
    const handleFormActualizar=async(event, id_tecnico)=>{
        event.preventDefault();
        try {
            console.log(values);

            const response = await axios.put(`http://localhost:3000/tecnicos/actualizar/${id_tecnico}`, values);
            ;

            if(response.status==200){
                alert('Usuario actualizado');
                setIsOpenUpdate(false);
            }
    
            listarTodosUsuarios(); 
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
      };

    //FUNCIO DE BUSCAR
        const handleSearchSubmit = () => {
        const found = useUsuarios.find((user) => user.id_tecnico.toString() === searchTerm);
        setFoundUser(found);
        };

    //FUNCION PARA LISTAR USUARIOS
    const listarTodosUsuarios=() =>{
        axios.get('http://localhost:3000/tecnicos/listar')
        .then(response=>{
            setUsuarios(response.data);
        })
    }

    // FUNCION DE ELIMINAR USUARIOS
    const eliminarUsuarios=async(id_tecnico) =>{
        await axios.delete(`http://localhost:3000/tecnicos/eliminar/${id_tecnico}`)
        .then(response=>{
            listarTodosUsuarios();
            alert('Usuario eliminado exitosamente');
        })
        .catch (error => {
            console.error('Error al eliminar usuario', + error.data);
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
        // CONTENEDOR DEL TODO
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
        
       {/* INPUT Y BOTON DE BUSQUEDA */}
        <div className="mb-3">
        <div className="flex items-center gap-2 m-8 mt-20">
            <input
            type="text"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-3xl py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 form-control"
            placeholder="Buscar por ID"
            value={searchTerm}
            onChange={handleSearchChange}
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl btn btn-primary" onClick={handleSearchSubmit}>
            BUSCAR
            </button>
        </div>
        </div>

        {/* TABLA DE DATOS */}
        <div className="w-full">
            <table className="min-w-full divide-y divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-3xl-lg">
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
                    IDENTIFICACION
                    </th>
                    <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                    NOMBRES
                    </th>
                    <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                    APELLIDOS
                    </th>
                    <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                    CORREO
                    </th>
                    <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                    TELEFONO
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
                    <td className="px-6 py-4 whitespace-nowrap">{foundUser.id_tecnico}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{foundUser.identificacion}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{foundUser.nombres}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{foundUser.apellidos}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{foundUser.correo}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{foundUser.telefono}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-3 rounded-3xl" onClick={() => eliminarUsuarios(foundUser.id_tecnico)}>
                        ELIMINAR
                        </button>
                        <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl"
                        onClick={(event) => {
                            setValues({
                            id_tecnico: foundUser.id_tecnico,
                            identificacion: foundUser.identificacion,
                            nombres: foundUser.nombres,
                            apellidos: foundUser.apellidos,
                            correo: foundUser.correo,
                            telefono: foundUser.telefono,
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
                    <tr key={user.id_tecnico}>
                        <td className="px-6 py-4 whitespace-nowrap">{user.id_tecnico}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.identificacion}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.nombres}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.apellidos}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.correo}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.telefono}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-3 rounded-3xl" onClick={() => eliminarUsuarios(user.id_tecnico)}>
                            ELIMINAR
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl"
                            onClick={(event) => {
                            setValues({
                                id_tecnico: user.id_tecnico,
                                identificacion: user.identificacion,
                                nombres: user.nombres,
                                apellidos: user.apellidos,
                                correo: user.correo,
                                telefono: user.telefono,
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
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-3xl m-3"
                onClick={() => {
                    setValues({
                    id_tecnico: "",
                    identificacion: "",
                    nombres: "",
                    apellidos: "",
                    correo: "",
                    telefono: ""
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

       


      {/* TABLA PARA MOSTRAR DATOS FIN */}


     {/* MODAL REGISTRAR */}
     {isOpen && (
  <form onSubmit={handleForm} className='fixed inset-0 flex bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center'>
    <div className='bg-white p-5 rounded-3xl-md flex flex-col justify-center items-center gap-5'>
      <div className="flex w-full border-b-2">
        <h2 className="p-1 font-semibold">REGISTRO DE TECNICO</h2>
      </div>
      <div className='flex justify-center items-center gap-2'>
        <label className='font-medium'>Identificacion:</label>
        <input
          type="text"
          name="identificacion"
          className='border-gray-400 border outline-none rounded-3xl-sm p-1'
          value={values.identificacion}
          onChange={handleInputChange}
        />
      </div>
      <div className='flex justify-center items-center gap-2'>
        <label className='font-medium'>Nombres:</label>
        <input
          type="text"
          name="nombres"
          className='border-gray-400 border outline-none rounded-3xl-sm p-1'
          value={values.nombres}
          onChange={handleInputChange}
        />
      </div>
      <div className='flex justify-center items-center gap-2'>
        <label className='font-medium'>Apellidos:</label>
        <input
          type="text"
          name="apellidos"
          className='border-gray-400 border outline-none rounded-3xl-sm p-1'
          value={values.apellidos}
          onChange={handleInputChange}
        />
      </div>
      <div className='flex justify-center items-center gap-2'>
        <label className='font-medium'>Correo:</label>
        <input
          type="email"
          name="correo"
          className='border-gray-400 border outline-none rounded-3xl-sm p-1'
          value={values.correo}
          onChange={handleInputChange}
        />
      </div>
      <div className='flex justify-center items-center gap-2'>
        <label className='font-medium'>Telefono:</label>
        <input
          type="text"
          name="telefono"
          className='border-gray-400 border outline-none rounded-3xl-sm p-1'
          value={values.telefono}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex gap-14">
        <button type="button" className="bg-red-500 p-2 font-bold hover:bg-red-700 text-white rounded-3xl-md" onClick={()=> setIsOpen(false)}>
          CANCELAR
        </button>
        <button type="submit" className="bg-green-500 p-2 font-bold hover:bg-green-700 text-white rounded-3xl-md">
          REGISTRAR
        </button>
      </div>
    </div>
  </form>
)}

    {/* MODAL REGISTRAR FIN */}

    {/* MODAL ACTUALIZAR */}
    {isOpenUpdate && (
  <form onSubmit={(event) => handleFormActualizar(event, values.id_tecnico)} className='fixed inset-0 flex bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center'>
    <div className='bg-white p-5 rounded-3xl-md flex flex-col justify-center items-center gap-5'>
      <div className="flex w-full border-b-2">
        <h2 className="p-1 font-semibold">EDITAR TECNICO</h2>
      </div>
      <div className='flex justify-center items-center gap-2'>
        <label className='font-medium'>Identificación:</label>
        <input
          type="number"
          name="identificacion"
          className='border-gray-400 border outline-none rounded-3xl-sm p-1'
          value={values.identificacion}
          onChange={handleInputChange}
        />
      </div>
      <div className='flex justify-center items-center gap-2'>
        <label className='font-medium'>Nombres:</label>
        <input
          type="text"
          name="nombres"
          className='border-gray-400 border outline-none rounded-3xl-sm p-1'
          value={values.nombres}
          onChange={handleInputChange}
        />
      </div>
      <div className='flex justify-center items-center gap-2'>
        <label className='font-medium'>Apellidos:</label>
        <input
          type="text"
          name="apellidos"
          className='border-gray-400 border outline-none rounded-3xl-sm p-1'
          value={values.apellidos}
          onChange={handleInputChange}
        />
      </div>
      <div className='flex justify-center items-center gap-2'>
        <label className='font-medium'>Correo:</label>
        <input
          type="text"
          name="correo"
          className='border-gray-400 border outline-none rounded-3xl-sm p-1'
          value={values.correo}
          onChange={handleInputChange}
        />
      </div>
      <div className='flex justify-center items-center gap-2'>
        <label className='font-medium'>Teléfono:</label>
        <input
          type="text"
          name="telefono"
          className='border-gray-400 border outline-none rounded-3xl-sm p-1'
          value={values.telefono}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex gap-14">
        <button type="button" className="bg-red-500 p-2 font-bold hover:bg-red-700 text-white rounded-3xl-md" onClick={()=> setIsOpenUpdate(false)}>
          CANCELAR
        </button>
        <button type="submit" className="bg-green-500 p-2 font-bold hover:bg-green-700 text-white rounded-3xl-md">
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

export default Tecnicos