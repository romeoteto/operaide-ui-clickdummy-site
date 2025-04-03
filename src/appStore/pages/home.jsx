import React from "react";
import { Flex, Typography, theme } from "antd";

const { Title, Text } = Typography;

const PageAppStoreHome = () => {
  const {
    token: { paddingXL, colorBgLayout, borderRadius, borderRadiusLG },
  } = theme.useToken();
  return (
    <div>
      <Flex
        vertical
        justify="center"
        style={{
          padding: paddingXL,
          minHeight: "400px",
          background: colorBgLayout,
          borderRadius: borderRadiusLG,
        }}
        gap="large"
      >
        <Flex vertical style={{ maxWidth: "500px" }}>
          <Title level={1}>Agentic Applications for Any Use Case</Title>
          <Text>
            In the Operaide App Store you can browse and find agentic apps for
            various business use cases. They can be installed in your Operaide
            instance with few clicks.
          </Text>
        </Flex>
      </Flex>
    </div>
  );
};

export default PageAppStoreHome;
