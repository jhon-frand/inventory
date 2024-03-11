import express from "express";
import morgan from "morgan";
import { connectionDb } from "./src/database/database.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.listen(3000, () => {
    console.log("server on port 3000");
    connectionDb();
});