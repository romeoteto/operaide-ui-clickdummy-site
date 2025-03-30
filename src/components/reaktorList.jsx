import React from "react";
import { theme, List, Space, Flex, Typography } from "antd";
import { Link } from "wouter";

const { Text } = Typography;

export default function ReaktorList({ items }) {
  const {
    token: { paddingXL, colorBgLayout, reaktorList },
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
              }}
            >
              <img
                alt="reaktor-image"
                src={item.imageSrc}
                style={{
                  height: reaktorList.imageHeight,
                  width: reaktorList.imageWidth,
                }}
              />
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
