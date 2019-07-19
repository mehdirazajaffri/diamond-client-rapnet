import React, { Component } from "react";
import { connect } from "react-redux";
import { addCartAction, removeItemAction } from "../actions/cart-action";
import { bindActionCreators } from "redux";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { cart, total } = this.props;
    return (
      <section className="cat-dtail">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h2 className="mb20">Shopping Cart</h2>
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Diamond</th>
                    <th />
                    <th>SKU</th>
                    <th>Price</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {cart && cart.length
                    ? cart.map(d => {
                        return (
                          <tr>
                            <td>
                              {d.size}-Carat {d.shape} Cut Diamond{" "}
                            </td>
                            <td />
                            <td>{d.diamond_id}</td>
                            <td>
                              {d.currency_symbol}
                              {d.total_sales_price}
                            </td>
                            <td>
                              <button
                                className="chk-rem-bt"
                                onClick={() =>
                                  this.props.removeItem({ id: d.diamond_id })
                                }
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    : "No items found!"}
                </tbody>
              </table>
            </div>
            <div className="col-lg-4">
              {cart && cart.length ? (
                <div className="sb-total">
                  <h4>Sub Total</h4>
                  <table className="total-tble">
                    {cart.map(d => {
                      return (
                        <tr>
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
                          <td>FedEx Shipping</td>
                          <td className="text-right">Free</td>
                        </tr>
                        <tr>
                          <td>Total :</td>
                          <td className="text-right">${total}</td>
                        </tr>
                      </table>
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                  <button
                    className="chkout-btn"
                    onClick={() => this.props.history.push("/checkout")}
                  >
                    Checkout
                  </button>
                </div>
              ) : (
                ""
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
    { addCart: addCartAction, removeItem: removeItemAction },
    dispatch
  );
}

function mapStateToProps(state) {
  console.log(state, "state");
  return {
    cart: state.cart.Cart,
    total: state.cart.total
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
