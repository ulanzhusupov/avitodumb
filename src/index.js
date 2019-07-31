import React from 'react';
import ReactDOM from "react-dom";
// import {Provider} from "react-redux";
// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { BrowserRouter } from "react-router-dom";
// import rootReducer from "./reducers";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <App />,
  document.getElementById('root')
);