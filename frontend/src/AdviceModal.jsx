import React, { useState } from "react";
import uuid from "uuid/v1";

const AdviceModal = props => {
  let [text, setText] = useState("");
  let [song, setSong] = useState(false);
  let [songUrl, setSongUrl] = useState("");
  let [anonymous, setAnonymous] = useState(false);
  let [userInfo, setUserInfo] = useState(props.userInfo);

  const handleAdviceChange = evt => {
    console.log("new advice:", evt.target.value);
    setText(evt.target.value);
  };

  const handleSongChange = evt => {
    console.log("new song:", evt.target.value);
    setSong(true);
    setSongUrl(evt.target.value);
  };

  const cleanSlate = () => {
    setAnonymous(false);
    setSong(false);
    setSongUrl("");
    setText("");
  };

  const handleAnonymous = () => {
    setAnonymous(!anonymous);
  };

  const addAdvice = () => {
    let user = anonymous ? "anonymous" : props.userInfo.name;
    let src = song ? songUrl : "-1";
    let objectid = uuid();
    console.log("objectid", objectid);
    let advice = {
      id: objectid,
      adviceid: props.adviceid,
      text: text,
      author: user,
      song: src,
      likes: 1
    };
    props.addAdvice(advice);
    cleanSlate();
  };

  return (
    <div
      className="modal fade"
      id="exampleModal2"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Give some advice
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="advicetext">Advice:</label>
                <textarea
                  placeholder="This happened to me some time ago and meditation helped me a lot"
                  className="form-control"
                  id="advicetext"
                  rows="3"
                  onChange={handleAdviceChange}
                ></textarea>
              </div>
              <div> </div>
              <div align="left">
                <div
                  class="col checkbox"
                  align="left"
                  onClick={handleAnonymous}
                >
                  <input
                    type="checkbox"
                    data-toggle="toggle"
                    data-onstyle="warning"
                    data-offstyle="info"
                    data-on="Post Anonymously"
                    data-off={"Post as " + userInfo.name}
                    data-width="200"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="song">
                  Recommend a song (Just type the name):
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="song"
                  placeholder="Back in black"
                />
              </div>
            </form>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              className="btn btn-primary"
              id="publishbtn"
              data-dismiss="modal"
              aria-label="Close"
              onClick={addAdvice}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdviceModal;
