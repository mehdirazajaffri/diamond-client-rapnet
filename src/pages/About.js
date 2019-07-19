import React, { Component } from "reactn";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = user => {
    console.log(this.global.cart);
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <button onClick={this.handleSubmit}>test</button>
      </div>
    );
  }
}

export default About;
