import React from "react";
import PropTypes from "prop-types";
import ReactToPrint from "react-to-print";
import Term from "../components/Term";
import "./PrintTerms.css";

class PrintTerms extends React.Component {
  state = {
    htmlTermArr: null
  };

  placeContent = () => {
    const htmlTermArr = this.props.mapTermArr(true);
    this.setState({ htmlTermArr });
  };

  afterPrint = () => {
    this.setState({ htmlTermArr: null });
  };

  render() {
    return (
      <React.Fragment>
        <div
          className={`btn-content animated fadeIn ${
            this.props.dispPrint ? "visible-element" : "hidden-element"
          }`}
        >
          <div className="print-container">
            <h1 className="print-title">Print Terms</h1>
            <span className="print-desc">
              We will include print options here in the future!
            </span>
            <div className="print-content">
              <ReactToPrint
                trigger={() => <button className="btn print-btn">Print</button>}
                content={() => this.componentRef}
                onBeforeGetContent={this.placeContent}
                onAfterPrint={this.afterPrint}
              />
            </div>
          </div>

          <div style={{ display: "none" }}>
            <div ref={el => (this.componentRef = el)}>
              {this.state.htmlTermArr}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PrintTerms;

PrintTerms.propTypes = {
  dispPrint: PropTypes.bool.isRequired,
  mapTermArr: PropTypes.func.isRequired
};
