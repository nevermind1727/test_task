import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Not Authorized"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userAuth = decoded
        next()
    } catch (e) {
        console.log(e)
    }
}

export default authMiddleware