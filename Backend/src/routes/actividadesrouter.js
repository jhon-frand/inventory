import { Router } from "express";
import { actualizarActividades, consultarActividades, eliminarActividades, listarActividades, registrarActividades } from "../controllers/actividadescontroller.js";

const route = Router();

route.get('/listar', listarActividades);
route.post('/registrar', registrarActividades);
route.put('/actualizar/:id', actualizarActividades);
route.delete('/eliminar/:id', eliminarActividades);
route.get('/consultar/:id', consultarActividades);

export default route;