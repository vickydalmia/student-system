import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import { reducer } from "./store/reducers";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const store = createStore(reducer);

ReactDOM.render(
  <>
    <CssBaseline />
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </Provider>
  </>,
  document.getElementById("root")
);
