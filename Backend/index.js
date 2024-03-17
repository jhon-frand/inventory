import express from "express";
import morgan from "morgan";
import { connectionDb } from "./src/database/database.js";
import usuariosRutas from "./src/routes/usuarios.router.js";
import validarToken_Ruta from "./src/routes/token.routers.js";
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/usuario', usuariosRutas)
//app.use('/validarUsuario', validarToken_Ruta)

app.listen(3000, () => {
    console.log("server on port 3000");
    connectionDb();
});