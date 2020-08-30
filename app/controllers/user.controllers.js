var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const db = require("../models/index");
const Op = db.Sequelize.Op;
const User = db.user;

//registrasi
exports.registrasi = function (req, res) {

    //Create user
    var salt = bcrypt.genSaltSync(10);

    var datas = req.body.data;
    // console.log(datas[0].full_name);

    // for(let i = 0; i <= datas.length; i++)
    // {
        //Validate request
        if (!datas.username || !datas.password) {
            res.status(400).send(
                {
                    message: "Content can not be empty"
                }
            );
            return;
        }

        // var hash = bcrypt.hashSync(
        //     req.body.data.password, salt);
        var hash = bcrypt.hashSync(
            datas.password, salt);
        // const user.push([datas[i].full_name, datas[i].username, datas[i].email, datas[i].phone_number], datas[i].phone_number]);
        const user = {
            full_name: datas.full_name,
            username: datas.username,
            email: datas.email,
            phone_number: datas.phone_number,
            role: datas.role,
            password: hash
        }  

        // const user = {
        //     full_name: req.body.data.full_name,
        //     username: req.body.data.username,
        //     email: req.body.data.email,
        //     phone_number: req.body.data.phone_number,
        //     role: req.body.data.role,
        //     password: hash,
        // }  

        User.create(user) // insert into users
        .then((data) => {
            res.send({
                status: 'Success',
                message: 
                'Data User Berhasil Ditambahkan',
                data});
        }).catch((err) => {
            res.status(500).send({
                message: err.message ||
                    "Error saat menambah data ke-"+i
            })
        });
    // }
};

//Ubah User
exports.ubahUser = (req, res) => {
    const id = req.params.userId;

    // console.log(id);
    try {
        var datas = req.body.data;
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(
            datas.password, salt);
        User.update({
            full_name: datas.full_name,
            email: datas.email,
            phone_number: datas.phone_number,
            role: datas.role,
            password: hash
        }, {
            where: { id: id }
        }).then((result) => {
            if(result) {
                //send response
                res.send({
                    status: 'Success',
                    message: 
                    'Data User Berhasil Diubah',
                    data: {
                        full_name: datas.full_name,
                        username: datas.username,
                        email: datas.email,
                        phone_number: datas.phone_number,
                        role: datas.role,
                        password: hash
                    }
                });
            } else {
                res.send({
                    status: 'Failed',
                    message: 
                    `Cannot update User with id = ${id}`
                })
            }
        }).catch((err) => {
            res.status(500).send({
                 message: `Error updating user id = ${id}`
            })
        })
    } catch (err) {
        res.status(500).send({error: err, message: "error"});
    }
};

//login
exports.login = function (req, res) {
    var datas = req.body.data;
    var username = datas.username;
    var pass = datas.password;

    User.findOne({ where: { username: username } })
        .then((data) => {
            var hasil = bcrypt.compareSync(pass, data.password);
            console.log(hasil);

            if (hasil == true) {

                var secret = process.env.SECRET_JWT;
                var expiresIn = "30 days";//123 30d 24h 30 days

                jwt.sign(
                    { id: data.id },
                    secret,
                    { algorithm: 'HS256', expiresIn: expiresIn },
                    function (err, token) {
                        if (err) {
                            res.json({
                                "results":
                                {
                                    "status": false,
                                    "msg": 'Error occurred while generating token'
                                }
                            });
                        } else {
                            if (token != false) {
                                res.header();
                                res.json({
                                    "results":
                                    {
                                        "status": true,
                                        "token": token,
                                        "user": { id: data.id }
                                    }
                                });
                                res.end();
                            } else {
                                res.json({
                                    "results":
                                    {
                                        "status": false,
                                        "msg": 'Could not create token'
                                    },
                                });
                                res.end();
                            }
                        }
                    });
            } else {
                res.send({
                    message: "Username atau Password anda salah"
                }

                );
            }
        }).catch((err) => {
            res.status(500).send({
                err:
                    err.message,
                message:
                    "Error retrieving post with id = "
            });
        });
};

//cari user by id
exports.cariUserById = (req, res) => {
    const id = req.params.userId;
    User.findAll({ where: {id: id} })
        .then((data) => {
            res.send({
                status: 'Success',
                message: 
                'Success get user data',
                data
            });
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while find order"
            })
        });
};

//cari user
exports.cariUserLimit = (req, res) => {
    const limit = req.params.limit;
    let condition = 
    limit ? { limit: {[Op.limit]: limit} } : null;
    User.findAll({limit: condition})
        .then((data) => {
            res.send({
                status: 'Success',
                message: 
                'Success get user data',
                data
            });
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while find order"
            })
        });
};

exports.hapusUser = (req, res) => {
    const id = req.params.userId;

    User.destroy({
        where: {
            id:id
        }
    }).then((result) => {
        if(result) {
            //send response
            res.send({
                status: 'Success',
                message: 
                'Data User Berhasil Dihapus',
                data: {
                    id: id
                }
            });
        } else {
            res.send({
                status: 'Failed',
                message: 
                `Cannot delete User with id = ${id}`
            })
        }
    });
}


// exports.findOrderByUserId = function (req, res) {
//     console.log(req.params.userId);
//     User.findByPk(

//         req.params.userId,
//         {
//             attributes: ['id', 'email','firstname'],
//             include: [{
//                 model: Order,
//                 attributes: ['id','quantity','total']
//             }
//             ]
//         }
//     ).then((data) => {
//         res.send(data);

//     })
//         .catch((err) => {
//             console.log(">> Error while finding tutorial: "
//                 , err);
//         });
// };

