import React from "react";
import {
  Flex,
  Input,
  Select,
  Table,
  Tooltip,
  Badge,
  Dropdown,
  Divider,
  Space,
  Button,
  theme,
} from "antd";
import { useSearchParams, Link } from "wouter";
import { Ellipsis, Rocket, ChevronDown } from "lucide-react";
import { apps } from "../../../database/apps";
import PageHeader from "../../../components/pageHeader";

const PageReaktorsIndex = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const appId = searchParams.get("appId");

  const {
    token: { colorBgElevated, borderRadiusLG, boxShadowSecondary, fontSizeSM },
  } = theme.useToken();

  const reaktors = apps.flatMap((app) =>
    app.blueprints.map((blueprint) => ({
      key: blueprint.id,
      appId: app.id,
      appName: app.name,
      ...blueprint,
    }))
  );

  const filteredReaktors = appId
    ? reaktors.filter((reaktor) => reaktor.appId === appId)
    : reaktors;

  const handleChange = (value) => {
    setSearchParams({ appId: value });
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const selectOptions = [
    ...Array.from(
      new Map(
        reaktors.map((reaktor) => [
          reaktor.appId,
          { value: reaktor.appId, label: reaktor.appName },
        ])
      ).values()
    ),
  ];

  const tableColumns = [
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
      render: (_, reaktor) => (
        <Link to={`/reaktor-ai-engine/${reaktor.appId}/${reaktor.id}`}>
          {reaktor.label}
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
      title: "Parent App",
      dataIndex: "appName",
      key: "appName",
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
              <Link
                to={`/reaktor-ai-engine/${reaktor.appId}/${reaktor.id}/diagram`}
              >
                Inspect Reaktor
              </Link>
            ),
          },
          {
            key: "settings",
            label: (
              <Link
                to={`/reaktor-ai-engine/${reaktor.appId}/${reaktor.id}/default-settings`}
              >
                Show Settings
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

  return (
    <>
      <PageHeader
        title="Reaktors"
        subtitle="Reaktors are the core building blocks of your agentic applications. They encapsulate isolated business processes."
      />
      <Flex vertical gap="large">
        <Flex justify="between" align="center" gap="large">
          <Input
            placeholder="Search Reaktor"
            value=""
            onChange={(e) => console.log(e.target.value)}
            variant="filled"
            style={{ flex: 1 }}
          />
          <Select
            variant="filled"
            placeholder="Filter by app"
            value={appId} // fallback to "all" if no param
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
            disabled={!appId}
          >
            Clear
          </Button>
        </Flex>
        <Table
          size="middle"
          bordered
          columns={tableColumns}
          dataSource={filteredReaktors}
          pagination={{
            showSizeChanger: true,
          }}
        />
      </Flex>
    </>
  );
};

export default PageReaktorsIndex;
