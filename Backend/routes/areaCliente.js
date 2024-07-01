var express = require("express");
var router = express.Router();

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Barra0programador",
  database: "workappdb",
});

connection.connect();

router.get("/", function (req, res, next) {
  res.render("areaCliente");
});

module.exports = router;
