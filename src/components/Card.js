import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { data, view } = this.props;
    return (
      <React.Fragment>
        {view === "card" ? (
          <div
            className="col-sm-6 col-md-6 col-lg-3"
            onClick={() => {
              this.props.history.push("/diamond-category/" + data.diamond_id);
              window.scrollTo(0, 0);
            }}
          >
            <div className="p-card">
              <span className="add-fav">
                <i class="material-icons">favorite_border</i>
              </span>
              {data.image_file_url ? (
                <img
                  src={data.image_file_url}
                  className="p-card-img img-fluid"
                  alt={data.imageAlt}
                />
              ) : (
                <img
                  src="https://ion.r2net.com/sgmdirect/photoID/11419248/Diamond/6822668/Diamond-round-0.7-Carat-H-VS2_3_first_.jpg"
                  className="p-card-img img-fluid"
                  alt={data.imageAlt}
                />
              )}
              <div className="p-card-content">
                <span className="p-card-title">
                  {data.shape ? data.shape : ""}
                  {data.size ? " " + data.size + " Carat" : ""}
                </span>
                {data.total_sales_price_in_currency ? (
                  <span className="p-card-price">
                    {data.currency_symbol}
                    {data.total_sales_price_in_currency}
                  </span>
                ) : (
                  ""
                )}

                <ul>
                  {data.cut ? (
                    <li>
                      <span>Cut:</span>
                      {data.cut}
                    </li>
                  ) : (
                    ""
                  )}
                  {data.color ? (
                    <li>
                      <span>Color:</span>
                      {data.color}
                    </li>
                  ) : (
                    ""
                  )}
                  {data.clarity ? (
                    <li>
                      <span>Clarity:</span>
                      {data.clarity}
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <tr
            onClick={() =>
              this.props.history.push("/diamond-category/" + data.diamond_id)
            }
          >
            <td>
              {data.image_file_url ? (
                <img
                  src={data.image_file_url}
                  className="p-card-img img-fluid"
                  alt={data.imageAlt}
                />
              ) : (
                ""
              )}
            </td>
            <td>{data.shape ? data.shape : ""}</td>
            <td>{data.size ? data.size : ""}</td>
            <td>
              {data.total_sales_price_in_currency ? (
                <React.Fragment>
                  {data.currency_symbol}
                  {data.total_sales_price_in_currency}
                </React.Fragment>
              ) : (
                ""
              )}
            </td>
            <td>{data.cut ? data.cut : ""}</td>
            <td>{data.color ? data.color : ""}</td>
            <td>{data.clarity ? data.clarity : ""}</td>
          </tr>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(Card);
