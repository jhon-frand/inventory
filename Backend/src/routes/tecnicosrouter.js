import { Router } from "express";
import { actualizarTecnico, consultarTecnico, eliminarTecnico, listarTecnicos, registrarTecnico} from "../controllers/tecnicoscontroller.js";

const route = Router();

route.get('/listar', listarTecnicos);
route.post('/registrar', registrarTecnico);
route.put('/actualizar/:id', actualizarTecnico);
route.delete('/eliminar/:id', eliminarTecnico);
route.get('/consultar/:id', consultarTecnico);

export default route;