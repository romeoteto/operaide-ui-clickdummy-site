import React, { useState } from "react";
import {
  Typography,
  Input,
  Button,
  Form,
  Spin,
  message,
  theme,
  Card,
} from "antd";
import { Send } from "lucide-react";

const { Title, Paragraph } = Typography;

const App = () => {
  const { token } = theme.useToken();
  const [messageApi, contextHolder] = message.useMessage(); // <-- use the hook

  const [apiKey, setApiKey] = useState("");
  const [content, setContent] = useState("");
  const [system, setSystem] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    if (!apiKey) {
      messageApi.error("Please enter your API key.");
      return;
    }
    if (!content.trim()) {
      messageApi.error("Content cannot be empty.");
      return;
    }

    setLoading(true);
    setResponse("");
    try {
      const res = await fetch(
        "https://dev.demo.operaide.ai:443/api/v1/aktor/assistants",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKey,
          },
          body: JSON.stringify({ content, system }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setResponse(data.text);
      } else {
        messageApi.error(data.error || "Unknown error occurred.");
      }
    } catch (error) {
      messageApi.error("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ padding: token.paddingXL, backgroundColor: token.colorBgLayout }}
    >
      {contextHolder} {/* Important: render the context holder */}
      <Card style={{ backgroundColor: token.colorBgContainer }}>
        <Form layout="vertical">
          <Form.Item label="API Key">
            <Input.Password
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
            />
          </Form.Item>
          <Form.Item label="Content">
            <Input.TextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter the content (required)"
              rows={4}
            />
          </Form.Item>
          <Form.Item label="System Instructions (optional)">
            <Input.TextArea
              value={system}
              onChange={(e) => setSystem(e.target.value)}
              placeholder="Optional system instructions"
              rows={4}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              icon={<Send size={16} />}
              onClick={handleSubmit}
              loading={loading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {loading && (
        <div style={{ textAlign: "center", marginTop: token.marginLG }}>
          <Spin size="large" />
        </div>
      )}
      {response && (
        <Card
          style={{
            marginTop: token.marginXL,
            backgroundColor: token.colorBgContainer,
          }}
        >
          <Title level={4}>Assistant Response</Title>
          <Paragraph>{response}</Paragraph>
        </Card>
      )}
    </div>
  );
};

export default App;
