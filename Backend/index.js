import express from "express";
import morgan from "morgan";
<<<<<<< HEAD
import tecnicos from "./src/routes/tecnicosrouter.js";
import actividades from "./src/routes/actividadesrouter.js"
import cors from 'cors';
=======
import bodyParser from "body-parser";
import cors from "cors";
>>>>>>> a42d72e795b019f675e0ef10ef1f45bf5af6f728
import { connectionDb } from "./src/database/database.js";
import rutaUnidadesProductivas from "./src/routes/uni_productivas.routes.js";
import rutasUbicaciones from "./src/routes/ubicaciones.routes.js";
import rutasCategorias from "./src/routes/categoria.routes.js";
import rutasEquipos from "./src/routes/equipo.routes.js";
import rutasUsuarios from "./src/routes/usuarios.router.js";

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

//RUTAS ALEXANDER

app.use('/tecnicos', tecnicos);
app.use('/actividades', actividades);

//routes

app.use("/unidades", rutaUnidadesProductivas);
app.use("/ubicaciones", rutasUbicaciones);
app.use("/categorias", rutasCategorias);
app.use("/equipos", rutasEquipos);
app.use("/usuarios", rutasUsuarios);


//documentación
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('./src/public'));

app.get('/docunidades', (req, res) => {
    res.render('docUnidades.ejs');
});
app.get('/category', (req, res) => {
    res.render('docCategorias.ejs');
});
app.get('/ubication', (req, res) => {
    res.render('docUbicaciones.ejs');
});
app.get('/equipment', (req, res) => {
    res.render('docEquipos.ejs');
});

app.listen(3000, () => {
    console.log("server on port 3000");
    connectionDb();
});