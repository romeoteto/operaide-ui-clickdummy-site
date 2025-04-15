import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Users,
  TrendingUp,
  ChevronLeft,
  Building,
  ShieldCheck,
  Palette,
} from "lucide-react";
import {
  Button,
  Layout,
  Menu,
  Flex,
  theme,
  Tooltip,
  Divider,
  Typography,
} from "antd";
import { useLocation } from "wouter";

import Breadcrumbs from "../components/breadcrumbs2";

const { Header, Sider, Content } = Layout;

const SystemAdminLayout = ({ children }) => {
  const [location, navigate] = useLocation();

  const {
    token: {
      colorBgContainer,
      colorSplit,
      marginXS,
      fontSizeSM,
      fontSizeLG,
      paddingXS,
      logo,
      signet,
      paddingSM,
    },
  } = theme.useToken();

  const findSelectedKey = (pathname, keys) => {
    return (
      keys
        .filter((key) => pathname === key || pathname.startsWith(key + "/"))
        .sort((a, b) => b.length - a.length)[0] || "/"
    );
  };

  const menuKeys = [
    "/system-admin/organizations",
    "/system-admin/all-users",
    "/system-admin/migraions",
    "/system-admin/permissions",
    "/system-admin/theme",
  ];

  /** Upper menu logic */
  const upperMenuItems = [
    {
      key: "/system-admin/organizations",
      icon: <Building size={"1em"} />,
      label: "Organizations",
    },
    {
      key: "/system-admin/all-users",
      icon: <Users size={"1em"} />,
      label: "All Users",
    },
    {
      key: "/system-admin/migrations",
      icon: <TrendingUp size={"1em"} />,
      label: "Migrations",
    },
    {
      key: "/system-admin/permissions",
      icon: <ShieldCheck size={"1em"} />,
      label: "Permissions",
    },
    {
      key: "/system-admin/theme",
      icon: <Palette size={"1em"} />,
      label: "Global Theme",
    },
  ];

  /** Upper menu logic */

  const version = "Operaide 2.1.2 (Ada)";

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        theme="light"
        width={200}
        style={{
          height: "100vh",
          maxHeight: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          borderRight: `1px solid ${colorSplit}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "58px",
          }}
        >
          <Button
            size="small"
            color="default"
            variant="link"
            icon={<ChevronLeft size="1em" />}
            onClick={() => navigate("/")}
          >
            Back to organization
          </Button>
        </div>

        <Flex
          vertical
          justify="space-between"
          style={{ height: "calc(100% - 58px)" }}
        >
          <Menu
            theme="light"
            mode="vertical"
            selectedKeys={[findSelectedKey(location, menuKeys)]}
            onClick={({ key }) => navigate(key)}
            style={{ border: "none", backgroundColor: "transparent" }}
            items={upperMenuItems}
          />
          <Flex vertical>
            <Divider style={{ margin: 0 }} />

            <Flex
              align="center"
              justify="flex-start"
              style={{
                paddingLeft: paddingSM,
                paddingRight: paddingSM,
                paddingTop: paddingXS,
                paddingBottom: paddingXS,
              }}
            >
              <Button
                color="default"
                size="small"
                variant="link"
                href="https://operaide.bettermode.io/release-announcements-nf2jhzfa"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: fontSizeSM }}
              >
                {version}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Sider>

      <Layout
        style={{
          marginLeft: 200,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header
          style={{
            position: "fixed",
            top: 0,
            left: 200,
            right: 0,
            zIndex: 100,
            padding: "0px 24px 0px 24px",
            height: 58,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Breadcrumbs />
          <img src={logo} alt="operaide logo" style={{ height: "28px" }} />
        </Header>

        <Content
          id="area"
          style={{
            marginTop: 58,
            padding: 24,
            overflowY: "auto",
            height: "calc(100vh - 58px)",
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SystemAdminLayout;
