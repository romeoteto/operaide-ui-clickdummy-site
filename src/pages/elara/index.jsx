import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";

import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

import {
  Button,
  Layout,
  Flex,
  Typography,
  Dropdown,
  Tooltip,
  Input,
  Divider,
  Modal,
  Drawer,
  theme,
} from "antd";
import { Conversations, Sender, Bubble } from "@ant-design/x";

import {
  X,
  Trash2,
  PenLine,
  Archive,
  UserPlus,
  Atom,
  MessageSquare,
  ChevronRight,
  Paperclip,
  TextSearch,
  Share2,
  SquarePen,
  ArrowUp,
} from "lucide-react";

import { apps } from "../../database/apps";

import UserMenu3 from "../../components/userMenu3";

import iconMistral from "./assets/icon_mistral.png";
import iconOpenAI from "./assets/icon_open-ai.png";

const { Header, Content } = Layout;
const { Text } = Typography;

const PageElara = ({ children }) => {
  const [showHistory, setShowHistory] = useState(false);
  const [currentChat, setCurrentChat] = useState("TechDB Chat");

  const {
    token: {
      colorBgContainer,
      colorSplit,
      logo,
      borderRadius,
      colorTextQuaternary,
      fontSize,
      paddingSM,
      colorText,
      paddingXS,
      fontSizeLG,
      fontSizeSM,
      padding,
      lineWidth,
      margin,
    },
  } = theme.useToken();

  const version = "Operaide 2.1.2 (Ada)";

  const screens = useBreakpoint();

  const ResponsiveLabel = ({ children }) => (
    <span style={{ fontSize: !screens.md && fontSizeLG }}>{children}</span>
  );

  const conversationItems = Array.from({ length: 40 }).map((_, index) => {
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
        background: colorBgContainer,
        height: "100dvh",
      }}
    >
      {screens.md ? (
        <Modal
          title="Chat History"
          open={showHistory}
          onCancel={() => setShowHistory(false)}
          closeIcon={false}
          width={{
            md: "100%",
            lg: "80%",
            xl: "80%",
            xxl: "80%",
          }}
          styles={{
            content: {
              padding: paddingXS,
            },
            header: { padding: paddingSM },
            wrapper: { padding: paddingSM },
          }}
          centered
          footer={false}
        >
          <div
            style={{
              paddingLeft: paddingSM,
              paddingRight: paddingSM,
              marginBottom: margin,
            }}
          >
            <Input placeholder="Search..." variant="filled" />
          </div>
          <Flex>
            <Conversations
              items={conversationItems}
              defaultActiveKey="item1"
              groupable={groupable}
              menu={menuConfig}
              style={{
                overflowY: "auto",
                height: 500,
                flex: 1,
                borderRight: `${lineWidth}px solid ${colorSplit}`,
                paddingTop: 0,
                paddingRight: padding,
              }}
            />

            <div
              style={{
                paddingLeft: padding,
                paddingRight: paddingSM,
                paddingBottom: paddingXS,
                flex: 2,
              }}
            >
              <Bubble.List
                ref={listRef}
                style={{
                  overflowY: "auto",
                  height: 500,
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
            </div>
          </Flex>
        </Modal>
      ) : (
        <Drawer
          closeIcon={false}
          title="Chat History"
          placement="bottom"
          height="80vh"
          styles={{
            header: {
              height: "58px",
              paddingLeft: paddingSM,
              paddingRight: paddingSM,
              border: 0,
            },
            body: { padding: 0 },
            content: { height: "80vh" },
          }}
          onClose={() => setShowHistory(false)}
          open={showHistory}
          extra={
            <Button
              type="text"
              icon={<X size="1em" />}
              onClick={() => setShowHistory(false)}
              style={iconStyle}
            />
          }
        >
          <Flex
            align="center"
            style={{
              paddingLeft: paddingSM,
              paddingRight: paddingSM,
              position: "fixed",
              width: "100%",
              zIndex: 10,
              background: colorBgContainer,
              paddingBottom: paddingSM,
            }}
          >
            <Input placeholder="Search..." size="large" variant="filled" />
          </Flex>
          <Conversations
            items={conversationItems}
            defaultActiveKey="item1"
            groupable={groupable}
            menu={menuConfig}
            style={{
              background: colorBgContainer,
              borderRadius: borderRadius,
              marginTop: 40,
            }}
          />
        </Drawer>
      )}
      <Layout>
        <Header
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            left: 0,
            zIndex: 100,
            padding: screens.md ? "0px 14px" : "0px 24px",
            transition: "all 0.2s ease-in-out",
            height: 58,
            background: screens.xxl ? "transparent" : colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img src={logo} alt="operaide logo" style={{ height: 28 }} />
          <Flex align="center" gap="middle">
            <Dropdown
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
            <Tooltip title={screens.md && "Chat history"}>
              <Button
                type="text"
                icon={<TextSearch size="1em" />}
                onClick={() => setShowHistory(!showHistory)}
                style={iconStyle}
              />
            </Tooltip>
            {screens.md && (
              <>
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
              </>
            )}

            <UserMenu3 showOrgSelect routeAfterChange="/elara" />
          </Flex>
        </Header>
        <Content
          style={{
            padding: 0,
            background: colorBgContainer,
            height: "calc(100dvh - 58px)",
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
          <Flex
            vertical
            gap="small"
            align="center"
            style={{
              paddingBottom: paddingXS,
              background: colorBgContainer,
              paddingLeft: 24,
              paddingRight: 24,
            }}
          >
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
                const { SendButton, LoadingButton, SpeechButton } = components;
                return (
                  <Flex justify="space-between" align="center">
                    <Flex gap="small" align="center">
                      <Text style={{ color: colorTextQuaternary }}>
                        {currentChat}
                      </Text>
                    </Flex>
                    <Flex align="center">
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

            <Text type="secondary" style={{ fontSize: fontSizeSM }}>
              Powered by {version}
            </Text>
          </Flex>
        </Content>
      </Layout>{" "}
    </Layout>
  );
};

export default PageElara;
