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
  Badge,
  Avatar,
  Tooltip,
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
      paddingXS,
      padding,
      margin,
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
    const expandColumns = [
      {
        title: "Label",
        dataIndex: "label",
        key: "label",
        render: (_, deployment) => (
          <Link
            to={`/reaktor-ai-engine/${app.id}/${reaktor.id}/${deployment.id}/overview`}
          >
            {deployment.label}
          </Link>
        ),
      },
      { title: "ID", dataIndex: "id", key: "id" },
      { title: "Description", dataIndex: "description", key: "description" },
      {
        key: "operation",
        align: "right",
        render: (_, deployment) => {
          const deploymentActions = [
            {
              key: "overview",
              label: (
                <Link
                  to={`/reaktor-ai-engine/${app.id}/${reaktor.id}/${deployment.id}/overview`}
                  style={{ display: "flex", alignItems: "center", gap: 6 }}
                >
                  <LayoutDashboard size="1em" />
                  Inspect Deployment
                </Link>
              ),
            },
            {
              key: "metrics",
              label: (
                <Link
                  to={`/reaktor-ai-engine/${app.id}/${reaktor.id}/${deployment.id}/metrics`}
                  style={{ display: "flex", alignItems: "center", gap: 6 }}
                >
                  <GaugeCircle size="1em" />
                  Show Metrics
                </Link>
              ),
            },
            {
              key: "api",
              label: (
                <Link
                  to={`/reaktor-ai-engine/${app.id}/${reaktor.id}/${deployment.id}/api`}
                  style={{ display: "flex", alignItems: "center", gap: 6 }}
                >
                  <Cloud size="1em" />
                  Show API Endpoints
                </Link>
              ),
            },
            {
              key: "execute",
              label: (
                <Link
                  to={`/reaktor-ai-engine/${app.id}/${reaktor.id}/${deployment.id}/execute`}
                  style={{ display: "flex", alignItems: "center", gap: 6 }}
                >
                  <Play size="1em" />
                  Execute Deployment
                </Link>
              ),
            },
            {
              key: "settings",
              label: (
                <Link
                  to={`/reaktor-ai-engine/${app.id}/${reaktor.id}/${deployment.id}/settings`}
                  style={{ display: "flex", alignItems: "center", gap: 6 }}
                >
                  <Settings2 size="1em" />
                  Edit Settings
                </Link>
              ),
            },
          ];

          return (
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
          );
        },
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

  const columns = [
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
      render: (_, reaktor) => (
        <Link to={`/reaktor-ai-engine/${app.id}/${reaktor.id}/overview`}>
          {reaktor.label}
        </Link>
      ),
    },
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: {
        showTitle: false,
      },
      render: (description) => (
        <Tooltip placement="topLeft" title={description}>
          {description}
        </Tooltip>
      ),
    },
    { title: "Version", dataIndex: "version", key: "version" },
    {
      title: "Status",
      key: "state",
      render: (_, reaktor) => {
        const hasDeployments =
          reaktor.deployments && reaktor.deployments.length > 0;
        return (
          <Badge
            status={hasDeployments ? "success" : "default"}
            text={hasDeployments ? "Deployed" : "Not Deployed"}
          />
        );
      },
    },
    {
      align: "right",
      key: "operation",
      render: (_, reaktor) => {
        const reaktorActions = [
          {
            key: "inspect",
            label: (
              <Link
                to={`/reaktor-ai-engine/${app.id}/${reaktor.id}/overview`}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <LayoutDashboard size="1em" />
                Inspect Reaktor
              </Link>
            ),
          },
          {
            key: "diagram",
            label: (
              <Link
                to={`/reaktor-ai-engine/${app.id}/${reaktor.id}/diagram`}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <Workflow size="1em" />
                Show Diagram
              </Link>
            ),
          },
          {
            key: "settings",
            label: (
              <Link
                to={`/reaktor-ai-engine/${app.id}/${reaktor.id}/default-settings`}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <Settings2 size="1em" />
                Show Settings
              </Link>
            ),
          },
        ];

        return (
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
        );
      },
    },
  ];

  const dataSource = app.blueprints.map((item) => ({
    ...item,
    key: item.id,
  }));

  const Title = () => (
    <Flex
      style={{
        paddingLeft: padding,
        paddingRight: padding,
        paddingTop: paddingXS,
        paddingBottom: paddingXS,
      }}
    >
      <Avatar
        shape="square"
        icon={<Box size="1em" />}
        style={{ background: colorPrimary, marginRight: margin }}
      />
      <Flex vertical>
        <AntTitle level={5}>{app.name}</AntTitle>
        <Text type="secondary">{app.description}</Text>
      </Flex>
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
          <Descriptions size="small" items={footerItems} column={2} />
          <Button size="small" type="text" icon={<Download size="1em" />}>
            Download
          </Button>
        </Flex>
      )}
      pagination={false}
    />
  );
};

export default ReaktorTable;
