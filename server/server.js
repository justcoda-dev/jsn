import express from "express";
import cors from "cors";
import superheroRouter from "./routes/superhero.router.js"
import fileUpload from "express-fileupload";
// import * as path from "path";

// const moduleURL = new URL(import.meta.url);
// const __dirname = path.dirname(moduleURL.pathname);


const PORT = 5000;
const app = express();



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload({}))
app.use(express.static("static"))

app.get("/", (req, res) => {
    res.json({name: "Alex"})

})

app.use("/api/superhero", superheroRouter)

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))