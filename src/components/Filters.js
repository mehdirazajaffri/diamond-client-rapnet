import React, { Component } from "react";
import ReactDOM from "react-dom";
import DefaultModal from "../components/Modal";
import { Button } from "react-bootstrap";
import InputRange from "react-input-range";

import { connect } from "react-redux";
import {
  changeShapeAction,
  changePriceAction,
  changeCaratAction
} from "../actions/change-filter-action";
import { bindActionCreators } from "redux";

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      minPrice: 198,
      maxPrice: 1949643,
      minCarat: 0.18,
      maxCarat: 20.97,
      modalHeading: "",
      modalContent: "",
      modalSize: ""
    };
  }
  componentWillMount() {
    let fshape = this.props.fShape;
    if (fshape) {
      const options = this.props.shape;
      options.push(+fshape);
      this.props.changeShape(options);
      // this.props.filterMethod();
    }
  }
  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow(heading, content, size) {
    this.setState({
      modalHeading: heading ? heading : "Heading",
      modalContent: content ? content : "Content",
      modalSize: size ? size : "md",
      show: true
    });
  }

  changePrice = (e, s) => {
    const { minPrice, maxPrice } = this.state;
    let val = Number(e.target.value);

    if (s == "min") {
      let d = {
        min: val,
        max: this.props.price.max
      };

      val >= minPrice && val <= maxPrice && val <= this.props.price.max
        ? this.props.changePrice(d)
        : "";
    } else if (s == "max") {
      let d = {
        min: this.props.price.min,
        max: val
      };
      val <= maxPrice && val >= minPrice && val >= this.props.price.min
        ? this.props.changePrice(d)
        : "";
    }
  };

  changeCarat = (e, s) => {
    const { minCarat, maxCarat } = this.state;
    let val = Number(e.target.value);

    if (s == "min") {
      let d = {
        min: val,
        max: this.props.carat.max
      };

      val >= minCarat && val <= maxCarat && val <= this.props.carat.max
        ? this.props.changeCarat(d)
        : "";
    } else if (s == "max") {
      let d = {
        min: this.props.carat.min,
        max: val
      };
      val <= maxCarat && val >= minCarat && val >= this.props.carat.min
        ? this.props.changeCarat(d)
        : "";
    }
  };

  handleCheckChange(e) {
    const options = this.props.shape;
    let index;

    if (e.target.checked) {
      options.push(+e.target.value);
    } else {
      index = options.indexOf(+e.target.value);
      options.splice(index, 1);
    }
    this.props.changeShape(options);
  }

  render() {
    const diamondColors = [
      {
        id: "chk_j",
        name: "j",
        title: "J"
      },
      {
        id: "chk_i",
        name: "i",
        title: "I"
      },
      {
        id: "chk_h",
        name: "h",
        title: "H"
      },
      {
        id: "chk_g",
        name: "g",
        title: "G"
      },
      {
        id: "chk_f",
        name: "f",
        title: "F"
      }
    ];

    let { defaultCarat } = this.state;
    let {
      price,
      defaultShapes,
      carat,
      filterMethod,
      clearFilterMethod
    } = this.props;

    let minDefaultPrice = price.min;
    let maxDefaultPrice = price.max;

    let minDefaultCarat = carat.min;
    let maxDefaultCarat = carat.max;

    return (
      <React.Fragment>
        <section className="top-filters">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="filter-title">
                  Shape:
                  <span
                    onClick={() =>
                      this.handleShow(
                        "Shape",
                        "Diamond shape states the appearance of the stone you are looking at, it doesn’t refer to the qualities of the stone. When picking the shape, it’s all about your personal preference.",
                        "md"
                      )
                    }
                    className="tooltip-icon"
                  >
                    <i className="material-icons">help</i>
                  </span>
                </div>

                <div className="filter-content">
                  {defaultShapes.map(d => (
                    <div key={d.id} className="filter-checkbox">
                      <input
                        type="checkbox"
                        value={d.id}
                        ref={"chk" + d.id}
                        id={d.id}
                        name={d.name}
                        onChange={this.handleCheckChange.bind(this)}
                      />
                      <label htmlFor={d.id}>
                        <span
                          className={"diamond-search-sprite icon-" + d.name}
                        />
                        {d.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-5">
                <div className="filter-title">Price:</div>
                <div className="filter-content">
                  <div className="mb20">
                    <input
                      type="number"
                      value={minDefaultPrice}
                      className="range-field"
                      onChange={e => this.changePrice(e, "min")}
                    />

                    <input
                      type="number"
                      value={maxDefaultPrice}
                      className="range-field float-right"
                      onChange={e => this.changePrice(e, "max")}
                    />
                  </div>

                  <InputRange
                    maxValue={this.state.maxPrice}
                    minValue={this.state.minPrice}
                    formatLabel={value => ""}
                    value={price}
                    onChange={value => {
                      this.props.changePrice(value);
                    }}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="filter-title">
                  Carat:
                  <span
                    onClick={() =>
                      this.handleShow(
                        "Carat",
                        "Carat refers to the weight of a diamond, which is directly proportional to its size. Use the sliders or enter a value to find the range you are interested in browsing."
                      )
                    }
                    className="tooltip-icon"
                  >
                    <i className="material-icons">help</i>
                  </span>
                </div>
                <div className="filter-content">
                  <div className="mb20">
                    <input
                      type="number"
                      value={minDefaultCarat}
                      className="range-field"
                      onChange={e => this.changeCarat(e, "min")}
                    />

                    <input
                      type="number"
                      value={maxDefaultCarat}
                      className="range-field float-right"
                      onChange={e => this.changeCarat(e, "max")}
                    />
                  </div>

                  <InputRange
                    step=".5"
                    maxValue={this.state.maxCarat}
                    minValue={this.state.minCarat}
                    formatLabel={value => ""}
                    value={carat}
                    onChange={value => {
                      this.props.changeCarat(value);
                    }}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="filter-content">
                  <div className="filter-title">
                    Color:
                    <span
                      onClick={() => this.handleShow()}
                      className="tooltip-icon"
                    >
                      <i className="material-icons">help</i>
                    </span>
                  </div>
                  {diamondColors.map(d => (
                    <div key={d.id} className="filter-checkbox">
                      <input
                        type="checkbox"
                        value="shape"
                        id={d.id}
                        name={d.name}
                      />
                      <label htmlFor={d.id}>{d.title}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-lg-12 text-right mt20">
                <button
                  className="reset-btn"
                  onClick={() => clearFilterMethod()}
                >
                  Reset
                </button>

                <button className="filter-btn" onClick={() => filterMethod()}>
                  Filter
                </button>
              </div>
            </div>
          </div>

          <DefaultModal
            heading={this.state.modalHeading}
            content={this.state.modalContent}
            size={this.state.modalSize}
            handleClose={() => this.handleClose()}
            show={this.state.show}
          />
        </section>
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeShape: changeShapeAction,
      changePrice: changePriceAction,
      changeCarat: changeCaratAction
    },
    dispatch
  );
}

function mapStateToProps(state) {
  console.log(state);
  return {
    shape: state.filter.shape,
    defaultShapes: state.defaultShapes,
    price: state.filter.price,
    carat: state.filter.carat
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
