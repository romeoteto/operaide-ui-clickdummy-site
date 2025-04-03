import React, { useState } from "react";
import logo from "../assets/logo-light.svg";

import { Button, Layout, Menu, Input, theme } from "antd";
import {
  Store,
  Headset,
  Landmark,
  BotMessageSquare,
  Star,
  Users,
  FileText,
} from "lucide-react";
import AppInstall from "./components/appInstall";
const { Header, Sider, Content } = Layout;

const { Search } = Input;

const App = ({ children }) => {
  const {
    token: {
      colorBgContainer,
      borderRadiusLG,
      colorSplit,
      padding,
      paddingXXS,
      lineWidth,
      margin,
    },
  } = theme.useToken();

  const siderWidth = 200;
  return (
    <Layout style={{ background: colorBgContainer }}>
      <AppInstall />
      <Sider
        width={siderWidth}
        style={{
          height: "100vh",
          maxHeight: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: colorBgContainer,
          borderRight: `${lineWidth}px solid ${colorSplit}`,
        }}
      >
        <div
          style={{
            height: "58px",
            paddingLeft: "14px",
            paddingRight: "14px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src={logo} style={{ height: "28px" }} />
        </div>
        <div style={{ padding: paddingXXS, marginBottom: margin }}>
          <Search size="small" placeholder="Search app" />
        </div>

        <Menu
          theme="light"
          mode="vertical"
          defaultSelectedKeys={["discover"]}
          style={{ border: 0 }}
          items={[
            {
              key: "discover",
              icon: <Star size="1em" />,
              label: "Discover",
            },
            {
              key: "sales",
              icon: <Store size="1em" />,
              label: "Sales",
            },
            {
              key: "customer-service",
              icon: <Headset size="1em" />,
              label: "Customer Service",
            },
            {
              key: "accounting",
              icon: <Landmark size="1em" />,
              label: "Accounting",
            },
            {
              key: "chatbots",
              icon: <BotMessageSquare size="1em" />,
              label: "Chatbots",
            },
            {
              type: "divider",
            },
            {
              key: "resources",
              label: "Resources",
              type: "group",
              children: [
                {
                  key: "community",
                  icon: <Users size="1em" />,
                  label: "Community",
                },
                {
                  key: "documentation",
                  icon: <FileText size="1em" />,
                  label: "Documentation",
                },
              ],
            },
          ]}
        />
      </Sider>

      <Content
        style={{
          padding: padding,
          marginLeft: siderWidth,
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};
export default App;
