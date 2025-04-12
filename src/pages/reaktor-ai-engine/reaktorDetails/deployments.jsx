import React from "react";
import {
  Table,
  Tooltip,
  Flex,
  Dropdown,
  Button,
  Divider,
  Space,
  theme,
} from "antd";
import { useParams, Link } from "wouter";
import { Ellipsis, Trash2, Rocket } from "lucide-react";

import { apps } from "../../../database/apps";

const Deployments = () => {
  const params = useParams();
  const { "reaktor-id": reaktorId } = params;

  const {
    token: { colorBgElevated, borderRadiusLG, boxShadowSecondary },
  } = theme.useToken();

  const deployments = apps.flatMap((app) =>
    app.blueprints.flatMap((blueprint) =>
      blueprint.deployments.map((deployment) => ({
        ...deployment,
        key: deployment.id,
        appId: app.id,
        appName: app.name,
        blueprintId: blueprint.id,
        blueprintLabel: blueprint.label,
      }))
    )
  );

  const filteredDeployments = deployments.filter(
    (deployment) => deployment.blueprintId === reaktorId
  );

  const tableColumns = [
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
      render: (_, deployment) => (
        <Link
          to={`/reaktor-ai-engine/${deployment.appId}/${deployment.blueprintId}/${deployment.id}/dashboard`}
        >
          {deployment.label}
        </Link>
      ),
    },
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
      title: "ID",
      dataIndex: "id",
      key: "id",
    },

    {
      key: "operation",
      align: "right",
      render: (_, deployment) => {
        const deploymentActions = [
          {
            key: "dashboard",
            label: (
              <Link
                to={`/reaktor-ai-engine/${deployment.appId}/${deployment.blueprintId}/${deployment.id}/dashboard`}
              >
                Inspect Deployment
              </Link>
            ),
          },
          {
            key: "openApi",
            label: <Link to={""}>Show OpenAPI Definition</Link>,
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
                to={`/reaktor-ai-engine/${deployment.appId}/${deployment.blueprintId}/${deployment.id}/execution`}
              >
                Execute Deployment
              </Link>
            ),
          },
          {
            key: "settings",
            label: (
              <Link
                to={`/reaktor-ai-engine/${deployment.appId}/${deployment.blueprintId}/${deployment.id}/settings`}
              >
                Edit Settings
              </Link>
            ),
          },
        ];

        const contentStyle = {
          backgroundColor: colorBgElevated,
          borderRadius: borderRadiusLG,
          boxShadow: boxShadowSecondary,
        };
        const menuStyle = {
          boxShadow: "none",
        };

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

  return (
    <Flex vertical gap="large">
      <Flex justify="flex-end">
        <Button type="primary" icon={<Rocket size="1em" />}>
          Deploy
        </Button>
      </Flex>
      <Table
        size="middle"
        bordered
        columns={tableColumns}
        dataSource={filteredDeployments}
      />
    </Flex>
  );
};

export default Deployments;
