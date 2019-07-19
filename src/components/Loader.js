import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

let Loader = ({ loader }) => (loader ? <div className="loader" /> : null);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
  return {
    loader: state.loader.loader
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loader);
