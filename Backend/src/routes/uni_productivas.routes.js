import { Router } from "express";
import { funcionesUnidades } from "../controllers/uni_productivas.controller.js";

const rutas = Router();

rutas.post("/", funcionesUnidades.postUniProductiva);

export default rutas;