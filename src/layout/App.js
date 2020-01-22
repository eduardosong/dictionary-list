import React from "react";
import Term from "../components/Term";
import Settings from "../components/Settings";
import merriam, { baseParams } from "../services/merriam";
import {
  titleFontSize,
  defFontSize,
  quickDefFontSize
} from "../services/settings";
import "./App.css";

class App extends React.Component {
  state = {
    term: "",
    termArr: [],
    htmlTermArr: [],
    isDisabled: false,
    termErr: {
      isErr: false,
      errMsg: null,
      altTerm: []
    },
    settings: {
      hideCompactDef: false,
      font: {
        title: titleFontSize[1],
        def: defFontSize[1],
        quickDef: quickDefFontSize[1]
      }
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.termArr !== this.state.termArr) {
      this.mapTermArr();
    }
  };

  mapTermArr = () => {
    const htmlTermArr = this.state.termArr.map((word, index) => {
      return (
        <Term
          key={word.id}
          delTerm={this.delTerm}
          index={index}
          term={word.term}
          defList={word.def}
          show={false}
          hideCompactDef={this.state.settings.hideCompactDef}
          titleFontSize={this.state.settings.font.title}
          defFontSize={this.state.settings.font.def}
          quickDefFontSize={this.state.settings.font.quickDef}
        />
      );
    });

    this.setState({ htmlTermArr });
  };

  onClickAltTerm = e => {
    this.setState({ term: e.target.value });
  };

  onTermSubmit = async event => {
    event.preventDefault();

    this.setState({ isDisabled: true });

    const term = this.state.term;
    // removed response variable assigned to await; might cause errors leaving this to remind what change I made here
    await this.getTerm(term)
      .then(r => this.checkTermResponse(r.data))
      .catch(error => console.log(error));
  };

  onChangeCompactDef = () => {
    const newCurrDisp = !this.state.settings.hideCompactDef;

    this.setState(
      {
        settings: { ...this.state.settings, hideCompactDef: newCurrDisp }
      },
      this.mapTermArr
    );
  };

  onChangeTitleFontSize = fontSize => {
    this.setState(
      {
        settings: {
          ...this.state.settings,
          font: { ...this.state.settings.font, title: fontSize }
        }
      },
      this.mapTermArr
    );
  };

  onChangeDefSize = fontSize => {
    this.setState(
      {
        settings: {
          ...this.state.settings,
          font: { ...this.state.settings.font, def: fontSize }
        }
      },
      this.mapTermArr
    );
  };

  onChangeQuickDefSize = fontSize => {
    this.setState(
      {
        settings: {
          ...this.state.settings,
          font: { ...this.state.settings.font, quickDef: fontSize }
        }
      },
      this.mapTermArr
    );
  };

  getTerm = term => {
    return merriam.get(
      `/references/collegiate/json/${term}?key=${baseParams.key}`
    );
  };

  checkTermResponse = respTermArr => {
    if (respTermArr.length !== 0) {
      if (typeof respTermArr[0] === "string") {
        this.noTermWithAlt(respTermArr);
      } else {
        this.termFound(respTermArr);
      }
    } else {
      this.noTermFound();
    }
  };

  noTermWithAlt = respTermArr => {
    const altTerm = [];
    const maxNumAltTerm = 4;

    for (let i = 0; i < maxNumAltTerm; i++) {
      if (respTermArr[i] === undefined) {
        break;
      }
      altTerm[i] = respTermArr[i];
    }

    const altTermHtml = this.mapAltTerm(altTerm);

    const termErr = {
      ...this.state.termErr,
      altTerm,
      isErr: true,
      errMsg: <span>Word not found. Did you mean:{altTermHtml}</span>
    };

    this.setState({ isDisabled: false, termErr });
  };

  mapAltTerm = altTerm => {
    return altTerm.map((altTerm, index) => {
      if (index !== altTerm.length - 1) {
        return (
          <span key={index + new Date().getTime()}>
            {" "}
            "
            <button
              className="alt-term"
              value={altTerm}
              onClick={this.onClickAltTerm}
            >
              {altTerm}
            </button>
            ",
          </span>
        );
      } else {
        return (
          <span key={index + new Date().getTime()}>
            {" or "}"
            <button
              className="alt-term"
              value={altTerm}
              onClick={this.onClickAltTerm}
            >
              {altTerm}
            </button>
            "?
          </span>
        );
      }
    });
  };

  termFound = respTermArr => {
    const maxNumTerm = 3;
    const term = this.state.term;
    const newTerm = [];
    const termArr = this.state.termArr.slice();

    for (let i = 0; i < maxNumTerm; i++) {
      if (respTermArr[i] === undefined) {
        break;
      }
      newTerm[i] = respTermArr[i];
    }

    termArr.unshift({
      term,
      id: new Date().getTime(),
      def: newTerm
    });

    const termErr = {
      ...this.state.termErr,
      isErr: false,
      errMsg: null,
      altTerm: []
    };

    this.setState({ isDisabled: false, termArr, term: "", termErr });
  };

  noTermFound = () => {
    const termErr = {
      ...this.state.termErr,
      isErr: true,
      errMsg: (
        <span>No terms or similar terms found. Please enter a new term.</span>
      )
    };

    this.setState({ isDisabled: false, termErr });
  };

  inputChange = event => {
    const term = event.target.value;

    this.setState({ term });
  };

  delTerm = index => {
    const termArr = this.state.termArr.slice();

    termArr.splice(index, 1);

    this.setState({ termArr });
  };

  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
          <section className="title-section">
            <div className="site-title row">
              <h1>Terms List</h1>
            </div>
          </section>
          <section className="search-box-container">
            <form className="search-form" onSubmit={this.onTermSubmit}>
              <div className="form-elements">
                <input
                  ref={input => input && input.focus()}
                  type="text"
                  name="termInput"
                  className="term-input"
                  placeholder="Enter your search term"
                  value={this.state.term}
                  onChange={this.inputChange}
                  disabled={this.state.isDisabled}
                />
                <button type="submit" className="search-btn">
                  Search
                </button>
              </div>
              <div
                className={
                  this.state.termErr.isErr
                    ? "err-msg visible-element animated fadeIn"
                    : "err-msg hidden-element animated fadeIn"
                }
              >
                {this.state.termErr.errMsg}
              </div>
            </form>
            <Settings
              titleFontSize={this.state.settings.font.title}
              defFontSize={this.state.settings.font.def}
              quickDefFontSize={this.state.settings.font.quickDef}
              hideCompactDef={this.state.settings.hideCompactDef}
              onChangeCompactDef={this.onChangeCompactDef}
              onChangeTitleFontSize={this.onChangeTitleFontSize}
              onChangeDefSize={this.onChangeDefSize}
              onChangeQuickDefSize={this.onChangeQuickDefSize}
            />
          </section>
          <section className="section-searched-list">
            <div className="row">
              <div className="searched-list-container">
                {this.state.htmlTermArr}
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
