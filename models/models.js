import sequelize from "../db/connectDB.js"
import {DataTypes} from "sequelize"

export const Auth = sequelize.define("auth", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, allowNull: false, validate: { max: {args: [100], msg: "Email must contain less then 101 characters"}, min: {args: [2], msg: "Email must contain more then 2 characters"}, is: { args: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/], msg: "Email must be correct"}}},
    password: {type: DataTypes.STRING, allowNull: false, validate: { max: {args: [50], msg: "Password must contain less then 50 characters"}, min: {args: [5], msg: "Password must contain more then 5 characters"}}}
})

export const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, validate: { max: {args: [60], msg: "Name must contain less then 61 characters"}, min: {args: [2], msg: "Name must contain more then 2 characters"}}},
    email: {type: DataTypes.STRING, allowNull: false, validate: { max: {args: [100], msg: "Email must contain less then 101 characters"}, min: {args: [2], msg: "Name must contain more then 2 characters"}, is: { args: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/], msg: "Email must be correct"}}},
    phone: {type: DataTypes.STRING, allowNull: false, validate: {is: {args: [/^[\+]{0,1}380([0-9]{9})$/], msg: "Phone number must start with '+380'"}}},
    position: {type: DataTypes.STRING, allowNull: false},
    position_id: {type: DataTypes.INTEGER, allowNull: false},
    photo: {type: DataTypes.STRING, allowNull: false}
})
