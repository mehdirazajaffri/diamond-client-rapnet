import React from "react";
import ReactDOM from "react-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import App from "./pages/App";
import "./assets/bootstrap.min.css";
import "./assets/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

// create middlewares
const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware);

// create store
const store = createStore(rootReducer, middleware);

// run saga middleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <ParallaxProvider>
      <App />
    </ParallaxProvider>
  </Provider>,
  document.getElementById("root")
);
