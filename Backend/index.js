import express, { urlencoded } from "express";
import bodyParser from "body-parser";
import tecnicos from "./src/routes/tecnicosrouter.js";
import actividades from "./src/routes/actividadesrouter.js"
import cors from 'cors';

const servidor = express();

servidor.use(bodyParser.json());
servidor.use(urlencoded({extended:true}));
servidor.use(cors());

servidor.use('/tecnicos', tecnicos);
servidor.use('/actividades', actividades);


servidor.listen(3000, ()=> {
    console.log('ALEXANDER_MARTINEZ');
});