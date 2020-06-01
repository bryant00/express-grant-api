require("dotenv").config();
var express = require("express");
var session = require("express-session");
var parser = require("body-parser");
var grant = require("grant-express");
var config = require("./grant.config.js");
var morgan = require("morgan");
var cors = require("cors");

const PORT = process.env.PORT || 3000;
var callback = encodeURIComponent("http://localhost:3000/" + "hello");
console.log(callback);
express()
  .use(morgan("combined"))
  .use(cors())
  .use(
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: true,
      resave: true,
    })
  )
  // <form action="/connect/linkedin" method="POST">
  .use(parser.urlencoded({ extended: true }))
  .use(grant(config))
  .get("/", (req, res) => {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(`
      <!DOCTYPE html>
      <form action="/connect/linkedin?callback=${callback}" method="POST">
        <p>Grant read/write access to:</p>
        <button>Login</button>
      </form>
    `);
  })
  .get("/hello", (req, res) => {
    var { access_token } = req.session.grant.response;
    console.log(access_token);
    res.end("nice!");
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
