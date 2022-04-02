import express from "express"
import {getToken} from "../controllers/token.js"
const router = express.Router()

router.get("/", getToken)

export default router