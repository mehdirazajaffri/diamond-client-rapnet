import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addCartAction,
  removeItemAction,
  removeAllItemsAction
} from "../actions/cart-action";
import { loginAction } from "../actions/login-action";
import { loaderAction } from "../actions/loader-action";
import { bindActionCreators } from "redux";
import Service from "../services/services";
import Cookies from "universal-cookie";
var client = require("braintree-web/client");
var hostedFields = require("braintree-web/hosted-fields");
var dropin = require("braintree-web-drop-in");


class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      pay: false,
      payload: []
    };
    this.service = new Service();

    dropin.create(
      {
        authorization: "sandbox_9sgzmfrr_g65dvh9jtws9ckf4",
        container: "#dropin-container",
        paypal: {
          flow: "vault"
        }
      },
      (err, clientInstance) => {
        this.setState({ clientInstance: clientInstance });
      }
    );
  }
  pay() {
    console.log(this.state.clientInstance);
    this.state.clientInstance.requestPaymentMethod(function(
      requestPaymentMethodErr,
      payload
    ) {
      console.log(requestPaymentMethodErr, payload, "ttr");
    });
  }

  componentDidMount() {
    this.props.loader(true);
    this.props.cart.map(c => {
      this.service.getSingleDiamond(c.diamond_id).then(d => {
        let data = d.response.body.diamond;
        let seller = d.response.body.seller;
        data = { ...data, seller };
        let payload = this.state.payload;
        this.setState({ payload: [...payload, data] });
      });
    });
    this.props.loader(false);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cart !== this.props.cart) {
      this.setState({ payload: [] });
      this.props.loader(true);
      this.props.cart.map(c => {
        this.service.getSingleDiamond(c.diamond_id).then(d => {
          let data = d.response.body.diamond;
          let seller = d.response.body.seller;
          data = { ...data, seller };
          let payload = this.state.payload;
          this.setState({ payload: [...payload, data] });
        });
      });
      this.props.loader(false);
    }
  }

  login() {
    let { email, password } = this.state;
    if ((email, password)) {
      this.props.login(email, password);
    }
  }

  async order() {
    console.log(this.state.payload);
    this.props.loader(true);
    await this.service
      .order(this.state.payload, this.props.loginInfo.token)
      .then(d => {
        if (d.order.insertedCount > 0) {
          this.props.removeAllItems();
          const cookies = new Cookies();
          cookies.set("cart", [], { path: "/" });
          this.props.history.push("/thank-you");
          window.scrollTo(0, 0);
        }
        this.props.loader(false);
      });
  }

  render() {
    let { cart, total, loginInfo } = this.props;
    return (
      <section className="cat-dtail">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              {cart && cart.length ? (
                <div className="sb-total">
                  <h4>Order Summary</h4>
                  <table className="total-tble">
                    {cart.map(d => {
                      return (
                        <tr>
                          <td style={{ width: "50px" }}>
                            {d.image_file_url ? (
                              <img
                                src={d.image_file_url}
                                className="img-fluid"
                              />
                            ) : (
                              ""
                            )}
                          </td>
                          <td>
                            {d.size}-Carat {d.shape} Cut Diamond{" "}
                          </td>
                          <td className="text-right">
                            {d.currency_symbol}
                            {d.total_sales_price}
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                  {total ? (
                    <React.Fragment>
                      <hr />
                      <table className="total-tble">
                        <tr>
                          <td>Total to be paid :</td>
                          <td className="text-right">${total}</td>
                        </tr>
                      </table>
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="col-lg-6">
              {!loginInfo.user ? (
                <div className="sb-total">
                  <h4>Sign In To Checkout</h4>

                  <form className="login-frm login-checkout">
                    <input
                      type="text"
                      placeholder="email"
                      value={this.state.email}
                      onChange={e => {
                        this.setState({ email: e.target.value });
                        console.log(this.state.email);
                      }}
                    />
                    <input
                      type="password"
                      placeholder="password"
                      value={this.state.password}
                      onChange={e => {
                        this.setState({ password: e.target.value });
                        console.log(this.state.password);
                      }}
                    />
                    <button type="button" onClick={() => this.login()}>
                      Login
                    </button>

                    <button
                      className="button2"
                      type="button"
                      onClick={() => this.login()}
                    >
                      Signup
                    </button>
                  </form>
                </div>
              ) : (
                <div className="sb-total">
                  <h4>Payment Method</h4>
                  <div id="dropin-container" />
                  <button onClick={() => this.pay()} className="pay-btn">
                    Continue
                  </button>
                  <label for="paypal">
                    <input
                      id="paypal"
                      type="radio"
                      name="payment-method"
                      value="paypal"
                      className="pay-radio"
                      onChange={() => {
                        this.setState({ pay: false });
                        alert("Paypal Checkout");
                      }}
                    />
                    <img
                      style={{ cursor: "pointer" }}
                      className="img-fluid"
                      src={require("../assets/img/paypal.gif")}
                    />
                  </label>

                  <hr />

                  <label for="card">
                    <input
                      id="card"
                      type="radio"
                      name="payment-method"
                      value="card"
                      className="pay-radio"
                      onChange={() => this.setState({ pay: true })}
                    />
                    <img
                      style={{ cursor: "pointer", width: "170px" }}
                      className="img-fluid"
                      src={require("../assets/img/cards.jpg")}
                    />
                  </label>
                  {this.state.pay ? (
                    <React.Fragment>
                      <h4 className="mt30">Shipping & Billing</h4>
                      <form>
                        <div className="row">
                          <div className="col-lg-6">
                            <input
                              type="text"
                              placeholder="First Name"
                              value={this.state.first_name}
                              onChange={e => {
                                this.setState({ first_name: e.target.value });
                              }}
                            />
                          </div>
                          <div className="col-lg-6">
                            <input
                              type="text"
                              placeholder="Last Name"
                              value={this.state.last_name}
                              onChange={e => {
                                this.setState({ last_name: e.target.value });
                              }}
                            />
                          </div>
                          <div className="col-lg-6">
                            <input
                              type="text"
                              placeholder="Company"
                              value={this.state.company}
                              onChange={e => {
                                this.setState({ company: e.target.value });
                              }}
                            />
                          </div>

                          <div className="col-lg-6">
                            <input
                              type="text"
                              placeholder="Address"
                              value={this.state.address}
                              onChange={e => {
                                this.setState({ address: e.target.value });
                              }}
                            />
                          </div>
                          <div className="col-lg-6">
                            <input
                              type="text"
                              placeholder="City"
                              value={this.state.city}
                              onChange={e => {
                                this.setState({ city: e.target.value });
                              }}
                            />
                          </div>
                          <div className="col-lg-6">
                            <select
                              value={this.state.country}
                              onChange={e => {
                                this.setState({ country: e.target.value });
                              }}
                            >
                              <option>City</option>
                              <option value="us">United states</option>
                            </select>
                          </div>
                          <div className="col-lg-6">
                            <select
                              value={this.state.state}
                              onChange={e => {
                                this.setState({ state: e.target.value });
                              }}
                            >
                              <option value="">State</option>
                              <option value="1" title="Alabama">
                                Alabama
                              </option>
                              <option value="2" title="Alaska">
                                Alaska
                              </option>
                              <option value="3" title="American Samoa">
                                American Samoa
                              </option>
                              <option value="4" title="Arizona">
                                Arizona
                              </option>
                              <option value="5" title="Arkansas">
                                Arkansas
                              </option>
                              <option value="6" title="Armed Forces Africa">
                                Armed Forces Africa
                              </option>
                              <option value="7" title="Armed Forces Americas">
                                Armed Forces Americas
                              </option>
                              <option value="8" title="Armed Forces Canada">
                                Armed Forces Canada
                              </option>
                              <option value="9" title="Armed Forces Europe">
                                Armed Forces Europe
                              </option>
                              <option
                                value="10"
                                title="Armed Forces Middle East"
                              >
                                Armed Forces Middle East
                              </option>
                              <option value="11" title="Armed Forces Pacific">
                                Armed Forces Pacific
                              </option>
                              <option value="12" title="California">
                                California
                              </option>
                              <option value="13" title="Colorado">
                                Colorado
                              </option>
                              <option value="14" title="Connecticut">
                                Connecticut
                              </option>
                              <option value="15" title="Delaware">
                                Delaware
                              </option>
                              <option value="16" title="District of Columbia">
                                District of Columbia
                              </option>
                              <option
                                value="17"
                                title="Federated States Of Micronesia"
                              >
                                Federated States Of Micronesia
                              </option>
                              <option value="18" title="Florida">
                                Florida
                              </option>
                              <option value="19" title="Georgia">
                                Georgia
                              </option>
                              <option value="20" title="Guam">
                                Guam
                              </option>
                              <option value="21" title="Hawaii">
                                Hawaii
                              </option>
                              <option value="22" title="Idaho">
                                Idaho
                              </option>
                              <option value="23" title="Illinois">
                                Illinois
                              </option>
                              <option value="24" title="Indiana">
                                Indiana
                              </option>
                              <option value="25" title="Iowa">
                                Iowa
                              </option>
                              <option value="26" title="Kansas">
                                Kansas
                              </option>
                              <option value="27" title="Kentucky">
                                Kentucky
                              </option>
                              <option value="28" title="Louisiana">
                                Louisiana
                              </option>
                              <option value="29" title="Maine">
                                Maine
                              </option>
                              <option value="30" title="Marshall Islands">
                                Marshall Islands
                              </option>
                              <option value="31" title="Maryland">
                                Maryland
                              </option>
                              <option value="32" title="Massachusetts">
                                Massachusetts
                              </option>
                              <option value="33" title="Michigan">
                                Michigan
                              </option>
                              <option value="34" title="Minnesota">
                                Minnesota
                              </option>
                              <option value="35" title="Mississippi">
                                Mississippi
                              </option>
                              <option value="36" title="Missouri">
                                Missouri
                              </option>
                              <option value="37" title="Montana">
                                Montana
                              </option>
                              <option value="38" title="Nebraska">
                                Nebraska
                              </option>
                              <option value="39" title="Nevada">
                                Nevada
                              </option>
                              <option value="40" title="New Hampshire">
                                New Hampshire
                              </option>
                              <option value="41" title="New Jersey">
                                New Jersey
                              </option>
                              <option value="42" title="New Mexico">
                                New Mexico
                              </option>
                              <option value="43" title="New York">
                                New York
                              </option>
                              <option value="44" title="North Carolina">
                                North Carolina
                              </option>
                              <option value="45" title="North Dakota">
                                North Dakota
                              </option>
                              <option
                                value="46"
                                title="Northern Mariana Islands"
                              >
                                Northern Mariana Islands
                              </option>
                              <option value="47" title="Ohio">
                                Ohio
                              </option>
                              <option value="48" title="Oklahoma">
                                Oklahoma
                              </option>
                              <option value="49" title="Oregon">
                                Oregon
                              </option>
                              <option value="50" title="Palau">
                                Palau
                              </option>
                              <option value="51" title="Pennsylvania">
                                Pennsylvania
                              </option>
                              <option value="52" title="Puerto Rico">
                                Puerto Rico
                              </option>
                              <option value="53" title="Rhode Island">
                                Rhode Island
                              </option>
                              <option value="54" title="South Carolina">
                                South Carolina
                              </option>
                              <option value="55" title="South Dakota">
                                South Dakota
                              </option>
                              <option value="56" title="Tennessee">
                                Tennessee
                              </option>
                              <option value="57" title="Texas">
                                Texas
                              </option>
                              <option value="58" title="Utah">
                                Utah
                              </option>
                              <option value="59" title="Vermont">
                                Vermont
                              </option>
                              <option value="60" title="Virgin Islands">
                                Virgin Islands
                              </option>
                              <option value="61" title="Virginia">
                                Virginia
                              </option>
                              <option value="62" title="Washington">
                                Washington
                              </option>
                              <option value="63" title="West Virginia">
                                West Virginia
                              </option>
                              <option value="64" title="Wisconsin">
                                Wisconsin
                              </option>
                              <option value="65" title="Wyoming">
                                Wyoming
                              </option>
                            </select>
                          </div>
                          <div className="col-lg-6">
                            <input
                              type="text"
                              placeholder="Zip Code"
                              value={this.state.zip}
                              onChange={e => {
                                this.setState({ zip: e.target.value });
                              }}
                            />
                          </div>
                          <div className="col-lg-6">
                            <input
                              type="text"
                              placeholder="Mobile"
                              value={this.state.mobile}
                              onChange={e => {
                                this.setState({ mobile: e.target.value });
                              }}
                            />
                          </div>
                        </div>
                      </form>
                      <h4 className="mt30">Payment Details</h4>
                      <div className="row">
                        <div className="col-lg-6">
                          <select
                            value={this.state.cardType}
                            onChange={e => {
                              this.setState({ cardType: e.target.value });
                            }}
                          >
                            <option>Card Type</option>
                            <option cardtypeid="1">Visa</option>
                            <option cardtypeid="5">Mastercard</option>
                            <option cardtypeid="2">Amex</option>
                            <option cardtypeid="6">Other</option>
                          </select>
                        </div>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            placeholder="Card Number"
                            value={this.state.cardNumber}
                            onChange={e => {
                              this.setState({ cardNumber: e.target.value });
                            }}
                          />
                        </div>
                        <div className="col-lg-6">
                          <select
                            value={this.state.expMonth}
                            onChange={e => {
                              this.setState({ expMonth: e.target.value });
                            }}
                          >
                            <option>Expiration Month</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                          </select>
                        </div>
                        <div className="col-lg-6">
                          <select
                            value={this.state.cardType}
                            onChange={e => {
                              this.setState({ cardType: e.target.value });
                            }}
                          >
                            <option>Expiration Year</option>
                            <option>2018</option>
                            <option>2019</option>
                            <option>2020</option>
                            <option>2021</option>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                            <option>2025</option>
                            <option>2026</option>
                            <option>2027</option>
                            <option>2028</option>
                            <option>2029</option>
                            <option>2030</option>
                            <option>2031</option>
                            <option>2032</option>
                            <option>2033</option>
                            <option>2034</option>
                            <option>2035</option>
                          </select>
                        </div>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            placeholder="CID"
                            value={this.state.cid}
                            onChange={e => {
                              this.setState({ cid: e.target.value });
                            }}
                          />
                        </div>
                        <div className="col-lg-12">
                          <button
                            className="pay-btn"
                            onClick={() => this.order()}
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCart: addCartAction,
      removeItem: removeItemAction,
      removeAllItems: removeAllItemsAction,
      login: loginAction,
      loader: loaderAction
    },
    dispatch
  );
}

function mapStateToProps(state) {
  console.log(state, "state");
  return {
    cart: state.cart.Cart,
    total: state.cart.total,
    loginInfo: state.isLogin
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
