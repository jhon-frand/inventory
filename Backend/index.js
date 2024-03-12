import express from "express";
import morgan from "morgan";
import { connectionDb } from "./src/database/database.js";
import rutaUnidadesProductivas from "./src/routes/uni_productivas.routes.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/unidades", rutaUnidadesProductivas);

app.listen(3000, () => {
    console.log("server on port 3000");
    connectionDb();
});