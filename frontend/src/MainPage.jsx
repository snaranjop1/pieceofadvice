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
  let [logged, setLogged] = useState(props.logged);
  let [userInfo, setUserInfo] = useState(props.userInfo);
  let [totalTags, setTotalTags] = useState([
    { tag: "Grego", toggled: false, amount: 3 },
    { tag: "1", toggled: false, amount: 2 },
    { tag: "2", toggled: false, amount: 1 }
  ]);
  let [filter, setFilter] = useState([]);
  let problems = props.problems.slice(0, n).reverse();

  const renderPost = () => {
    let _date = moment().format("LL");
    return chooseProblems().map(problem => {
      return (
        <ProblemPost
          title={problem.question}
          subtitle={problem.detail}
          date={_date}
          id={problem._id}
          tags={problem.tags}
          setAdviceId={props.setAdviceId}
        />
      );
    });
  };

  const chooseProblems = () => {
    if (filter.length === 0) {
      return problems;
    } else {
      let filtered_problems = problems.filter(prob => {
        let found = false;
        for (let i = 0; i < prob.tags.length; i++) {
          if (filter.includes(prob.tags[i])) {
            found = true;
            break;
          }
        }
        return found;
      });
      return filtered_problems;
    }
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
    let copy = [...totalTags];
    let double = false;
    for (let i = 0; i < tags.length; i++) {
      totalTags.map((ttag, index) => {
        if (ttag.tag === tags[i]) {
          copy[index].amount++;
          double = true;
        }
      });
      if (double === false) {
        let new_t = {
          tag: tags[i],
          toggle: false,
          amount: 1
        };
        appendable.push(new_t);
      }
    }
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
    let sortedTags = newTags().sort((a, b) =>
      a.amount > b.amount ? -1 : a.amount < b.amount ? 1 : -1
    );
    setTotalTags(sortedTags);
    setTags([]);
    console.log("bod problem", bod);
    fetch("post-advice-rooms", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bod)
    }).then(() => {});
  };

  const whatTag = (text, tog, amount) =>
    tog ? (
      <>
        {" "}
        {text} : {amount} &#10071;{" "}
      </>
    ) : (
      <>
        {" "}
        {text}: {amount} &#10069;{" "}
      </>
    );

  const toggleTag = tag => {
    let copy = [...totalTags];
    copy.map(_tag => {
      if (_tag.tag === tag) {
        _tag.toggle = !_tag.toggle;
        let filter_copy = [...filter];
        if (_tag.toggle) {
          filter_copy.push(tag);
        } else {
          filter_copy = filter_copy.filter(tag2 => tag2 !== tag);
        }
        setFilter(filter_copy);
      }
    });
    setTotalTags(copy);
  };

  const whatClass = tog => (tog ? "warning" : "light");

  const renderTotalTags = () => {
    return totalTags.map(tag => {
      return (
        <button
          key={tag.tag}
          type="button"
          onClick={() => toggleTag(tag.tag)}
          className={`btn btn-${whatClass(tag.toggle)} btn-sm btn-tag`}
        >
          {whatTag(tag.tag, tag.toggle, tag.amount)}
          <span className="sr-only">{tag.tag} tag</span>
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
                  <em>Get Some Advice</em>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div align="left" className="cat-col" id="cat-col">
        <p id="filter-p">
          <h5 className="h-title"> Filter by Tags! </h5>
        </p>
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
        className="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
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
