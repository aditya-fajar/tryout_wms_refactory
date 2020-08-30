module.exports = app => {
    const prod_in = 
    require("../controllers/prod_in.controllers");

    let router = 
    require("express").Router();

    router.post("/",prod_in.tambahProduct);
    router.get("/:productId",prod_in.cariProductById);
    router.put("/:productId",prod_in.ubahProduct);
    router.delete("/:productId",prod_in.hapusProduct);

    app.use("/api/v1/in", router);
}