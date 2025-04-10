import React from "react";
import {
  Divider,
  Tooltip,
  List,
  Typography,
  Flex,
  Descriptions,
  Space,
  Button,
  Dropdown,
  theme,
} from "antd";
import { apps } from "../../database/apps";
import { Info, Ellipsis } from "lucide-react";
import { Link, useLocation } from "wouter";

const { Text, Title } = Typography;
const AppContainer = ({ app }) => {
  const {
    token: {
      paddingXL,
      paddingSM,
      paddingXS,
      colorPrimary,
      colorFillQuaternary,
      marginXS,
      padding,
      lineWidth,
      borderRadius,
      colorBorderSecondary,
      colorBgElevated,
      borderRadiusLG,
      boxShadowSecondary,
    },
  } = theme.useToken();

  const [_, navigate] = useLocation();

  const appActions = [
    {
      key: "1",
      label: <Link>Inspect App</Link>,
    },
    {
      key: "2",
      label: <Link>Download App</Link>,
    },
  ];

  const blueprintActions = [
    {
      key: "1",
      label: <Link>Inspect Reaktor</Link>,
    },
    {
      key: "2",
      label: <Link>Show Diagram</Link>,
    },
  ];

  const deploymentActions = [
    {
      key: "1",
      label: <Link>Inspect Deployment</Link>,
    },
    {
      key: "2",
      label: <Link>Show Metrics</Link>,
    },
    {
      key: "3",
      label: <Link>Show API Endpoints</Link>,
    },
    {
      key: "4",
      label: <Link>Execute Deployment</Link>,
    },
    {
      key: "5",
      label: <Link>Edit Settings</Link>,
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
    <div
      style={{
        border: `${lineWidth}px solid ${colorBorderSecondary}`,
        flex: 1,
        borderRadius,
      }}
    >
      <Flex
        justify="space-between"
        align="flex-start"
        style={{ padding: paddingXS, background: colorFillQuaternary }}
      >
        <Link>
          <Flex align="center" gap="small" style={{ marginBottom: marginXS }}>
            <Title level={5} style={{ margin: 0 }}>
              {app.name}
            </Title>

            <Tooltip
              placement="right"
              title={
                <Flex vertical>
                  <span>App ID: {app.id}</span>
                  <span>Version: {app.version}</span>
                </Flex>
              }
            >
              <Info size="1em" />
            </Tooltip>
          </Flex>
          <Text type="secondary">{app.description}</Text>
        </Link>

        <Dropdown menu={{ items: appActions }}>
          <Button size="small" type="text" icon={<Ellipsis size="1em" />} />
        </Dropdown>
      </Flex>

      <Flex vertical gap="small" style={{ padding: paddingXS }}>
        {app.blueprints.map((blueprint) => (
          <Flex
            vertical
            key={blueprint.id}
            style={{
              border: `${lineWidth}px solid ${colorBorderSecondary}`,
              borderRadius,
              overflow: "hidden",
            }}
          >
            <Flex
              justify="space-between"
              style={{ padding: paddingXS, background: colorFillQuaternary }}
            >
              <Text strong>{blueprint.label}</Text>
              <Dropdown
                menu={{ items: blueprintActions }}
                dropdownRender={(menu) => (
                  <div style={contentStyle}>
                    {React.cloneElement(menu, { style: menuStyle })}
                    <Divider style={{ margin: 0 }} />
                    <Space style={{ padding: 8 }}>
                      <Button type="primary" size="small">
                        Deploy
                      </Button>
                    </Space>
                  </div>
                )}
              >
                <Button
                  size="small"
                  type="text"
                  icon={<Ellipsis size="1em" />}
                />
              </Dropdown>
            </Flex>
            {blueprint.deployments.length > 0 && (
              <div style={{ padding: paddingXS }}>
                {blueprint.deployments.map((deployment) => (
                  <Flex
                    justify="space-between"
                    align="center"
                    key={deployment.id}
                  >
                    <Text>{deployment.label}</Text>
                    <Dropdown
                      menu={{ items: deploymentActions }}
                      dropdownRender={(menu) => (
                        <div style={contentStyle}>
                          {React.cloneElement(menu, { style: menuStyle })}
                          <Divider style={{ margin: 0 }} />
                          <Space style={{ padding: 8 }}>
                            <Button danger type="primary" size="small">
                              Delete
                            </Button>
                          </Space>
                        </div>
                      )}
                    >
                      <Button
                        size="small"
                        type="text"
                        icon={<Ellipsis size="1em" />}
                      />
                    </Dropdown>
                  </Flex>
                ))}
              </div>
            )}
          </Flex>
        ))}
      </Flex>
    </div>
  );
};

const AppList = () => (
  <>
    <List
      split={false}
      dataSource={apps}
      renderItem={(app) => (
        <List.Item key={app.id}>
          <AppContainer app={app} />
        </List.Item>
      )}
    />
  </>
);
export default AppList;
