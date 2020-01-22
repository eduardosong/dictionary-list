import React from "react";
import PropTypes from "prop-types";
import {
  titleFontSize,
  defFontSize,
  quickDefFontSize
} from "../services/settings";
import "./Settings.css";

class Settings extends React.Component {
  state = {
    dispSettings: false
  };

  changeTitleFontSize = e => {
    this.props.onChangeTitleFontSize(e.target.value);
  };

  changeDefSize = e => {
    this.props.onChangeDefSize(e.target.value);
  };

  changeQuickDefSize = e => {
    this.props.onChangeQuickDefSize(e.target.value);
  };

  toggleCompactDef = () => {
    this.props.onChangeCompactDef();
  };

  toggleDisplay = () => {
    const dispSettings = !this.state.dispSettings;

    this.setState({ dispSettings });
  };
  render() {
    return (
      <React.Fragment>
        <div className="settings-container">
          <button className="show-settings-btn" onClick={this.toggleDisplay}>
            Settings
          </button>
          <div
            className={`settings-content animated fadeIn ${
              this.state.dispSettings ? "visible-element" : "hidden-element"
            }`}
          >
            <form>
              <div className="large-settings-box">
                <span className="large-settings-title">Font</span>
                <div className="sub-settings-container">
                  <div className="small-settings-box sub-setting-item">
                    <span className="small-settings-title">Title</span>
                    <div className="settings-input-box">
                      <ul>
                        <li>
                          <input
                            type="radio"
                            name="titleFontSmall"
                            id="titleFontSmall"
                            value={titleFontSize[0]}
                            checked={
                              this.props.titleFontSize === titleFontSize[0]
                                ? true
                                : false
                            }
                            onChange={this.changeTitleFontSize}
                          />
                          <label htmlFor="titleFontSmall">Small</label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            name="titleFontMed"
                            id="titleFontMed"
                            value={titleFontSize[1]}
                            checked={
                              this.props.titleFontSize === titleFontSize[1]
                                ? true
                                : false
                            }
                            onChange={this.changeTitleFontSize}
                          />
                          <label htmlFor="titleFontMed">Medium</label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            name="titleFontLg"
                            id="titleFontLg"
                            value={titleFontSize[2]}
                            checked={
                              this.props.titleFontSize === titleFontSize[2]
                                ? true
                                : false
                            }
                            onChange={this.changeTitleFontSize}
                          />
                          <label htmlFor="titleFontLg">Large</label>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="small-settings-box sub-setting-item">
                    <span className="small-settings-title">
                      Quick Definition
                    </span>
                    <div className="settings-input-box">
                      <ul>
                        <li>
                          <input
                            type="radio"
                            name="quickDefFontSmall"
                            id="quickDefFontSmall"
                            value={quickDefFontSize[0]}
                            checked={
                              this.props.quickDefFontSize ===
                              quickDefFontSize[0]
                                ? true
                                : false
                            }
                            onChange={this.changeQuickDefSize}
                          />
                          <label htmlFor="quickDefFontSmall">Small</label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            name="quickDefFontMed"
                            id="quickDefFontMed"
                            value={quickDefFontSize[1]}
                            checked={
                              this.props.quickDefFontSize ===
                              quickDefFontSize[1]
                                ? true
                                : false
                            }
                            onChange={this.changeQuickDefSize}
                          />
                          <label htmlFor="quickDefFontMed">Medium</label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            name="quickDefFontLg"
                            id="quickDefFontLg"
                            value={quickDefFontSize[2]}
                            checked={
                              this.props.quickDefFontSize ===
                              quickDefFontSize[2]
                                ? true
                                : false
                            }
                            onChange={this.changeQuickDefSize}
                          />
                          <label htmlFor="quickDefFontLg">Large</label>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="small-settings-box sub-setting-item">
                    <span className="small-settings-title">Definition</span>
                    <div className="settings-input-box">
                      <ul>
                        <li>
                          <input
                            type="radio"
                            name="defFontSmall"
                            id="defFontSmall"
                            value={defFontSize[0]}
                            onChange={this.changeDefSize}
                            checked={
                              this.props.defFontSize === defFontSize[0]
                                ? true
                                : false
                            }
                          />
                          <label htmlFor="defFontSmall">Small</label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            name="defFontMed"
                            id="defFontMed"
                            value={defFontSize[1]}
                            onChange={this.changeDefSize}
                            checked={
                              this.props.defFontSize === defFontSize[1]
                                ? true
                                : false
                            }
                          />
                          <label htmlFor="defFontMed">Medium</label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            name="defFontLg"
                            id="defFontLg"
                            value={defFontSize[2]}
                            onChange={this.changeDefSize}
                            checked={
                              this.props.defFontSize === defFontSize[2]
                                ? true
                                : false
                            }
                          />
                          <label htmlFor="defFontLg">Large</label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="small-settings-box">
                <span className="small-settings-title">Definitions</span>
                <div className="settings-input-box">
                  <input
                    type="checkbox"
                    name="hideDef"
                    id="hideDef"
                    className="settings-checkbox"
                    checked={this.props.hideCompactDef ? true : false}
                    onChange={this.toggleCompactDef}
                  />{" "}
                  <label htmlFor="hideDef">Hide</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Settings.propTypes = {
  titleFontSize: PropTypes.string.isRequired,
  defFontSize: PropTypes.string.isRequired,
  quickDefFontSize: PropTypes.string.isRequired,
  hideCompactDef: PropTypes.bool.isRequired,
  onChangeCompactDef: PropTypes.func.isRequired,
  onChangeTitleFontSize: PropTypes.func.isRequired,
  onChangeDefSize: PropTypes.func.isRequired,
  onChangeQuickDefSize: PropTypes.func.isRequired
};

export default Settings;
