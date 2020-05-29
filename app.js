require("dotenv").config();
var express = require("express");
var session = require("express-session");
var parser = require("body-parser");
var grant = require("grant-express");
var config = require("./grant.config.js");
var morgan = require("morgan");

express()
  .use(morgan("combined"))
  .use(
    session({ secret: process.env.SEC, saveUninitialized: true, resave: true })
  )
  .use(parser.urlencoded({ extended: true }))
  .use(grant(config))
  .get("/login", (req, res) => {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(`
      <!DOCTYPE html>
      <form action="/connect/linkedin" method="POST">
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
  .listen(3000);
