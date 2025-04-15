import React, { useState } from "react";
import { Avatar, Card, Col, Row, Drawer, Button, Flex, theme } from "antd";
import { Box, MonitorDown, Glasses } from "lucide-react";
import apps from "../../database/app-store.json";

const { Meta } = Card;

const AppCard = ({ app, onClickDetails }) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <Card
      actions={[
        <Flex
          align="center"
          justify="center"
          gap="small"
          onClick={() => onClickDetails(app)}
        >
          <Glasses size="1em" />
          <span>Details</span>
        </Flex>,
        <Flex align="center" justify="center" gap="small">
          <MonitorDown size="1em" />
          <span>Install</span>
        </Flex>,
      ]}
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
  );
};

const AppStoreGallery = () => {
  const [selectedApp, setSelectedApp] = useState(null);

  return (
    <>
      <Drawer
        size="large"
        open={selectedApp}
        onClose={() => setSelectedApp(null)}
      />
      <Row gutter={[24, 24]}>
        {apps.map((app) => (
          <Col span={8} key={app.id} style={{ display: "flex" }}>
            <AppCard app={app} onClickDetails={(app) => setSelectedApp(app)} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default AppStoreGallery;
