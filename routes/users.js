import express from "express"
const router = express.Router()
import {getAllUsers, createUser, getOneUser} from "../controllers/users.js"

router.route("/").get(getAllUsers).post(createUser)
router.route("/:id").get(getOneUser)

export default router