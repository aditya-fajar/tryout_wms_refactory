module.exports = (sequelize, Sequelize)=>{
    const Prodout = sequelize.define("product_out", {
        date:{
            type: Sequelize.DATE
        },
        total:{
            type: Sequelize.INTEGER
        },
        id_product:{
            type: Sequelize.INTEGER
        }
    },{timestamps: false, freezeTableName: true});
   
    return Prodout;
}