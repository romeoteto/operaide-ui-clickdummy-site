import React, { useState, useRef, useEffect, lazy } from "react";
import {
  Layout,
  Flex,
  Typography,
  theme,
  message,
  Avatar,
  Button,
  Input,
  Tabs,
  Modal,
  Spin,
  Space,
} from "antd";
import { Welcome, useXAgent, useXChat, Sender } from "@ant-design/x";
import { BotMessageSquare, Rocket, Plus, Code, Check } from "lucide-react";
import UserMenu3 from "../../../components/userMenu3";
import OpenAI from "openai";

import { useSelector } from "react-redux";

const { TextArea } = Input;

// Lazy load LivePreview
const LivePreview = lazy(() => import("./livePreview"));

const { Header, Content } = Layout;
const { Text, Title } = Typography;

// OpenAI Client
const client = new OpenAI({
  apiKey:
    "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", // ⚠️ Warning: Secure your real API keys!
  dangerouslyAllowBrowser: true,
});

// Utility to clean GPT output: remove ```jsx and imports
function cleanCodeOutput(rawCode) {
  let cleaned = rawCode.trim();

  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```[a-z]*\n?/, ""); // Remove ```jsx
    cleaned = cleaned.replace(/```$/, ""); // Remove trailing ```
  }

  // Remove import statements if any
  cleaned = cleaned.replace(/import\s.+\sfrom\s.+;\n?/g, "");

  return cleaned.trim();
}

const DetailsModal = ({
  showModal,
  setShowModal,
  activeTab,
  setActiveTab,
  prompt,
  setPrompt,
  isStreaming,
}) => {
  const items = [
    {
      key: "1",
      label: "OpenAPI Definition",
      children: (
        <Input.TextArea
          autoSize={{ minRows: 10, maxRows: 20 }}
          disabled={isStreaming}
          value={prompt.openAPIDefinition}
          onChange={(e) =>
            setPrompt((prev) => ({
              ...prev,
              openAPIDefinition: e.target.value,
            }))
          }
        />
      ),
    },
    {
      key: "2",
      label: "Mermaid Definition",
      children: (
        <Input.TextArea
          autoSize={{ minRows: 10, maxRows: 20 }}
          disabled={isStreaming}
          value={prompt.mermaidDefinition}
          onChange={(e) =>
            setPrompt((prev) => ({
              ...prev,
              mermaidDefinition: e.target.value,
            }))
          }
        />
      ),
    },
  ];

  return (
    <Modal
      open={showModal}
      footer={false}
      onCancel={() => setShowModal(false)}
      width="80%"
    >
      <Flex vertical>
        <Typography.Title level={4}>Details</Typography.Title>
        <Tabs
          items={items}
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
        />
      </Flex>
    </Modal>
  );
};

