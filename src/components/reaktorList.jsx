import React from "react";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { theme, List, Space, Flex, Typography } from "antd";
import { Link } from "wouter";

const { Text } = Typography;
const data = Array.from({ length: 23 }).map((_, i) => ({
  href: "https://ant.design",
  title: `ant design part ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));
const IconText = ({ icon, text }) => <Space vertical>{text}</Space>;

export default function ReaktorList({ items }) {
  const {
    token: { paddingXL, colorBgLayout },
  } = theme.useToken();
  return (
    <List
      itemLayout="vertical"
      style={{ width: "100%" }}
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 10,
      }}
      dataSource={items}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          extra={
            <Flex
              justify="center"
              align="center"
              style={{
                padding: paddingXL,
                background: colorBgLayout,
                height: "150px",
                width: "200px",
              }}
            >
              <img width="100%" alt="reaktor-image" src={item.imageSrc} />
            </Flex>
          }
        >
          <List.Item.Meta
            title={
              <Link href={`/reaktor-ai-engine/${item.id}`}>{item.label}</Link>
            }
            description={item.description}
          />
          <Space size="large">
            <Flex vertical>
              <Text type="secondary">Version</Text>
              <Text strong>{item.version}</Text>
            </Flex>
            <Flex vertical>
              <Text type="secondary">ID</Text>
              <Text strong>{item.id}</Text>
            </Flex>
            <Flex vertical>
              <Text type="secondary">Group</Text>
              <Text strong>{item.group}</Text>
            </Flex>
          </Space>
        </List.Item>
      )}
    />
  );
}
