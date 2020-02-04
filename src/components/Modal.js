import React from "react";
import PropTypes from "prop-types";
import "./Modal.css";

class Modal extends React.Component {
  state = {
    dispClear: false
  };

  changeDisp = () => {
    const e = {
      target: {
        value: "dispClear"
      }
    };
    this.props.dispBtnContent(e);
  };

  render() {
    return (
      <React.Fragment>
        <div
          className={`modal-container ${
            this.props.dispClear ? "visible-element" : "hidden-element"
          }`}
        >
          <div
            style={{
              background: "rgba(0, 0, 0, 0.4)",
              height: "100%",
              width: "100%",
              position: "absolute"
            }}
            onClick={this.changeDisp}
          ></div>
          <div className="modal-card animated fadeIn">
            <h1 className="modal-title">{this.props.title}</h1>
            {this.props.children}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;

Modal.propTypes = {
  dispClear: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  dispBtnContent: PropTypes.func.isRequired
};
