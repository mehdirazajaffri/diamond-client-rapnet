import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { loginAction } from "../actions/login-action";
import Service from "../services/services";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      semail: "",
      first_name: "",
      last_name: "",
      spassword: "",
      currentForm: "login"
    };
    this.service = new Service();
  }

  async login() {
    let { email, password } = this.state;
    if ((email, password)) {
      this.props.login(email, password);
    }
  }
  signUp() {}
  render() {
    const { heading, content, size, handleClose, show } = this.props;
    let formToggle = e => {
      this.setState({ currentForm: e });
    };
    return (
      <Modal
        {...this.props}
        show={show}
        onHide={handleClose}
        size={size ? size : "sm"}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.state.currentForm === "login" ? "Login" : "Signup"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="login-frm">
            {this.state.currentForm === "login" ? (
              <React.Fragment>
                {" "}
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
                  onClick={() => formToggle("signup")}
                >
                  Signup
                </button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {" "}
                <input
                  type="text"
                  placeholder="Last Name"
                  value={this.state.last_name}
                  onChange={e => {
                    this.setState({ last_name: e.target.value });
                  }}
                />
                <input
                  type="text"
                  placeholder="First Nname"
                  value={this.state.first_name}
                  onChange={e => {
                    this.setState({ first_name: e.target.value });
                  }}
                />
                <input
                  type="text"
                  placeholder="email"
                  value={this.state.semail}
                  onChange={e => {
                    this.setState({ semail: e.target.value });
                  }}
                />
                <input
                  type="password"
                  placeholder="password"
                  value={this.state.spassword}
                  onChange={e => {
                    this.setState({ spassword: e.target.value });
                  }}
                />
                <button type="button" onClick={() => this.signUp()}>
                  Signup
                </button>
                <button
                  className="button2"
                  type="button"
                  onClick={() => formToggle("login")}
                >
                  Login
                </button>
              </React.Fragment>
            )}
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login: loginAction }, dispatch);
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);
