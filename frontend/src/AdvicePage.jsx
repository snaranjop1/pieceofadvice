import React, { useState, useEffect } from "react";
import Navbar2 from "./Navbar2";
import TextAdvice from "./TextAdvice";
import MusicAdvice from "./MusicAdvice";
import MovieAdvice from "./MovieAdvice";
import PoemAdvice from "./PoemAdvice";
import AdviceMenu from "./AdviceMenu";

import "./AdvicePage.css";

const AdvicePage = props => {
  let [_prop, setProp] = useState({});
  console.log("properinos", props.props);
  let advice_id = props.advice_id;
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
    setProp(filterAdvices());
  }, []);

  useEffect(() => {
    logAdv();
  }, [_prop]);

  const filterAdvices = () => {
    let x = props.problems.filter(adv => {
      if (adv._id === advice_id) {
        return adv;
      }
    })[0];
    return x;
  };

  const postAdvice = _advice => {
    let bod = {
      advice: _advice,
      id: _prop._id
    };

    fetch("post-advice", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bod)
    }).then(res => console.log(res));
  };

  const updateLikes = (adv_id, _likes) => {
    let bod = {
      advice_id: adv_id,
      likes: _likes,
      id: _prop.id
    };
    console.log("bodbod", bod);
    fetch("update-like", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bod)
    }).then(res => {});
  };

  const returnMusic = (_src, _text, _date, _id, _likes) => {
    return (
      <MusicAdvice
        updateLikes={updateLikes}
        props={{
          src: _src,
          user: "anonymous",
          text: _text,
          date: _date,
          height: "80",
          id: _id,
          likes: _likes
        }}
      />
    );
  };

  const returnText = (_text, _date, _id, _likes) => {
    return (
      <TextAdvice
        updateLikes={updateLikes}
        props={{
          text: _text,
          date: _date,
          id: _id,
          likes: _likes
        }}
      />
    );
  };

  const returnMovie = (_info, _text, _date, _id, _likes) => {
    return (
      <MovieAdvice
        updateLikes={updateLikes}
        props={{
          info: _info,
          user: "gregorioospina",
          text: _text,
          date: _date,
          height: "80",
          id: _id,
          likes: _likes
        }}
      />
    );
  };

  const returnPoem = (_info, _text, _date, _id, _likes) => {
    return (
      <PoemAdvice
        updateLikes={updateLikes}
        props={{
          info: _info,
          user: "gregorioospina",
          text: _text,
          date: _date,
          height: "80",
          id: _id,
          likes: _likes
        }}
      />
    );
  };

  const renderAdvices = () => {
    if (advices === undefined) {
      return;
    }
    return advices.map(advice => {
      return advice.type === "text"
        ? returnText(advice.text, advice.date, advice.id, advice.likes)
        : advice.type === "movie"
        ? returnMovie(
            advice.info,
            advice.text,
            advice.date,
            advice.id,
            advice.likes
          )
        : advice.type === "poem"
        ? returnPoem(
            advice.info,
            advice.text,
            advice.date,
            advice.id,
            advice.likes
          )
        : returnMusic(
            advice.src,
            advice.text,
            advice.date,
            advice.id,
            advice.likes
          );
    });
  };

  const addAdvice = advice => {
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
      <div>
        <div className="questionbanner text-center">
          <Navbar2 />
          <h1 id="question"> {question} </h1>
          <h3 id="detail"> {detail} </h3>
        </div>
        <div class="card-columns container">{renderAdvices()}</div>
      </div>
      <div id="menu-container">
        <AdviceMenu
          postAdvice={postAdvice}
          addAdvice={addAdvice}
          token={spot_token}
        />
      </div>
    </>
  );
};

export default AdvicePage;
