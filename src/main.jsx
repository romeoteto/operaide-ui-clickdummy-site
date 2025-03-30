import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./App.jsx";
import "@ant-design/v5-patch-for-react-19";

import "antd/dist/reset.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#13c2c2",
          colorInfo: "#13c2c2",
          colorBgLayout: "#fafafa",
          reaktorCard: {
            coverHeight: "200px",
            metaHeight: "99px",
            cardWidth: "240px",
          },
          reaktorList: {
            imageHeight: "80px",
            imageWidth: "100px",
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
);
