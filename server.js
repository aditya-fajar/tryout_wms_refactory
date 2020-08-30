const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cron = require("node-cron");
const nodemailer = require('nodemailer');

//Models
const db = require("./app/models/index");

const app = express();

//create log
app.use(morgan('combined'))

//parse request application / json x-www-form-urlencode
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Sync database
db.sequelize.sync();

// enable files upload
app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 1000000
    },
    abortOnLimit: true
}));


//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//post routes
// require("./app/routes/post.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/prod_in.routes")(app);
require("./app/routes/prod_out.routes")(app);

//schedule task
var task = cron.schedule("* * * * *", function() {
    //* * * * * --> jalan per 1 menit
    // console.log("ini jalan setiap menit");
    // require("./app/cron/cron")
    // (nodemailer).
    // then(console.log(
    //     'success send email'));
});
  task.start;

//set port, listen for request
const PORT = process.env.PORT || 8080;

app.listen(PORT,() =>{
    console.log(`server is running on http://localhost : ${PORT} `);
})