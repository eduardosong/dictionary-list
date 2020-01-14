import React from "react";
import Term from "../components/Term";
import merriam, { baseParams } from "../api/merriam";
import "./App.css";

class App extends React.Component {
  state = {
    term: "",
    termArr: [],
    altArr: [],
    err: false
  };

  onTermSubmit = async event => {
    event.preventDefault();

    const term = this.state.term;
    const newTerm = [];
    const termArr = this.state.termArr;

    const response = await merriam.get(
      `/references/collegiate/json/${term}?key=${baseParams.key}`
    );

    if (response.data.length !== 0) {
      if (typeof response.data[0] === "string") {
        for (let i = 0; i < 3; i++) {
          if (response.data[i] === undefined) {
            break;
          }
          newTerm[i] = response.data[i];
        }
        this.setState({ altArr: newTerm, err: true });
        return null;
      } else {
        for (let i = 0; i < 3; i++) {
          if (response.data[i] === undefined) {
            break;
          }
          newTerm[i] = response.data[i];
        }
        termArr.unshift({
          term,
          id: new Date().getTime(),
          def: newTerm
        });

        this.setState({ termArr, term: "", altArr: [], err: false });
      }
    } else {
      // err Msg
      console.log("nothing found");
    }
  };

  inputChange = event => {
    const term = event.target.value;

    this.setState({ term });
  };

  delTerm = index => {
    const termArr = this.state.termArr;

    termArr.splice(index, 1);

    this.setState({ termArr });
  };

  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
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
                />
                <button className="search-btn" onClick={this.onTermSubmit}>
                  Search
                </button>
              </div>
              <div
                className={
                  this.state.err ? "err-msg disp-err" : "err-msg hide-err"
                }
              >
                Word not found. Did you mean:{" "}
                {this.state.altArr.map((altTerm, index) => {
                  if (index === this.state.altArr.length - 1) {
                    return <span key={index}>or "{altTerm}"?</span>;
                  } else {
                    return <span key={index}>"{altTerm}", </span>;
                  }
                })}
              </div>
            </form>
          </section>
          <section className="section-searched-list">
            <div className="row">
              <div className="searched-list-container">
                {this.state.termArr.map((word, index) => {
                  return (
                    <Term
                      delTerm={this.delTerm}
                      index={index}
                      key={word.id}
                      term={word.term}
                      defList={word.def}
                      show={false}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
