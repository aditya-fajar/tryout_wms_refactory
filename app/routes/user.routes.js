const { user } = require("../models");

module.exports = app => {
    const users = 
    require("../controllers/user.controllers");

    let router = 
    require("express").Router();


    router.post("/",users.registrasi);
    router.post("/login",users.login);
    router.get("/:userId",users.cariUserById);
    router.get("/",users.cariUserLimit); //????
    router.put("/:userId", users.ubahUser);
    router.delete("/:userId",users.hapusUser);
    // router.get("/order/:userId",
    // users.findOrderByUserId );

    app.use("/api/v1/user", router);
}