const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = 
new Sequelize(dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{
   host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.min,
        idle: dbConfig.pool.min
    }
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// create table
// db.posts = require("./post.model")(sequelize,Sequelize);
db.user = require("./user.model")(sequelize,Sequelize);
db.product = require("./product.model")(sequelize,Sequelize);
db.prodin = require("./prod_in.model")(sequelize,Sequelize);
db.prodout = require("./prod_out.model")(sequelize,Sequelize);

//relation user - order
db.user.hasMany(db.product, {
    foreignKey: 'id',
    as: "Products"});

db.product.belongsTo(db.user, {
    foreignKey: "id_user",
    as: "supplier"});

db.product.hasMany(db.prodin, {
    foreignKey: "id",
    as: "prodin"
  });

  db.product.hasMany(db.prodout, {
    foreignKey: "id",
    as: "prodout"
  });

db.prodin.belongsTo(db.product,{
    foreignKey: "id_product",
    as: "product"})

db.prodout.belongsTo(db.product,{
    foreignKey: "id_product",
    as: "product"})


module.exports = db;