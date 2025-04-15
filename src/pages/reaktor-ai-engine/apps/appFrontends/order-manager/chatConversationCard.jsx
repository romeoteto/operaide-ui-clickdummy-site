import React from "react";
import { Card, List, Avatar, Typography, Tag, theme } from "antd";

import { User, Bot } from "lucide-react";

const { Text } = Typography;

const ChatConversationCard = ({ conversation }) => {
  const {
    token: { colorInfo },
  } = theme.useToken();
  return (
    <Card
      title={`Conversation with ${conversation.customer.name}`}
      extra={
        <Tag color={conversation.status === "resolved" ? "green" : "orange"}>
          {conversation.status.toUpperCase()}
        </Tag>
      }
    >
      <p>
        <Text strong>Subject:</Text> {conversation.subject}
      </p>
      <p>
        <Text strong>Order ID:</Text> {conversation.orderId}
      </p>
      <List
        itemLayout="horizontal"
        dataSource={conversation.thread}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                item.sender === "customer" ? (
                  <Avatar icon={<User size="1em" />} />
                ) : (
                  <Avatar
                    icon={<Bot size="1em " />}
                    style={{ backgroundColor: colorInfo }}
                  />
                )
              }
              title={
                <Text strong>
                  {item.sender === "customer"
                    ? conversation.customer.name
                    : item.name || "AI Agent"}
                  <Text
                    type="secondary"
                    style={{ marginLeft: 8, fontSize: 12 }}
                  >
                    {new Date(item.timestamp).toLocaleString()}
                  </Text>
                </Text>
              }
              description={item.message}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ChatConversationCard;

// Example usage:
// <ChatConversationCard conversation={yourDataHere} />
