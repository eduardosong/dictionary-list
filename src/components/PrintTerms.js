import React from "react";
import PropTypes from "prop-types";
import ReactToPrint from "react-to-print";
import "./PrintTerms.css";

class PrintTerms extends React.Component {
  state = {
    printContent: null
  };
  render() {
    return (
      <React.Fragment>
        <div
          className={`btn-content animated fadeIn ${
            this.props.dispPrint ? "visible-element" : "hidden-element"
          }`}
        >
          NON FUNCTIONAL!
          <ReactToPrint
            trigger={() => <a href="#">Print this out!</a>}
            content={() => this.componentRef}
            // onBeforeGetContent={this.placeDiv}
            // onAfterPrint={this.afterPrint}
          />
          <div style={{ display: "none" }}>
            <div ref={el => (this.componentRef = el)}>
              {this.state.printContent}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PrintTerms;

PrintTerms.propTypes = {
  dispPrint: PropTypes.bool.isRequired
};
