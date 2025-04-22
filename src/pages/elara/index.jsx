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
  Input,
  Space,
  Divider,
  Drawer,
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
  Menu,
  MessageSquare,
  User,
  ChevronRight,
  Paperclip,
  TextSearch,
  Share2,
  SquarePen,
  Mic,
  ArrowUp,
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
  const [currentChat, setCurrentChat] = useState("TechDB Chat");

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
      paddingSM,
      colorText,
      paddingXS,
      fontSizeLG,
    },
  } = theme.useToken();

  const version = "Operaide 2.1.2 (Ada)";

  const screens = useBreakpoint();

  const ResponsiveLabel = ({ children }) => (
    <span style={{ fontSize: !screens.md && fontSizeLG }}>{children}</span>
  );

  const conversationItems = Array.from({ length: 6 }).map((_, index) => {
    const timestamp = index <= 3 ? 1732204800000 : 1732204800000 - 60 * 60 * 24;
    return {
      key: `item${index + 1}`,
      label: (
        <Text style={{ fontSize: !screens.md && fontSizeLG }}>
          Conv {timestamp + index * 60 * 60}
        </Text>
      ),
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
    label: <ResponsiveLabel>{deployment.label}</ResponsiveLabel>,
    icon: (
      <Atom
        size="1em"
        style={{ fontSize: !screens.md ? fontSizeLG : fontSize }}
      />
    ),
  }));

  const menuConfig = () => ({
    items: [
      {
        label: <ResponsiveLabel>Invite others</ResponsiveLabel>,
        key: "invite",
        icon: (
          <UserPlus
            size="1em"
            style={{ fontSize: !screens.md ? fontSizeLG : fontSize }}
          />
        ),
      },
      { type: "divider" },
      {
        label: <ResponsiveLabel>Share </ResponsiveLabel>,
        key: "share",
        icon: (
          <Share2
            size="1em"
            style={{ fontSize: !screens.md ? fontSizeLG : fontSize }}
          />
        ),
      },
      {
        label: <ResponsiveLabel>Rename</ResponsiveLabel>,
        key: "rename",
        icon: (
          <PenLine
            size="1em"
            style={{ fontSize: !screens.md ? fontSizeLG : fontSize }}
          />
        ),
      },
      {
        label: <ResponsiveLabel>Archive</ResponsiveLabel>,
        key: "archive",
        icon: (
          <Archive
            size="1em"
            style={{ fontSize: !screens.md ? fontSizeLG : fontSize }}
          />
        ),
      },
      {
        label: <ResponsiveLabel>Delete</ResponsiveLabel>,
        key: "delete",
        icon: (
          <Trash2
            size="1em"
            style={{ fontSize: !screens.md ? fontSizeLG : fontSize }}
          />
        ),
        danger: true,
      },
    ],
  });

  const dropdownItems = [
    ...dropdownDeploymentItems,
    { type: "divider" },
    {
      key: "baseChat",
      label: <ResponsiveLabel>Base Chat</ResponsiveLabel>,
      icon: (
        <span>
          <MessageSquare
            size="1em"
            style={{
              marginBottom: !screens.md ? "-0.45em" : "-0.4em",
              fontSize: !screens.md ? fontSizeLG : fontSize,
            }}
          />
        </span>
      ),
      children: [
        {
          key: "gpt",
          label: <ResponsiveLabel>GPT-4o</ResponsiveLabel>,
          icon: (
            <Flex
              justify="center"
              align="center"
              style={{
                height: !screens.md ? fontSizeLG : fontSize,
                width: !screens.md ? fontSizeLG : fontSize,
                overflow: "hidden",
              }}
            >
              <img
                src={iconOpenAI}
                alt="avatar"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Flex>
          ),
        },

        {
          key: "mistrals",
          label: <ResponsiveLabel>Mistral Large</ResponsiveLabel>,
          icon: (
            <Flex
              justify="center"
              align="center"
              style={{
                height: !screens.md ? fontSizeLG : fontSize,
                width: !screens.md ? fontSizeLG : fontSize,
                overflow: "hidden",
              }}
            >
              <img
                src={iconMistral}
                alt="avatar"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Flex>
          ),
        },
      ],
    },
    { type: "divider" },
    {
      key: "groupChat",
      label: <ResponsiveLabel>Group Chat </ResponsiveLabel>,
      icon: (
        <UserPlus
          size="1em"
          style={{ fontSize: !screens.md ? fontSizeLG : fontSize }}
        />
      ),
    },
  ];

  const rolesAsObject = {
    ai: {
      placement: "start",
      typing: { step: 5, interval: 20 },
      /* avatar: { icon: <Bot size="1em" />, style: { background: colorPrimary } }, */
      header: currentChat,
      styles: {
        content: {
          background: "transparent",
          padding: 0,
          fontSize: !screens.md && fontSizeLG,
        },
        header: {
          color: colorTextQuaternary,
          fontSize: !screens.md && fontSizeLG,
        },
      },
    },
    user: {
      placement: "end",
      shape: "corner",
      styles: {
        content: { fontSize: !screens.md && fontSizeLG },
        header: {
          color: colorTextQuaternary,
        },
      },
    },
  };

  const listRef = useRef(null);
  const [count, setCount] = useState(3);

  const findItemByKey = (items, key) => {
    for (const item of items) {
      if (item.key === key) {
        return item;
      }

      if (item.children) {
        const found = findItemByKey(item.children, key);
        if (found) return found;
      }
    }

    return null;
  };

  const onClick = ({ key }) => {
    const obj = findItemByKey(dropdownItems, key);
    setCurrentChat(obj.label);
  };

  const iconStyle = {
    fontSize: 18,
    color: colorText,
  };

  return (
    <Layout
      style={{
        height: "100vh",
        background: colorBgContainer,
      }}
    >
      {screens.md ? (
        <Sider
          theme="light"
          width={250}
          style={{
            position: "absolute",
            left: collapsed ? -250 : 0,
            transition: "all 0.2s ease-in-out",
            top: 0,
            bottom: 0,
            borderRight: `1px solid ${colorSplit}`,
            zIndex: 10,
          }}
        >
          <Flex
            align="center"
            style={{
              paddingLeft: paddingSM,
              paddingRight: paddingSM,
              height: 58,
            }}
          >
            <Input placeholder="Search..." />
          </Flex>

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
      ) : (
        <Drawer
          closeIcon={false}
          title={<img src={logo} alt="operaide logo" style={{ height: 24 }} />}
          placement="left"
          styles={{
            header: {
              height: "58px",
              paddingLeft: paddingSM,
              paddingRight: paddingSM,
              border: 0,
            },
            body: { padding: 0 },
          }}
          onClose={() => setCollapsed(true)}
          open={!collapsed}
          extra={
            <Button
              type="text"
              icon={<TextSearch size="1em" />}
              onClick={() => setCollapsed(!collapsed)}
              style={iconStyle}
            />
          }
        >
          <Flex
            align="center"
            style={{
              paddingLeft: paddingSM,
              paddingRight: paddingSM,
              height: 58,
            }}
          >
            <Input placeholder="Search..." size="large" />
          </Flex>
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
        </Drawer>
      )}
      <Layout
        style={{
          height: "100vh",
          background: colorBgContainer,
          marginLeft: collapsed ? 0 : screens.md && 250,
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
            background: screens.xxl ? "transparent" : colorBgContainer,
            transition: "all 0.2s ease-in-out",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: collapsed ? 0 : screens.md && 250,
          }}
        >
          {screens.md ? (
            <Tooltip title="History">
              <Button
                type="text"
                icon={<TextSearch size="1em" />}
                onClick={() => setCollapsed(!collapsed)}
                style={iconStyle}
              />
            </Tooltip>
          ) : (
            <Button
              type="text"
              icon={<TextSearch size="1em" />}
              onClick={() => setCollapsed(!collapsed)}
              style={iconStyle}
            />
          )}

          <Flex align="center" gap="middle">
            <Dropdown
              trigger="click"
              menu={{
                items: dropdownItems,
                onClick,
                expandIcon: (
                  <span>
                    <ChevronRight
                      size="1em"
                      style={{
                        marginBottom: !screens.md ? "-0.25em" : "-0.125em",
                      }}
                    />
                  </span>
                ),
              }}
            >
              <Button
                type="text"
                icon={<SquarePen size={"1em"} />}
                style={iconStyle}
              />
            </Dropdown>
            <Tooltip title="Invite others">
              <Button
                type="text"
                style={iconStyle}
                icon={<UserPlus size="1em" />}
              />
            </Tooltip>
            <Tooltip title="Share with others">
              <Button
                type="text"
                style={iconStyle}
                icon={<Share2 size="1em" />}
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
                  marginTop: screens.xxl ? 0 : 58,
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
                autoSize={{ minRows: 2, maxRows: 6 }}
                style={{
                  maxWidth: 766,
                  width: "100%",
                  marginTop: "-12px",
                  background: colorBgContainer,
                }}
                styles={{ input: { fontSize: !screens.md && fontSizeLG } }}
                placeholder="Ask anything"
                onSubmit={() => {
                  setCount((i) => i + 1);
                }}
                actions={false}
                footer={({ components }) => {
                  const { SendButton, LoadingButton, SpeechButton } =
                    components;
                  return (
                    <Flex justify="space-between" align="center">
                      <Flex gap="small" align="center">
                        {screens.md ? (
                          <img
                            src={logo}
                            alt="operaide logo"
                            style={{ height: 22 }}
                          />
                        ) : (
                          <Text style={{ color: colorTextQuaternary }}>
                            {currentChat}
                          </Text>
                        )}
                      </Flex>
                      <Flex align="center">
                        {screens.md && (
                          <>
                            <Text style={{ color: colorTextQuaternary }}>
                              {currentChat}
                            </Text>
                            <Divider type="vertical" />
                          </>
                        )}

                        <Button
                          style={iconStyle}
                          type="text"
                          icon={<Paperclip size="1em" />}
                        />
                        <Divider type="vertical" />
                        <SpeechButton style={iconStyle} />
                        <Divider type="vertical" />
                        <SendButton
                          type="primary"
                          disabled={false}
                          icon={<ArrowUp size="1em" />}
                          size={!screens.md && "large"}
                          style={{ fontSize: !screens.md ? 18 : fontSizeLG }}
                        />
                      </Flex>
                    </Flex>
                  );
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
