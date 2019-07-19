import React, { Component } from "react";
import Filters from "../components/Filters";
import CardList from "../components/CardList";
import Service from "../services/services";

import { connect } from "react-redux";
import { changeShapeAction } from "../actions/change-filter-action";
import {
  addDiamondAction,
  addDiamondAllAction
} from "../actions/diamond-list-action";
import { bindActionCreators } from "redux";

class Diamonds extends Component {
  constructor(props) {
    super(props);
    this.service = new Service();
    this.state = {};
  }

  filter() {
    let shapeFilter = this.props.defaultShapes.filter(d => {
      if (!this.props.shape.length) {
        return d;
      }
      return this.props.shape.find(e => e === d.id);
    });

    let listing =
      this.props.diamondListAll &&
      this.props.diamondListAll.filter(d => {
        return (
          shapeFilter.find(e => e.title === d.shape) &&
          this.props.price.min <= d.total_sales_price_in_currency &&
          this.props.price.max >= d.total_sales_price_in_currency &&
          this.props.carat.min <= d.size &&
          this.props.carat.max >= d.size
        );
      });

    this.props.addDiamond(listing);
  }

  clearFilter() {
    this.props.addDiamond(this.props.diamondListAll);
  }

  render() {
    let shape = this.props.match.params.shape;
    return (
      <section className="cat-wrap">
        <Filters
          filterMethod={() => this.filter()}
          clearFilterMethod={() => this.clearFilter()}
          fShape={shape}
        />
        <section id="p-result" className="p-result">
          <CardList list={this.props.diamondList} />
        </section>
      </section>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { addDiamond: addDiamondAction, addDiamondAll: addDiamondAllAction },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    shape: state.filter.shape,
    price: state.filter.price,
    carat: state.filter.carat,
    defaultShapes: state.defaultShapes,
    diamondList: state.diamondList.diamondList,
    diamondListAll: state.diamondList.diamondListAll
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Diamonds);
