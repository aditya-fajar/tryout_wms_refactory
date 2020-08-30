const { sequelize, Sequelize } = require(".");
const { USER } = require("../config/db.config");

module.exports = (sequelize, Sequelize)=>{
    const User = sequelize.define("users", {
        full_name:{
            type: Sequelize.STRING
        },
        username:{
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING
        },
        phone_number:{
            type: Sequelize.STRING
        },
        salt:{
            type: Sequelize.STRING
        },
        password:{
            type: Sequelize.STRING
        },
        role:{
            type: Sequelize.ENUM,
            values: ['admin', 'supplier']
        }
    },{timestamps: false});
   
    return User;
}