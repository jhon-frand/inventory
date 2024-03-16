import { pool } from "../database/database.js";

const postCategoria = async (peticion, respuesta ) => {
    try {
        const category = peticion.body;
        const sql = await pool.query("INSERT INTO categorias SET ?", category);
        respuesta.json({message:"Categoria Registrada", categoria: sql});
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const putCategoria = async (peticion, respuesta ) => {
    try {
        const {id} = peticion.params;
        const category = peticion.body;
        const sql = await pool.query("UPDATE categorias SET ? WHERE id_categoria = ?", [category, id]);
        respuesta.json({message:"Categoria Actualizada", categoria: sql});
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getCategoria = async (peticion, respuesta ) => {
    try {
        const {id} = peticion.params;
        const [sql]= await pool.query("SELECT * FROM categorias WHERE id_categoria = ?", id);
        respuesta.json(sql);
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getCategorias = async (peticion, respuesta ) => {
    try {
        const [sql]= await pool.query("SELECT * FROM categorias");
        respuesta.json(sql);
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

export const funcionesCategorias = {
    postCategoria,
    putCategoria,
    getCategoria,
    getCategorias
};
