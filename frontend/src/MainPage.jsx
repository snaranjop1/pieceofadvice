import React from "react";
import ProblemPost from "./ProblemPost";
import Navbar from "./Navbar";
import "./MainPage.css";

const MainPage = () => {
  let problems = [
    {
      title: "Man must explore, and this is exploration at its greatest",
      subtitle: "Problems look mighty small from 150 miles up",
      date: "Posted on September 24, 2019"
    },
    {
      title: "Man must explore, and this is exploration at its greatest",
      subtitle: "Problems look mighty small from 150 miles up",
      date: "Posted on September 24, 2019"
    },
    {
      title: "Man must explore, and this is exploration at its greatest",
      subtitle: "Problems look mighty small from 150 miles up",
      date: "Posted on September 24, 2019"
    }
  ];

  const renderPost = () => {
    return problems.map(problem => {
      return (
        <ProblemPost
          title={problem.title}
          subtitle={problem.subtitle}
          date={problem.date}
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
              <a className="btn btn-primary float-right" href="#">
                Older Posts &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>

      <footer>
        <div className="container" id="footer">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <p className="copyright text-muted">
                Copyright &copy; Your Website 2019
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
