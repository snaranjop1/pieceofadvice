import React, { useState, useEffect } from "react";
import Navbar2 from "./Navbar2";
import Advice from "./Advice";
import AdviceModal from "./AdviceModal";
import "./AdvicePage.css";

const AdvicePage = props => {
  let [userInfo, setUserInfo] = useState(props.userInfo);
  let [problem, setProblem] = useState({});
  let [advices, setAdvice] = useState([]);
  let [spot_token, setToken] = useState("");
  let [loaded, setLoaded] = useState(false);
  let adviceid = props.match.params.adviceId;

  useEffect(() => {
    fetch("spotify-token")
      .then(res => res.json())
      .then(data => {
        setToken(data.access_token);
      });
    fetch(`/advice-room/${props.match.params.adviceId}`)
      .then(res => res.json())
      .then(data => {
        console.log("data", data);
        setProblem(data[0]);
        setAdvice(data[0].advices);
        setLoaded(true);
      });
  }, []);

  const postAdvice = advice => {
    console.log("advice", advice);
    fetch("/post-advice", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(advice)
    }).then(() => {});
  };

  const handleLike = (problemid, adviceid) => {
    let body = {
      advice_id: adviceid,
      problem_id: problemid
    };
    console.log("pre-fuck up", props.match);
    fetch("/update-like", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).then(() => {});
  };

  const renderAdvices = () => {
    return advices.map((adv, index) => {
      return (
        <Advice
          key={adviceid + "-" + index}
          text={adv.text}
          author={adv.author}
          likes={adv.likes}
          song={adv.song}
          adviceid={adviceid}
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
                  <div className="row">
                    <button className="btn" id="ap-problem-card-likeicon">
                      <i className="fas fa-eye fa-2x"></i>
                    </button>
                    <p id="ap-problem-card-likes">{problem.views}</p>
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
                  <button className="btn" id="recomend-it-btn">
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
        <AdviceModal
          addAdvice={postAdvice}
          userInfo={userInfo}
          adviceid={adviceid}
        />
      </div>
    </>
  );
};

export default AdvicePage;
