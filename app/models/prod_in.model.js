module.exports = (sequelize, Sequelize)=>{
    const Prodin = sequelize.define("product_in", {
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
   
    return Prodin;
}