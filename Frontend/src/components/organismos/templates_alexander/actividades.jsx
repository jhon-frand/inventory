import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from '../NavBar'
import SideBar from '../SideBar'
let myModal;
let myModalActualizar;

function Actividades() {
    
    const [useUsuarios, setUsuarios] = useState([]);

    const [foundUser, setFoundUser] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

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

 // MODAL Y FUNCION DE REGISTRAR
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
                myModal.hide();
                listarTodosUsuarios();
            }
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    //MODAL Y FUNCION DE ACTUALIZAR
    const handleFormActualizar=async(event, id_actividad)=>{
        event.preventDefault();
        try {
            console.log(values);

            const response = await axios.put(`http://localhost:3000/actividades/actualizar/${id_actividad}`, values);
            ;

            if(response.status==200){
                alert('Actividad actualizada');
                myModalActualizar.hide();
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
        const found = useUsuarios.find((user) => user.id_actividad.toString() === searchTerm);
        // Actualiza el estado con el usuario encontrado
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

    // ESTO ES PARA MOSTRAR LOS MODALS
    useEffect(()=>{

        myModal = new bootstrap.Modal('#myModal', {
            keyboard: false
        });

        myModalActualizar = new bootstrap.Modal('#myModalActualizar', {
            keyboard: false
        })
        

        listarTodosUsuarios();

    },[]); 

    return (
  <div className="relative">
    <div className="absolute top-0 left-0 right-0 z-50">
      <NavBar />
    </div>
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        {/* Buscador y botón de registro */}
        <div className="flex flex-col items-center mb-4">

        <button type="button" className="btn m-3 " style={{backgroundColor : 'gray', color: 'white'}} onClick={()=>{
                        myModal.show();

                        setValues({
                            id_actividad: "",
                            fecha_realizacion_actividad: "",
                            descripcion: "",
                            fk_mantenimiento: "",
                            fk_tecnico: "",
                        });
                        
        }}>REGISTRAR</button>

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Buscar por ID"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            className="btn btn-primary"
            onClick={handleSearchSubmit}
          >
            Buscar
          </button>
        </div>
        {/* Tabla de datos */}
        <div className="w-full">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>REALIZACIÓN</th>
                <th>DESCRIPCIÓN</th>
                <th>MANTENIMIENTO</th>
                <th>TECNICO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {foundUser ? (
                <tr key={foundUser.id_actividad}>
                  <td>{foundUser.id_actividad}</td>
                  <td>{foundUser.fecha_realizacion_actividad}</td>
                  <td>{foundUser.descripcion}</td>
                  <td>{foundUser.fk_mantenimiento}</td>
                  <td>{foundUser.fk_tecnico}</td>
                  <td>
                    <button
                      className="btn btn-danger m-1"
                      onClick={() => {
                        eliminarUsuarios(foundUser.id_actividad);
                      }}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={(event) => {
                        setValues({
                          id_actividad: foundUser.id_actividad,
                          fecha_realizacion_actividad: foundUser.fecha_realizacion_actividad,
                          descripcion: foundUser.descripcion,
                          fk_mantenimiento: foundUser.fk_mantenimiento,
                          fk_tecnico: foundUser.fk_tecnico,
                        });
                        myModalActualizar.show();
                      }}
                    >
                      Actualizar
                    </button>
                  </td>
                </tr>
              ) : (
                useUsuarios.map((user) => (
                  <tr key={user.id_actividad}>
                    <td>{user.id_actividad}</td>
                    <td>{user.fecha_realizacion_actividad}</td>
                    <td>{user.descripcion}</td>
                    <td>{user.fk_mantenimiento}</td>
                    <td>{user.fk_tecnico}</td>
                    <td>
                      <button
                        className="btn btn-danger m-1"
                        onClick={() => {
                          eliminarUsuarios(user.id_actividad);
                        }}
                      >
                        Eliminar
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={(event) => {
                          setValues({
                            id_actividad: user.id_actividad,
                            fecha_realizacion_actividad: user.fecha_realizacion_actividad,
                            descripcion: user.descripcion,
                            fk_mantenimiento: user.fk_mantenimiento,
                            fk_tecnico: user.fk_tecnico,
                          });
                          myModalActualizar.show();
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
    </div>
    {/* MODAL REGISTRAR */}
    <div className="modal" id="myModal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">REGISTRAR</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleForm}>
              <label>ID</label>
              <input type="text" name="id_actividad" className="form-control mb-2" value={values.id_actividad} onChange={handleInputChange} />
              <label>Realización</label>
              <input type="date" name="fecha_realizacion_actividad" className="form-control mb-2" value={values.fecha_realizacion_actividad} onChange={handleInputChange} />
              <label>Descripción</label>
              <input type="text" name="descripcion" className="form-control mb-2" value={values.descripcion} onChange={handleInputChange} />
              <label>Mantenimiento</label>
              <input type="text" name="fk_mantenimiento" className="form-control mb-2" value={values.fk_mantenimiento} onChange={handleInputChange} />
              <label>Técnico</label>
              <input type="text" name="fk_tecnico" className="form-control mb-2" value={values.fk_tecnico} onChange={handleInputChange} />
              <button type="submit" className="btn btn-primary mt-3">Registrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    {/* MODAL REGISTRAR FIN */}
    {/* MODAL ACTUALIZAR */}
    <div className="modal" id="myModalActualizar" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">ACTUALIZAR</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={(event) => handleFormActualizar(event, values.id_actividad)}>
              <label>ID</label>
              <input type="text" name="id_actividad" className="form-control mb-2" value={values.id_actividad} onChange={handleInputChange} />
              <label>Realización</label>
              <input type="date" name="fecha_realizacion_actividad" className="form-control mb-2" value={values.fecha_realizacion_actividad} onChange={handleInputChange} />
              <label>Descripción</label>
              <input type="text" name="descripcion" className="form-control mb-2" value={values.descripcion} onChange={handleInputChange} />
              <label>Mantenimiento</label>
              <input type="text" name="fk_mantenimiento" className="form-control mb-2" value={values.fk_mantenimiento} onChange={handleInputChange} />
              <label>Técnico</label>
              <input type="text" name="fk_tecnico" className="form-control mb-2" value={values.fk_tecnico} onChange={handleInputChange} />
              <button type="submit" className="btn btn-primary mt-3">Actualizar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    {/* MODAL ACTUALIZAR FIN */}
  </div>
);

}

export default Actividades