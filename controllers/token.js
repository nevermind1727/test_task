import jwt from "jsonwebtoken"

export const getToken = (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    res.json({success: true, token})
}