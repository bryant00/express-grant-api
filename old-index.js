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
  .use(parser.urlencoded({ extended: true }))
  .use(grant(config))
  .get("/", (req, res) => {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(`
      <!DOCTYPE html>
      <p>Grant read/write access to:</p>
      <form action="/connect/linkedin/" method="POST">

        <button>Login Here</button>
      </form>
      <form action="/connect/linkedin/ext" method="POST">
        <button>EXT Login Here</button>
      </form>
    `);
  })
  .get("/hello", (req, res) => {
    // var { access_token } = req.session.grant.response;
    // console.log(access_token);
    let message = "default";
    if (req.session.grant) {
      message = JSON.stringify(req.session.grant);
    }
    // var grantreq = JSON.stringify(req.session.grant);

    res.end(`
      <!DOCTYPE html>
        <a href="/">Home</a>
        <div style="width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
        max-width: 1140px;">${message}
        </div>

    `);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
