import React from "react";

import { Button, Layout, Menu, Input, theme } from "antd";
import {
  Store,
  Headset,
  Landmark,
  BotMessageSquare,
  Star,
  Users,
  FileText,
  ChevronLeft,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import AppInstall from "./components/appInstall";
const { Header, Sider, Content } = Layout;

const { Search } = Input;

const App = ({ children }) => {
  const [location, navigate] = useLocation();

  const {
    token: {
      colorBgContainer,
      colorSplit,
      padding,
      paddingLG,
      paddingXXS,
      lineWidth,
      margin,
      marginXXS,
    },
  } = theme.useToken();

  const siderWidth = 200;

  const menuKeys = [
    "/app-store",
    "/app-store/sales",
    "/app-store/customer-service",
    "/app-store/accounting",
    "/app-store/chatbots",
  ];

  const findSelectedKey = (pathname, keys) => {
    return (
      keys
        .filter((key) => pathname === key || pathname.startsWith(key + "/"))
        .sort((a, b) => b.length - a.length)[0] || "/"
    );
  };
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
            paddingLeft: paddingXXS,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <ChevronLeft size="1.25em" style={{ marginRight: marginXXS }} />
            Back to platform
          </Link>
        </div>
        <div style={{ padding: paddingXXS, marginBottom: margin }}>
          <Input placeholder="Search app" variant="filled" />
        </div>

        <Menu
          theme="light"
          mode="vertical"
          selectedKeys={[findSelectedKey(location, menuKeys)]}
          onClick={({ key }) => navigate(key)}
          style={{ border: 0 }}
          items={[
            {
              key: "/app-store",
              icon: <Star size="1em" />,
              label: "Discover",
            },
            {
              key: "/app-store/sales",
              icon: <Store size="1em" />,
              label: "Sales",
            },
            {
              key: "/app-store/customer-service",
              icon: <Headset size="1em" />,
              label: "Customer Service",
            },
            {
              key: "/app-store/accounting",
              icon: <Landmark size="1em" />,
              label: "Accounting",
            },
            {
              key: "/app-store/chatbots",
              icon: <BotMessageSquare size="1em" />,
              label: "Chatbots",
            },
          ]}
        />
      </Sider>

      <Content
        style={{
          padding: paddingLG,
          marginLeft: siderWidth,
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};
export default App;
