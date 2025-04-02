import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Router } from "wouter";

import App from "./App.jsx";
import { store } from "./state/store";
import { Provider } from "react-redux";
import "@ant-design/v5-patch-for-react-19";

import "antd/dist/reset.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>
);
