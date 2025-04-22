import React from "react";
import { useSelector } from "react-redux";

import { Layout, theme, Typography } from "antd";

import UserMenu3 from "../components/userMenu3";

const { Header, Footer, Content } = Layout;
const { Text } = Typography;

const AppsOnlyLayout = ({ children }) => {
  const {
    token: { colorBgContainer, logo, paddingXXL },
  } = theme.useToken();

  const currentPermissions = useSelector(
    (state) => state.user.currentPermissions
  );
  const canOnlySeeApps =
    currentPermissions.org.apps.includes("canOnlyViewApps");

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          right: 0,
          zIndex: 100,
          padding: "0px 24px",
          height: 58,
          background: colorBgContainer,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img src={logo} alt="operaide logo" style={{ height: "28px" }} />
        <UserMenu3
          showVisitBackend={!canOnlySeeApps}
          routeAfterChange="/apps"
        />
        {/**need a logic here that changing an org redirects to "/apps" */}
      </Header>

      <Content
        id="area"
        style={{
          marginTop: 58,
          padding: 24,
          background: colorBgContainer,
          minHeight: "calc(100vh - 150px)", //150px = header height + footer height
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

export default AppsOnlyLayout;
