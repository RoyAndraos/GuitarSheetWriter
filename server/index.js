"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 3000;

express()
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.static("public"))
  .listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
