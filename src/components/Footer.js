import React, { Component } from "react";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-sm-3 col-xs-12">
              <span className="hed">SHOP</span>
              <ul className="col-list ">
                <li>
                  <a href="#">Engagement Rings</a>
                </li>
                <li>
                  <a href="#">Loose Diamonds</a>
                </li>
                <li>
                  <a href="#">Fine Jewelry</a>
                </li>
                <li>
                  <a href="#">Financing</a>
                </li>
              </ul>
            </div>

            <div className="col-sm-3 col-xs-12">
              <span className="hed">EXPLORE</span>
              <ul className="col-list ">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Education Center</a>
                </li>
                <li>
                  <a href="#">Warranties & Guarantees</a>
                </li>
              </ul>
            </div>

            <div className="col-sm-3 col-xs-12">
              <span className="hed">SERVICES</span>
              <ul className="col-list ">
                <li>
                  <a href="#">Customer Service</a>
                </li>
                <li>
                  <a href="#">Lifetime Warranty</a>
                </li>
                <li>
                  <a href="#">Free Worldwide Shipping</a>
                </li>
                <li>
                  <a href="#">Free Engraving</a>
                </li>
              </ul>
            </div>

            <div className="col-sm-3 col-xs-12">
              <span className="hed">STAY IN THE KNOW</span>
              <form>
                <input type="email" placeholder="Email" />
                <button className="sub-btn">Subscribe</button>
                <p className="mt20">
                  We'll send you latest news, updates, exclusive offers, and
                  more
                </p>
              </form>
            </div>
            <div className="col-lg-12 copy-right">
              <p className="left">© 2019 Diamonds all rights reserved.</p>
              <div className="right">
                <a href="#">Privacy Policy</a> | <a href="#">Terms Of Use</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
