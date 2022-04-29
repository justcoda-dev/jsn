import {URL} from 'url';
import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import superheroRouter from "./routes/superhero.router.js"
import * as fs from "fs";
import path from "path"
import {dirname} from "path"

const PORT = 5000;
const __dirname = new URL('.', import.meta.url).pathname;
const app = express();

app.use(cors())

const dir = path.join(__dirname, 'static')
console.log(__dirname)
app.use(fileUpload({}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(dir))
app.get("/static", (req, res) => {
    console.log(req)

})

app.use("/api/superhero", superheroRouter)

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))