import React, { Component } from "react";

class ThankYou extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <div className="home-banner thanks-banner text-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 offset-4">
                <h1 className="hed">Thanks for you order</h1>
                <p>
                  Whether you customize your stone and setting or select from
                  our perfect pre-matched pairs, timeless diamond studs never go
                  out of style.
                </p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ThankYou;
