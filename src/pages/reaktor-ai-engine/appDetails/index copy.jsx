import React from "react";
import { useParams } from "wouter";
import { apps } from "../../../database/apps";
import DynamicSVG from "../../../assets/reaktor-images/dynamicSVG";
import { Link } from "wouter";

import {
  Descriptions,
  Divider,
  Flex,
  Tag,
  Typography,
  Button,
  Table,
  Tabs,
  theme,
  Space,
} from "antd";

const { Title, Text } = Typography;

const AppHeader = ({ data }) => {
  const {
    token: {
      paddingXL,
      colorPrimary,
      colorFillQuaternary,
      marginXS,
      padding,
      lineWidth,
      borderRadius,
      colorBorderSecondary,
    },
  } = theme.useToken();

  const {
    imageSrc,
    name,
    description,
    id,
    version,
    categories,
    expectedOperaideVersion,
  } = data;

  const items = [
    {
      key: "1",
      label: "ID",
      children: id,
    },
    {
      key: "2",
      label: "Version",
      children: version,
    },
    {
      key: "3",
      label: "Categories",
      children: (
        <Flex wrap>
          {categories.map((category) => (
            <Tag
              color="geekblue"
              key={category}
              style={{ marginBottom: marginXS }}
            >
              {category}
            </Tag>
          ))}
        </Flex>
      ),
    },
    {
      key: "4",
      label: "Expected Operaide Version",
      children: expectedOperaideVersion,
    },
  ];
  return (
    <Flex
      gap="large"
      style={{
        background: colorFillQuaternary,
        padding: padding,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        border: `${lineWidth}px solid ${colorBorderSecondary}`,
        marginTop: 8,
      }}
    >
      <Flex vertical gap="large">
        <Flex vertical>
          <Title level={3}>{name}</Title>
          <Text>{description}</Text>
        </Flex>

        <Descriptions size="small" items={items} column={2} />
      </Flex>
      <div
        style={{
          width: "180px",
          height: "180px",
          padding: paddingXL,
          flexShrink: 0,
          borderRadius: borderRadius,
          border: `${lineWidth}px solid ${colorBorderSecondary}`,
          background: colorFillQuaternary,
        }}
      >
        <DynamicSVG src={imageSrc} fillColor={colorPrimary} />
      </div>
    </Flex>
  );
};

const Blueprint = ({ data }) => {
  const {
    token: {
      padding,
      colorFillQuaternary,
      lineWidth,
      borderRadius,
      colorBorderSecondary,
    },
  } = theme.useToken();

  const { id: blueprintId, label, description, version, deployments } = data;

  const params = useParams();
  const { "app-id": appId } = params;

  console.log(data);

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
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => <a>Delete</a>,
    },
  ];
  const tabItems = [
    {
      key: "1",
      label: "Deployments",
      children: (
        <Table size="small" columns={tableColumns} dataSource={deployments} />
      ),
    },
    {
      key: "2",
      label: "Info",
      children: <Descriptions size="small" items={infoItems} column={2} />,
    },
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
          padding: padding,
          background: colorFillQuaternary,
        }}
      >
        <Flex vertical>
          <Title level={4}>{label}</Title>
          <Text type="secondary">{description}</Text>
          <Descriptions size="small" items={infoItems} column={2} />
        </Flex>
      </Flex>

      {deployments.length > 0 && (
        <div style={{ padding: padding }}>
          <Table
            size="small"
            columns={tableColumns}
            dataSource={deployments}
            title={() => <Text strong>Deployments</Text>}
            bordered
          />
        </div>
      )}
    </Flex>
  );
};

const PageAppDetails = () => {
  const params = useParams();

  const { "app-id": appId } = params;

  const appData = apps.find((app) => app.id === appId);

  const {
    token: {
      marginXS,
      paddingXL,
      marginXXL,
      margin,
      paddingLG,
      padding,
      paddingMD,
      marginLG,
      colorBorderSecondary,
      lineWidth,
      borderRadius,
    },
  } = theme.useToken();

  const {
    name,
    description,
    version,
    id,
    expectedOperaideVersion,
    categories,
    imageSrc,
  } = appData;

  const items = [
    {
      key: "1",
      label: "ID",
      children: id,
    },
    {
      key: "2",
      label: "Version",
      children: version,
    },
    {
      key: "3",
      label: "Categories",
      children: (
        <Flex wrap>
          {categories.map((category) => (
            <Tag key={category} style={{ marginBottom: marginXS }}>
              {category}
            </Tag>
          ))}
        </Flex>
      ),
    },
    {
      key: "4",
      label: "Expected Operaide Version",
      children: expectedOperaideVersion,
    },
  ];

  return (
    <div>
      <AppHeader data={appData} />

      <Flex
        vertical
        gap="middle"
        style={{
          padding,
          border: `${lineWidth}px solid ${colorBorderSecondary}`,
          borderTop: 0,
          borderBottomRightRadius: borderRadius,
          borderBottomLeftRadius: borderRadius,
        }}
      >
        {appData.blueprints.map((blueprint) => (
          <Blueprint key={blueprint.id} data={blueprint} />
        ))}
      </Flex>
    </div>
  );
};

export default PageAppDetails;
