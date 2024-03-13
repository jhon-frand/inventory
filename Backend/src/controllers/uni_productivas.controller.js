import { pool } from '../database/database.js';

const postUniProductiva = async (peticion, respuesta) => {
    try {
        const connection = await pool.getConnection();
        const unidadProductiva = peticion.body;
        const sql = await connection.query("INSERT INTO unidades_productivas SET ?", unidadProductiva);
        respuesta.json({message:"Unidad Productiva Registrada", unidad: sql})
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const putUniProductiva = async (peticion, respuesta) => {
    try {
        const connection = await pool.getConnection();
        const {id} = peticion.params;
        const unidadProductiva = peticion.body;
        const sql = await connection.query("UPDATE unidades_productivas SET ? WHERE id_unidad = ?", [unidadProductiva, id]);
        respuesta.json({message:"Unidad Productiva Actualizada", unidad: sql})
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getUniProductiva = async (peticion, respuesta) => {
    try {
        const connection = await pool.getConnection();
        const {id} = peticion.params;
        const [sql] = await connection.query("SELECT id_unidad, nombre_unidad FROM unidades_productivas WHERE id_unidad = ?", id);
        respuesta.json(sql)
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getUnidadesProductivas = async (peticion, respuesta) => {
    try {
        const connection = await pool.getConnection();
        const [sql] = await connection.query("SELECT * FROM unidades_productivas");
        respuesta.json(sql)
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

export const funcionesUnidades = {
    postUniProductiva,
    putUniProductiva,
    getUniProductiva,
    getUnidadesProductivas
};