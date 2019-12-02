import React, { useState, useEffect } from "react";
import AdvicePage from "./AdvicePage";
import MainPage from "./MainPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  let default_info = [
    {
      id: "000",
      question: "Test 1",
      detail:
        "cool description cool description cool description cool description cool description cool description ",
      items: [],
      tags: ["Grego"]
    },
    {
      id: "000",
      question: "Test 2",
      detail: "cool description",
      items: [],
      tags: ["Grego", "1"]
    },
    {
      id: "000",
      question: "Test 3",
      detail: "Cool description cool description cool description ",
      items: [],
      tags: ["Grego", "2"]
    },
    {
      id: "000",
      question: "Test 4",
      detail:
        "cool description cool description cool description cool description",
      items: [],
      tags: ["1", "2"]
    }
  ];
  let [advices, setAdvices] = useState(default_info);
  let [advice_id, setId] = useState();
  let [userInfo, setUserInfo] = useState({});
  let [logged, setLogged] = useState(false);

  useEffect(() => {
    let HOST = window.location.origin.replace(/^http/, "ws");
    let ws = new WebSocket(HOST);

    ws.onopen = () => {
      ws.onmessage = msg => {
        setAdvices(JSON.parse(msg.data));
      };
    };

    fetch("advice-rooms")
      .then(res => res.json())
      .then(data => {
        setAdvices(data);
      });
  }, []);

  const handleUserInfo = info => {
    setUserInfo(info);
  };

  const handleLoggedIn = status => {
    setLogged(status);
  };

  const setAdviceId = _id => {
    setId(_id);
    console.log(advice_id);
  };

  return (
    <Router>
      <div id="content-container">
        <Switch>
          <Route
            path="/"
            exact
            component={() => (
              <MainPage
                setAdviceId={setAdviceId}
                problems={advices}
                logged={logged}
                userInfo={userInfo}
                handleLogged_App={handleLoggedIn}
                handleUserInfo_App={handleUserInfo}
              />
            )}
          />
          <Route
            path="/advice"
            exact
            component={() => (
              <AdvicePage
                problems={advices}
                advice_id={advice_id}
                logged={logged}
                userInfo={userInfo}
                handleLogged_App={handleLoggedIn}
                handleUserInfo_App={handleUserInfo}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
