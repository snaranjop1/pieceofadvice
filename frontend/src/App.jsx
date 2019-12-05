import React, { useState, useEffect } from "react";
import AdvicePage from "./AdvicePage";
import MainPage from "./MainPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  let [advices, setAdvices] = useState([]);
  let [tags, setTags] = useState([]);
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
        setAdvices(data.reverse());
      });
    fetch("advice-tags")
      .then(res => res.json())
      .then(data => {
        setTags(data[0].tags);
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
                tags={tags}
                userInfo={userInfo}
                handleLogged_App={handleLoggedIn}
                handleUserInfo_App={handleUserInfo}
              />
            )}
          />
          <Route
            path="/advice/:adviceId"
            component={p_props => (
              <AdvicePage
                problems={advices}
                logged={logged}
                userInfo={userInfo}
                handleLogged_App={handleLoggedIn}
                handleUserInfo_App={handleUserInfo}
                {...p_props}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
