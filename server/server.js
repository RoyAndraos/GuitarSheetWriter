"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { uuid } = require("uuidv4");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//function to validate email|| checks if theres an @ with a string before it, checks for string after @ and for a . after that string then for a string after the .
const validEmail = (email) => {
  if (!email.includes("@") || !email.includes(".")) {
    return false;
  }
  //get index for . and @ to make sure . comes after @
  const atIndex = email.indexOf("@");
  const lastDotIndex = email.lastIndexOf(".");
  if (lastDotIndex < atIndex) {
    return false;
  }
  return true;
};
const validPassword = (password) => {
  const specialChars = '!@#$%^&*(),.?":{}|<>';
  let hasSpecialChar = false;
  let hasCapitalLetter = false;
  let hasNumber = false;
  for (let i = 0; i < password.length; i++) {
    if (specialChars.includes(password[i])) {
      hasSpecialChar = true;
    } else if (password[i].match(/[A-Z]/)) {
      hasCapitalLetter = true;
    } else if (password[i].match(/\d/)) {
      hasNumber = true;
    }
  }
  return hasSpecialChar && hasCapitalLetter && hasNumber;
};

const addUser = async (req, res) => {
  const { username, fName, lName, email, password, repeat } = req.body;
  const _id = uuid();
  const user = {
    _id: _id,
    username: username,
    fName: fName,
    lName: lName,
    email: email,
    password: password,
    repeat: repeat,
    track_ids: [],
    requests: [],
  };
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("GuitarSheetWriter");
    const existingUsername = await db
      .collection("users")
      .findOne({ username: username });
    const existingEmail = await db
      .collection("users")
      .findOne({ email: email });
    const isEmailValid = validEmail(email);
    if (
      !existingEmail &&
      !existingUsername &&
      isEmailValid &&
      password === repeat
    ) {
      const returnedInfo = {
        track_ids: user.track_ids,
        username: user.username,
        requests: user.requests,
        _id: _id,
      };
      await db.collection("users").insertOne(user);
      res
        .status(200)
        .json({ status: 200, data: returnedInfo, message: "User added" });
    } else if (existingUsername) {
      res.status(404).json({
        status: 404,
        data: username,
        message: "username already in use",
      });
    } else if (existingEmail) {
      res
        .status(404)
        .json({ status: 404, data: email, message: "email already in use" });
    } else if (!isEmailValid) {
      res
        .status(404)
        .json({ status: 404, data: email, message: "invalid email" });
    } else if (!validPassword(password)) {
      res.status(404).json({
        status: 404,
        data: email,
        message:
          "password must contain at least one special character one number and one capitalized letter",
      });
    } else if (password !== repeat) {
      res.status(404).json({
        status: 404,
        data: email,
        message: "passwords are not matching",
      });
    }
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("GuitarSheetWriter");
    const userInfo = await db
      .collection("users")
      .findOne({ username: username });
    if (!userInfo) {
      res.status(404).json({ status: 404, message: "invalid username" });
    } else if (password !== userInfo.password) {
      res.status(404).json({ status: 404, message: "incorrect password" });
    } else if (password === userInfo.password) {
      const returnedInfo = {
        track_ids: userInfo.track_ids,
        username: userInfo.username,
        _id: userInfo._id,
        requests: userInfo.requests,
      };
      res
        .status(200)
        .json({ status: 200, data: returnedInfo, message: "login success" });
    }
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const addTrack = async (req, res) => {
  const track_id = uuid();
  const { track } = req.body;
  track._id = track_id;
  const { currentUser } = req.body;
  if (track.title === "") {
    track.title = "untitled";
  }
  track.author = currentUser;
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("GuitarSheetWriter");
    await db.collection("tracks").insertOne(track);
    const userInfo = await db
      .collection("users")
      .findOne({ username: currentUser });
    let newArray = userInfo.track_ids;
    newArray.push(track_id);

    await db
      .collection("users")
      .updateOne({ username: currentUser }, { $set: { track_ids: newArray } });
    res
      .status(200)
      .json({ status: 200, data: track_id, message: "track saved" });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getProfile = async (req, res) => {
  const username = req.params.username;
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("GuitarSheetWriter");
    const profile = await db
      .collection("users")
      .findOne({ username: username });
    const returnedInfo = {
      track_ids: profile.track_ids,
      username: profile.username,
      _id: profile._id,
      requests: profile.requests,
    };
    res
      .status(200)
      .json({ status: 200, data: returnedInfo, message: "success!" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getTrackInfo = async (req, res) => {
  const track_id = req.params.track_id;
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("GuitarSheetWriter");
    const trackInfo = await db.collection("tracks").findOne({ _id: track_id });
    res.status(200).json({ status: 200, data: trackInfo, message: "success!" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const findUsers = async (req, res) => {
  const searchInput = req.params.username.toLowerCase();
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("GuitarSheetWriter");
    const searchResult = await db.collection("users").find({}).toArray();
    const matchedUsers = searchResult.filter((user) => {
      return user.username.toLowerCase().includes(searchInput);
    });
    res
      .status(200)
      .json({ status: 200, data: matchedUsers, message: "success!" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const sendTrack = async (req, res) => {
  const track_id = req.body.track_id;
  const username = req.body.username;
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("GuitarSheetWriter");
    const receiver = await db
      .collection("users")
      .findOne({ username: username });
    if (
      receiver.track_ids.includes(track_id) === true ||
      receiver.requests.includes(track_id) === true
    ) {
      res
        .status(404)
        .json({ status: 404, message: "user already has the track" });
    } else {
      let newArray = receiver.requests;
      newArray.push(track_id);
      await db
        .collection("users")
        .updateOne({ username: username }, { $set: { requests: newArray } });
      res
        .status(200)
        .json({ status: 200, data: receiver.requests, message: "track sent" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const saveTrack = async (req, res) => {
  const track_id = req.body.track_id;
  const username = req.body.username;
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("GuitarSheetWriter");
    const user = await db.collection("users").findOne({ username: username });
    let newRequestArray = user.requests;
    newRequestArray = user.requests.filter((request) => request !== track_id);
    let newTracksArray = user.track_ids;
    newTracksArray.push(track_id);
    await db
      .collection("users")
      .updateOne(
        { username: username },
        { $set: { requests: newRequestArray, track_ids: newTracksArray } }
      );
    res
      .status(200)
      .json({ status: 200, data: user.track_ids, message: "success!" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const deleteRequest = async (req, res) => {
  const track_id = req.params.track_id;
  const username = req.params.username;
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("GuitarSheetWriter");
    await db
      .collection("users")
      .updateOne({ username: username }, { $pull: { requests: track_id } });
    const user = await db.collection("users").findOne({ username: username });
    res
      .status(200)
      .json({ status: 200, data: user.requests, message: "request deleted" });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};
const deleteTrack = async (req, res) => {
  const track_id = req.params.track_id;
  const username = req.params.username;
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("GuitarSheetWriter");
    await db
      .collection("users")
      .updateOne({ username: username }, { $pull: { track_ids: track_id } });
    const user = await db.collection("users").findOne({ username: username });
    res
      .status(200)
      .json({ status: 200, data: user.track_ids, message: "track deleted" });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = {
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
};
