import React from "react";
import PropTypes from "prop-types";
import "./Term.css";

class Term extends React.Component {
  state = {
    showCard: false,
    titleFontSizeClass: "",
    defFontSizeClass: "",
    quickDefFontSizeClass: "",
    cardSizeClass: ""
  };

  componentDidMount() {
    this.setState({
      showCard: this.props.show
    });

    this.setTitleFontSize();
    this.setDefFontSize();
    this.setQuickDefFontSize();
    this.setCardSize();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.titleFontSize !== this.props.titleFontSize) {
      this.setTitleFontSize();
    }
    if (prevProps.defFontSize !== this.props.defFontSize) {
      this.setDefFontSize();
    }
    if (prevProps.quickDefFontSize !== this.props.quickDefFontSize) {
      this.setQuickDefFontSize();
    }
    if (prevProps.cardSize !== this.props.cardSize) {
      this.setCardSize();
    }
  }

  setTitleFontSize = () => {
    const titleFontSize = this.props.titleFontSize;
    switch (titleFontSize) {
      case "small":
        this.setState({ titleFontSizeClass: "term-title-small" });
        break;
      case "medium":
        this.setState({ titleFontSizeClass: "term-title-medium" });
        break;
      case "large":
        this.setState({ titleFontSizeClass: "term-title-large" });
        break;
      default:
        break;
    }
  };

  setDefFontSize = () => {
    const defFontSize = this.props.defFontSize;
    switch (defFontSize) {
      case "small":
        this.setState({ defFontSizeClass: "term-def-small" });
        break;
      case "medium":
        this.setState({ defFontSizeClass: "term-def-medium" });
        break;
      case "large":
        this.setState({ defFontSizeClass: "term-def-large" });
        break;
      default:
        break;
    }
  };

  setQuickDefFontSize = () => {
    const quickDefFontSize = this.props.quickDefFontSize;
    switch (quickDefFontSize) {
      case "small":
        this.setState({ quickDefFontSizeClass: "term-quick-def-small" });
        break;
      case "medium":
        this.setState({ quickDefFontSizeClass: "term-quick-def-medium" });
        break;
      case "large":
        this.setState({ quickDefFontSizeClass: "term-quick-def-large" });
        break;
      default:
        break;
    }
  };

  setCardSize = () => {
    const cardSize = this.props.cardSize;
    switch (cardSize) {
      case "small":
        this.setState({ cardSizeClass: "card-size-small" });
        break;
      case "medium":
        this.setState({ cardSizeClass: "card-size-medium" });
        break;
      case "large":
        this.setState({ cardSizeClass: "card-size-large" });
        break;
      case "unlimited":
        this.setState({ cardSizeClass: "card-size-unlimited" });
        break;
      default:
        break;
    }
  };

  removeTerm = () => {
    this.props.delTerm(this.props.index);
  };

  toggleShow = () => {
    const oppShowVal = !this.state.showCard;
    this.setState({ showCard: oppShowVal });
  };

  render() {
    return (
      <React.Fragment>
        <div className={`card animated fadeIn ${this.state.cardSizeClass}`}>
          <div className="card-header">
            <button
              className={`card-drop-btn card-arrow-down ${
                this.state.showCard ? "open-card" : null
              }`}
              onClick={this.toggleShow}
            >
              <i className="ion-android-arrow-dropright"></i>
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                whiteSpace: "nowrap",
                overflow: "hidden"
              }}
            >
              <h1 className={`term-title ${this.state.titleFontSizeClass}`}>
                {this.props.term}{" "}
              </h1>

              {this.props.hideCompactDef ? null : (
                <span
                  className={`quick-def ${this.state.quickDefFontSizeClass}`}
                >
                  {this.props.defList[0].fl}:{" "}
                  {this.props.defList[0].shortdef[0]}
                </span>
              )}
            </div>

            <button className="del-term-btn" onClick={this.removeTerm}>
              <i className="ion-android-close"></i>
            </button>
          </div>

          <div
            className={
              this.state.showCard
                ? `card-container animated fadeIn visible-element`
                : "card-container animated fadeIn hidden-element"
            }
          >
            {
              <h2
                className={`interior-term-title ${this.state.defFontSizeClass}`}
              >
                {this.props.term}:
              </h2>
            }
            {this.props.defList.map((defCont, index) => {
              return (
                <div
                  className={`term-container ${this.state.defFontSizeClass}`}
                  key={defCont.meta.uuid}
                >
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

Term.propTypes = {
  delTerm: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  term: PropTypes.string.isRequired,
  defList: PropTypes.array.isRequired,
  show: PropTypes.bool.isRequired,
  hideCompactDef: PropTypes.bool.isRequired,
  titleFontSize: PropTypes.string.isRequired,
  defFontSize: PropTypes.string.isRequired,
  quickDefFontSize: PropTypes.string.isRequired
};

export default Term;
