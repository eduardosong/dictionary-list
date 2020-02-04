import React from "react";
import PropTypes from "prop-types";
import {
  titleFontSize,
  defFontSize,
  quickDefFontSize,
  cardSize
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

  changeCardSize = e => {
    this.props.onChangeCardSize(e.target.value);
  };

  toggleCompactDef = () => {
    this.props.onChangeCompactDef();
  };

  render() {
    return (
      <React.Fragment>
        <div className="settings-container">
          <div
            className={`settings-content animated fadeIn ${
              this.props.dispSettings ? "visible-element" : "hidden-element"
            }`}
          >
            <h1>Settings</h1>
            <form>
              <div className="card-object">
                <span className="card-object-title">Card</span>
                <div className="prop-group">
                  <div className="card-property">
                    <span className="card-property-title">Title</span>
                    <div className="sub-prop-group">
                      <div className="card-sub-property">
                        <span className="card-sub-property-title">
                          Font Size
                        </span>
                        <ul className="card-input-ul">
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
                  </div>

                  <div className="card-property">
                    <span className="card-property-title">
                      Quick Definition
                    </span>
                    <div className="sub-prop-group">
                      <div className="card-sub-property">
                        <span className="card-sub-property-title">
                          Font Size
                        </span>
                        <ul className="card-input-ul">
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
                      <div className="card-sub-property">
                        <span className="card-sub-property-title">Display</span>
                        <ul className="card-input-ul">
                          <li>
                            <input
                              type="checkbox"
                              name="hideDef"
                              id="hideDef"
                              checked={this.props.hideCompactDef ? true : false}
                              onChange={this.toggleCompactDef}
                            />
                            <label
                              className="card-input-label"
                              htmlFor="hideDef"
                            >
                              Hide
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="card-property">
                    <span className="card-property-title">Definition</span>
                    <div className="sub-prop-group">
                      <div className="card-sub-property">
                        <span className="card-sub-property-title">
                          Font Size
                        </span>
                        <ul className="card-input-ul">
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

                  <div className="card-property">
                    <span className="card-property-title">Other</span>
                    <div className="sub-prop-group">
                      <div className="card-sub-property">
                        <span className="card-sub-property-title">
                          Card Size (Desktop)
                        </span>
                        <ul className="card-input-ul">
                          <li>
                            <input
                              type="radio"
                              name="cardSizeSmall"
                              id="cardSizeSmall"
                              value={cardSize[0]}
                              onChange={this.changeCardSize}
                              checked={
                                this.props.cardSize === cardSize[0]
                                  ? true
                                  : false
                              }
                            />
                            <label htmlFor="cardSizeSmall">Small</label>
                          </li>
                          <li>
                            <input
                              type="radio"
                              name="cardSizeMed"
                              id="cardSizeMed"
                              value={cardSize[1]}
                              onChange={this.changeCardSize}
                              checked={
                                this.props.cardSize === cardSize[1]
                                  ? true
                                  : false
                              }
                            />
                            <label htmlFor="cardSizeMed">Medium</label>
                          </li>
                          <li>
                            <input
                              type="radio"
                              name="cardSizeLg"
                              id="cardSizeLg"
                              value={cardSize[2]}
                              onChange={this.changeCardSize}
                              checked={
                                this.props.cardSize === cardSize[2]
                                  ? true
                                  : false
                              }
                            />
                            <label htmlFor="cardSizeLg">Large</label>
                          </li>
                          <li>
                            <input
                              type="radio"
                              name="cardSizeUn"
                              id="cardSizeUn"
                              value={cardSize[3]}
                              onChange={this.changeCardSize}
                              checked={
                                this.props.cardSize === cardSize[3]
                                  ? true
                                  : false
                              }
                            />
                            <label htmlFor="cardSizeUn">
                              UNLIMITED LENGTH!
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
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
  dispSettings: PropTypes.bool.isRequired,
  titleFontSize: PropTypes.string.isRequired,
  defFontSize: PropTypes.string.isRequired,
  quickDefFontSize: PropTypes.string.isRequired,
  cardSize: PropTypes.string.isRequired,
  hideCompactDef: PropTypes.bool.isRequired,
  onChangeCompactDef: PropTypes.func.isRequired,
  onChangeTitleFontSize: PropTypes.func.isRequired,
  onChangeDefSize: PropTypes.func.isRequired,
  onChangeQuickDefSize: PropTypes.func.isRequired,
  onChangeCardSize: PropTypes.func.isRequired
};

export default Settings;
