import React, { Component } from "reactn";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownActive: false
    };
  }
  toggleDropdown() {
    const currentState = this.state.dropdownActive;
    this.setState({ dropdownActive: !currentState });
  }
  render() {
    let { cart, loginShow, loginInfo, logout } = this.props;
    return (
      <header>
        <div className="top-bar clearfix">
          <div className="container">
            <div className="header-phone">
              <i className="material-icons phone-icon">call</i>{" "}
              <span className="phone-text">1-800-242-2728 | 24-7</span>
            </div>
            <div className="logo-warp">
              <a
                href="javascript:void(0)"
                onClick={() => this.props.history.push("/")}
              >
                <img
                  className="logo"
                  src="https://www.rajjewels.com/skin/frontend/default/default/images/Rajjewels-Logo.png"
                />
              </a>
            </div>

            <div className="header-auth">
              {loginInfo.user ? (
                <Dropdown className="user_drop">
                  <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                    {"Welcome " + loginInfo.user.first_name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>Order History</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => logout()}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <span className="login" onClick={() => loginShow()}>
                  <i className="material-icons account-icon">person_outline</i>{" "}
                  Login / Sign Up
                </span>
              )}

              <span className="sep">|</span>
              <span className="wishlist">
                <i className="material-icons wish-icon">favorite_border</i> Wish
                List (0)
              </span>
            </div>
          </div>
        </div>
        <nav className="clearfix">
          <div className="container">
            <div className="cart-count">
              <i
                className="material-icons"
                onClick={() => this.toggleDropdown()}
              >
                shopping_cart
              </i>
              <span className="count" onClick={() => this.toggleDropdown()}>
                {cart.length}
              </span>
              <div
                className={
                  this.state.dropdownActive ? "cart_drop active" : "cart_drop"
                }
              >
                {cart && cart.length
                  ? cart.map(d => {
                      return (
                        <div className="crt-itm">
                          <span>
                            {d.size}-Carat {d.shape} Cut Diamond{" "}
                          </span>
                          <p className="pprice">
                            {d.currency_symbol}
                            {d.total_sales_price}
                          </p>
                          <i
                            class="material-icons rem-itm"
                            onClick={() =>
                              this.props.remove({ id: d.diamond_id })
                            }
                          >
                            cancel
                          </i>
                        </div>
                      );
                    })
                  : "No item found!"}
                <button
                  className="crt-btn"
                  onClick={() => {
                    this.props.history.push("/cart");
                    this.setState({
                      dropdownActive: false
                    });
                  }}
                >
                  Cart
                </button>
                <button
                  className="crt-btn"
                  onClick={() => {
                    this.props.history.push("/checkout");
                    this.setState({
                      dropdownActive: false
                    });
                  }}
                >
                  Checkout
                </button>
              </div>
            </div>
            <div className="mg-navbar">
              <div className="mg-dropdown">
                <button className="dropbtn">Diamonds</button>
                <div className="dropdown-content">
                  <div className="mg-row">
                    <div className="container">
                      <div className="column">
                        <span className="sub-hed">SHOP DIAMONDS BY SHAPE</span>
                        <a href="/diamonds">Round</a>
                        <a href="/diamonds">Princess</a>
                        <a href="/diamonds">Oval</a>
                        <a href="/diamonds">Cushion</a>
                        <a href="/diamonds">Emerald</a>
                        <a href="/diamonds">Asscher</a>
                        <a href="/diamonds">Heart</a>
                        <a href="/diamonds">Radiant</a>
                        <a href="/diamonds">Marquise</a>
                      </div>
                      <div className="column">
                        <span className="sub-hed">BUILD YOUR OWN JEWELRY</span>
                        <a href="/diamonds">Ring</a>
                        <a href="/diamonds">Earrings</a>
                        <a href="/diamonds">Pendant</a>
                      </div>
                      <div className="column">
                        <span className="sub-hed">SERVICE & VALUE</span>
                        <a href="/diamonds">Credit Card</a>
                        <a href="/diamonds">Diamond Price Match</a>
                        <a href="/diamonds">Diamond Upgrade Program</a>
                        <a href="/diamonds">Sell Your Diamond Jewelry</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mg-dropdown d-none d-sm-block">
                <a
                  href="https://www.rajjewels.com/jewelry-jewellery/rings/solitaire-rings.html"
                  target="_blank"
                  className="dropbtn"
                >
                  Engagement Rings
                </a>
              </div>

              <div className="mg-dropdown d-none d-sm-block">
                <a
                  href="https://www.rajjewels.com/jewelry-jewellery/earring-s/diamond-earrings.html"
                  target="_blank"
                  className="dropbtn"
                >
                  Diamond Earrings
                </a>
              </div>
            </div>
            {/*<ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about/">About</Link>
              </li>
              <li>
                <Link to="/users/">Users</Link>
              </li>
            </ul>*/}
          </div>
        </nav>
      </header>
    );
  }
}

export default withRouter(Header);
