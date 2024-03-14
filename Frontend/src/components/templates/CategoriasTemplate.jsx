import axios from "axios"
import { useEffect, useState } from "react";

function CategoriasTemplate() {

    const endpoint = 'http://localhost:3000/categorias';
    const [categorias, setCategorias] = useState([]);
    //listar categorias
    const getCatorias = async () => {
        try {
            const respuesta = await axios.get(`${endpoint}`);
            setCategorias(respuesta.data);
        } catch (error) {
            console.log("error al listar categr}orias", error);
        }
    };

    useEffect(()=>{
        getCatorias();
    }, []);
  return (
    <>
    <div>
        <div>
            <table>
                <thead> 
                    <tr className='bg-gray-500'>
                        <th>ID</th>
                        <th>NOMBRE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categorias.map((categoria) => (
                            <tr key={categoria.id_categoria} className='border-b'>
                                <th>{categoria.id_categoria}</th>
                                <th>{categoria.nombre_categoria}</th>
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

export default CategoriasTemplate