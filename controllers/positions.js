import {User} from "../models/models.js"

export const getAllPositions = async (req, res) => {
    try {
        const users = await User.findAll({})
        let positions = []
        for (let i = 0; i < users.length; i++) {
            let position = users[i].position
            let id = users[i].position_id
            positions.push({id: id, name: position})
        }
        return res.json({positions})
    } catch (err) {
        console.log(err)
    }
}