import React, { useState, useEffect } from "react";
import AdvicePage from "./AdvicePage";
import Navbar from "./Navbar";

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
    fetch("advice-rooms")
      .then(res => res.json())
      .then(data => {
        setAdvices(data);
        console.log("advices", advices);
      });
  }, []);

  return (
    <>
      <Navbar />
      <AdvicePage props={advices} />
    </>
  );
}

export default App;
