import React, { useState, useEffect } from "react";
import ProblemPost from "./ProblemPost";
import Navbar from "./Navbar";
import "./MainPage.css";
import moment from "moment";

const MainPage = props => {
  let [n, setN] = useState(10);
  let [question, setQuestion] = useState("");
  let [details, setDetails] = useState("");
  let problems = props.props.slice(0, n).reverse();

  const renderPost = () => {
    let _date = moment().format("LL");
    return problems.map(problem => {
      return (
        <ProblemPost
          title={problem.question}
          subtitle={problem.detail}
          date={_date}
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
    }).then(res => {});
  };

  return (
    <div>
      <header className="masthead">
        <div className="overlay"></div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="title">
                <h1>Welcome to Piece of Advice</h1>
                <span className="subtitle">
                  Where you can get some advice for your problems
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
          <div class="modal-content">
            <div class="modal-header text-center">
              <h4 class="modal-title w-100 font-weight-bold">Get Advice</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body mx-3">
              <form>
                <div class="form-group">
                  <label for="problem">Problem or Question</label>
                  <input
                    type="text"
                    class="form-control"
                    id="problem"
                    placeholder="My dog died and i don't know what to do"
                    value={question}
                    onChange={handleChangeQuestion}
                  />
                </div>
                <div class="form-group">
                  <label for="problemdetails">Comments or details</label>
                  <textarea
                    class="form-control"
                    id="problemdetails"
                    rows="2"
                    value={details}
                    onChange={handleChangeDetails}
                  ></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button
                type="button"
                class="btn btn-primary"
                id="publishbtn"
                onClick={postProblem}
                data-dismiss="modal"
                aria-label="Close"
              >
                Publish
              </button>
            </div>
          </div>
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
