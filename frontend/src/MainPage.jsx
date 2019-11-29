import React, { useState, useEffect } from "react";
import ProblemPost from "./ProblemPost";
import Navbar from "./Navbar";
import PostModal from "./PostModal";
import "./MainPage.css";
import moment from "moment";

const MainPage = props => {
  let [n, setN] = useState(10);
  let [question, setQuestion] = useState("");
  let [details, setDetails] = useState("");
  let [logged, setLogged] = useState(false);
  let [userInfo, setUserInfo] = useState({});
  let problems = props.props.slice(0, n).reverse();

  const renderPost = () => {
    let _date = moment().format("LL");
    return problems.map(problem => {
      return (
        <ProblemPost
          title={problem.question}
          subtitle={problem.detail}
          date={_date}
          id={problem._id}
          setAdviceId={props.setAdviceId}
        />
      );
    });
  };

  useEffect(() => {}, []);

  const moreProblems = () => {
    setN(n + 10);
  };

  const handleChangeQuestion = evt => {
    setQuestion(evt.target.value);
  };

  const handleChangeDetails = evt => {
    setDetails(evt.target.value);
  };

  const handleUserInfoChange = info => {
    console.log(info);
    setUserInfo(info);
  };

  const handleLoggedInChange = state => {
    console.log(state);
    setLogged(state);
  };

  const postProblem = () => {
    let _date = moment().format("LL");
    let bod = {
      question: question,
      detail: details,
      date: _date,
      advices: []
    };
    console.log("bod problem", bod);
    fetch("post-advice-rooms", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bod)
    }).then(() => {});
  };

  return (
    <div>
      <header className="masthead">
        <div className="overlay"></div>
        <Navbar _logged={logged} handleLoggedInChange={handleLoggedInChange} />
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="title">
                <h1>Welcome to Piece of Advice</h1>
                <span className="subtitle">
                  <em>Where you can get some advice for your problems</em>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            {renderPost()}
            <div className="clearfix">
              <button
                className="btn btn-primary float-right"
                onClick={moreProblems}
                id="olderpostbtn"
              >
                Older Posts &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <PostModal
            handleChangeQuestion={handleChangeQuestion}
            question={question}
            details={details}
            handleChangeDetails={handleChangeDetails}
            postProblem={postProblem}
            _logged={logged}
            _userInfo={userInfo}
            handleUserInfoChange={handleUserInfoChange}
            handleLoggedInChange={handleLoggedInChange}
          />
        </div>
      </div>

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
};

export default MainPage;
