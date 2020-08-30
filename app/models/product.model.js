module.exports = (sequelize, Sequelize)=>{
    const Product = sequelize.define("products", {
        name:{
            type: Sequelize.STRING
        },
        stock:{
            type: Sequelize.INTEGER
        },
        price:{
            type: Sequelize.INTEGER
        },
        id_user:{
            type: Sequelize.INTEGER
        }
    },{timestamps: false});
   
    return Product;
}