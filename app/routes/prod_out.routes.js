module.exports = app => {
    const prod_out = 
    require("../controllers/prod_out.controllers");

    let router = 
    require("express").Router();

    router.post("/",prod_out.tambahProduct);
    router.get("/:productId",prod_out.cariProductById);
    router.put("/:productId",prod_out.ubahProduct);
    router.delete("/:productId",prod_out.hapusProduct);

    app.use("/api/v1/out", router);
}