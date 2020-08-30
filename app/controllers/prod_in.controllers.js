const db = require("../models/index");
const Product = db.product;
const jwt = require('jsonwebtoken');
const User = db.user;
const Prodin = db.prodin;
require("dotenv").config()

//tambah prodin
exports.tambahProduct = function (req, res) {
    // var user = 
    // (jwt.verify
    //     (req.headers.token, 
    //         process.env.SECRET_JWT));
    // console.log("user "+user.id);

    var datas = req.body.data;

    const add = {
        id_product: datas.id_product,
        date: datas.date,
        total: datas.total
    }

    Prodin.create(add)
        .then((data) => {
            res.send({
                status: 'Success',
                message: 
                'Data Product_In Berhasil Ditambahkan',
                data});
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Error saat menambah data product_in"
            })
        });
};

//ubah product
exports.ubahProduct = (req, res) => {
    const id = req.params.productId;

    try {
        var datas = req.body.data;
        Prodin.update({
            id_product: datas.id_product,
            date: datas.date,
            total: datas.total
        }, {
            where: { id: id }
        }).then((result) => {
            if(result) {
                //send response
                res.send({
                    status: 'Success',
                    message: 
                    'Data Product_In Berhasil Diubah',
                    data: {
                        id_product: datas.id_product,
                        date: datas.date,
                        total: datas.total
                    }
                });
            } else {
                res.send({
                    status: 'Failed',
                    message: 
                    `Cannot update Product_In with id = ${id}`
                })
            }
        }).catch((err) => {
            res.status(500).send({
                 message: `Error updating Product_In id = ${id}`
            })
        })
    } catch (err) {
        res.status(500).send({error: err, message: "error"});
    }
};

//cari product by id
exports.cariProductById = (req, res) => {
    const id = req.params.productId;

    Prodin.findByPk(id,
        {
            attributes: ["id","date","total"],
            include: [
                {
                model: Product,
                as: "product",
                attributes: ['name','stock','price'],
                include: [{
                    model: User,
                    as: "supplier",
                    attributes: ['id','full_name','username','email','phone_number']
                }]
                }
            ]
        })
        .then((data) => {
            res.send({
                status: 'Success',
                message: 
                'Success get product_in data',
                data
            });
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while find product"
            })
        });
};

exports.hapusProduct = (req, res) => {
    const id = req.params.productId;

    Prodin.destroy({
        where: {
            id:id
        }
    }).then((result) => {
        if(result) {
            //send response
            res.send({
                status: 'Success',
                message: 
                'Data Product_In Berhasil Dihapus',
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