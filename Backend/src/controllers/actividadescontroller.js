import { pool } from "../database/database.js";

export const listarActividades = async(req,res) => {
    try {
        let sql = `select * from actividades`;
        let [rows] = await pool.query(sql);

        if (rows.length>0) {
            return res.status(200).json(rows);
        }else{
            return res.status(403).json ({message: "No hay actividades"});
        }
    } catch (e) {
        return res.status(500).json ({message: "ERROR"});
    }
};

export const registrarActividades = async(req, res) => {
    try {
        let {fecha_realizacion_actividad, descripcion, fk_mantenimiento, fk_tecnico} = req.body;
        let sql = `insert into actividades (fecha_realizacion_actividad, descripcion, fk_mantenimiento, fk_tecnico) values ('${fecha_realizacion_actividad}','${descripcion}','${fk_mantenimiento}','${fk_tecnico}')`;
        let [rows] = await pool.query(sql);

        if (rows.affectedRows>0) {
            return res.status(200).json({message: "Actividad registrada exitosamente"});
        }else{
            return res.status(403).json ({message: "No hay actividades"});
        }
    } catch (e) {
        return res.status(500).json ({message: e.message});
    }
};

export const actualizarActividades = async(req, res) => {
    try {
        let id = req.params.id;
        let {fecha_realizacion_actividad, descripcion, fk_mantenimiento, fk_tecnico} = req.body;
        let sql = `update actividades set fecha_realizacion_actividad = ?, descripcion = ?, fk_mantenimiento = ? , fk_tecnico = ? where id_actividad = ?`;
        let [rows] = await pool.query(sql, [fecha_realizacion_actividad, descripcion, fk_mantenimiento, fk_tecnico, id]);

        if (rows.affectedRows>0) {
            return res.status(200).json({message: "Actividad actualizada exitosamente"});
        }else{
            return res.status(403).json ({message: "Actividad no actualizada"});
        }
    } catch (e) {
        return res.status(500).json ({message: e.message});
    }
};

export const consultarActividades = async(req, res) => {
    try {
        let id = req.params.id;
        let sql = `select * from actividades where id_actividad = ${id}`;
        let [rows] = await pool.query(sql);

        if (rows.length>0) {
            return res.status(200).json(rows);
        }else{
            return res.status(403).json ({message: "No se encontro la actividad"});
        }
    } catch (e) {
        return res.status(500).json ({message: e.message});
    }
};

export const eliminarActividades = async(req, res) => {
    try {
        let id = req.params.id;
        let sql = `delete from actividades where id_actividad = ${id}`;
        let [rows] = await pool.query(sql);

        if (rows.affectedRows>0) {
            return res.status(200).json({message: "Actividad eliminada exitosamente"});
        }else{
            return res.status(403).json ({message: "No se elimino la actividad"});
        }
    } catch (e) {
        return res.status(500).json ({message: e.message});
    }
};

