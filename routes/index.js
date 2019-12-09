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

router.post("/songsrc", (req, res) => {
  console.log("body", req.body);
  let name = req.body.songUrl.replace(" ", "%20");
  let spot_token = req.body.spottoken;
  let url_1 = `https://api.spotify.com/v1/search?q=${name}&type=track&market=US&limit=1&offset=7`;
  fetch(url_1, {
    headers: {
      Authorization: `Bearer ${spot_token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      console.log("res", res);
      return res.json();
    })
    .then(data => {
      console.log("data", data);
      let src = data.tracks.items[0].id;
      if (src === undefined) {
        res.send("no se encontro");
      } else {
        res.send(src);
      }
    });
});

router.post("/update-like", (req, res) => {
  console.log("like body", req.body);
  myMongoLib.updateLike(req.body);
  res.send("Updating likes");
});

router.post("/post-advice", (req, res) => {
  console.log("en post advice", req.body);
  myMongoLib.postAdvice(req.body);
  res.send("Estoy en router");
});

router.post("/update-problem-like", (req, res) => {
  console.log("problem upvote", req.body);
  myMongoLib.updateProblemLike(req.body);
  res.send("Upvoting Problem");
});

router.post("/post-advice-tag", (req, res) => {
  console.log("tagBody", req.body);
  myMongoLib.postTag(req.body);
  res.send("updatingTags");
});

router.post("/post-advice-rooms", (req, res) => {
  console.log("reqbody", req.body);
  myMongoLib.postProblem(req.body);
});

router.get("/advice-tags", (req, res) => {
  myMongoLib
    .getAdviceTags()
    .then(docs => {
      res.send(docs);
    })
    .catch(err => {
      res.send({ err: true, msg: err });
    });
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

router.get("/advice-room/:adviceId", (req, res) => {
  let adviceId = req.params.adviceId;
  myMongoLib
    .getAdviceRoom(adviceId)
    .then(docs => {
      res.send(docs);
    })
    .catch(err => {
      res.send({ err: true, msg: err });
    });
});

module.exports = router;
