import React, { useState, useEffect } from "react";
import AdvicePage from "./AdvicePage";
import MainPage from "./MainPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  let default_info = [
    {
      id: "000",
      err: "err",
      question: "",
      detail: "",
      items: []
    }
  ];
  let [advices, setAdvices] = useState(default_info);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");

    ws.onopen = () => {
      ws.onmessage = msg => {
        setAdvices(JSON.parse(msg.data));
      };
    };

    fetch("advice-rooms")
      .then(res => res.json())
      .then(data => {
        setAdvices(data);
        console.log("advices", advices);
      });
  }, []);

  return (
    <Router>
      <div id="content-container">
        <Switch>
          <Route
            path="/"
            exact
            component={() => <MainPage props={advices} />}
          />
          <Route
            path="/advice"
            exact
            component={() => <AdvicePage props={advices} />}
          />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
