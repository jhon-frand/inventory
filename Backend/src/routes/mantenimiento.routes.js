import { Router } from 'express'
import { funcionesMantenimiento } from '../controllers/mantenimiento.controller.js'

const rutas = Router();

rutas.post("/", funcionesMantenimiento.postMantenimiento);
rutas.get("/", funcionesMantenimiento.getMantenimientos);
rutas.get("/:id", funcionesMantenimiento.getMantenimiento);
rutas.put("/:id", funcionesMantenimiento.putMantenimiento);

export default rutas;