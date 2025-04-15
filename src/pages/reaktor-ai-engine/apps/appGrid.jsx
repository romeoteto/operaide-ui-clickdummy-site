import React from "react";

import { Avatar, Card, Col, Row, Typography, theme } from "antd";
import { Box, Atom, Download, Monitor } from "lucide-react";
import { Link } from "wouter";
import { apps, frontendMap } from "../../../database/apps";

const { Meta } = Card;
const { Link: AntLink } = Typography;

const AppCard = ({ app }) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const showFrontend = Object.keys(frontendMap).includes(app.id);

  return (
    <Card
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      actions={[
        showFrontend && (
          <Link
            key="app-frontend-link"
            to={`/reaktor-ai-engine/apps/${app.id}`}
          >
            <Monitor size="1em" />
          </Link>
        ),
        <Link
          key="reaktors-link"
          href={`/reaktor-ai-engine/reaktors?appId=${app.id}`}
        >
          <Atom size="1em" />
        </Link>,
        <Download key="reaktors-download" size="1em" />,
      ].filter(Boolean)}
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

const AppGrid = () => {
  return (
    <Row gutter={16}>
      {apps.map((app) => (
        <Col span={8} key={app.id} style={{ display: "flex" }}>
          <AppCard app={app} />
        </Col>
      ))}
    </Row>
  );
};
export default AppGrid;
