import React, { Component } from "react";

import { connect } from "react-redux";
import { changeListViewAction } from "../actions/change-filter-action";
import { bindActionCreators } from "redux";

import Card from "./Card";

class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    function notFound() {
      return { __html: "No Diamond Found" };
    }
    const { list } = this.props;
    return (
      <div className="p-card-row">
        <div className="container">
          <div className="mb20">
            <span className="search-result">
              Search results <b>({list ? list.length : "0"})</b>
            </span>

            <span className="sort-result">
              <i
                className={
                  this.props.listView == "card"
                    ? "material-icons active"
                    : "material-icons"
                }
                onClick={() => this.props.changeListView("card")}
              >
                view_module
              </i>
              <i
                className={
                  this.props.listView == "list"
                    ? "material-icons active"
                    : "material-icons"
                }
                onClick={() => this.props.changeListView("list")}
              >
                view_list
              </i>
            </span>
          </div>
          {this.props.listView === "card" ? (
            <div className="row">
              {list && list.length ? (
                list.map(d => <Card data={d} view={this.props.listView} />)
              ) : (
                <div
                  className="col-lg-12"
                  dangerouslySetInnerHTML={notFound()}
                />
              )}
            </div>
          ) : (
            <div className="table-responsive table-list">
              <table className="table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Shape</th>
                    <th>Carat</th>
                    <th>Price</th>
                    <th>Cut</th>
                    <th>Color</th>
                    <th>Clarity</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(d => (
                    <Card data={d} view={this.props.listView} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeListView: changeListViewAction }, dispatch);
}

function mapStateToProps(state) {
  return {
    listView: state.filter.listView
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardList);
