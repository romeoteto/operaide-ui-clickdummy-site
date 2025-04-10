import React from "react";
import {
  Flex,
  Input,
  Select,
  Table,
  Tooltip,
  Dropdown,
  Divider,
  Space,
  Button,
  theme,
} from "antd";
import { useSearchParams, Link } from "wouter";
import {
  Ellipsis,
  Settings2,
  LayoutDashboard,
  ChevronDown,
  GaugeCircle,
  Cloud,
  Trash2,
  Play,
  Atom,
} from "lucide-react";
import { apps } from "../../../database/apps";
import PageHeader from "../../../components/pageHeader";

const PageDeploymentsIndex = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const blueprintId = searchParams.get("blueprintId");

  const {
    token: { colorBgElevated, borderRadiusLG, boxShadowSecondary, fontSizeSM },
  } = theme.useToken();

  const deployments = apps.flatMap((app) =>
    app.blueprints.flatMap((blueprint) =>
      blueprint.deployments.map((deployment) => ({
        ...deployment,
        appId: app.id,
        appName: app.name,
        blueprintId: blueprint.id,
        blueprintLabel: blueprint.label,
      }))
    )
  );

  const filteredDeployments = blueprintId
    ? deployments.filter((deployment) => deployment.blueprintId === blueprintId)
    : deployments;

  const handleChange = (value) => {
    setSearchParams({ blueprintId: value });
  };

  const selectOptions = [
    ...Array.from(
      new Map(
        deployments.map((deployment) => [
          deployment.blueprintId,
          { value: deployment.blueprintId, label: deployment.blueprintLabel },
        ])
      ).values()
    ),
  ];

  const tableColumns = [
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
      render: (_, deployment) => (
        <Link
          to={`/reaktor-ai-engine/${deployment.appId}/${deployment.blueprintId}/${deployment.id}/overview`}
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
      title: "Parent Reaktor",
      dataIndex: "blueprintLabel",
      key: "blueprintLabel",
      render: (_, deployment) => (
        <Link
          to={`/reaktor-ai-engine/${deployment.appId}/${deployment.blueprintId}/overview`}
        >
          {deployment.blueprintLabel}
        </Link>
      ),
    },
    {
      key: "operation",
      align: "right",
      render: (_, deployment) => {
        const deploymentActions = [
          {
            key: "overview",
            label: (
              <Link
                to={`/reaktor-ai-engine/${deployment.appId}/${deployment.blueprintId}/${deployment.id}/overview`}
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
                to={`/reaktor-ai-engine/${deployment.appId}/${deployment.reaktorId}/${deployment.id}/metrics`}
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
                to={`/reaktor-ai-engine/${deployment.appId}/${deployment.reaktorId}/${deployment.id}/api`}
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
                to={`/reaktor-ai-engine/${deployment.appId}/${deployment.reaktorId}/${deployment.id}/execute`}
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
                to={`/reaktor-ai-engine/${deployment.appId}/${deployment.reaktorId}/${deployment.id}/settings`}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <Settings2 size="1em" />
                Edit Settings
              </Link>
            ),
          },
          {
            type: "divider",
          },
          {
            key: "reaktor",
            label: (
              <Link
                to={`/reaktor-ai-engine/${deployment.appId}/${deployment.blueprintId}/overview`}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <Atom size="1em" />
                Inspect Parent Reaktor
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

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <>
      <PageHeader
        title="Deployments"
        subtitle="Reaktors that are deployed are ready for action. They can be externally triggered through API REST endpoints."
      />
      <Flex vertical gap="large">
        <Flex justify="between" align="center" gap="large">
          <Input
            placeholder="Search deployment"
            value=""
            onChange={(e) => console.log(e.target.value)}
            variant="filled"
            style={{ flex: 1 }}
          />
          <Select
            variant="filled"
            placeholder="Filter by Reaktor"
            value={blueprintId} // fallback to "all" if no param
            style={{ flex: 1 }}
            onChange={handleChange}
            options={selectOptions}
            suffixIcon={<ChevronDown size="1.25em" />}
          />
          <Button
            size="small"
            color="default"
            variant="link"
            onClick={() => clearFilters()}
            style={{ fontSize: fontSizeSM }}
            disabled={!blueprintId}
          >
            Clear
          </Button>
        </Flex>
        <Table
          size="middle"
          bordered
          columns={tableColumns}
          dataSource={filteredDeployments}
        />
      </Flex>
    </>
  );
};

export default PageDeploymentsIndex;
