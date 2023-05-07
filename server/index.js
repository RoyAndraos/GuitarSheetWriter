"use strict";

const express = require("express");
const morgan = require("morgan");
const {
  addUser,
  login,
  addTrack,
  getProfile,
  getTrackInfo,
  findUsers,
  sendTrack,
  saveTrack,
  deleteTrack,
  deleteRequest,
  updateTrack,
} = require("./server");
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
  .get("/profile/:username", getProfile)
  .get("/trackInfo/:track_id", getTrackInfo)
  .get("/search/:username", findUsers)
  .post("/saveTrack", saveTrack)
  .post("/sendTrack", sendTrack)
  .post("/login", login)
  .post("/signUp", addUser)
  .post("/addTrack", addTrack)
  .post("/updateTrack", updateTrack)
  .delete("/deleteTrack/:track_id/:username", deleteTrack)
  .delete("/deleteRequest/:track_id/:username", deleteRequest)
  .listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
