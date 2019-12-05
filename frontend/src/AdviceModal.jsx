import React from "react";

const AdviceModal = () => {
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
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="author">Author (Optional):</label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  placeholder="Sergio"
                />
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
