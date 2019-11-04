// sguzmanm: Why is this on the Views folder??? 

const WebSocket = require("ws");

const MyWSLib = function() {
  const MyWSLib = this || {};
  const clients = [];

  MyWSLib.setupWs = server => {
    const wss = new WebSocket.Server({ server });
    console.log("setting up socket connection");
    wss.on("connection", ws => {
      console.log("connection established");
      clients.push(ws);
    });
  };
  MyWSLib.notifyAll = data => {
    for (let ws of clients) {
      ws.send(data);
    }
  };
  return MyWSLib;
};

module.exports = MyWSLib;