const AppBuilder = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [liveCode, setLiveCode] = useState(``);
  const [showCode, setShowCode] = useState(false);
  const [sourceCode, setSourceCode] = useState("");
  const [prompt, setPrompt] = useState({
    instructions: "",
    mermaidDefinition: "",
    openAPIDefinition: "",
  });

  const currentOrganization = useSelector(
    (state) => state.user.currentOrganization
  );

  const [showModal, setShowModal] = useState();
  const [activeTab, setActiveTab] = useState(1);

  const systemPromptRef = useRef(
    `
You are an expert frontend engineer specialized in React and Ant Design. Your task is to develop UI for a multi-agent-system.
The UI you are building is used by a human-in-the-loop that wants to interact with these agents.

When asked to create UI components, you must always follow these strict rules:

1. Only use the following libraries and components:
   - React (assume it is already available globally)
   - Ant Design (use components via \`antd.ComponentName\`, e.g., \`antd.Button\`)
   - dayjs (for date manipulation)
2. DO NOT use any other libraries such as:
   - moment.js
   - lodash
   - axios
   - any other third-party libraries unless explicitly instructed.
3. Do not destructure Ant Design components. Always use \`antd.ComponentName\` syntax directly.
4. Write plain JavaScript with React syntax (no TypeScript unless explicitly asked).
5. Always wrap your UI inside a \`function Demo()\` and call \`render(<Demo />);\` at the end.
6. DO NOT include any import statements (e.g., \`import React from 'react'\`) or module exports.
7. Ensure the code is self-contained, minimal, and immediately runnable inside a React live code editor.
8. Return ONLY the valid JavaScript+JSX code block without any extra explanation, markdown, or commentary.

Assume CSS for Ant Design is already properly loaded.

You must strictly obey these instructions to avoid execution errors.

You will receive either one of the three or a combination of them:

1. Instructions on the UI you have to build
2. A mermaid definition that shows a workflow of a multi-ai-agent system
3. An OpenAPI definition that shows endpoints of the multi-ai-agent system

Use this information when building the UI.

**Important: if there is a mermaid diagram always analyze it and come up with a reasonable human-in-the-loop concept. Ask yourself: what 
would a human need in order to interact with these agents? What makes sense?**

Then build it.
`
  );

  const listRef = useRef(null);
  const senderRef = useRef(null);

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
      lineWidth,
      padding,
      margin,
      colorSuccesss,
      colorFill,
      colorFillSecondary,
      colorFillTertiary,
      colorBgMask,
    },
  } = theme.useToken();

  const [agent] = useXAgent({
    request: async (info, callbacks) => {
      const { messages } = info;
      const { onSuccess, onUpdate, onError } = callbacks;

      let content = "";

      const formattedMessages = [
        { role: "system", content: systemPromptRef.current },
        ...messages.map((m, i) => ({
          role: i % 2 === 0 ? "user" : "assistant",
          content: m,
        })),
      ];

      try {
        setIsStreaming(true);
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
        setIsStreaming(false);
      } catch (error) {
        console.error(error);
        setIsStreaming(false);
      }
    },
  });

  const { onRequest, messages, setMessages } = useXChat({ agent });

  // Handle incoming assistant message and extract + clean code
  useEffect(() => {
    if (!isStreaming && messages.length) {
      const lastAssistantMessage = messages[messages.length - 1]?.message;

      if (lastAssistantMessage) {
        let cleanedCode = cleanCodeOutput(lastAssistantMessage);

        // Validate that it contains a render call
        if (cleanedCode.includes("render(")) {
          setLiveCode(cleanedCode);
          setSourceCode(lastAssistantMessage);
          console.log("✅ Cleaned and Loaded Code:", cleanedCode);
        } else {
          console.warn("⚠️ GPT output is missing render()!");
          message.error(
            "Generated code is missing `render()` and cannot be previewed."
          );
        }
      }
    }
  }, [messages, isStreaming]);

  const onSubmit = () => {
    const preparePrompt = (prompt) => {
      const cleaned = {};

      Object.entries(prompt).forEach(([key, value]) => {
        if (typeof value === "string") {
          const trimmedValue = value.trim();
          if (trimmedValue) {
            cleaned[key] = trimmedValue;
          }
        }
      });

      return cleaned;
    };

    const readyPrompt = preparePrompt(prompt);
    onRequest(JSON.stringify(readyPrompt));
    setPrompt({
      instructions: "",
      mermaidDefinition: "",
      openAPIDefinition: "",
    });
  };

  const openModal = (key) => {
    setShowModal(true);
    setActiveTab(String(key));
  };

  return (
    <Layout style={{ background: colorBgContainer, height: "100dvh" }}>
      <DetailsModal
        showModal={showModal}
        setShowModal={setShowModal}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        prompt={prompt}
        setPrompt={setPrompt}
        isStreaming={isStreaming}
      />
      <Header
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          left: 0,
          zIndex: 100,
          height: 58,
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: paddingSM,
          paddingRight: paddingSM,
          borderBottom: `${lineWidth}px solid ${colorSplit}`,
        }}
      >
        <img src={logo} alt="operaide logo" style={{ height: 28 }} />
        <Space size="middle">
          {liveCode.length > 0 && (
            <Button
              onClick={() => setShowCode(!showCode)}
              color="default"
              variant="filled"
              icon={<Code size={fontSize} />}
            >
              {showCode ? "Hide source code" : "Show source code"}
            </Button>
          )}

          <UserMenu3 showOrgSelect routeAfterChange="/elara" />
        </Space>
      </Header>

      <Content
        style={{
          padding: 0,
          background: colorBgContainer,
          height: "calc(100dvh - 58px)",
          marginTop: 58,
          display: "flex",
          overflow: "hidden",
        }}
      >
        <Flex
          vertical
          style={{
            height: "100%",
            flex: 1,
            position: "relative",
          }}
        >
          <Spin fullscreen spinning={isStreaming} />

          <Flex
            justify="center"
            style={{ flex: 1, padding: 24, overflowY: "auto" }}
          >
            {liveCode ? (
              <LivePreview code={liveCode} showEditor={showCode} />
            ) : (
              <Flex align="center" style={{ height: "100%" }}>
                <Welcome
                  variant="borderless"
                  style={{ maxWidth: 766 }}
                  icon={
                    <Avatar
                      size={48}
                      style={{ backgroundColor: colorPrimary }}
                      icon={<BotMessageSquare size="1em" />}
                    />
                  }
                  title="Hello, I'm Elara"
                  description={`I am your personal assistant at ${currentOrganization.label}. I can help you with creating some awesome Human-in-the-Loop UI components. What do you wanna build?`}
                />{" "}
              </Flex>
            )}
          </Flex>

          <Flex
            gap="large"
            style={{
              padding: 24,
              borderTop: `${lineWidth}px solid ${colorSplit}`,
            }}
          >
            <Sender
              placeholder="What is the context of the UI?"
              autoSize={{ minRows: 3, maxRows: 8 }}
              value={prompt.instructions}
              onSubmit={() => onSubmit()}
              onChange={(instructions) =>
                setPrompt((prev) => ({
                  ...prev,
                  instructions,
                }))
              }
              actions={false}
              footer={() => {
                const hasOpenAPI = prompt.openAPIDefinition.length > 0;
                const hasMermaid = prompt.mermaidDefinition.length > 0;
                return (
                  <Flex justify="space-between" align="center">
                    <Space>
                      <Button
                        onClick={() => openModal(1)}
                        color="default"
                        variant={hasOpenAPI ? "outlined" : "filled"}
                        icon={
                          hasOpenAPI ? (
                            <Check size={fontSize} />
                          ) : (
                            <Plus size={fontSize} />
                          )
                        }
                      >
                        {hasOpenAPI
                          ? "OpenAPI Definition added"
                          : "Add OpenAPI Definition"}
                      </Button>
                      <Button
                        onClick={() => openModal(2)}
                        color="default"
                        variant={hasMermaid ? "outlined" : "filled"}
                        icon={
                          hasMermaid ? (
                            <Check size={fontSize} />
                          ) : (
                            <Plus size={fontSize} />
                          )
                        }
                      >
                        {hasMermaid
                          ? "Mermaid Definition added"
                          : "Add Mermaid Definition"}
                      </Button>
                    </Space>

                    <Button
                      type="primary"
                      onClick={() => onSubmit()}
                      disabled={isStreaming}
                      icon={<Rocket size={fontSize} />}
                    >
                      {liveCode.length === 0 ? "Generate UI" : "Update UI"}
                    </Button>
                  </Flex>
                );
              }}
            />
          </Flex>
        </Flex>
      </Content>
    </Layout>
  );
};

export default AppBuilder;
