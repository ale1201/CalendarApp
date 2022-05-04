let jwtOLD = require("jsonwebtoken");
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");
const config = require("./config.js");

function checkToken(req, res, next) {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
      jwtOLD.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: "Token is not valid",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  } else {
    return res.json({
      success: false,
      message: "ERROR: No token provided",
    });
  }
}

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-ewgcs0ih.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "http://localhost:5000",
  issuer: "https://dev-ewgcs0ih.us.auth0.com/",
  algorithms: ["RS256"],
});

module.exports = {
  checkToken: checkToken,
  jwtCheck: jwtCheck,
};
