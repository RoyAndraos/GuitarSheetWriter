"use strict";

const express = require("express");
const morgan = require("morgan");
const { addUser, addSecurity, login } = require("./server");
const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.static("public"))
  .post("/login", login)
  .post("/signUp", addUser)
  .patch("/addSecurity", addSecurity)
  .listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
