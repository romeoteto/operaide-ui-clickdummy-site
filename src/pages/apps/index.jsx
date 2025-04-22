import React from "react";
import { useSelector } from "react-redux";
import { Flex, theme, Card, Avatar, Row, Col, Typography } from "antd";
import { Box } from "lucide-react";
import { useLocation } from "wouter";

import backgroundImage from "../../assets/app-store-hero.jpg";

import { apps, frontendMap } from "../../database/apps";

const { Title, Text } = Typography;
const { Meta } = Card;

const AppsIndex = () => {
  const {
    token: { paddingXL, borderRadiusLG, colorPrimary },
  } = theme.useToken();

  const [_, navigate] = useLocation();

  const currentOrganization = useSelector(
    (state) => state.user.currentOrganization
  );

  const currentUser = useSelector((state) => state.user.currentUser);

  const appsWithFrontend = apps.filter((app) =>
    frontendMap.hasOwnProperty(app.id)
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
            <Title level={2}>Hi {currentUser.prename}!</Title>
            <Text>
              Welcome to the AI Platform at {currentOrganization.label}. Here
              you can find all your Agentic AI Applications.
            </Text>
          </Flex>
        </Flex>
      </div>
      <Row gutter={16}>
        {appsWithFrontend.map((app) => (
          <Col span={8} key={app.id} style={{ display: "flex" }}>
            <Card
              hoverable
              onClick={() => navigate(`/apps/${app.id}`)}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{ flex: 1 }}>
                <Meta
                  avatar={
                    <Avatar
                      shape="square"
                      icon={<Box size="1em" />}
                      style={{ background: colorPrimary }}
                    />
                  }
                  title={app.name}
                  description={app.description}
                />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Flex>
  );
};

export default AppsIndex;
