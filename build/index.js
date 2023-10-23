"use strict";
exports.__esModule = true;
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var cors_1 = require("cors");
var mongo_1 = require("../src/database/mongo");
var routes_1 = require("../src/routes/routes");
dotenv_1["default"].config();
(0, mongo_1["default"])();
var server = (0, express_1["default"])();
server.use(express_1["default"].urlencoded({ extended: true }));
server.use((0, cors_1["default"])());
server.use(routes_1["default"]);
server.use(function (req, res) {
    res.status(404);
    res.json({ error: "Endpoint not find" });
});
server.listen(process.env.PORT, function () {
    console.log("Servidor rodando em: http://localhost:".concat(process.env.PORT));
});
