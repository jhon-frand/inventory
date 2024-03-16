import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import { connectionDb } from "./src/database/database.js";
import rutaUnidadesProductivas from "./src/routes/uni_productivas.routes.js";
import rutasUbicaciones from "./src/routes/ubicaciones.routes.js";
import rutasCategorias from "./src/routes/categoria.routes.js";
import rutasEquipos from "./src/routes/equipo.routes.js";

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.use("/unidades", rutaUnidadesProductivas);
app.use("/ubicaciones", rutasUbicaciones);
app.use("/categorias", rutasCategorias);
app.use("/equipos", rutasEquipos);

app.listen(3000, () => {
    console.log("server on port 3000");
    connectionDb();
});