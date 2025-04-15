import React from "react";

import { Layout, theme, Typography } from "antd";

import UserMenu3 from "../components/userMenu3";

const { Header, Footer, Content } = Layout;
const { Text } = Typography;

const AppExtLayout = ({ children }) => {
  const {
    token: { colorBgContainer, logo, paddingXXL },
  } = theme.useToken();

  const version = "Operaide 2.1.2 (Ada)";

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          right: 0,
          zIndex: 100,
          padding: "0px 48px 0px 48px",
          height: 58,
          background: colorBgContainer,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img src={logo} alt="operaide logo" style={{ height: "28px" }} />

        <UserMenu3 showVisitBackend />
      </Header>

      <Content
        id="area"
        style={{
          marginTop: 58,
          padding: "24px 48px",
          background: colorBgContainer,
        }}
      >
        {children}
      </Content>

      <Footer style={{ display: "flex", justifyContent: "center" }}>
        <Text style={{ textAlign: "center" }}>
          Senseca AI Platform powered by <br></br>© Operaide{" "}
          {new Date().getFullYear()}
        </Text>
      </Footer>
    </Layout>
  );
};

export default AppExtLayout;
