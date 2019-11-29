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
  let [tags, setTags] = useState([]);
  let [logged, setLogged] = useState(false);
  let [userInfo, setUserInfo] = useState({});
  let [totalTags, setTotalTags] = useState([]);
  let problems = props.props.slice(0, n).reverse();

  const TOGGLE_TAG = "&#10071;";
  const UNTOGGLED = "&#10069;";

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
    setUserInfo(info);
  };

  const handleLoggedInChange = state => {
    setLogged(state);
  };

  const removeTag = tag => {
    let new_tags = tags.filter(_tag => {
      return _tag !== tag;
    });
    setTags([...new_tags]);
  };

  const handleNewTag = evt => {
    if (evt.key === "Enter" && !tags.includes(evt.target.value)) {
      let copy = [...tags];
      copy.push(evt.target.value);
      setTags(copy);
      evt.target.value = "";
    } else if (evt.key === "Enter") {
      evt.target.value = "";
    }
  };

  const newTags = () => {
    let appendable = [];
    tags.map(_tag => {
      let new_t = {
        tag: _tag,
        toggle: false,
        amount: 1
      };
      appendable.push(new_t);
    });
    let copy = [...totalTags];
    return [...copy, ...appendable];
  };

  const postProblem = () => {
    let _date = moment().format("LL");
    let bod = {
      question: question,
      detail: details,
      date: _date,
      tags: tags,
      advices: []
    };
    setTotalTags(newTags());
    console.log("bod problem", bod);
    fetch("post-advice-rooms", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bod)
    }).then(() => {});
  };

  const whatTag = (text, tog) =>
    tog ? <> {text} &#10071; </> : <> {text} &#10069; </>;

  const toggleTag = tag => {
    let copy = [...totalTags];
    copy.map(_tag => {
      if (_tag.tag === tag) {
        _tag.toggle = !_tag.toggle;
      }
    });
    setTotalTags(copy);
  };

  const renderTotalTags = () => {
    return totalTags.map(tag => {
      return (
        <button
          key={tag.tag}
          type="button"
          onClick={() => toggleTag(tag.tag)}
          class="btn btn-warning btn-sm btn-tag"
        >
          {whatTag(tag.tag, tag.toggle)}
          <span class="sr-only">{tag.tag} tag</span>
        </button>
      );
    });
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
      <div
        align="left"
        className="cat-col"
        style={{ backgroundColor: "#aaaa" }}
        id="cat-col"
      >
        GREGORIO OSPINA
        <div>{renderTotalTags()}</div>
      </div>
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
            tags={tags}
            handleUserInfoChange={handleUserInfoChange}
            handleLoggedInChange={handleLoggedInChange}
            handleNewTag={handleNewTag}
            removeTag={removeTag}
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
