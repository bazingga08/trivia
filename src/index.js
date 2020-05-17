import React from "react";
import ReactDom from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import Reducers from "./reducers/index";

import App from "./App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

ReactDom.render(
  <Provider store={createStore(Reducers, enhancer)}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
