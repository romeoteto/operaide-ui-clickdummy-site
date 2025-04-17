import React from "react";
import { useSelector } from "react-redux";
import { Flex, theme, Typography } from "antd";

import backgroundImage from "../../assets/app-store-hero.jpg";

const { Title, Text } = Typography;

const AppsIndex = () => {
  const {
    token: { paddingXL, borderRadiusLG },
  } = theme.useToken();

  const currentOrganization = useSelector(
    (state) => state.user.currentOrganization
  );

  const currentUser = useSelector((state) => state.user.currentUser);

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
            <Title level={2}>Hi {currentUser.prename}!</Title>
            <Text>
              Welcome to the Senseca AI Platform. Here you can find all your
              Agentic AI Applications.
            </Text>
          </Flex>
        </Flex>
      </div>
      Gallery of Apps here
    </Flex>
  );
};

export default AppsIndex;
