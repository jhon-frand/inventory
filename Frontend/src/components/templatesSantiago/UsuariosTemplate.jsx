import React, {useState,useEffect} from 'react'
import SideBar from '../organismos/SideBar'
import NavBar from '../organismos/NavBar'
import axios from 'axios'
import Swal from 'sweetalert2';

function UsuariosTemplate() {

  const [useUsuarios,setUsuarios] = useState();

  const listarUsuarios=()=>{
    axios.get('http://localhost:3000/usuario/listar')
    .then(response=>{
      setUsuarios(response.data);
      console.log(response.data);
    })
  }
  const registrarUsuario=()=>{
    axios.get('http://localhost:3000/usuario/listar')
    .then(response=>{
      
    }).then(()=>{
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Usuario registrado!",
        //html:"<i>El usuario <strong>"+nombre+"</strong> ha sido registrado con éxito!</i>",
        showConfirmButton: false,
        timer: 3000
      });
    })
  }

  useEffect(()=>{
    listarUsuarios();
  },[]);


  return (
    <>
      {
        <div className='relative'>
            <div className='absolute top-0 left-0 right-0 z-50'>
                <NavBar/>
            </div>
            <div className='flex'>
            <div>
                <SideBar/>
            </div>
            <div style={{ position:'relative', top:'150px', width: '1050px', height: '300px' }} className='container shadow-lg p-3 mt-10 mb-3 bg-slate-300 rounded  flex flex-col gap-3 justify-center items-center'>

                     <div style={{borderBottom:'2px solid gray'}} className='flex w-full '>
                        <h3 style={{position:'relative', top:'5px'}} className='fw-bold uppercase mb-3'>Encargados</h3>
                        <div className="mb-3">
                            <input style={{position:'relative', left:'50px', width:'650px'}} type="text" className="form-control" placeholder="Buscar..." />
                        </div>
                        <button style={{position:'relative', left:'115px', bottom:'13px'}} className='btn btn-primary fw-blod' onClick={()=>{
                          registrarUsuario();
                        }}>Registrar usuario</button>
                     </div>
                     
                  <table className="table table-striped">
                      <thead>
                          <tr className='fw-bold'>
                            <td>ID usuario</td>
                            <td>Identificacion</td>
                            <td>Nombres</td>
                            <td>Apellidos</td>
                            <td>Telefono</td>
                            <td>Email</td>
                            <td>Rol</td>
                            <td>Unidad productiva</td>
                            <td>Opciones</td>
                          </tr>
                      </thead>
                      <tbody>
                          {
                          useUsuarios && useUsuarios.map(user=>(
                              <tr key={user.id_usuario}>
                                  <td>{user.id_usuario}</td>
                                  <td>{user.identificacion}</td>
                                  <td>{user.nombres}</td>
                                  <td>{user.apellidos}</td>
                                  <td>{user.telefono}</td>
                                  <td>{user.email}</td>
                                  <td>{user.rol}</td>
                                  <td>{user.nombre_unidad}</td>
                                  <td>
                                    <button className='btn btn-primary'>Editar</button>
                                  </td>
                                  
                              </tr>
                            ))
                          }
                      </tbody>
                  </table>
                </div>
            </div>
        </div>
      }
    </>
  )
}

export default UsuariosTemplate
