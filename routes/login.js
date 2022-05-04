const express = require("express");
const router = express.Router();
var cors = require('cors')

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

let HandlerGenerator = require("../jwt/handlegenerator");
let middleware = require("../jwt/middleware");

HandlerGenerator = new HandlerGenerator();

router.get("/", middleware.checkToken, HandlerGenerator.index);

router.post("/login", HandlerGenerator.login);

module.exports = router;
