import React, { useState, useEffect } from "react";
import Navbar2 from "./Navbar2";
import Advice from "./Advice";
import AdviceModal from "./AdviceModal";
import uuid from "uuid/v1";
import "./AdvicePage.css";

const AdvicePage = props => {
  let [problem, setProblem] = useState({});
  let [advices, setAdvice] = useState([]);
  let [spot_token, setToken] = useState("");
  let [loaded, setLoaded] = useState(false);
  let [userInfo, setUserInfo] = useState(props.userInfo);
  let [logged, setLogged] = useState(props.logged);
  let [upvoted, setUpvoted] = useState(false);

  //Future post states
  let [text, setText] = useState("");
  let [movie, setMovie] = useState(false);
  let [movieName, setMovieName] = useState("");
  let [movieInfo, setMovieInfo] = useState({});
  let [anonymous, setAnonymous] = useState(false);
  let adviceid = props.match.params.adviceId;

  const handleAdviceChange = React.useCallback(evt => {
    setText(evt.target.value);
  });

  const handleMovieChange = React.useCallback(evt => {
    setMovie(true);
    setMovieName(evt.target.value);
  });

  const cleanSlate = React.useCallback(() => {
    setAnonymous(false);
    setMovie(false);
    setMovieName("");
    setText("");
  });

  const handleAnonymous = React.useCallback(() => {
    setAnonymous(!anonymous);
  }, [anonymous]);

  // const getSongSrc = () => {
  //   let src = "-2";
  //   let body = {
  //     songUrl: songUrl,
  //     spottoken: spot_token
  //   };

  //   return fetch("/songsrc", {
  //     method: "post",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(body)
  //   })
  //     .then(res => {
  //       return res.text();
  //     })
  //     .then(dat => {
  //       src = dat;
  //       return src;
  //     });
  // };

  const fetchMovie = name => {
    let template = "http://www.omdbapi.com/?apikey=6f39c21a&";
    let url = "";
    if (name === "") {
      alert("You must type the name");
      return;
    } else {
      url = `${template}t=${name}`;
    }
    return fetch(url)
      .then(res => res.json())
      .catch(err => {
        console.log(err);
      })
      .then(data => {
        let err = data.Error;
        if (err === undefined) {
          console.log("data", data);
          cleanSlate();
          return data;
        } else {
          console.log(err);
          cleanSlate();
        }
      });
  };

  const addAdvice = async author => {
    let src = "-1";
    let minfo = {};
    if (movie) {
      minfo = await fetchMovie(movieName);
    }

    let objectid = uuid();
    let advice = {
      id: objectid,
      adviceid: adviceid,
      text: text,
      author: author,
      song: src,
      minfo: minfo,
      likes: 1
    };

    console.log("advice", advice);

    fetch("/post-advice", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(advice)
    }).then(() => cleanSlate());
  };

  //

  useEffect(() => {
    fetch(`/advice-room/${props.match.params.adviceId}`)
      .then(res => res.json())
      .then(data => {
        setProblem(data[0]);
        setAdvice(data[0].advices);
        setLoaded(true);
      });
  }, []);

  const handleLike = (problemid, adviceid) => {
    let body = {
      advice_id: adviceid,
      problem_id: problemid
    };
    fetch("/update-like", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).then(() => {});
  };

  const handleUpvote = () => {
    let up = !upvoted;
    let body = {
      id: adviceid,
      inc: up
    };
    fetch("/update-problem-like", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).then(() => {
      setUpvoted(!upvoted);
    });
  };

  const handleUserInfoChange = (info, status) => {
    setLogged(status);
    setUserInfo(info);
    props.handleUserInfo_App(info);
    props.handleLogged_App(status);
  };

  const renderAdvices = () => {
    let advicesSorted = advices.sort((a, b) =>
      a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : -1
    );
    return advicesSorted.map((adv, index) => {
      return (
        <Advice
          key={adviceid + "-" + index}
          text={adv.text}
          author={adv.author}
          likes={adv.likes}
          minfo={adv.minfo}
          adviceid={adviceid}
          id={adv.id}
          handleLike={handleLike}
        ></Advice>
      );
    });
  };

  const loadedRender = () => {
    if (loaded === false) {
      return (
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="card shadow" id="ap-problem-card">
            <div className="card-body">
              <h1 className="card-title" id="ap-problem-card-title">
                {problem.question}
              </h1>
              <div className="row">
                <div className="col-lg-8" id="ap-problem-card-detail">
                  {problem.detail}
                </div>
                <div className="col-lg-4" id="ap-problem-card-data">
                  <div className="row">
                    <button className="btn" id="ap-problem-card-likeicon">
                      <i className="fas fa-star fa-2x"></i>
                    </button>
                    <p id="ap-problem-card-likes">{problem.likes}</p>
                  </div>
                </div>
              </div>
              <div className="row text-center">
                <div className="col-lg-6">
                  <button
                    className="btn"
                    id="give-advice-btn"
                    data-toggle="modal"
                    data-target="#exampleModal2"
                  >
                    Give Advice
                  </button>
                </div>
                <div className="col-lg-6">
                  <button
                    className="btn"
                    id="recomend-it-btn"
                    onClick={handleUpvote}
                  >
                    Recomend it
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card-columns">{renderAdvices()}</div>
          <hr />
          <footer>
            <div className="container" id="footer">
              <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                  <p className="copyright text-muted">
                    Copyright &copy; Pieceofadvice 2019
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      );
    }
  };

  return (
    <>
      <div>
        <div className="problem.questionbanner text-center">
          <Navbar2 />
          {loadedRender()}
        </div>
        <div
          className="modal fade"
          id="exampleModal2"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <AdviceModal
              logged={logged}
              userInfo={userInfo}
              userInfo={userInfo}
              adviceid={adviceid}
              addAdvice={addAdvice}
              handleUserInfoChange={handleUserInfoChange}
              handleAdviceChange={handleAdviceChange}
              handleMovieChange={handleMovieChange}
              handleAnonymous={handleAnonymous}
              spot_token={spot_token}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvicePage;
