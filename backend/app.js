import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";



const app = express()

app.use(cors({
    origin: "https://product-management-frontend-78ef.onrender.com",
    credentials: true
}
))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())
//routes

import router from "./src/routes/routes.js"

app.use("/", router)

export default app
