import React from "react";
import ProblemPost from "./ProblemPost";
import Navbar from "./Navbar";
import "./MainPage.css";

const MainPage = props => {
  let problems = props.props;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const renderPost = () => {
    return problems.map(problem => {
      return (
        <ProblemPost
          title={problem.question}
          subtitle={problem.detail}
          date={
            problem.date === undefined
              ? problem.date
              : new Date(problem.date).getDate() +
                " " +
                monthNames[new Date(problem.date).getMonth()] +
                ", " +
                new Date(problem.date).getFullYear()
          }
        />
      );
    });
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
              <a className="btn btn-primary float-right" href="/">
                Older Posts &rarr;
              </a>
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
                    placeholder="My dog died and i don't knwo what to do"
                  />
                </div>
                <div class="form-group">
                  <label for="problemdetails">Comments or details</label>
                  <textarea
                    class="form-control"
                    id="problemdetails"
                    rows="2"
                  ></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button type="button" class="btn btn-primary">
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
