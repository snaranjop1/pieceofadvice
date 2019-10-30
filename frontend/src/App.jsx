import React from "react";
import TextAdvice from "./TextAdvice";
import MusicAdvice from "./MusicAdvice";
import MovieAdvice from "./MovieAdvice";

function App() {
  return (
    <div>
      <h1>Welcome to piece of advice</h1>
      <div>
        <TextAdvice props={{ text: "hola a todos", _id: "AXCHJS" }} />
      </div>
      <div>
        <MusicAdvice
          props={{
            src: "https://open.spotify.com/embed/track/6rPO02ozF3bM7NnOV4h6s2",
            user: "gregorioospina",
            text: "",
            date: "12/12/2012",
            height: "80"
          }}
        />
      </div>
      <div>
        <MovieAdvice
          props={{
            src: "https://open.spotify.com/embed/track/6rPO02ozF3bM7NnOV4h6s2",
            user: "gregorioospina",
            text: "",
            date: "12/12/2012",
            height: "80"
          }}
        />
      </div>
    </div>
  );
}

export default App;
