import React, { Component } from "react";
import axios from "axios";

class Service extends Component {
  constructor(props) {
    super(props);
    this.data = {};
    // this.pagesEndPoint = "https://desolate-dusk-24951.herokuapp.com/api/v1/";
    this.pagesEndPoint = "https://desolate-dusk-24951.herokuapp.com/api/v1/";
  }

  // Method for getting data from the provided end point url
  api(url, method, data) {
    if (method === "GET") {
      return fetch(url, {
        credentials: "same-origin",
        method: method,
        cache: "no-cache",
        mode: "cors"
      })
        .then(res => res.json())
        .then(responseJson => {
          return responseJson;
        })
        .catch(error => {
          return { error: error };
        });
    } else {
      return fetch(url, {
        credentials: "same-origin",
        method: method,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        cache: "no-cache",
        mode: "cors",
        body: data
      })
        .then(responseJson => {
          return responseJson;
        })
        .catch(error => {
          return { error: error };
        });
    }
  }
  /* Get Data */
  getData() {
    return this.api(this.pagesEndPoint + "products", "GET");
  }
  async getData2() {
    var body = JSON.stringify({
      request: {
        header: {
          username: "21557",
          password: "s6266136"
        },
        body: {
          page_number: 1,
          page_size: 50,
          sort_by: "price",
          sort_direction: "Asc"
        }
      }
    });
    let body2 = Buffer.from(body, "ascii");

    const rawResponse = await fetch(
      "https://technet.rapaport.com/HTTP/JSON/RetailFeed/GetDiamonds.aspx",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: body2
      }
    );
    const content = await rawResponse.json();

    return content;
  }

  async order(body, token) {
    const rawResponse = await fetch(
      "https://desolate-dusk-24951.herokuapp.com/api/v1/order/create",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(body)
      }
    );
    const content = await rawResponse.json();

    return content;
  }

  async getSingleDiamond(id) {
    var body = JSON.stringify({
      request: {
        header: {
          username: "21557",
          password: "s6266136"
        },
        body: {
          page_number: 1,
          page_size: 50,
          sort_by: "price",
          sort_direction: "Asc",
          diamond_id: id
        }
      }
    });
    let body2 = Buffer.from(body, "ascii");

    const rawResponse = await fetch(
      "https://technet.rapaport.com/HTTP/JSON/RetailFeed/GetSingleDiamond.aspx ",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: body2
      }
    );
    const content = await rawResponse.json();

    return content;
  }

  /* Login */
  async login(email, password) {
    const data = {
      email: email,
      password: password
    };

    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const rawResponse = await fetch(this.pagesEndPoint + "login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: formBody
    });
    const content = await rawResponse.json();

    return content;
  }

  myInfo(token) {
    console.log(token, "tkn");
    token = String(token);
    axios
      .get("https://desolate-dusk-24951.herokuapp.com/api/v1/me", {
        headers: { "x-access-token": token }
      })
      .then(response => {
        // If request is good...
        console.log(response.data);
      })
      .catch(error => {
        console.log("error " + error);
      });
  }
}

export default Service;
