import React from "react";
import AdvicePage from "./AdvicePage";
import MainPage from "./MainPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div id="content-container">
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route
            path="/advice"
            component={() => (
              <AdvicePage
                props={{
                  id: "AF78D9",
                  question: "How should I continue?",
                  detail: "like seriously"
                }}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
