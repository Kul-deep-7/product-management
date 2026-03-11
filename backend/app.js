import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";



const app = express()

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}
))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())
//routes

import router from "./src/routes/routes.js"

app.use("/", router)

export default app
