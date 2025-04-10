import React from "react";
import { theme } from "antd";

const Dashboard = () => {
  const {
    token: { lineWidth, borderRadiusLG, colorBorderSecondary },
  } = theme.useToken();
  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "400px",
          borderRadius: borderRadiusLG,
          border: `${lineWidth}px solid ${colorBorderSecondary}`,
        }}
      >
        Recharts placeholder
      </div>
    </div>
  );
};

export default Dashboard;
