import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";

import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

import {
  Button,
  Layout,
  Flex,
  Typography,
  Dropdown,
  Avatar,
  Tooltip,
  theme,
} from "antd";
import { Conversations, Sender, Bubble } from "@ant-design/x";

import {
  PanelLeft,
  Bot,
  BotMessageSquare,
  Trash2,
  PenLine,
  Archive,
  UserPlus,
  Atom,
  MessageSquare,
  User,
  ChevronRight,
  TextSearch,
  Share2,
} from "lucide-react";

import { apps } from "../../database/apps";

import UserMenu3 from "../../components/userMenu3";
import Breadcrumbs from "../../components/breadcrumbs2";

import iconMistral from "./assets/icon_mistral.png";
import iconOpenAI from "./assets/icon_open-ai.png";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const PageElara = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);

  const currentUser = useSelector((state) => state.user.currentUser);

  const {
    token: {
      colorBgContainer,
      colorSplit,
      logo,
      borderRadius,
      colorPrimary,
      colorTextQuaternary,
      fontSize,
    },
  } = theme.useToken();

  const version = "Operaide 2.1.2 (Ada)";

  const screens = useBreakpoint();

  const conversationItems = Array.from({ length: 6 }).map((_, index) => {
    const timestamp = index <= 3 ? 1732204800000 : 1732204800000 - 60 * 60 * 24;
    return {
      key: `item${index + 1}`,
      label: `Conversation ${timestamp + index * 60 * 60}`,
      timestamp: timestamp + index * 60 * 60,
      group: index <= 3 ? "Today" : "Yesterday",
    };
  });
  const groupable = {
    sort(a, b) {
      if (a === b) return 0;
      return a === "Today" ? -1 : 1;
    },
    title: (group, { components: { GroupTitle } }) =>
      group ? <GroupTitle>{group}</GroupTitle> : <GroupTitle />,
  };

  const elaraDeployments = apps.flatMap((app) =>
    app.blueprints
      .filter((blueprint) => blueprint.enablesElara)
      .flatMap((blueprint) => blueprint.deployments)
  );

  const dropdownDeploymentItems = elaraDeployments.map((deployment) => ({
    key: deployment.id,
    label: deployment.label,
    icon: <Atom size="1em" />,
  }));

  const menuConfig = (conversation) => ({
    items: [
      {
        label: "Invite others",
        key: "invite",
        icon: <UserPlus size="1em" />,
      },
      { type: "divider" },
      {
        label: "Share",
        key: "share",
        icon: <Share2 size="1em" />,
      },
      {
        label: "Rename",
        key: "rename",
        icon: <PenLine size="1em" />,
      },
      {
        label: "Archive",
        key: "archive",
        icon: <Archive size="1em" />,
      },
      {
        label: "Delete",
        key: "delete",
        icon: <Trash2 size="1em" />,
        danger: true,
      },
    ],
  });

  const dropdownItems = [
    ...dropdownDeploymentItems,
    { type: "divider" },
    {
      key: "baseChat",
      label: "Base Chat",
      icon: (
        <span>
          <MessageSquare size={fontSize} style={{ marginBottom: "-0.4em" }} />
        </span>
      ),
      children: [
        {
          key: "OpenAI",
          label: "OpenAI",
          icon: (
            <Avatar
              shape="square"
              style={{ borderRadius: 0 }}
              size={14}
              src={<img src={iconOpenAI} alt="avatar" />}
            />
          ),
        },
        {
          key: "Mistral",
          label: "Mistral",
          icon: (
            <Avatar
              shape="square"
              style={{ borderRadius: 0 }}
              size={14}
              src={<img src={iconMistral} alt="avatar" />}
            />
          ),
        },
      ],
    },
    { type: "divider" },
    {
      key: "groupChat",
      label: "Group Chat",
      icon: <UserPlus size="1em" />,
    },
  ];

  const rolesAsObject = {
    ai: {
      placement: "start",
      typing: { step: 5, interval: 20 },
      avatar: { icon: <Bot size="1em" />, style: { background: colorPrimary } },
      header: "TechDB Chat",
      styles: {
        content: {
          background: "transparent",
          padding: 0,
        },
        header: { color: colorTextQuaternary },
      },
    },
    user: {
      placement: "end",
      shape: "corner",
      /*       avatar: { icon: <User size="1em" /> },
      header: currentUser.prename, */
      styles: { header: { color: colorTextQuaternary } },
    },
  };

  const listRef = useRef(null);
  const [count, setCount] = useState(3);

  return (
    <Layout
      style={{
        height: "100vh",
        background: colorBgContainer,
      }}
    >
      <Sider
        theme="light"
        width={250}
        style={{
          position: "fixed",
          right: collapsed ? -250 : 0,
          transition: "all 0.2s ease-in-out",
          top: 0,
          bottom: 0,
          borderLeft: `1px solid ${colorSplit}`,
          zIndex: 0,
        }}
      >
        <Conversations
          items={conversationItems}
          defaultActiveKey="item1"
          groupable={groupable}
          menu={menuConfig}
          style={{
            width: "100%",
            background: colorBgContainer,
            borderRadius: borderRadius,
          }}
        />
      </Sider>
      <Layout
        style={{
          height: "100vh",
          background: colorBgContainer,
          marginRight: collapsed ? 0 : 250,
          transition: "all 0.2s ease-in-out",
          zIndex: 10,
        }}
      >
        <Header
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            left: 0,
            zIndex: 100,
            padding: "0px 14px",
            height: 58,
            background: screens.xl ? "transparent" : colorBgContainer,
            transition: "all 0.2s ease-in-out",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginRight: collapsed ? 0 : 250,
          }}
        >
          <Flex align="center">
            <img src={logo} alt="operaide logo" style={{ height: "28px" }} />
          </Flex>
          <Flex align="center" gap="small">
            <Dropdown
              placement="bottomRight"
              menu={{
                items: dropdownItems,
                expandIcon: (
                  <span>
                    <ChevronRight
                      size="1em"
                      style={{ marginBottom: "-0.125em" }}
                    />
                  </span>
                ),
              }}
            >
              <Button
                type="text"
                icon={<BotMessageSquare size={"1em"} />}
                style={{ fontSize: "16px" }}
                shape="circle"
              />
            </Dropdown>
            <Tooltip title="Invite others">
              <Button
                type="text"
                shape="circle"
                icon={<UserPlus size="1em" />}
              />
            </Tooltip>
            <Tooltip title="Share with others">
              <Button type="text" shape="circle" icon={<Share2 size="1em" />} />
            </Tooltip>
            <Tooltip title="History">
              <Button
                type="text"
                shape="circle"
                icon={<TextSearch size="1em" />}
                onClick={() => setCollapsed(!collapsed)}
              />
            </Tooltip>
            <UserMenu3 showOrgSelect routeAfterChange="/elara" />
          </Flex>
        </Header>
        <Content
          style={{
            padding: 0,
            background: colorBgContainer,
            height: "calc(100vh - 58px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Scrollable bubble area */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            <Flex
              justify="center"
              style={{
                padding: "0px 24px",
                height: "100%",
              }}
            >
              <Bubble.List
                ref={listRef}
                style={{
                  flexGrow: 1,
                  maxWidth: 766,
                  paddingBottom: 36,
                  marginTop: screens.xl ? 0 : 58,
                  transition: "all 0.2s ease-in-out",
                }}
                roles={rolesAsObject}
                items={Array.from({ length: count }).map((_, i) => {
                  const isAI = !!(i % 2);
                  const content = isAI
                    ? "Mock AI content. ".repeat(20)
                    : "Mock user content.";
                  return { key: i, role: isAI ? "ai" : "user", content };
                })}
              />
            </Flex>
          </div>

          {/* Sender stays pinned at bottom */}
          <div
            style={{
              padding: "0 24px 24px",
            }}
          >
            <Flex justify="center">
              <Sender
                style={{
                  maxWidth: 766,
                  width: "100%",
                  marginTop: "-12px",
                  background: colorBgContainer,
                }}
                placeholder="Ask anything"
                onSubmit={() => {
                  setCount((i) => i + 1);
                }}
              />
            </Flex>
          </div>
        </Content>
      </Layout>{" "}
    </Layout>
  );
};

export default PageElara;
