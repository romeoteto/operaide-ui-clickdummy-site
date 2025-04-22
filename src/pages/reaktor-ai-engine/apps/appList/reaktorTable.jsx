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
import { Ellipsis, Rocket, Trash2, Download, Box, Monitor } from "lucide-react";
import { Link } from "wouter";
import { frontendMap } from "../../../../database/apps";
import { useLocation } from "wouter";

const { Text, Title: AntTitle } = Typography;

const ReaktorTable = ({ app }) => {
  const {
    token: {
      colorBgElevated,
      borderRadiusLG,
      boxShadowSecondary,
      colorPrimary,
      paddingXS,
      paddingSM,
      padding,
      margin,
    },
  } = theme.useToken();

  const [_, navigate] = useLocation();

  const contentStyle = {
    backgroundColor: colorBgElevated,
    borderRadius: borderRadiusLG,
    boxShadow: boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: "none",
  };

  const hasFrontend = Object.keys(frontendMap).includes(app.id);

  const expandedRowRender = (reaktor) => {
    const expandColumns = [
      {
        title: "Label",
        dataIndex: "label",
        key: "label",
        render: (_, deployment) => (
          <Link
            to={`/reaktor-ai-engine/${app.id}/${reaktor.id}/${deployment.id}`}
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
              key: "dashboard",
              label: (
                <Link
                  to={`/reaktor-ai-engine/${app.id}/${reaktor.id}/${deployment.id}`}
                >
                  Inspect Deployment
                </Link>
              ),
            },
            {
              key: "api",
              label: (
                <a
                  href={"https://petstore.swagger.io/v2/swagger.json"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Show OpenAPI Definition
                </a>
              ),
            },
            {
              key: "api",
              label: (
                <a
                  href={"https://petstore.swagger.io/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Show API Endpoints
                </a>
              ),
            },
            {
              key: "execution",
              label: (
                <Link
                  to={`/reaktor-ai-engine/${app.id}/${reaktor.id}/${deployment.id}?activeKey=2`}
                >
                  Execute Deployment
                </Link>
              ),
            },
            {
              key: "settings",
              label: (
                <Link
                  to={`/reaktor-ai-engine/${app.id}/${reaktor.id}/${deployment.id}?activeKey=1`}
                >
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
        size="small"
      />
    );
  };

  const columns = [
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
      render: (_, reaktor) => (
        <Link to={`/reaktor-ai-engine/${app.id}/${reaktor.id}`}>
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
    {
      title: "Status",
      key: "state",
      render: (_, reaktor) => {
        const hasDeployments =
          reaktor.deployments && reaktor.deployments.length > 0;
        return (
          <Badge
            status={hasDeployments ? "processing" : "default"}
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
            key: "diagram",
            label: (
              <Link to={`/reaktor-ai-engine/${app.id}/${reaktor.id}`}>
                Inspect Reaktor
              </Link>
            ),
          },
          {
            key: "settings",
            label: (
              <Link
                to={`/reaktor-ai-engine/${app.id}/${reaktor.id}?activeKey=1`}
              >
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
      justify="space-between"
      style={{
        paddingLeft: padding,
        paddingRight: padding,
        paddingTop: paddingSM,
        paddingBottom: paddingSM,
      }}
    >
      <Flex>
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
      {hasFrontend && (
        <Button
          onClick={() => navigate(`/reaktor-ai-engine/apps/${app.id}`)}
          type="primary"
          size="small"
          icon={<Monitor size="1em" />}
        >
          Open App
        </Button>
      )}
    </Flex>
  );

  const footerItems = [
    { key: "app-id", label: "App ID", children: app.id },
    { key: "app-version", label: "App Version", children: app.version },
  ];

  return (
    <Table
      columns={columns}
      size="small"
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
