import React, { useState } from "react";
import {
  House,
  Atom,
  PanelLeft,
  Files,
  FolderOpen,
  Database,
  Brain,
  Blocks,
  Settings2,
  MonitorCog,
} from "lucide-react";
import { Button, Layout, Menu, Tag, Flex, theme } from "antd";
import { useLocation } from "wouter";

import logo from "./assets/logo.svg";
import signet from "./assets/signet.svg";
import UserMenu from "./components/userMenu";
import Breadcrumbs from "./components/breadcrumbs";

const { Header, Sider, Content } = Layout;

const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [location, navigate] = useLocation();
  const {
    token: { colorBgContainer, colorSplit, marginXS },
  } = theme.useToken();

  const findSelectedKey = (pathname, keys) => {
    return (
      keys
        .filter((key) => pathname === key || pathname.startsWith(key + "/"))
        .sort((a, b) => b.length - a.length)[0] || "/"
    );
  };

  const mainMenuKeys = [
    "/",
    "/reaktor-ai-engine",
    "/data-studio",
    "/data-studio/documents",
    "/data-studio/document-groups",
    "/data-studio/vector-db",
    "/integrations",
    "/integrations/ai-provider",
    "/integrations/services",
  ];

  const settingsMenuKeys = ["/settings", "/system-admin"];

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        theme="light"
        collapsible
        collapsed={collapsed}
        collapsedWidth={50}
        width={250}
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
            justifyContent: collapsed && "center",
            height: "58px",
            padding: collapsed ? "0" : "0px 14px 0px 14px",
          }}
        >
          {collapsed ? (
            <img
              src={signet}
              alt="operaide signet"
              style={{ height: "28px" }}
            />
          ) : (
            <img src={logo} alt="operaide logo" style={{ height: "28px" }} />
          )}
        </div>

        <Flex
          vertical
          justify="space-between"
          style={{ height: "calc(100% - 58px)" }}
        >
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[findSelectedKey(location, mainMenuKeys)]}
            onClick={({ key }) => navigate(key)}
            style={{ border: "none", backgroundColor: "transparent" }}
            items={[
              {
                key: "/",
                icon: <House size={"1em"} />,
                label: "Home",
              },
              {
                key: "/reaktor-ai-engine",
                icon: <Atom size={"1em"} />,
                label: "Reaktor AI Engine",
              },
              {
                key: "/data-studio",
                label: "Data Studio",
                icon: collapsed && <Database size={"1em"} />,
                type: !collapsed && "group",
                children: [
                  {
                    key: "/data-studio/documents",
                    label: "Documents",
                    icon: <Files size={"1em"} />,
                  },
                  {
                    key: "/data-studio/document-groups",
                    label: "Document Groups",
                    icon: <FolderOpen size={"1em"} />,
                  },
                  {
                    key: "/data-studio/vector-db",
                    label: "VectorDB",
                    icon: <Database size={"1em"} />,
                  },
                ],
              },
              {
                key: "/integrations",
                label: !collapsed && "Integrations",
                icon: collapsed && <Blocks size={"1em"} />,
                type: !collapsed && "group",
                children: [
                  {
                    key: "/integrations/ai-provider",
                    label: "AI Provider",
                    icon: <Brain size={"1em"} />,
                  },
                  {
                    key: "/integrations/services",
                    label: "Services",
                    icon: <Blocks size={"1em"} />,
                  },
                ],
              },
            ]}
          />
          <Flex vertical>
            <Menu
              theme="light"
              mode="inline"
              selectedKeys={[findSelectedKey(location, settingsMenuKeys)]}
              onClick={({ key }) => navigate(key)}
              style={{ border: "none" }}
              items={[
                {
                  key: "/settings",
                  icon: <Settings2 size={"1em"} />,
                  label: "Settings",
                },
                {
                  key: "/system-admin",
                  icon: <MonitorCog size={"1em"} />,
                  label: "System Admin",
                },
              ]}
            />
          </Flex>
        </Flex>
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 50 : 250,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header
          style={{
            position: "fixed",
            top: 0,
            left: collapsed ? 50 : 250,
            right: 0,
            zIndex: 1,
            padding: "0px 14px 0px 14px",
            height: 58,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Flex align="center">
            <Button
              type="text"
              icon={<PanelLeft size={"1em"} />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: "14px" }}
            />
            <div style={{ marginLeft: marginXS }}>
              <Breadcrumbs />
            </div>
          </Flex>
          <Flex>
            <Flex align="center">
              <Tag color="magenta">Super Admin</Tag>
            </Flex>
            <UserMenu />
          </Flex>
        </Header>

        <Content
          style={{
            marginTop: 58,
            padding: "0px 24px 24px 24px",
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

export default AppLayout;
