import React from "react";
import { Flex, Input, Typography, theme } from "antd";

const { Title, Text } = Typography;
const { Search } = Input;

const PageTitle = () => {
  const {
    token: { paddingXL },
  } = theme.useToken();
  return (
    <Flex
      vertical
      justify="center"
      align="center"
      style={{ padding: paddingXL, minHeight: "500px" }}
      gap="large"
    >
      <Flex vertical style={{ maxWidth: "500px" }}>
        <Title level={1} style={{ textAlign: "center" }}>
          Agentic Applications for Any Use Case
        </Title>
        <Text style={{ textAlign: "center" }}>
          In the Operaide App Store you can find agentic apps for different use
          cases. They can be installed in your Operaide instance with few
          clicks.
        </Text>
      </Flex>
      <Search
        placeholder="Search for apps and use cases"
        style={{ maxWidth: "700px" }}
        size="large"
      />
    </Flex>
  );
};

export default PageTitle;
