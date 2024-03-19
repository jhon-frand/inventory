import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from '../NavBar'
import SideBar from '../SideBar'

function Tecnicos() {
    
    const [useUsuarios, setUsuarios] = useState([]);

    const [foundUser, setFoundUser] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

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
        // Crea una función para manejar la búsqueda cuando se presiona el botón
        const handleSearchSubmit = () => {
        // Busca el usuario con el ID proporcionado
        const found = useUsuarios.find((user) => user.id_tecnico.toString() === searchTerm);
        // Actualiza el estado con el usuario encontrado
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
            console.error('Error al eliminar usuario', error);
        });
    }

    // ESTO ES PARA MOSTRAR LOS MODALS

    return (

        <div className="relative">
                <div className="absolute top-0 left-0 right-0 z-50">
                    <NavBar></NavBar>
                </div>
            <div className="flex">
                <div>
                    <SideBar></SideBar>
                </div>
            {/* TABLA PARA MASTRAR DATOS */}
            <div className="flex justify-center" >

                <div className="flex  items-center">

                   <div className="text-center">
                    
                   <button type="button" className="btn m-3 " style={{backgroundColor : 'gray', color: 'white'}} onClick={()=>{

                        setValues({
                          id_tecnico: "",
                          identificacion: "",
                          nombres: "",
                          apellidos: "",
                          correo: "",
                          telefono: ""
                        });
                        
                    }}>REGISTRAR</button>

                    <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por ID"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button className="btn btn-primary" onClick={handleSearchSubmit}>
                        Buscar
                    </button>
                    </div>
                    
                   </div>

                    <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>IDENTIFICACION</th>
                    <th>NOMBRES</th>
                    <th>APELLIDOS</th>
                    <th>CORREO</th>
                    <th>TELEFONO</th>
                </tr>
                </thead>
                <tbody>
                    {foundUser ? (
                        <tr key={foundUser.id_tecnico}>
                        <td>{foundUser.id_tecnico}</td>
                        <td>{foundUser.identificacion}</td>
                        <td>{foundUser.nombres}</td>
                        <td>{foundUser.apellidos}</td>
                        <td>{foundUser.correo}</td>
                        <td>{foundUser.telefono}</td>
                        <td>
                            <button
                            className="btn btn-danger m-1"
                            onClick={() => {
                                eliminarUsuarios(foundUser.id_tecnico);
                            }}
                            >
                            Eliminar
                            </button>
                            <button
                            className="btn btn-primary"
                            onClick={(event) => {
                                setValues({
                                id_tecnico: foundUser.id_tecnico,
                                identificacion: foundUser.identificacion,
                                nombres: foundUser.nombres,
                                apellidos: foundUser.apellidos,
                                correo: foundUser.correo,
                                telefono: foundUser.telefono,
                                });
                            }}
                            >
                            Actualizar
                            </button>
                        </td>
                        </tr>
                    ) : (
                        // Mostrar la lista de usuarios por defecto
                        useUsuarios.map((user) => (
                        <tr key={user.id_tecnico}>
                            <td>{user.id_tecnico}</td>
                            <td>{user.identificacion}</td>
                            <td>{user.nombres}</td>
                            <td>{user.apellidos}</td>
                            <td>{user.correo}</td>
                            <td>{user.telefono}</td>
                            <td>
                            <button
                                className="btn btn-danger m-1"
                                onClick={() => {
                                eliminarUsuarios(user.id_tecnico);
                                }}
                            >
                                Eliminar
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={(event) => {
                                setValues({
                                    id_tecnico: user.id_tecnico,
                                    identificacion: user.identificacion,
                                    nombres: user.nombres,
                                    apellidos: user.apellidos,
                                    correo: user.correo,
                                    telefono: user.telefono,
                                });
                                }}
                            >
                                Actualizar
                            </button>
                            </td>
                        </tr>
                        ))
                    )}
                </tbody>
                    </table>
                </div>
            </div>
            {/* TABLA PARA MOSTRAR DATOS FIN */}


            {/* MODAL REGISTRAR*/}
                <form onSubmit={handleForm}>
                    
                    <label> ID </label>
                    <input type="text" name="id_tecnico" className='form-control'  value={values.id_tecnico} onChange={handleInputChange} />
                    <label> Identificacion </label>
                    <input type="number" name="identificacion" className='form-control'  value={values.identificacion} onChange={handleInputChange} />
                    <label> Nombres </label>
                    <input type="text" name="nombres" className='form-control' value={values.nombres} onChange={handleInputChange} />
                    <label> Apellidos </label>
                    <input type="text" name="apellidos" className='form-control' value={values.apellidos} onChange={handleInputChange} />
                    <label> Correo </label>
                    <input type="text" name="correo" className='form-control' value={values.correo} onChange={handleInputChange} />
                    <label> Telefono </label>
                    <input type="text" name="telefono" className='form-control' value={values.telefono} onChange={handleInputChange} />

                    <button type="submit" className="btn btn-primary mt-3" >
                        Registrar
                    </button>

                </form>
            {/* MODAL REGISTRAR FIN */}

            {/* MODAL ACTUALIZAR*/}
                                    <form onSubmit={(event) => handleFormActualizar(event, values.id_tecnico)}>

                                        <label> Identificacion </label>
                                        <input type="number" name="identificacion" className='form-control'  value={values.identificacion} onChange={handleInputChange} />
                                        <label> Nombres </label>
                                        <input type="text" name="nombres" className='form-control' value={values.nombres} onChange={handleInputChange} />
                                        <label> Apellidos </label>
                                        <input type="text" name="apellidos" className='form-control' value={values.apellidos} onChange={handleInputChange} />
                                        <label> Correo </label>
                                        <input type="text" name="correo" className='form-control' value={values.correo} onChange={handleInputChange} />
                                        <label> Telefono </label>
                                        <input type="text" name="telefono" className='form-control' value={values.telefono} onChange={handleInputChange} />
                                        
                                         <button type="submit" className="btn btn-primary mt-3">Actualizar</button>

                                    </form>
            {/* MODAL ACTUALIZAR FIN */}
            </div>
        </div>
      
    )
}

export default Tecnicos