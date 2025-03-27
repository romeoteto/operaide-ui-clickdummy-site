import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./App.jsx";
import "@ant-design/v5-patch-for-react-19";
import { theme } from "antd";

import "antd/dist/reset.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#13c2c2",
          colorInfo: "#13c2c2",
          cardWidth: 240,
          cardHeight: 350,
          colorBgLayout: "#fafafa",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
);
