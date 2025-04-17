import React, { useState } from "react";
import { Tabs, theme } from "antd";
import OrdersOverview from "./ordersOverview";
import TicketsOverview from "./ticketsOverview";

const AppFrontendOrderManager = () => {
  const [activeKey, setActiveKey] = useState("orders");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const tabItems = [
    {
      key: "orders",
      label: "Orders Overview",
      component: <OrdersOverview />,
    },
    {
      key: "chat",
      label: "Customer Service Inquiries",
      component: <TicketsOverview />,
    },
  ];

  return (
    <>
      <div
        style={{
          position: "sticky",
          top: -24,
          backgroundColor: colorBgContainer,
          zIndex: 10,
        }}
      >
        <Tabs
          items={tabItems}
          size="small"
          activeKey={activeKey}
          onTabClick={(key) => setActiveKey(key)}
        />
      </div>
      {tabItems.find((item) => item.key === activeKey)?.component}
    </>
  );
};

export default AppFrontendOrderManager;
