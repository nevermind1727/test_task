import {User} from "../models/models.js"
import path, {dirname} from "path"
import { fileURLToPath } from 'url';
import tinify from "tinify"

tinify.key = process.env.TINIFY_KEY
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const getAllUsers = async (req, res) => {
    try {
        let {page, limit} = req.query
        page = page || 1
        limit = limit || 6
        let offset = page * limit - limit
        const users = await User.findAndCountAll({offset, limit})
        let url = "http://localhost:5000/api/v1/users?page="
        res.json({
            page: page, 
            links: {
                prev_url: `${page == 1 ? null : url}${page == 1 ? "" : page - 1}`,
                next_url: `${page * limit > users.count ? null : url}${page * limit > users.count ? "" : page + 1}`
            },
            users,
        })
    } catch (error) {
        console.log(error)
    }
}
export const createUser = async (req, res) => {
    try {
        const {name, email, phone, position, position_id} = req.body
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return res.status(400).json({success: false, message: "User with that email already exist"})
        }
        const photo = req.files.photo
        const imagePath = path.join(__dirname, '../static/' + `${photo.name}`)
        await photo.mv(imagePath)
        const source = tinify.fromFile(imagePath);
        const resized = source.resize({
            method: "fit",
            width: 70,
            height: 70
        });
        resized.toFile(path.join(__dirname, "../optimizedImages/" + `optimized_${photo.name}`))
        const user = await User.create({name, email, phone, position, position_id, photo: "optimized" + photo.name})
        return res.json({user_id: user.id, message: "New user successfully created!"})
    } catch (error) {
        console.log(error)
    }
}

export const getOneUser = async (req, res) => {
    const {id} = req.params
    const user = await User.findOne({where: {id}})
    return res.json(user)
}