import React, { useState, useEffect } from "react";
import TextAdvice from "./TextAdvice";
import MusicAdvice from "./MusicAdvice";
import MovieAdvice from "./MovieAdvice";
import PoemAdvice from "./PoemAdvice";
import AdviceMenu from "./AdviceMenu";
import "./AdvicePage.css";

const AdvicePage = props => {
  let _prop = props.props;
  let test_info = [
    {
      type: "poem",
      info: {
        title: "Ozymandias",
        author: "Percy Bysshe Shelley",
        lines: [
          "I met a traveller from an antique land",
          'Who said: "Two vast and trunkless legs of stone',
          "Stand in the desert. Near them on the sand,",
          "Half sunk, a shattered visage lies, whose frown",
          "And wrinkled lip and sneer of cold command",
          "Tell that its sculptor well those passions read",
          "Which yet survive, stamped on these lifeless things,",
          "The hand that mocked them and the heart that fed.",
          "And on the pedestal these words appear:",
          "'My name is Ozymandias, King of Kings:",
          "Look on my works, ye mighty, and despair!'",
          "Nothing beside remains. Round the decay",
          "Of that colossal wreck, boundless and bare,",
          'The lone and level sands stretch far away".'
        ],
        linecount: 14
      },
      text: "poem poem poem poem"
    },
    {
      type: "movie",
      info: {
        Poster:
          "https://m.media-amazon.com/images/M/MV5BMTQwMDA5MDY1MV5BMl5BanBnXkFtZTcwMDI2NDIyMQ@@._V1_SX300.jpg",
        Year: "2001",
        Plot:
          " Helo all Beautiful and powerful Roman General Eroticus vows revenge",
        /*  "Beautiful and powerful Roman General Eroticus vows revenge after being enslaved by Dickus Gladiator.", */
        Title: "Gladiator Eroticvs: The Lesbian Warriors"
      },
      text: "movie movie movie"
    },
    {
      type: "text",
      text: "text text etx text etxte text"
    },
    {
      type: "music",
      src: "https://open.spotify.com/embed/track/3TIfpDj9FhrM4ejeXk4Q01",
      text: "music music music miusic"
    }
  ];
  let question = _prop.question;
  let detail = _prop.detail;
  let [advices, setAdvice] = useState(test_info);

  useEffect(() => {
    /*
    fetch(`data/${props.props.id}`)
      .then(data => JSON.parse(data))
      .then(res => console.log(res));
      */
  });

  const returnMusic = (_src, _text) => {
    return (
      <MusicAdvice
        props={{
          src: _src,
          user: "anonymous",
          text: _text,
          date: "12/12/2012",
          height: "80"
        }}
      />
    );
  };

  const returnText = _text => {
    return <TextAdvice props={{ text: _text, _id: "AXCHJS" }} />;
  };

  const returnMovie = (_info, _text) => {
    return (
      <MovieAdvice
        props={{
          info: _info,
          user: "gregorioospina",
          text: _text,
          date: "12/12/2012",
          height: "80"
        }}
      />
    );
  };

  const returnPoem = (_info, _text) => {
    return (
      <PoemAdvice
        props={{
          info: _info,
          user: "gregorioospina",
          text: _text,
          date: "12/12/2012",
          height: "80"
        }}
      />
    );
  };

  const renderAdvices = () => {
    return advices.map(advice => {
      return advice.type === "text"
        ? returnText(advice.text)
        : advice.type === "movie"
        ? returnMovie(advice.info, advice.text)
        : advice.type === "poem"
        ? returnPoem(advice.info, advice.text)
        : returnMusic(advice.src, advice.text);
    });
  };

  return (
    <>
      <div className="container">
        <div className="text-center question-banner">
          <h1 id="question"> {question} </h1>
          <h3 id="detail"> {detail} </h3>
        </div>
        <div class="card-columns">{renderAdvices()}</div>
      </div>
      <div id="menu-container">
        <AdviceMenu />
      </div>
    </>
  );
};

export default AdvicePage;
