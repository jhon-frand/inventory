import axios from "axios"
import { useState, useEffect} from "react";
import SideBar from "../organismos/SideBar";
import NavBar from "../organismos/NavBar";

function UbicacionesTemplate() {

    const endpoint = 'http://localhost:3000/ubicaciones';
    const [ubicaciones, setUbicaciones] = useState([]);
    const getUbicaciones = async() => {
        try {
            const respuesta = await axios.get(`${endpoint}`);
            setUbicaciones(respuesta.data);
        } catch (error) {
            console.log("error al listar las ubicaciones", error);
        }
    };
    useEffect(() => {
        getUbicaciones();
        getUnidades();
    },[]);

    const apiUnidades = 'http://localhost:3000/unidades';
    const [unidades, setUnidades] = useState([]);
    const getUnidades = async () => {
        try {
            const respuesta = await axios.get(`${apiUnidades}`);
            if (respuesta.status === 200) {
                setUnidades(respuesta.data);
            }
        } catch (error) {
            console.log("error al buscar unidades", error);
        }
    };
    //modal registro
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState({
        fk_unidad_productiva: "",
        ambiente: "",
        sitio: ""
    });
    const valorInput = (event) => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        })
    };
    const postUbicacion = async (event) => {
        event.preventDefault();
        try {
            const respuesta = await axios.post(endpoint, value);
            if (respuesta.status === 200) {
                alert(respuesta.data.message);
            }
            setIsOpen(false);
            getUbicaciones();
        } catch (error) {
            console.log("error al registrar", error);
        }
    };

    //modal update
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [selectID, setSelectId] = useState(null);
    const editValorInput = (event) => {
        setValue(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }; 

    const putUbicacion = async (event) => {
        event.preventDefault();
        try {
            const respuesta = await axios.put(`${endpoint}/${selectID}`, value);
            if (respuesta.status === 200) {
                alert(respuesta.data.message);
            }
            setIsOpenUpdate(false);
            getUbicaciones();
        } catch (error) {
            console.log("error al actualizar", error);
        }
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
                <input type="search" className="border border-gray-300" placeholder="Buscar categoría por ID" />
                <button className="bg-blue-500 text-white font-semibold p-1 rounded-lg">BUSCAR</button>
                </div>
                <button className='bg-blue-500 text-white rounded-md p-2 font-bold'
    onClick={()=>setIsOpen(true)}
    >REGISTRAR UBICACIÓN</button>
            </div>
            
        <div>
        

   {
    //si isOpen es igual a true
    isOpen && (
        <form onSubmit={postUbicacion}>
        <div className='fixed inset-0 flex bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center'>
            <div className='bg-white p-5  rounded-md flex flex-col justify-center items-center gap-5'>
                <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Unidad Productiva:</label>
                    <select value={value.fk_unidad_productiva} onChange={valorInput} name="fk_unidad_productiva"
                        className='border-gray-400 border rounded-sm p-1' type="text" placeholder="I" required >
                            <option value="">Selecciona Unidad Productiva</option>
                            {
                                unidades.map((unidades) => (
                                    <option key={unidades.id_unidad} value={unidades.id_unidad} >{unidades.nombre_unidad}</option>
                                ))
                            }
                            </select>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Ambiente:</label>
                    <input value={value.ambiente} onChange={valorInput} name="ambiente"
                        className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa el nombre del ambiente" required />
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Sitio:</label>
                    <input value={value.sitio} onChange={valorInput} name="sitio"
                        className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa el Nombre del sitio" required />
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
        <form onSubmit={putUbicacion}>
        <div className='fixed inset-0 flex bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center'>
            <div className='bg-white p-5  rounded-md flex flex-col justify-center items-center gap-5'>
            <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Unidad Productiva:</label>
                    <select value={value.fk_unidad_productiva} onChange={editValorInput} name="fk_unidad_productiva"
                        className='border-gray-400 border rounded-sm p-1' type="text" placeholder="I" required >
                            <option value="">Selecciona Unidad Productiva</option>
                            {
                                unidades.map((unidades) => (
                                    <option key={unidades.id_unidad} value={unidades.id_unidad} >{unidades.nombre_unidad}</option>
                                ))
                            }
                            </select>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Ambiente:</label>
                    <input value={value.ambiente} onChange={editValorInput} name="ambiente"
                        className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa el nombre del ambiente" required />
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Sitio:</label>
                    <input value={value.sitio} onChange={editValorInput} name="sitio"
                        className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa el Nombre del sitio" required />
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
        <div className="w-full flex justify-center ">
            <table className="w-full bg-white rounded-xl">
                <thead> 
                    <tr className='bg-gray-400'>
                        <th className="p-2">ID</th>
                        <th className="p-2">UNIDAD PRODUCTIVA</th>
                        <th className="p-2">AMBIENTE</th>
                        <th className="p-2">SITIO</th>
                        <th className="p-2">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ubicaciones.map((ubicacion) => (
                            <tr key={ubicacion.id_ubicacion} className='border-b'>
                                <th className="p-1">{ubicacion.id_ubicacion}</th>
                                <th className="p-1">{ubicacion.nombre_unidad}</th>
                                <th className="p-1">{ubicacion.ambiente}</th>
                                <th className="p-1">{ubicacion.sitio}</th>
                                <th className="p-1">
                                <button className='bg-blue-800 p-1 text-white rounded-md'
                                onClick={()=>{
                                    setSelectId(ubicacion.id_ubicacion);
                                    setIsOpenUpdate(true);
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

export default UbicacionesTemplate