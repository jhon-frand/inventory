import express from "express";
import morgan from "morgan";
import tecnicos from "./src/routes/tecnicosrouter.js";
import actividades from "./src/routes/actividadesrouter.js"
import cors from 'cors';
import { connectionDb } from "./src/database/database.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//RUTAS ALEXANDER

app.use('/tecnicos', tecnicos);
app.use('/actividades', actividades);

app.listen(3000, () => {
    console.log("server on port 3000");
    connectionDb();
});