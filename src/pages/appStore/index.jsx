import React from "react";
import { useSelector } from "react-redux";
import { theme, Flex, Typography } from "antd";
import backgroundImage from "../../assets/app-store-hero.jpg";
import AppStoreGallery from "./gallery";

const { Title, Text } = Typography;

const PageAppStore = () => {
  const {
    token: { paddingXL, borderRadiusLG },
  } = theme.useToken();

  const currentOrganization = useSelector(
    (state) => state.user.currentOrganization
  );
  return (
    <Flex vertical gap="large">
      <div
        style={{
          position: "relative",
          borderRadius: borderRadiusLG,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.15,
            zIndex: 0,
          }}
        />

        <Flex
          vertical
          justify="center"
          style={{
            position: "relative",
            zIndex: 1,
            padding: paddingXL,
          }}
          gap="large"
        >
          <Flex vertical style={{ maxWidth: "500px" }}>
            <Title level={2}>
              Agentic Applications for Any Use Case at{" "}
              {currentOrganization.label}
            </Title>
            <Text>
              In the Operaide App Store you can browse and find agentic apps for
              various business use cases. They can be installed in your
              organization with few clicks.
            </Text>
          </Flex>
        </Flex>
      </div>
      <AppStoreGallery />
    </Flex>
  );
};

export default PageAppStore;
