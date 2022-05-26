var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");


var indexRouter = require('./routes/login');
const frontDomain = "http://localhost:3000";

let usuarioRouter = require("./routes/routerUsuario");
let actividadRouter = require("./routes/routerActividad");

const app = express();

var cors = {
    origin: [
      frontDomain,
      "18.232.225.224",
      "34.233.19.82",
      "52.204.128.250",
      "3.132.201.78",
      "3.19.44.88",
      "3.20.244.231",
    ],
  };
  
  app.all("*", function (req, res, next) {
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type,Authorization ,Accept",
    );
    let origin = req.headers.origin;
    if (cors.origin.indexOf(origin) >= 0) {
      res.header("Access-Control-Allow-Origin", origin);
    } else {
      res.header("Access-Control-Allow-Origin", frontDomain);
    }
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Expose-Headers", "Authorization");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type, Authorization",
    );
  
    next();
  });
  //app.use(cors());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client/public")));


app.use('/api', indexRouter);
app.use("/api/usuario", usuarioRouter);
app.use("/api/actividad", actividadRouter);


module.exports = app;
