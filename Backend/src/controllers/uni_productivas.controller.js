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

export const funcionesUnidades = {
    postUniProductiva
};