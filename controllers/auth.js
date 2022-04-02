import jwt from "jsonwebtoken"
import {Auth} from "../models/models.js"
import bcrypt from "bcryptjs"

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_LIFETIME}
    )
}

export const register = async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        return res.status(400).json({success: false, message: "Incorrect password or email"}) 
    }
    const candidate = await Auth.findOne({where: {email}})
    if (candidate) {
        return res.status(400).json({success: false, message: "User with that email is already exist"}) 
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const userAuth = await Auth.create({email, password: hashPassword})
    const token = generateJwt(userAuth.id, userAuth.email)
    res.json({success: true, token})
}

export const login = async (req, res) => {
    const {email, password} = req.body
    const userAuth = await Auth.findOne({where: {email}})
    if (!userAuth) {
        return res.status(400).json({success: false, message: "Invalid Credentials"})
    }
    let comparePassword = bcrypt.compareSync(password, userAuth.password)
    if (!comparePassword) {
        return res.status(400).json({success: false, message: "Invalid password"})
    }
    const token = generateJwt(userAuth.id, userAuth.email)
    return res.json({success: true, token})
}