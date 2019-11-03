let base64 = require("js-base64").Base64;
let express = require("express");
let router = express.Router();
let fetch = require("node-fetch");
require("dotenv").config();

const MyMongoLib = require("../views/MyMongoLib");
const myMongoLib = MyMongoLib();

/* GET home page. */
router.get("/test", function(req, res) {
  res.json({ name: "sergio" });
});

router.get("/spotify-token", (req, res) => {
  let url_spotify_api = "https://accounts.spotify.com/api/token";
  let clientid_64 = base64.encode(
    process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
  );
  fetch(url_spotify_api, {
    body: "grant_type=client_credentials",
    headers: {
      Authorization: "Basic " + clientid_64,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  })
    .catch(err => console.log("err", err))
    .then(res => res.json())
    .then(data => {
      res.send(data);
      res.end();
    });
});

router.post("/update-like", (req, res) => {
  myMongoLib.updateLike(req.body);
  res.send("Updating likes");
});

router.post("/post-advice", (req, res) => {
  myMongoLib.postAdvice(req.body);
  res.send("Estoy en router");
});

router.get("/advice-rooms", (req, res) => {
  myMongoLib
    .getAdviceRooms()
    .then(docs => {
      res.send(docs);
    })
    .catch(err => {
      res.send({ err: true, msg: err });
    });
});

module.exports = router;
