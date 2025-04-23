import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";

import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

import { systemPrompts } from "./systemPrompts";

import {
  Button,
  Layout,
  Flex,
  Typography,
  Dropdown,
  Tooltip,
  Input,
  Divider,
  Avatar,
  Modal,
  Drawer,
  theme,
} from "antd";
import {
  Conversations,
  Sender,
  Bubble,
  Welcome,
  useXAgent,
  useXChat,
} from "@ant-design/x";

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
  BotMessageSquare,
} from "lucide-react";

import { apps } from "../../database/apps";

import UserMenu3 from "../../components/userMenu3";
import MarkdownRenderer from "./markdownRenderer";

import iconMistral from "./assets/icon_mistral.png";
import iconOpenAI from "./assets/icon_open-ai.png";

// EXPERIMENTAL
import OpenAI from "openai";
// EXPERIMENTAL

const { Header, Content } = Layout;
const { Text } = Typography;

// EXPERIMENTAL
const client = new OpenAI({
  apiKey:
    "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",
  dangerouslyAllowBrowser: true,
});
// EXPERIMENTAL

const PageElara = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [currentChat, setCurrentChat] = useState({
    key: "Xfk3X34k96x9tSfdc",
    label: "TechDB Chat",
  });
  const systemPromptRef = useRef("You are a helpful assistant.");
  const listRef = useRef(null);

  // EXPERIMENTAL
  const [agent] = useXAgent({
    request: async (info, callbacks) => {
      const { messages, message } = info;
      const { onSuccess, onUpdate, onError } = callbacks;

      let content = "";

      const formattedMessages = [
        {
          role: "system",
          content: systemPromptRef.current, // <== Customize this system prompt
        },
        ...messages.map((m, i) => ({
          role: i % 2 === 0 ? "user" : "assistant",
          content: m,
        })),
      ];

      try {
        const stream = await client.chat.completions.create({
          model: "gpt-4o",
          messages: formattedMessages,
          stream: true,
        });

        for await (const chunk of stream) {
          content += chunk.choices[0]?.delta?.content || "";
          onUpdate(content);
        }

        onSuccess(content);
      } catch (error) {
        // onError(error); // Uncomment if you want to handle error
        console.error(error);
      }
    },
  });

  const { onRequest, messages, setMessages } = useXChat({ agent });

  const itemsOpenAI = messages.map(({ message, id }, index) => ({
    key: id,
    content: message,
    isAI: !!(index % 2),
  }));

  const onNewConversation = ({ key }) => {
    const obj = findItemByKey(dropdownItems, key);
    setCurrentChat({ key: obj.key, label: obj.label });
    const prompt = systemPrompts.find((p) => p.deploymentId === key)?.prompt;
    systemPromptRef.current = prompt || "You are a helpful assistant.";
    setMessages([]);
  };

  // EXPERIMENTAL

  const currentOrganization = useSelector(
    (state) => state.user.currentOrganization
  );

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
      colorPrimary,
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

  const conversationItems = Array.from({ length: 10 }).map((_, index) => {
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
      /* avatar: { icon: <Bot size="1em" />, style: { background: colorPrimary } }, */
      header: currentChat.label,
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

  const iconStyle = {
    fontSize: 18,
    color: colorText,
  };

  const ChatSender = () => {
    return (
      <Sender
        autoSize={{ minRows: 2, maxRows: 6 }}
        style={{
          maxWidth: 766,
          width: "100%",
          background: colorBgContainer,
        }}
        styles={{ input: { fontSize: !screens.md && fontSizeLG } }}
        placeholder="Ask anything"
        onSubmit={onRequest}
        actions={false}
        footer={({ components }) => {
          const { SendButton, SpeechButton } = components;
          return (
            <Flex justify="space-between" align="center">
              <Flex gap="small" align="center">
                <Text>{currentChat.label}</Text>
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
    );
  };

  const StartScreen = () => {
    return (
      <Flex
        vertical
        justify="center"
        align="center"
        style={{ height: "100%", paddingLeft: 24, paddingRight: 24 }}
        gap="large"
      >
        <Welcome
          variant="borderless"
          icon={
            <Avatar
              size={48}
              style={{ backgroundColor: colorPrimary }}
              icon={<BotMessageSquare size="1em" />}
            />
          }
          title="Hello, I'm Elara"
          description={`I am your personal assistant at ${currentOrganization.label}. How can I help you today?`}
        />
        <ChatSender />
      </Flex>
    );
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
                  height: 500,
                  overflow: "auto",
                }}
                roles={rolesAsObject}
                items={itemsOpenAI.map((item) => {
                  return {
                    key: item.key,
                    role: item.isAI ? "ai" : "user",
                    content: item.isAI ? (
                      <MarkdownRenderer content={item.content} />
                    ) : (
                      item.content
                    ),
                  };
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
                onClick: onNewConversation,
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
            {screens.md && itemsOpenAI.length > 0 && (
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
            {itemsOpenAI.length > 0 ? (
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
                  items={itemsOpenAI.map((item) => {
                    return {
                      key: item.key,
                      role: item.isAI ? "ai" : "user",
                      content: item.isAI ? (
                        <MarkdownRenderer content={item.content} />
                      ) : (
                        item.content
                      ),
                    };
                  })}
                />
              </Flex>
            ) : (
              <StartScreen />
            )}
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
            {itemsOpenAI.length > 0 && (
              <Flex
                justify="center"
                style={{ marginTop: "-12px", width: "100%" }}
              >
                <ChatSender />
              </Flex>
            )}

            <Text type="secondary" style={{ fontSize: fontSizeSM }}>
              Powered by {version}
            </Text>
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageElara;
