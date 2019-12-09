import React, { useState } from "react";

const AdviceModal = props => {
  let [anonymous, setAnonymous] = useState(false);
  let [author, setAuthor] = useState("");

  const authorInput = () => {
    return !anonymous ? (
      <input
        type="text"
        className="form-control"
        id="author"
        placeholder="Your name"
        onChange={handleAuthorChange}
      />
    ) : (
      <> </>
    );
  };

  const handleAuthorChange = evt => {
    setAuthor(evt.target.value);
  };

  const handleAnonymous = () => {
    console.log("anonym", anonymous);
    if (!anonymous) {
      setAuthor("");
    }
    setAnonymous(!anonymous);
  };

  const choosAuthor = () => (anonymous ? "anonymous" : author);

  const loggedModal = () => {
    return (
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
                onChange={props.handleAdviceChange}
              ></textarea>
            </div>
            <div> </div>
            <div align="left">
              <div class="col checkbox" align="left">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="customCheck1"
                    onClick={handleAnonymous}
                  />
                  <label class="custom-control-label" for="customCheck1">
                    {" "}
                    Post anoymously?{" "}
                  </label>
                </div>
                {authorInput()}
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
                onChange={props.handleSongChange}
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
            onClick={() => props.addAdvice(choosAuthor())}
          >
            Publish
          </button>
        </div>
      </div>
    );
  };
  return loggedModal();
};

export default AdviceModal;
