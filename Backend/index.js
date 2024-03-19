import express from "express";
import morgan from "morgan";
import tecnicos from "./src/routes/tecnicosrouter.js";
import actividades from "./src/routes/actividadesrouter.js"
import cors from 'cors';
import bodyParser from "body-parser";
import { connectionDb } from "./src/database/database.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

//RUTAS ALEXANDER

app.use('/tecnicos', tecnicos);
app.use('/actividades', actividades);

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('./src/public'));

app.get('/docunidades', (req, res) => {
    res.render('docUnidades.ejs');
});
app.get('/category', (req, res) => {
    res.render('docCategorias.ejs');
});

app.listen(3000, () => {
    console.log("server on port 3000");
    connectionDb();
});

