import React from "react";
import {
  Dropdown,
  Flex,
  Space,
  Table,
  Typography,
  Descriptions,
  Button,
  Divider,
  Avatar,
  theme,
} from "antd";
import {
  Ellipsis,
  LayoutDashboard,
  Workflow,
  Settings2,
  Rocket,
  GaugeCircle,
  Cloud,
  Play,
  Trash2,
  Download,
  Box,
} from "lucide-react";
import { Link } from "wouter";

const { Text, Title: AntTitle } = Typography;

const ReaktorTable = ({ app }) => {
  const {
    token: {
      colorBgElevated,
      borderRadiusLG,
      boxShadowSecondary,
      colorPrimary,
      colorPrimaryBg,
    },
  } = theme.useToken();

  const contentStyle = {
    backgroundColor: colorBgElevated,
    borderRadius: borderRadiusLG,
    boxShadow: boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: "none",
  };

  const expandedRowRender = (reaktor) => {
    const deploymentActions = [
      {
        key: "1",
        label: "Inspect Deployment",
        icon: <LayoutDashboard size="1em" />,
      },
      { key: "2", label: "Show Metrics", icon: <GaugeCircle size="1em" /> },
      { key: "3", label: "Show API Endpoints", icon: <Cloud size="1em" /> },
      { key: "4", label: "Execute Deployment", icon: <Play size="1em" /> },
      { key: "5", label: "Edit Settings", icon: <Settings2 size="1em" /> },
    ];

    const expandColumns = [
      { title: "Label", dataIndex: "label", key: "label" },
      { title: "ID", dataIndex: "id", key: "id" },
      { title: "Description", dataIndex: "description", key: "description" },
      {
        key: "operation",
        align: "right",
        render: () => (
          <Dropdown
            menu={{ items: deploymentActions }}
            dropdownRender={(menu) => (
              <div style={contentStyle}>
                {React.cloneElement(menu, { style: menuStyle })}
                <Divider style={{ margin: 0 }} />
                <Space style={{ padding: 8 }}>
                  <Button
                    type="primary"
                    danger
                    size="small"
                    icon={<Trash2 size="1em" />}
                  >
                    Delete
                  </Button>
                </Space>
              </div>
            )}
          >
            <Button
              icon={<Ellipsis size="1em" />}
              color="default"
              variant="text"
            />
          </Dropdown>
        ),
      },
    ];

    const expandDataSource = reaktor.deployments.map((deployment) => ({
      ...deployment,
      key: deployment.id,
    }));

    return (
      <Table
        columns={expandColumns}
        dataSource={expandDataSource}
        pagination={false}
        size="middle"
      />
    );
  };

  const reaktorActions = [
    {
      key: "1",
      label: "Inspect Reaktor",
      icon: <LayoutDashboard size="1em" />,
    },
    { key: "2", label: "Show Diagram", icon: <Workflow size="1em" /> },
  ];

  const columns = [
    { title: "Label", dataIndex: "label", key: "label" },
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Version", dataIndex: "version", key: "version" },
    {
      align: "right",
      key: "operation",
      render: () => (
        <Dropdown
          menu={{ items: reaktorActions }}
          dropdownRender={(menu) => (
            <div style={contentStyle}>
              {React.cloneElement(menu, { style: menuStyle })}
              <Divider style={{ margin: 0 }} />
              <Space style={{ padding: 8 }}>
                <Button
                  type="primary"
                  size="small"
                  icon={<Rocket size="1em" />}
                >
                  Deploy
                </Button>
              </Space>
            </div>
          )}
        >
          <Button
            icon={<Ellipsis size="1em" />}
            color="default"
            variant="text"
          />
        </Dropdown>
      ),
    },
  ];

  const dataSource = app.blueprints.map((item) => ({
    ...item,
    key: item.id,
  }));

  const Title = () => (
    <Flex align="center" justify="space-between">
      <Flex vertical>
        <AntTitle level={5}>{app.name}</AntTitle>
        <Text type="secondary">{app.description}</Text>
      </Flex>
      <Avatar
        shape="square"
        size="large"
        icon={<Box size="1em" />}
        style={{ background: colorPrimary }}
      />
    </Flex>
  );

  const footerItems = [
    { key: "app-id", label: "App ID", children: app.id },
    { key: "app-version", label: "App Version", children: app.version },
  ];

  return (
    <Table
      columns={columns}
      size="middle"
      expandable={{
        expandedRowRender,
        defaultExpandedRowKeys: ["0"],
        rowExpandable: (blueprint) => blueprint.deployments.length > 0,
      }}
      dataSource={dataSource}
      bordered
      title={() => <Title />}
      footer={() => (
        <Flex>
          <Descriptions size="small" items={footerItems} column={2} />{" "}
          <Button size="small" type="text" icon={<Download size="1em" />}>
            Download
          </Button>
        </Flex>
      )}
      style={{ width: "100%" }}
      pagination={false}
    />
  );
};

export default ReaktorTable;
