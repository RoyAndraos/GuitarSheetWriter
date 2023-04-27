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
  const user = {
    username: username,
    fName: fName,
    lName: lName,
    email: email,
    password: password,
    repeat: repeat,
    track_ids: [],
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
        email: user.email,
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

const addSecurity = async (req, res) => {
  const { security, formData } = req.body;
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("GuitarSheetWriter");
    await db
      .collection("users")
      .updateOne(
        { email: formData.email },
        { $set: { question: security.question, answer: security.answer } }
      );
    res.status(200).json({ status: 200, message: "security added!" });
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
        email: userInfo.email,
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
    res.status(200).json({ status: 200, data:track_id ,message: "track saved" });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500,  message: err.message });
  }
};

module.exports = { addUser, addSecurity, login, addTrack };
