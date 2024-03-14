import axios from "axios"
import { useState, useEffect} from "react";


function UbicacionesTemplate() {

    const endpoint = 'http://localhost:3000';
    const [ubicaciones, setUbicaciones] = useState([]);
    const getUbicaciones = async() => {
        try {
            const respuesta = await axios.get(`${endpoint}/ubicaciones`);
            setUbicaciones(respuesta.data);
        } catch (error) {
            console.log("error al listar las ubicaciones", error);
        }
    };
    useEffect(() => {
        getUbicaciones();
    },[]);

    return (
    <>
    <div className="w-full flex flex-col gap-2 justify-center items-center h-screen">
        <div className="bg-red-500 ">
            
            <button className="font-bold p-2 bg-green-600 hover:bg-green-400">REGISTRAR</button>
        </div>
        <div className="">
            <table>
                <thead> 
                    <tr className='bg-gray-500'>
                        <th>ID</th>
                        <th>UNIDAD PRODUCTIVA</th>
                        <th>AMBIENTE</th>
                        <th>SITIO</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ubicaciones.map((ubicacion) => (
                            <tr key={ubicacion.id_ubicacion} className='border-b'>
                                <th>{ubicacion.id_ubicacion}</th>
                                <th>{ubicacion.nombre_unidad}</th>
                                <th>{ubicacion.ambiente}</th>
                                <th>{ubicacion.sitio}</th>

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
    </>
  )
}

export default UbicacionesTemplate