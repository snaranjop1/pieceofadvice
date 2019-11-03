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
        console.log("Connected to server");

        const db = client.db(dbName);
        const testCol = db.collection("advice_room");

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

      let id = body.id;
      let likes = body.likes;
      console.log("new like value", body);

      testCol
        .updateOne(
          { _id: ObjectId(id), "advices._id": body.advice_id },
          { $set: { "advices.$.likes": likes } }
        )
        .then(res => {});
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

      let id = body.id;
      let advice = body.advice;
      console.log("advice to be added", advice);

      testCol.updateOne(
        { _id: ObjectId(id) },
        { $addToSet: { advices: advice } }
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

  MyMongoLib.listenToChanges = cbk => {
    client.connect(function(err, client) {
      if (err !== null) {
        throw err;
      }
      console.log("Connected to server");

      const db = client.db(dbName);
      const testCol = db.collection("advice_room");

      const csCursor = testCol.watch();
      csCursor.on("change", data => {
        console.log("changes were made");
        MyMongoLib.getAdviceRooms().then(data => cbk(JSON.stringify(data)));
      });
    });
  };
  return MyMongoLib;
};

module.exports = MyMongoLib;
