module.exports = app => {
    const products = 
    require("../controllers/product.controllers");

    let router = 
    require("express").Router();

    router.post("/",products.tambahProduct);
    router.get("/:productId",products.cariProductById);
    router.put("/:productId",products.ubahProduct);
    router.delete("/:productId",products.hapusProduct);

    app.use("/api/v1/product", router);
}