import React from "react";
import "./Term.css";

class Term extends React.Component {
  state = {
    showCard: false
  };
  removeTerm = () => {
    this.props.delTerm(this.props.index);
  };

  componentDidMount() {
    this.setState({ showCard: this.props.show });
  }

  toggleShow = () => {
    const oppShowVal = !this.state.showCard;
    this.setState({ showCard: oppShowVal });
  };

  render() {
    return (
      <React.Fragment>
        <div className="card animated fadeIn">
          <div className="card-header">
            <div className="title" onClick={this.toggleShow}>
              <h1>{this.props.term} </h1>
              <div className="quick-def">
                <h3>
                  <span
                    className={
                      this.state.showCard ? "closed-card" : "open-card"
                    }
                  >
                    {this.props.defList[0].fl}:{" "}
                    {this.props.defList[0].shortdef[0]}
                  </span>
                </h3>
              </div>
            </div>
            <button className="del-term-btn" onClick={this.removeTerm}>
              <i className="ion-android-close"></i>
            </button>
          </div>

          <div
            className={
              this.state.showCard
                ? "card-container animated fadeIn open-card"
                : "card-container animated fadeIn closed-card"
            }
            onClick={this.toggleShow}
          >
            {this.props.defList.map((defCont, index) => {
              return (
                <div className="term-container" key={defCont.meta.uuid}>
                  <h2>{defCont.fl}</h2>
                  {defCont.shortdef.map((def, index) => {
                    return (
                      <p key={index + 1}>
                        {index + 1}. {def}
                      </p>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Term;
