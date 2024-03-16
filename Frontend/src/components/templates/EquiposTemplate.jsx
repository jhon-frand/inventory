import axios from 'axios'
import { useEffect, useState } from 'react';
import NavBar from '../organismos/NavBar';
import SideBar from '../organismos/SideBar';

function EquiposTemplate() {
    //API
    const endpoint = 'http://localhost:3000/equipos';
    const [equipos, setEquipos] = useState([]);
    //listar equipos
    const showEquipos = async () => {
        try {
            const respuesta = await axios.get(`${endpoint}`);
            setEquipos(respuesta.data);
        } catch (error) {
            console.log("error al mostrar equipos", error);
        }
    };

    useEffect(() => {
        showEquipos();
        getCategoria();
        getUbicacion();
    },[]);

    // categorias
    const apiCategory = 'http://localhost:3000/categorias';
    const [categorias, setCategorias] = useState([]);
    const getCategoria = async () => {
        try {
            const respuesta = await axios.get(`${apiCategory}`);
            setCategorias(respuesta.data);
        } catch (error) {
            console.log("error al obtener categorías", error);
        }
    };

    const apiUbicacion = 'http://localhost:3000/ubicaciones';
    const [ubicaciones, setUbicaciones] = useState([]);
    const getUbicacion = async () => {
        try {
            const respuesta = await axios.get(`${apiUbicacion}`);
            setUbicaciones(respuesta.data);
        } catch (error) {
            console.log("error al obtener categorías", error);
        }
    };


    //modales
    const [isOpen, setIsOpen] = useState(false);
    //valores para el registro
    const [value, setValue] = useState({
        serial: "",
        nombre_equipo: "",
        marca_equipo: "",
        modelo_equipo: "",
        fecha_ingreso: "",
        descripcion: "",
        tipo_equipo: "",
        fk_categoria: "",
        fk_ubicacion: ""
    });
    const valorInput = (event) => {
        setValue({
         ...value,
            [event.target.name]: event.target.value
        })
    };
    const limpiarForm = ()  => {
        setValue({
            serial: "",
            nombre_equipo: "",
            marca_equipo: "",
            modelo_equipo: "",
            fecha_ingreso: "",
            descripcion: "",
            tipo_equipo: "",
            estado: "",
            fk_categoria: "",
            fk_ubicacion: ""
        })
    };
    //post Equipo
    const postEquipo = async (event) => {
        event.preventDefault();
        try {
            const respuesta = await axios.post(endpoint, value);
            if (respuesta.status === 200) {
                alert(respuesta.data.message);
                limpiarForm();
            }
            setIsOpen(false);
            showEquipos();
        } catch (error) {
            console.log("error al registrar equipo", error);
        }
    };
    //modal update
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [selectID, setSelectId] = useState(null);
    //valores para la actualización
    const editValorInput = (event) => {
        setValue(prevState =>({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    };
    const putEquipo = async (event) => {
        event.preventDefault();
        try {
            const respuesta = await axios.put(`${endpoint}/${selectID}`, value);
            if (respuesta.status === 200) {
                alert(respuesta.data.message);
                limpiarForm();
            }
            setIsOpenUpdate(false);
            showEquipos();
        } catch (error) {
            console.log("error al actualizar", error);
        }
    };

    //traer datos al formulario
    const getDatosForm = (equipo) => {
        setValue({
            serial: equipo.serial,
            nombre_equipo: equipo.nombre_equipo,
            marca_equipo: equipo.marca_equipo,
            modelo_equipo: equipo.modelo_equipo,
            fecha_ingreso: equipo.fecha_ingreso,
            descripcion: equipo.descripcion,
            tipo_equipo: equipo.tipo_equipo,
            estado: equipo.estado,
            fk_categoria: equipo.fk_categoria,
            fk_ubicacion: equipo.fk_ubicacion
        });
        setSelectId(equipo.id_equipo);
        setIsOpenUpdate(true);
    };
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
    <div className="flex gap-3 w-full  bg-gray-200 justify-center items-center ">
    <div className="flex flex-col w-full  p-3 pt-24 h-screen">
    <div className="flex gap-2 justify-around b w-full p-3">
                <div className="flex gap-2 ">
                <input type="search" className="border border-gray-300 p-1" placeholder="Buscar equipo por ID" />
                <button className="bg-blue-500 text-white font-semibold p-1 rounded-lg">BUSCAR</button>
                </div>
                <button className='bg-blue-500 text-white rounded-md p-1'
    onClick={()=>
        setIsOpen(true)}
    >REGISTRAR EQUIPO</button>
            </div> 
        <div>
   {
   // si isOpen es igual a true
    isOpen && (
        <form onSubmit={postEquipo}>
        <div className='fixed inset-0 flex bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center'>
            <div className='bg-white p-5  rounded-md flex flex-col justify-center items-center gap-5'>
               <div className='flex gap-5'>
              <div className='flex flex-col gap-3'>
              <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Serial:</label>
                    <input value={value.serial} onChange={valorInput} name="serial"
                        className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa el serial" required />
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Nombre:</label>
                    <input value={value.nombre_equipo} onChange={valorInput} name="nombre_equipo"
                        className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa el nombre" required />
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Marca:</label>
                    <input value={value.marca_equipo} onChange={valorInput} name="marca_equipo"
                        className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa la marca" required />
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Modelo:</label>
                    <input value={value.modelo_equipo} onChange={valorInput} name="modelo_equipo"
                        className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa el modelo" required />
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Fecha de Ingreso:</label>
                    <input value={value.fecha_ingreso} onChange={valorInput} name="fecha_ingreso"
                        className='border-gray-400 border rounded-sm p-1' type="date" required />
                </div>
              </div>
             <div className='flex flex-col gap-3'>
             <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Descripción:</label>
                    <input value={value.descripcion} onChange={valorInput} name="descripcion"
                        className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa una descripción" required />
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Tipo:</label>
                    <input value={value.tipo_equipo} onChange={valorInput} name="tipo_equipo"
                        className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa el tipo" required />
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Estado:</label>
                    <select value={value.estado} onChange={valorInput} name="estado" className='border-gray-400 border rounded-sm p-1' required>
        <option value="">Seleccione un estado</option>
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
        <option value="Mantenimiento">Mantenimiento</option>
        <option value="Excluido">Excluido</option>
       
    </select>
                </div>
                <div className='flex justify-center items-center gap-2'>
    <label className='font-bold'>Categoría:</label>
    
    <select value={value.fk_categoria} onChange={valorInput} name="fk_categoria" className='border-gray-400 border rounded-sm p-1' required>
        <option value="">Seleccione una categoría</option>
        {categorias.map(categoria => (
            <option key={categoria.id_categoria} value={categoria.id_categoria}>{categoria.nombre_categoria}</option>
        ))}
    </select>
</div>

                <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Ubicación:</label>
                    <select value={value.fk_ubicacion} onChange={valorInput} name="fk_ubicacion" className='border-gray-400 border rounded-sm p-1' required>
        <option value="">Seleccione una Ubicación</option>
        {ubicaciones.map(ubicacion => (
            <option key={ubicacion.id_ubicacion} value={ubicacion.id_ubicacion}>
                {ubicacion.nombre_unidad} - {ubicacion.ambiente} - {ubicacion.sitio}
                </option>
        ))}
    </select>
                </div>
             </div>
               </div>
                <div className='flex justify-center items-center gap-2 font-bold'>
                    <button type="button" className='bg-red-500 p-2 hover:bg-red-700 text-white rounded-md'
                        onClick={() => setIsOpen(false)}
                    >CANCELAR</button>
                    <button type="submit" className="bg-green-500 p-2 font-bold hover:bg-green-700 text-white rounded-md">REGISTRAR</button>
                </div>
            </div>
        </div>
    </form>
    
    )
   }
   {
    //si isOpen es igual a true
    isOpenUpdate && (
        <form onSubmit={putEquipo}>
        <div className='fixed inset-0 flex bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center'>
            <div className='bg-white p-5  rounded-md flex flex-col justify-center items-center gap-5'>
               <div className='flex gap-5'>
              <div className='flex flex-col gap-3'>
              <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Serial:</label>
                    <input value={value.serial} onChange={editValorInput} name="serial"
                        className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa el serial" required />
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Nombre:</label>
                    <input value={value.nombre_equipo} onChange={editValorInput} name="nombre_equipo"
                        className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa el nombre" required />
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Marca:</label>
                    <input value={value.marca_equipo} onChange={editValorInput} name="marca_equipo"
                        className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa la marca" required />
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Modelo:</label>
                    <input value={value.modelo_equipo} onChange={editValorInput} name="modelo_equipo"
                        className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa el modelo" required />
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Fecha de Ingreso:</label>
                    <input value={value.fecha_ingreso} onChange={editValorInput} name="fecha_ingreso"
                        className='border-gray-400 border rounded-sm p-1' type="date" required />
                </div>
              </div>
             <div className='flex flex-col gap-3'>
             <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Descripción:</label>
                    <input value={value.descripcion} onChange={editValorInput} name="descripcion"
                        className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa una descripción" required />
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Tipo:</label>
                    <input value={value.tipo_equipo} onChange={editValorInput} name="tipo_equipo"
                        className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa el tipo" required />
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Estado:</label>
                    <select value={value.estado} onChange={editValorInput} name="estado" className='border-gray-400 border rounded-sm p-1' required>
        <option value="">Seleccione un estado</option>
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
        <option value="Mantenimiento">Mantenimiento</option>
        <option value="Excluido">Excluido</option>
       
    </select>
                </div>
                <div className='flex justify-center items-center gap-2'>
    <label className='font-bold'>Categoría:</label>
    
    <select value={value.fk_categoria} onChange={editValorInput} name="fk_categoria" className='border-gray-400 border rounded-sm p-1' required>
        <option value="">Seleccione una categoría</option>
        {categorias.map(categoria => (
            <option key={categoria.id_categoria} value={categoria.id_categoria}>{categoria.nombre_categoria}</option>
        ))}
    </select>
</div>

                <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Ubicación:</label>
                    <select value={value.fk_ubicacion} onChange={editValorInput} name="fk_ubicacion" className='border-gray-400 border rounded-sm p-1' required >
        <option value="">Seleccione una Ubicación</option>
        {ubicaciones.map(ubicacion => (
            <option key={ubicacion.id_ubicacion} value={ubicacion.id_ubicacion}>
                {ubicacion.nombre_unidad} - {ubicacion.ambiente} - {ubicacion.sitio}
                </option>
        ))}
    </select>
                </div>
             </div>
               </div>
                <div className='flex justify-center items-center gap-2 font-bold'>
                    <button type="button" className='bg-red-500 p-2 hover:bg-red-700 text-white rounded-md'
                        onClick={() => setIsOpenUpdate(false)}
                    >CANCELAR</button>
                    <button type="submit" className="bg-green-500 p-2 font-bold hover:bg-green-700 text-white rounded-md">ACTUALIZAR</button>
                </div>
            </div>
        </div>
    </form>
    
    )
   }
        </div>
       
        <div className='w-full flex justify-center'>
            <table  className='w-full bg-white rounded-xl'>
                <thead> 
                    <tr className='bg-gray-400'>
                        <th className='p-2'>ID</th>
                        <th className='p-2'>SERIAL</th>
                        <th className='p-2'>NOMBRE</th>
                        <th className='p-2'>TIPO</th>
                        <th className='p-2'>ESTADO</th>
                        <th className='p-2'>CATEGORÍA</th>
                        <th className='p-2'>UNIDAD PRODUCTIVA</th>
                        <th className='p-2'>AMBIENTE</th>
                        <th className='p-2'>SITIO</th>
                        <th className='p-2'>ACTIONS</th>
                    </tr> 
                </thead>
                <tbody>
                    {
                        equipos.map((equipo) => (
                            <tr key={equipo.id_equipo} className='border-b'>
                                <th className='p-1'>{equipo.id_equipo}</th>
                                <th className='p-1'>{equipo.serial}</th>
                                <th className='p-1'>{equipo.nombre_equipo}</th>
                                <th className='p-1'>{equipo.tipo_equipo}</th>
                                <th className='p-1'>{equipo.estado}</th>
                                <th className='p-1'>{equipo.nombre_categoria}</th>
                                <th className='p-1'>{equipo.nombre_unidad}</th>
                                <th className='p-1'>{equipo.ambiente}</th>
                                <th className='p-1'>{equipo.sitio}</th>
                                <th className="p-1">
                                <button className='bg-blue-800 p-1 text-white rounded-md'
                                onClick={()=>{
                                    getDatosForm(equipo);
                                }}
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

export default EquiposTemplate