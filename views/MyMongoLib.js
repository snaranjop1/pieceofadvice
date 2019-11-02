const MongoClient = require("mongodb").MongoClient;

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

  MyMongoLib.listenToChanges = () => {
    client.connect(function(err, client) {
      if (err !== null) {
        throw err;
      }
      console.log("Connected to server");

      const db = client.db(dbName);
      const testCol = db.collection("advice_room");

      const csCursor = testCol.watch();
      csCursor.on("change", data => {
        console.log("changed!", data);
      });
    });
  };
  return MyMongoLib;
};

module.exports = MyMongoLib;
