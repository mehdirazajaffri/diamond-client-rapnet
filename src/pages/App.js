import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import Loader from "../components/Loader";

import Service from "../services/services";

import Home from "./Home";
import Diamonds from "./Diamonds";
import About from "./About";
import Cart from "./Cart";
import Checkout from "./Checkout";
import DiamondCategory from "./DiamondCategory";
import ThankYou from "./thank-you";

import { connect } from "react-redux";
import {
  addDiamondAction,
  addDiamondAllAction
} from "../actions/diamond-list-action";
import { addCartAction, removeItemAction } from "../actions/cart-action";
import { loaderAction } from "../actions/loader-action";
import {
  loginAction,
  hasTokenAction,
  logoutAction
} from "../actions/login-action";
import { bindActionCreators } from "redux";

import Cookies from "universal-cookie";

class App extends Component {
  constructor(props) {
    super(props);
    this.service = new Service();
    this.state = { show: false };

    const { loginInfo } = this.props;
    if (loginInfo.token) {
      this.props.hasToken(loginInfo.token);
    }

    const cookies = new Cookies();
    let cookieCart = cookies.get("cart");
    if (cookieCart) {
      cookieCart.map(d => this.props.addCart(d));
    }
  }
  async componentDidMount() {
    this.props.loader(true);
    let list = await this.service.getData2().then(d => {
      console.log(d, "ddd");
      this.props.loader(false);
      return d;
    });
    this.props.addDiamond(list.response.body.diamonds);
    this.props.addDiamondAll(list.response.body.diamonds);
  }

  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = () => {
    this.setState({ show: true });
  };
  render() {
    const { loginInfo } = this.props;
    return (
      <Router>
        <div>
          <Header
            cart={this.props.cart.Cart}
            remove={e => this.props.removeItem(e)}
            loginShow={() => this.handleShow()}
            logout={() => this.props.logout()}
            loginInfo={loginInfo}
          />
          <Loader />
          <Route path="/" exact component={Home} />
          <Route exact path="/diamonds/" component={Diamonds} />
          <Route path="/diamonds/:shape" component={Diamonds} />
          <Route path="/about/" component={About} />
          <Route path="/cart/" component={Cart} />
          <Route path="/checkout/" component={Checkout} />
          <Route path="/diamond-category/:id" component={DiamondCategory} />
          <Route path="/thank-you/" component={ThankYou} />
          <Footer />
          <LoginModal
            heading={this.state.modalHeading}
            content={this.state.modalContent}
            size={this.state.modalSize}
            handleClose={() => this.handleClose()}
            show={this.state.show}
          />
        </div>
      </Router>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addDiamond: addDiamondAction,
      addDiamondAll: addDiamondAllAction,
      addCart: addCartAction,
      removeItem: removeItemAction,
      login: loginAction,
      hasToken: hasTokenAction,
      logout: logoutAction,
      loader: loaderAction
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
    loginInfo: state.isLogin
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
