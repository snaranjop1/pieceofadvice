import React, { useState, useEffect } from "react";
import TextAdvice from "./TextAdvice";
import MusicAdvice from "./MusicAdvice";
import MovieAdvice from "./MovieAdvice";
import PoemAdvice from "./PoemAdvice";
import AdviceMenu from "./AdviceMenu";

import "./AdvicePage.css";

const AdvicePage = props => {
  let _prop = props.props[0];
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
      src: "4RXpgGM7A4Hg7cFBoH5KyF",
      text: ""
    }
  ];
  let question = _prop.question;
  let detail = _prop.detail;
  let [advices, setAdvice] = useState(_prop.advices);
  let [spot_token, setToken] = useState("");

  useEffect(() => {
    fetch("spotify-token")
      .then(res => res.json())
      .then(data => {
        setToken(data.access_token);
      });
  }, []);

  useEffect(() => {
    logAdv();
  }, [_prop]);

  const returnMusic = (_src, _text, _date) => {
    return (
      <MusicAdvice
        props={{
          src: _src,
          user: "anonymous",
          text: _text,
          date: _date,
          height: "80"
        }}
      />
    );
  };

  const returnText = (_text, _date) => {
    return <TextAdvice props={{ text: _text, _id: "AXCHJS", date: _date }} />;
  };

  const returnMovie = (_info, _text, _date) => {
    return (
      <MovieAdvice
        props={{
          info: _info,
          user: "gregorioospina",
          text: _text,
          date: _date,
          height: "80"
        }}
      />
    );
  };

  const returnPoem = (_info, _text, _date) => {
    return (
      <PoemAdvice
        props={{
          info: _info,
          user: "gregorioospina",
          text: _text,
          date: _date,
          height: "80"
        }}
      />
    );
  };

  const renderAdvices = () => {
    if (advices === undefined) {
      return;
    }
    console.log("problema", advices);
    return advices.map(advice => {
      return advice.type === "text"
        ? returnText(advice.text, advice.date)
        : advice.type === "movie"
        ? returnMovie(advice.info, advice.text, advice.date)
        : advice.type === "poem"
        ? returnPoem(advice.info, advice.text, advice.date)
        : returnMusic(advice.src, advice.text, advice.date);
    });
  };

  const addAdvice = advice => {
    console.log("entro", _prop.advices);
    if (_prop.advices.status !== undefined) {
      let advcs = [];
      advcs.push(advice);
      setAdvice(advcs);
    } else {
      setAdvice(advices => [...advices, advice]);
    }
  };

  const logAdv = () => {
    if (_prop.advices !== undefined) {
      setAdvice(_prop.advices);
    }
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
        <AdviceMenu addAdvice={addAdvice} token={spot_token} />
      </div>
    </>
  );
};

export default AdvicePage;
