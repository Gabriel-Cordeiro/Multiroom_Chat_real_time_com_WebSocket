var express = require("express");
var consign = require("consign");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");

var app = express();

/*Configurar EJS*/
app.set("view engine", "ejs");
app.set("views", "./app/views");

/*Configurar o middleware express.static */
app.use(express.static("./app/public"));

/*configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));

/*configurar o middleware express-validator*/
app.use(expressValidator());

/* efetua o autoload das rotas, models e controllers para o app*/
consign()
    .include("app/routes")
    .then("app/models")
    .then("app/controllers")
    .into(app);

module.exports = app;