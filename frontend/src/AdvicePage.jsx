import React, { useState, useEffect } from "react";
import TextAdvice from "./TextAdvice";
import MusicAdvice from "./MusicAdvice";
import MovieAdvice from "./MovieAdvice";
import PoemAdvice from "./PoemAdvice";
import AdviceMenu from "./AdviceMenu";
import { Base64 } from "js-base64";
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
      src: "4RXpgGM7A4Hg7cFBoH5KyF",
      text: ""
    }
  ];
  let question = _prop.question;
  let detail = _prop.detail;
  let [advices, setAdvice] = useState(test_info);
  let [aToken, setAToken] = useState("");

  useEffect(() => {
    /*
    fetch(`data/${props.props.id}`)
      .then(data => JSON.parse(data))
      .then(res => console.log(res));
      
    let url_spotify_api = "https://accounts.spotify.com/api/token";
    let clientid_64 = Base64.encode(
      process.env.REACT_APP_SPOTIFY_CLIENT_ID +
        ":" +
        process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
    );

    fetch(url_spotify_api, {
      body: "grant_type=client_credentials",
      headers: {
        Authorization: "Basic " + clientid_64,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    })
      .catch(err => console.log("err", err))
      .then(res => res.json())
      .then(data => console.log("got data", data));
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

  const changeAToken = token => {
    setAToken(token);
  };

  const renderAdvices = () => {
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
    setAdvice(oldAdvices => [...oldAdvices, advice]);
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
        <AdviceMenu addAdvice={addAdvice} changeAToken={"123"} />
      </div>
    </>
  );
};

export default AdvicePage;
