import { pool } from "../database/database.js";

export const listarTecnicos = async(req,res) => {
    try {
        let sql = `select * from tecnicos`;
        let [rows] = await pool.query(sql);

        if (rows.length>0) {
            return res.status(200).json(rows);
        }else{
            return res.status(403).json ({message: "No hay tecnicos"});
        }
    } catch (e) {
        return res.status(500).json ({message: "ERROR" + e.message});
    }
};

export const registrarTecnico = async(req, res) => {
    try {
        let {identificacion, nombres, apellidos, correo, telefono} = req.body;
        let sql = `insert into tecnicos (identificacion, nombres, apellidos, correo, telefono) values ('${identificacion}','${nombres}','${apellidos}','${correo}','${telefono}')`;
        let [rows] = await pool.query(sql);

        if (rows.affectedRows>0) {
            return res.status(200).json({message: "Tecnico registrado exitosamente"});
        }else{
            return res.status(403).json ({message: "Tecnico no registrado" + e.message});
        }
    } catch (e) {
        return res.status(500).json ({message: e.message});
    }
};

export const actualizarTecnico = async(req, res) => {
    try {
        let id = req.params.id;
        let {identificacion, nombres, apellidos, correo, telefono} = req.body;
        let sql = `update tecnicos set identificacion = ?, nombres = ?, apellidos = ?, correo = ? , telefono = ? where id_tecnico = ?`;
        let [rows] = await pool.query(sql, [identificacion, nombres, apellidos, correo, telefono, id]);

        if (rows.affectedRows>0) {
            return res.status(200).json({message: "Tecnico actualizado exitosamente"});
        }else{
            return res.status(403).json ({message: "Tecnico no actualizado" + e.message});
        }
    } catch (e) {
        return res.status(500).json ({message: e.message});
    }
};

export const consultarTecnico = async(req, res) => {
    try {
        let id = req.params.id;
        let sql = `select * from tecnicos where id_tecnico = ${id}`;
        let [rows] = await pool.query(sql);

        if (rows.length>0) {
            return res.status(200).json(rows);
        }else{
            return res.status(403).json ({message: "No se encontro el tecnico"});
        }
    } catch (e) {
        return res.status(500).json ({message: e.message});
    }
};

export const eliminarTecnico = async(req, res) => {
    try {
        let id = req.params.id;
        let sql = `delete from tecnicos where id_tecnico = ${id}`;
        let [rows] = await pool.query(sql);

        if (rows.affectedRows>0) {
            return res.status(200).json({message: "Tecnico eliminado exitosamente"});
        }else{
            return res.status(403).json ({message: "No se elimino el tecnico" + e.message});
        }
    } catch (e) {
        return res.status(500).json ({message: e.message});
    }
};