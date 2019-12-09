const MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;

const MyMongoLib = function() {
  const MyMongoLib = this || {};
  const url = process.env.MONGO_URL || "mongodb://localhost:27017";
  const dbName = "pieceofadvice_db";

  const client = new MongoClient(url);

  MyMongoLib.getAdviceRooms = () =>
    new Promise((resolve, reject) => {
      client.connect(function(err, client) {
        if (err !== null) {
          reject(err);
          return;
        }
        console.log("Retrieving problems");

        const db = client.db(dbName);
        const testCol = db.collection("advice_room");
        return testCol
          .find({})
          .toArray()
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.getAdviceRoom = adviceid =>
    new Promise((resolve, reject) => {
      client.connect(function(err, client) {
        if (err !== null) {
          reject(err);
          return;
        }
        console.log("Retrieving problem", adviceid);

        const db = client.db(dbName);
        const testCol = db.collection("advice_room");

        return testCol
          .find({ _id: ObjectId(adviceid) })
          .toArray()
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.getAdviceTags = () =>
    new Promise((resolve, reject) => {
      client.connect(function(err, client) {
        if (err !== null) {
          reject(err);
          return;
        }
        console.log("Retrieving tags");

        const db = client.db(dbName);
        const testCol = db.collection("advice_tags");
        return testCol
          .find({})
          .toArray()
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.updateLike = body => {
    client.connect(function(err, client) {
      if (err !== null) {
        throw err;
      }
      console.log("Connected to server");

      const db = client.db(dbName);
      const testCol = db.collection("advice_room");

      let id = body.advice_id;
      testCol
        .updateOne(
          { _id: ObjectId(id), "advices.id": body.problem_id },
          { $inc: { "advices.$.likes": 1 } }
        )
        .then(() => {});
    });
  };

  MyMongoLib.postAdvice = body => {
    client.connect(function(err, client) {
      if (err !== null) {
        throw err;
      }
      console.log("Connected to server");

      const db = client.db(dbName);
      const testCol = db.collection("advice_room");

      let id = body.adviceid;
      delete body.adviceid;

      testCol.updateOne(
        { _id: ObjectId(id) },
        { $addToSet: { advices: body } }
      );
    });
  };

  MyMongoLib.postProblem = body => {
    client.connect(function(err, client) {
      if (err !== null) {
        throw err;
      }
      console.log("Connected to server");

      const db = client.db(dbName);
      const testCol = db.collection("advice_room");

      testCol.insertOne(body);
    });
  };

  MyMongoLib.updateProblemLike = body => {
    client.connect(function(err, client) {
      if (err !== null) {
        throw err;
      }

      const db = client.db(dbName);
      const testCol = db.collection("advice_room");
      let id = body.id;
      let inc = body.inc === false ? -1 : 1;

      console.log("Upvoting post", id);

      testCol.updateOne({ _id: ObjectId(id) }, { $inc: { likes: inc } });
    });
  };

  MyMongoLib.postTag = _tags => {
    client.connect(function(err, client) {
      if (err !== null) {
        throw err;
      }
      console.log("Posting new tag", _tags);

      const db = client.db(dbName);
      const testCol = db.collection("advice_tags");

      testCol.updateOne({}, { $set: { tags: _tags } });
    });
  };

  MyMongoLib.listenToChanges = cbk => {
    client.connect(function(err, client) {
      if (err !== null) {
        throw err;
      }
      console.log("Connected to server");

      const db = client.db(dbName);
      const testCol = db.collection("advice_room");
      // const tagCol = db.collection("advice_tags");

      const csCursor = testCol.watch();
      // const tagCursor = tagCol.watch();

      // tagCursor.on("change", data => {
      //   console.log("new tag", data);
      //   MyMongoLib.getAdviceTags().then(data => cbk(JSON.stringify(data)));
      // });

      csCursor.on("change", data => {
        MyMongoLib.getAdviceRooms().then(data => cbk(JSON.stringify(data)));
      });
    });
  };
  return MyMongoLib;
};

module.exports = MyMongoLib;
