import express from "express"
import cors from "cors"


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


//routes

import router from "./src/routes/routes.js"

app.use("/", router)

export default app
