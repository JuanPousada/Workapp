var express = require("express");
var router = express.Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const fs = require("fs");

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Barra0programador",
  database: "workappdb",
});

connection.connect();

router.get("/", function (req, res, next) {
  connection.query("SELECT * FROM cursos", function (error, results, fields) {
    if (error) throw error;
    res.render("cursos", { data: results });
  });
});

//Listado

router.get("/listado", function (req, res, next) {
  connection.query("SELECT * FROM cursos", function (error, results, fields) {
    if (error) throw error;
    res.render("listado", { data: results });
  });
});

router.get("/alta", function (req, res, next) {
  res.render("formularioAlta");
});

router.post("/alta", upload.single("imagen"), async function (req, res, next) {
  let sentencia = `insert into cursos(curso, imagen, descripcion, duracion, modalidad, lugar, precio) values ("${req.body.curso}","/images/cursos/${req.file.originalname}","${req.body.descripcion}","${req.body.duracion}","${req.body.modalidad}","${req.body.lugar}","${req.body.precio}")`;

  let results = await connection.query(sentencia);

  fs.createReadStream("./uploads/" + req.file.filename).pipe(
    fs.createWriteStream("./public/images/cursos/" + req.file.originalname),
    function (error) {}
  );

  res.render("finalizado", { mensaje: "Curso Ingresado Correctamente" });
});

module.exports = router;
