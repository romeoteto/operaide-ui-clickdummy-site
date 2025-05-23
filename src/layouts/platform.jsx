import React, { useState } from "react";
import { useSelector } from "react-redux";
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
  FileText,
  Boxes,
  Users,
  Info,
  Store,
  Rocket,
  BotMessageSquare,
  Inbox,
} from "lucide-react";
import {
  Button,
  Layout,
  Menu,
  Flex,
  theme,
  Tooltip,
  Divider,
  Badge,
  Avatar,
} from "antd";
import { useLocation } from "wouter";

import Breadcrumbs from "../components/breadcrumbs2";
import UserMenu3 from "../components/userMenu3";

const { Header, Sider, Content } = Layout;

const PlatformLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
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
    "/",
    "/reaktor-ai-engine",
    "/reaktor-ai-engine/apps",
    "/reaktor-ai-engine/reaktors",
    "/reaktor-ai-engine/deployments",
    "/data-studio",
    "/data-studio/documents",
    "/data-studio/document-groups",
    "/data-studio/vector-db",
    "/integrations",
    "/integrations/ai-provider",
    "/integrations/services",
    "/settings",
    "/system-admin",
    "/store",
    "/elara",
  ];

  const userIsSuperAdmin = useSelector(
    (state) => state.user.currentUser.isSuperAdmin
  );

  const currentPermissions = useSelector(
    (state) => state.user.currentPermissions
  );

  const canSeeSettings =
    userIsSuperAdmin || currentPermissions.org.settings.length > 0;

  const canSeeSysAdmin =
    userIsSuperAdmin || currentPermissions.global.systemAdmin.length > 0;

  const canSeeReaktorAIEngine =
    userIsSuperAdmin ||
    currentPermissions.org.reaktors.length > 0 ||
    currentPermissions.org.deployments.length > 0;

  const canSeeDataStudio =
    userIsSuperAdmin || currentPermissions.org.dataStudio.length > 0;

  const canSeeIntegrations =
    userIsSuperAdmin || currentPermissions.org.integrations.length > 0;

  const canSeeExternalLinks =
    userIsSuperAdmin || currentPermissions.org.externalLinks.length > 0;

  const canSeeAppStore =
    userIsSuperAdmin || currentPermissions.org.appStore.length > 0;

  const canSeeElara =
    userIsSuperAdmin || currentPermissions.org.elara.length > 0;

  const canSeeApps =
    userIsSuperAdmin || currentPermissions.org.apps.includes("canViewApps");

  /** Upper menu logic */
  const upperMenuItems = [
    {
      key: "/",
      icon: <House size={"1em"} />,
      label: "Home",
    },
    ...(canSeeApps
      ? [
          {
            key: "/reaktor-ai-engine/apps",
            label: "Apps",
            icon: <Boxes size={"1em"} />,
          },
        ]
      : []),

    ...(canSeeReaktorAIEngine
      ? [
          {
            key: "/reaktor-ai-engine",
            icon: <Atom size={"1em"} />,
            label: "Reaktor AI Engine",
            children: [
              {
                key: "/reaktor-ai-engine/reaktors",
                label: "Reaktors",
                icon: <Atom size={"1em"} />,
              },
              {
                key: "/reaktor-ai-engine/deployments",
                label: "Deployments",
                icon: <Rocket size={"1em"} />,
              },
            ],
          },
        ]
      : []),
    ...(canSeeDataStudio
      ? [
          {
            key: "/data-studio",
            label: "Data Studio",
            icon: <Database size={"1em"} />,
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
        ]
      : []),
    ...(canSeeIntegrations
      ? [
          {
            key: "/integrations",
            label: "Integrations",
            icon: <Blocks size={"1em"} />,
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
        ]
      : []),

    ...(canSeeAppStore
      ? [
          {
            key: "/store",
            icon: <Store size={"1em"} />,
            label: "App Store",
          },
        ]
      : []),

    ...(canSeeSettings
      ? [
          { type: "divider" },
          {
            key: "/settings",
            label: "Settings",
            icon: <Settings2 size="1em" />,
          },
        ]
      : []),
  ];

  /** Upper menu logic */

  /** Bottom Menu Logic */

  const bottomMenuItems = [
    ...(canSeeExternalLinks
      ? [
          {
            key: "documentation",
            icon: <FileText size="1em" />,
            label: (
              <a
                href="https://staging.demo.operaide.ai/op-docs/docs/overview/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentation
              </a>
            ),
          },
          {
            key: "community",
            icon: <Users size="1em" />,
            label: (
              <a
                href="https://operaide.bettermode.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Community
              </a>
            ),
          },
        ]
      : []),

    ...(canSeeSysAdmin
      ? [
          {
            key: "/system-admin",
            icon: <MonitorCog size="1em" />,
            label: "System Admin",
            onClick: ({ key }) => navigate(key),
          },
        ]
      : []),
  ];

  /** Bottom Menu Logic */

  const version = "Operaide 2.1.2 (Ada)";

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
          transition: "all 0.2s ease-in-out",
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
            <img src={logo} alt="operaide logo" style={{ height: 28 }} />
          )}
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
            <Menu
              theme="light"
              mode="vertical"
              selectedKeys={[findSelectedKey(location, menuKeys)]}
              style={{ border: "none" }}
              items={bottomMenuItems}
            />
            <Divider style={{ margin: 0 }} />

            {collapsed ? (
              <Flex
                align="center"
                justify="center"
                style={{
                  paddingLeft: paddingXS,
                  paddingRight: paddingXS,
                  paddingTop: paddingXS,
                  paddingBottom: paddingXS,
                }}
              >
                <Tooltip placement="right" title={version}>
                  <Button
                    color="default"
                    variant="link"
                    size="small"
                    href="https://operaide.bettermode.io/release-announcements-nf2jhzfa"
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={<Info size="1em" style={{ fontSize: fontSizeLG }} />}
                  />
                </Tooltip>
              </Flex>
            ) : (
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
            )}
          </Flex>
        </Flex>
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 50 : 250,
          display: "flex",
          flexDirection: "column",
          transition: "all 0.2s ease-in-out",
        }}
      >
        <Header
          style={{
            position: "fixed",
            top: 0,
            left: collapsed ? 50 : 250,
            right: 0,
            zIndex: 100,
            padding: "0px 24px 0px 14px",
            height: 58,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.2s ease-in-out",
          }}
        >
          <Flex align="center" gap="small">
            <Button
              type="text"
              icon={<PanelLeft size={"1em"} />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: "16px" }}
            />

            <Breadcrumbs />
          </Flex>
          <Flex align="center" gap="middle">
            <Button
              color="primary"
              variant="solid"
              type="link"
              rel="noopener noreferrer"
              target="_blank"
              href="/elara"
              icon={<BotMessageSquare size="1em" />}
            >
              Ask Elara
            </Button>
            <Badge dot>
              <Avatar icon={<Inbox size="1em" />} />
            </Badge>

            <UserMenu3 showOrgSelect routeAfterChange="/" />
          </Flex>
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

export default PlatformLayout;
