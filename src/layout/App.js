import React from "react";
import Term from "../components/Term";
import Settings from "../components/Settings";
import PrintTerms from "../components/PrintTerms";
import Footer from "../components/Footer";
import merriam, { baseParams } from "../services/merriam";
import {
  titleFontSize,
  defFontSize,
  quickDefFontSize,
  cardSize
} from "../services/settings";
import "./App.css";
import "./Responsive.css";

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
    btnDisp: {
      dispSettings: false,
      dispPrint: false
    },
    settings: {
      hideCompactDef: false,
      font: {
        title: titleFontSize[1],
        def: defFontSize[1],
        quickDef: quickDefFontSize[1]
      },
      card: {
        size: cardSize[1]
      }
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.termArr !== this.state.termArr) {
      this.mapTermArr();
    }
  };

  componentDidMount = () => {
    this.getTermFromStorage();
    this.getSettingFromStorage();
  };

  dispBtnContent = e => {
    const btnVal = e.target.value;
    const newDispVal = !this.state.btnDisp[btnVal];
    const btnDisp = { ...this.state.btnDisp };

    if (newDispVal) {
      this.setFalseExceptVal(btnDisp, btnVal);
    } else {
      btnDisp[btnVal] = newDispVal;
    }

    this.setState({ btnDisp });
  };

  setFalseExceptVal = (obj, selected) => {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        if (prop !== selected) {
          obj[prop] = false;
        } else {
          obj[prop] = true;
        }
      }
    }
  };

  getSettingFromStorage = () => {
    const settings = JSON.parse(localStorage.getItem("settings"));

    if (settings !== null) {
      this.setState({
        settings: {
          ...this.state.settings,
          font: {
            def:
              settings.defFontSize !== undefined
                ? settings.defFontSize
                : this.state.settings.font.def,
            title:
              settings.titleFontSize !== undefined
                ? settings.titleFontSize
                : this.state.settings.font.title,
            quickDef:
              settings.quickDefFontSize !== undefined
                ? settings.quickDefFontSize
                : this.state.settings.font.quickDef
          },
          card: {
            size:
              settings.cardSize !== undefined
                ? settings.cardSize
                : this.state.settings.card.size
          },
          hideCompactDef:
            settings.hideCompactDef !== undefined
              ? settings.hideCompactDef
              : false
        }
      });
    }
  };

  getTermFromStorage = () => {
    const termArr = JSON.parse(localStorage.getItem("termArr"));
    if (termArr !== null) {
      this.setState({ termArr });
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
          cardSize={this.state.settings.card.size}
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

    if (term === "") {
      this.setState({ isDisabled: false });
      return;
    }

    await this.getTerm(term)
      .then(r => this.checkTermResponse(r.data))
      .catch(error => {
        if (error.isAxiosError) {
          console.log("there is an error");
        }
        this.setState({ isDisabled: false });
      });
  };

  changeLocalSettings = (settingName, settingValue) => {
    let oldSettings = JSON.parse(localStorage.getItem("settings"));

    if (oldSettings === null) {
      oldSettings = {};
    }

    oldSettings[`${settingName}`] = settingValue;

    localStorage.setItem("settings", JSON.stringify(oldSettings));
  };

  onChangeCompactDef = () => {
    const newCurrDisp = !this.state.settings.hideCompactDef;

    this.changeLocalSettings("hideCompactDef", newCurrDisp);

    this.setState(
      {
        settings: { ...this.state.settings, hideCompactDef: newCurrDisp }
      },
      this.mapTermArr
    );
  };

  onChangeTitleFontSize = fontSize => {
    this.changeLocalSettings("titleFontSize", fontSize);

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

  onChangeCardSize = cardSize => {
    this.changeLocalSettings("cardSize", cardSize);

    this.setState(
      {
        settings: {
          ...this.state.settings,
          card: { ...this.state.settings.card, size: cardSize }
        }
      },
      this.mapTermArr
    );
  };

  onChangeDefSize = fontSize => {
    this.changeLocalSettings("defFontSize", fontSize);

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
    this.changeLocalSettings("quickDefFontSize", fontSize);

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
    return altTerm.map((singleTerm, index) => {
      if (index !== altTerm.length - 1) {
        return (
          <span key={index + new Date().getTime()}>
            {" "}
            "
            <button
              className="alt-term"
              value={singleTerm}
              onClick={this.onClickAltTerm}
            >
              {singleTerm}
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
              value={singleTerm}
              onClick={this.onClickAltTerm}
            >
              {singleTerm}
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
    let oldStoredArr = JSON.parse(localStorage.getItem("termArr"));
    if (!oldStoredArr) {
      oldStoredArr = [];
    }

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
    oldStoredArr.unshift({
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

    localStorage.setItem("termArr", JSON.stringify(termArr));

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
    localStorage.setItem("termArr", JSON.stringify(termArr));

    this.setState({ termArr });
  };

  delStoredTerm = () => {
    const termArr = null;

    localStorage.setItem("termArr", termArr);
    this.setState({ termArr: [], htmlTermArr: [] });
  };

  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
          <div className="page-content">
            <section className="title-section animated fadeIn">
              <div className="site-title row">
                <h1>Mitsis</h1>
                <h4>
                  A companion for when you go down the rabbit hole of searching
                  the definitions of words.
                </h4>
              </div>
            </section>
            <section className="search-box-container animated fadeInLeft">
              <form className="search-form" onSubmit={this.onTermSubmit}>
                <div className="form-elements">
                  <input
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
              <div className="search-btn-group">
                <button
                  value="dispSettings"
                  className={`menu-btn ${
                    this.state.btnDisp.dispSettings ? "btn-highlight" : null
                  }`}
                  onClick={this.dispBtnContent}
                >
                  Settings
                </button>
                <button
                  value="dispPrint"
                  className={`menu-btn ${
                    this.state.btnDisp.dispPrint ? "btn-highlight" : null
                  }`}
                  onClick={this.dispBtnContent}
                >
                  Print Terms
                </button>
                <button className="menu-btn" onClick={this.delStoredTerm}>
                  Clear Terms
                </button>
              </div>
              <div className="btn-content-container">
                <Settings
                  dispSettings={this.state.btnDisp.dispSettings}
                  titleFontSize={this.state.settings.font.title}
                  defFontSize={this.state.settings.font.def}
                  cardSize={this.state.settings.card.size}
                  quickDefFontSize={this.state.settings.font.quickDef}
                  hideCompactDef={this.state.settings.hideCompactDef}
                  onChangeCompactDef={this.onChangeCompactDef}
                  onChangeTitleFontSize={this.onChangeTitleFontSize}
                  onChangeDefSize={this.onChangeDefSize}
                  onChangeQuickDefSize={this.onChangeQuickDefSize}
                  onChangeCardSize={this.onChangeCardSize}
                />
                <PrintTerms dispPrint={this.state.btnDisp.dispPrint} />
              </div>
            </section>
            <section className="section-searched-list animated fadeIn">
              <div className="row">
                <div className="searched-list-container">
                  {this.state.htmlTermArr}
                </div>
              </div>
            </section>
          </div>
          <section className="section-footer">
            <Footer />
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
