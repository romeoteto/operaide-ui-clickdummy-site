import React from "react";
import { Flex, Typography, theme } from "antd";

import backgroundImage from "../../assets/app-store-hero.jpg";
import AppsList from "../components/appsList";

const { Title, Text } = Typography;

const PageAppStoreHome = () => {
  const {
    token: { paddingXL, borderRadiusLG },
  } = theme.useToken();

  return (
    <Flex vertical gap="large">
      <div
        style={{
          position: "relative",
          borderRadius: borderRadiusLG,
          overflow: "hidden", // Ensures rounded corners apply to overlay
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.15, // adjust this for desired transparency
            zIndex: 0,
          }}
        />

        {/* Content on top */}
        <Flex
          vertical
          justify="center"
          style={{
            position: "relative",
            zIndex: 1,
            padding: paddingXL,
            minHeight: "400px",
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
      <Flex vertical>
        <Title level={3}>Latest Applications</Title>
      </Flex>
      <AppsList />
    </Flex>
  );
};

export default PageAppStoreHome;
