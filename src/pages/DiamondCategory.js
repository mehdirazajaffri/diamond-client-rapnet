import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Alert } from "react-bootstrap";
import Cookies from "universal-cookie";
import { addCartAction } from "../actions/cart-action";

class DiamondCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        cert_num: "",
        clarity: "",
        color: "",
        culet_condition: "",
        culet_size: "",
        currency_code: "",
        currency_symbol: "",
        cut: "",
        depth_percent: "",
        eye_clean: "",
        fancy_color_dominant_color: "",
        fancy_color_intensity: "",
        fancy_color_overtone: "",
        fancy_color_secondary_color: "",
        fluor_color: "",
        fluor_intensity: "",
        girdle_condition: "",
        girdle_max: "",
        girdle_min: "",
        has_cert_file: "",
        has_image_file: "",
        has_sarineloupe: "",
        image_file_url: "",
        lab: "",
        meas_depth: "",
        meas_length: "",
        meas_width: "",
        polish: "",
        shape: "",
        size: "",
        stock_num: "",
        symmetry: "",
        total_sales_price: "",
        total_sales_price_in_currency: ""
      }
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getData();
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const { diamondListAll, match } = this.props;
    let list = diamondListAll;
    let id = match.params.id;

    let diamond = list.filter(d => {
      return Number(d.diamond_id) === Number(id);
    });
    diamondListAll.length ? this.setState({ data: diamond[0] }) : "";
    console.log(diamondListAll, match);
  }

  addToCart() {
    this.props.addCart(this.state.data);
    const cookies = new Cookies();
    let data = [];
    let cookieCart = cookies.get("cart");

    if (cookieCart && cookieCart.length) {
      data = [...cookieCart, this.state.data];
    } else {
      data = [this.state.data];
    }
    cookies.set("cart", data, { path: "/" });
    console.log(cookies.get("cart"));
  }

  render() {
    let {
      clarity,
      image_file_url,
      cut,
      color,
      total_sales_price,
      currency_symbol,
      size,
      shape
    } = this.state.data;
    return (
      <section className="cat-dtail">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              {image_file_url ? (
                <img src={image_file_url} className="img-fluid" />
              ) : (
                ""
              )}
            </div>
            <div className="col-lg-6">
              <h4 className="detl-hed">
                {size ? <span>{size}-Carat </span> : ""}{" "}
                {shape ? <span>{shape} Cut Diamond </span> : ""}
              </h4>
              <p>
                {cut ? <span>{cut} Cut </span> : ""} |{" "}
                {color ? <span>{color} Color </span> : ""} |{" "}
                {clarity ? <span>{clarity} Clarity </span> : ""}
              </p>
              <p className="pprice">
                {total_sales_price ? (
                  <b>
                    {currency_symbol}
                    {total_sales_price}
                  </b>
                ) : (
                  ""
                )}{" "}
              </p>
              <Alert variant="success">
                <Alert.Heading>Free Shipping, Free Returns</Alert.Heading>
                <p>
                  Order now for free delivery on Tuesday, June 18 for loose or
                  Wednesday, June 19 when set in jewelry.
                </p>
              </Alert>
              <button
                className="cart-cta mt10"
                onClick={() => this.addToCart()}
              >
                Add to cart<i className="material-icons">shopping_basket</i>
              </button>
            </div>
          </div>
          <hr />
          <div className="row mt40">
            <div className="col-lg-6">
              <h2 className="mb20">Diamond Details</h2>
              <table className="table table-striped table-hover">
                <tbody>
                  <tr>
                    <td>Shape</td>
                    <td>Round</td>
                  </tr>
                  <tr>
                    <td>Cut</td>
                    <td>Good</td>
                  </tr>
                  <tr>
                    <td>Color</td>
                    <td>I</td>
                  </tr>

                  <tr>
                    <td>Clarity</td>
                    <td>SI1</td>
                  </tr>
                  <tr>
                    <td>Carat Weight</td>
                    <td>0.23</td>
                  </tr>
                  <tr>
                    <td>Fluorescence</td>
                    <td>Faint</td>
                  </tr>
                  <tr>
                    <td>Length/Width Ratio</td>
                    <td>1.01</td>
                  </tr>
                  <tr>
                    <td>Depth %</td>
                    <td>64.5%</td>
                  </tr>
                  <tr>
                    <td>Table % </td>
                    <td>56.0%</td>
                  </tr>
                  <tr>
                    <td>Polish</td>
                    <td>Very Good</td>
                  </tr>
                  <tr>
                    <td>Symmetry</td>
                    <td>Good</td>
                  </tr>
                  <tr>
                    <td>Girdle</td>
                    <td>Thick to Very Thick</td>
                  </tr>

                  <tr>
                    <td>Culet</td>
                    <td>None</td>
                  </tr>

                  <tr>
                    <td>Measurements</td>
                    <td>3.81 x 3.83 x 2.47 mm</td>
                  </tr>
                  <tr>
                    <td>Stock Number</td>
                    <td>LD12116667</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addCart: addCartAction }, dispatch);
}

function mapStateToProps(state) {
  console.log(state);
  return {
    diamondListAll: state.diamondList.diamondListAll
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiamondCategory);
