/*
Gregorio Ospina
Sergio Naranjo
Universidad de los Andes
 */

import React, { useState, useEffect } from "react";
import ProblemPost from "./ProblemPost";
import TopCard from "./TopCard";
import Navbar from "./Navbar";
import PostModal from "./PostModal";
import "./MainPage.css";
import moment from "moment";

const MainPage = props => {
  let [question, setQuestion] = useState("");
  let [details, setDetails] = useState("");
  let [tags, setTags] = useState([]);
  let [logged, setLogged] = useState(props.logged);
  let [userInfo, setUserInfo] = useState(props.userInfo);
  let [totalTags, setTotalTags] = useState(props.tags);
  let [filter, setFilter] = useState([]);
  let problems = props.problems;

  const renderPost = () => {
    return chooseProblems().map(problem => {
      return (
        <ProblemPost
          key={problem._id}
          title={problem.question}
          subtitle={problem.detail}
          date={problem.date}
          id={problem._id}
          tags={problem.tags}
          setAdviceId={props.setAdviceId}
          likes={problem.likes}
          views={problem.views}
        />
      );
    });
  };

  const renderTopCards = () => {
    let problems_sorted = problems.sort((a, b) =>
      a.likes > b.likes
        ? -1
        : a.likes < b.likes
        ? 1
        : a.views > b.views
        ? -1
        : 1
    );
    return problems_sorted.slice(0, 4).map(problem => {
      return (
        <TopCard
          key={problem._id}
          title={problem.question}
          subtitle={problem.detail}
          date={problem.date}
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
      advices: [],
      likes: 0,
      views: 0
    };
    let sortedTags = newTags().sort((a, b) =>
      a.amount > b.amount ? -1 : a.amount < b.amount ? 1 : -1
    );
    setTotalTags(sortedTags);
    setTags([]);

    fetch("post-advice-tag", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sortedTags)
    }).then(() => {});

    console.log("bod problem", bod);
    fetch("post-advice-rooms", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bod)
    }).then(() => {});
  };

  const whatTag = (text, tog, amount) => (tog ? <> {text} </> : <> {text} </>);

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
        <Navbar
          _logged={logged}
          handleLoggedInChange={handleLoggedInChange}
          handleUserInfoChange={handleUserInfoChange}
        />
      </header>
      <div className="container">
        <div className="row">
          <div className="col-11 container" id="top-cards-container">
            <div className="card-deck">{renderTopCards()}</div>
          </div>
          <div className="col-lg-12">
            <div className="card shadow" id="filters-card">
              <div className="card-body">
                <div id="filter-p">
                  <h1 id="tag-filter-title"> Filter by Tags </h1>
                </div>
                <div>{renderTotalTags()}</div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 mx-auto">{renderPost()}</div>
        </div>
      </div>
      <hr></hr>
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
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
