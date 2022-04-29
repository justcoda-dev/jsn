import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import superheroRouter from "./routes/superhero.router.js"


const PORT = 5000;
const app = express();

app.use(cors())

app.use(fileUpload({}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(dir))
app.get("/static", (req, res) => {
    console.log(req)

})

app.use("/api/superhero", superheroRouter)

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))