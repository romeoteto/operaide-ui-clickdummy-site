import React from "react";
import { useParams, useLocation } from "wouter";
import { Link } from "wouter";
import {
  Descriptions,
  Flex,
  Typography,
  Table,
  theme,
  Space,
  Button,
} from "antd";

const { Title, Text } = Typography;

const BlueprintContainer = ({ data }) => {
  const {
    token: {
      paddingXS,
      paddingSM,
      colorFillQuaternary,
      lineWidth,
      borderRadius,
      colorBorderSecondary,
    },
  } = theme.useToken();

  const { id: blueprintId, label, description, version, deployments } = data;

  const params = useParams();
  const { "app-id": appId } = params;

  const [_, navigate] = useLocation();

  const infoItems = [
    {
      key: "1",
      label: "ID",
      children: blueprintId,
    },
    {
      key: "2",
      label: "Version",
      children: version,
    },
  ];

  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (deploymentId) => (
        <Link
          href={`/reaktor-ai-engine/${appId}/${blueprintId}/${deploymentId}/overview`}
        >
          {deploymentId}
        </Link>
      ),
    },
    { title: "Label", dataIndex: "label", key: "label" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Version", dataIndex: "version", key: "version" },
  ];

  return (
    <Flex
      vertical
      style={{
        border: `${lineWidth}px solid ${colorBorderSecondary}`,
        borderRadius,
        overflow: "hidden",
      }}
    >
      <Flex
        style={{
          padding: paddingSM,
          background: colorFillQuaternary,
          borderBottom: `${lineWidth}px solid ${colorBorderSecondary}`,
        }}
      >
        <Flex align="flex-start">
          <Flex vertical gap="middle">
            <Flex vertical>
              <Title level={4}>{label}</Title>
              <Text type="secondary">{description}</Text>
            </Flex>
            <Descriptions size="small" items={infoItems} column={2} />{" "}
          </Flex>
          <Space>
            <Button
              size="small"
              color="default"
              variant="filled"
              onClick={() =>
                navigate(`/reaktor-ai-engine/${appId}/${blueprintId}/overview`)
              }
            >
              Details
            </Button>
            <Button size="small" type="primary">
              Deploy
            </Button>
          </Space>
        </Flex>
      </Flex>

      <div style={{ padding: paddingXS }}>
        <Table
          size="small"
          columns={tableColumns}
          dataSource={deployments}
          title={() => <Text strong>Deployments</Text>}
        />
      </div>
    </Flex>
  );
};

export default BlueprintContainer;
