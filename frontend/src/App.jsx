import React from "react";
import AdvicePage from "./AdvicePage";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <Navbar />
      <AdvicePage
        props={{
          id: "AF78D9",
          question: "How should I continue?",
          detail: "like seriously"
        }}
      />
    </>
  );
}

export default App;
