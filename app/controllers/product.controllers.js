const db = require("../models/index");
const Product = db.product;
const jwt = require('jsonwebtoken');
const User = db.user;
require("dotenv").config()

//tambah product
exports.tambahProduct = function (req, res) {
    // var user = 
    // (jwt.verify
    //     (req.headers.token, 
    //         process.env.SECRET_JWT));
    // console.log("user "+user.id);

    var datas = req.body.data;

    const add = {
        name: datas.name,
        stock: datas.stock,
        price: datas.price,
        id_user: datas.id_user
    }

    Product.create(add)
        .then((data) => {
            res.send({
                status: 'Success',
                message: 
                'Data Product Berhasil Ditambahkan',
                data});
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Error saat menambah data produk"
            })
        });
};

//ubah product
exports.ubahProduct = (req, res) => {
    const id = req.params.productId;

    try {
        var datas = req.body.data;
        Product.update({
            name: datas.name,
            stock: datas.stock,
            price: datas.price,
            id_user: datas.id_user
        }, {
            where: { id: id }
        }).then((result) => {
            if(result) {
                //send response
                res.send({
                    status: 'Success',
                    message: 
                    'Data Product Berhasil Diubah',
                    data: {
                        name: datas.name,
                        stock: datas.stock,
                        price: datas.price,
                        id_user: datas.id_user
                    }
                });
            } else {
                res.send({
                    status: 'Failed',
                    message: 
                    `Cannot update Product with id = ${id}`
                })
            }
        }).catch((err) => {
            res.status(500).send({
                 message: `Error updating Product id = ${id}`
            })
        })
    } catch (err) {
        res.status(500).send({error: err, message: "error"});
    }
};

//cari product by id
exports.cariProductById = (req, res) => {
    const id = req.params.productId;
    console.log(Product);
    Product.findByPk(id,
        {
            attributes: ["name","stock","price"],
            include: [{
                model: User,
                as: "supplier",
                attributes: ['id','full_name','username','email','phone_number']
            }]
        })
        .then((data) => {
            res.send({
                status: 'Success',
                message: 
                'Success get product data',
                data
            });
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while find order"
            })
        });
};

exports.hapusProduct = (req, res) => {
    const id = req.params.productId;

    Product.destroy({
        where: {
            id:id
        }
    }).then((result) => {
        if(result) {
            //send response
            res.send({
                status: 'Success',
                message: 
                'Data Product Berhasil Dihapus',
                data: {
                    id: id
                }
            });
        } else {
            res.send({
                status: 'Failed',
                message: 
                `Cannot delete Product with id = ${id}`
            })
        }
    });
}