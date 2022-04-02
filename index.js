import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import sequelize from "./db/connectDB.js"
import {Auth, User} from "./models/models.js"
import usersRouter from "./routes/users.js"
import tokenRouter from "./routes/token.js"
import positionsRouter from "./routes/positions.js"
import authRouter from "./routes/auth.js"
import authMiddleware from "./middleware/authMiddleware.js"
import fileUpload from "express-fileupload"
import path, {dirname} from "path"
import { fileURLToPath } from 'url';

dotenv.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use("/api/v1/users", authMiddleware, usersRouter)
app.use("/api/v1/token", authMiddleware, tokenRouter)
app.use("/api/v1/positions", authMiddleware, positionsRouter)
app.use("/api/v1/auth", authRouter)


const PORT = process.env.PORT || 5000

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`App listening on the port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()

