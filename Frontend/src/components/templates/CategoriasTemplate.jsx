import axios from "axios"
import { useEffect, useState } from "react";

function CategoriasTemplate() {

    const endpoint = 'http://localhost:3000/categorias';
    const [categorias, setCategorias] = useState([]);
    //listar categorias
    const getCategorias = async () => {
        try {
            const respuesta = await axios.get(`${endpoint}`);
            setCategorias(respuesta.data);
        } catch (error) {
            console.log("error al listar categorias", error);
        }
    };

    useEffect(()=>{
        getCategorias();
    }, []);

    //Modal Registro
    const [isOpen, setIsOpen] = useState(false);
    //valores para el registro
    const [value, setValue] = useState({
        nombre_categoria: ""
    });
    const valorInput = (event) => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        })
    };
    //función POST
    const postCategoria = async (event) => {
        event.preventDefault();
        try {
            const respuesta = await axios.post(endpoint, value);
            if (respuesta.status === 200) {
                alert(respuesta.data.message);
            }
            setIsOpen(false);
            getCategorias();
        } catch (error) {
            console.log("error al registrar", error);
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
    const putCategoria = async (event) => {
        event.preventDefault();
        try {
            const respuesta = await axios.put(`${endpoint}/${selectID}`, value);
            if (respuesta.status === 200) {
                alert(respuesta.data.message);
            }
            setIsOpenUpdate(false);
            getCategorias();
        } catch (error) {
            console.log("error al actualizar", error);
        }
    };

    //buscar categoria
    // const getCategoria = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const respuesta = await axios.get();
    //     } catch (error) {
    //         console.log("error al buscar categoría", error);
    //     }
    // };
  return (
    <>
    <div className="flex flex-col justify-center items-center h-screen gap-5">
    <div className="flex gap-2">
                <input type="search" className="border border-gray-300" placeholder="Buscar categoría por ID" />
                <button className="bg-blue-500 text-white font-semibold p-1 rounded-lg">BUSCAR</button>
            </div>
        <div>
        <button className='bg-blue-500 text-white rounded-md p-1'
    onClick={()=>setIsOpen(true)}
    >REGISTRAR CATEGORÍA</button>

   {
    //si isOpen es igual a true
    isOpen && (
        <form onSubmit={postCategoria}>
        <div className='fixed inset-0 flex bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center'>
            <div className='bg-white p-5  rounded-md flex flex-col justify-center items-center gap-5'>
                <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Nombre Categoría:</label>
                    <input value={value.nombre_categoria} onChange={valorInput} name="nombre_categoria"
                        className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa el Nombre" required />
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
        <form onSubmit={putCategoria}>
        <div className='fixed inset-0 flex bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center'>
            <div className='bg-white p-5  rounded-md flex flex-col justify-center items-center gap-5'>
                <div className='flex justify-center items-center gap-2'>
                    <label className='font-bold'>Nombre Categoría:</label>
                    <input value={value.nombre_categoria} onChange={editValorInput} name="nombre_categoria"
                        className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa el Nombre" required />
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
        <div>
            <table>
                <thead> 
                    <tr className='bg-gray-500'>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categorias.map((categoria) => (
                            <tr key={categoria.id_categoria} className='border-b'>
                                <th>{categoria.id_categoria}</th>
                                <th>{categoria.nombre_categoria}</th>
                                <th>
                                <button className='bg-blue-500 text-white rounded-md'
                                onClick={()=>{
                                    setSelectId(categoria.id_categoria);
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
    </>
  )
}

export default CategoriasTemplate