import { pool } from '../database/database.js'

const postMantenimiento = async (peticion, respuesta) => {
    try {
        const mantenimiento = peticion.body;
        const sql = await pool.query("INSERT INTO mantenimientoS SET ?", mantenimiento);
        respuesta.json({meesage:"mantenimiento registrado", manteni: sql});
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getMantenimientos = async (peticion, respuesta) => {
    try {
        const [sql] = await pool.query(`SELECT mantenimientos.*,
        usuarios.nombres,
        equipos.nombre_equipo
        FROM mantenimientos
        JOIN usuarios ON usuarios.id_usuario = mantenimientos.fk_user_responsable
        JOIN equipos ON equipos.id_equipo = mantenimientos.fk_equipo`);
        respuesta.json(sql);
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getMantenimiento = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const [sql] = await pool.query("SELECT * FROM mantenimientos WHERE id_mantenimiento = ?", id);
        respuesta.json({meesage:"mantenimiento encontrado: ", manteni: sql});
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const putMantenimiento = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const mantenimiento = peticion.body;
        const sql = await pool.query("UPDATE mantenimientoS SET ? WHERE id_mantenimiento = ?", [mantenimiento, id]);
        respuesta.json({meesage:"mantenimiento actualizado", manteni: sql});
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

export const funcionesMantenimiento = {
    postMantenimiento,
    getMantenimientos,
    getMantenimiento,
    putMantenimiento
};