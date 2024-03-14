import axios from 'axios'
import { useEffect, useState } from 'react';


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
    },[]);
  return (
    <>
    <div>
        <div>
            <table>
                <thead> 
                    <tr className='bg-gray-500'>
                        <th>ID</th>
                        <th>SERIAL</th>
                        <th>NOMBRE</th>
                        <th>TIPO</th>
                        <th>ESTADO</th>
                        <th>CATEGORÍA</th>
                        <th>UNIDAD PRODUCTIVA</th>
                        <th>AMBIENTE</th>
                        <th>SITIO</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        equipos.map((equipo) => (
                            <tr key={equipo.id_equipo} className='border-b'>
                                <th>{equipo.id_equipo}</th>
                                <th>{equipo.serial}</th>
                                <th>{equipo.nombre_equipo}</th>
                                <th>{equipo.tipo_equipo}</th>
                                <th>{equipo.estado}</th>
                                <th>{equipo.nombre_categoria}</th>
                                <th>{equipo.nombre_unidad}</th>
                                <th>{equipo.ambiente}</th>
                                <th>{equipo.sitio}</th>
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

export default EquiposTemplate