import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import { apps } from "../../../database/apps";
import { LayoutDashboard, Workflow, Settings2, Rocket } from "lucide-react";
import TabNav from "../../../components/tabNav";
import { Flex, Typography, Descriptions, theme } from "antd";
import Diagram from "./diagram";

const { Text, Title } = Typography;

export default function ReaktorDetails() {
  const params = useParams();
  const [activeKey, setActiveKey] = useState(0);

  const [location, navigate] = useLocation();

  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.href === location);
    if (index !== -1) {
      setActiveKey(index);
    }
  }, [location]);

  const { "reaktor-id": reaktorId, "app-id": appId } = params;

  const app = apps.find((app) => app.id === appId);
  const blueprint = app?.blueprints?.find((bp) => bp.id === reaktorId);

  const { id, version, label, description, deployments } = blueprint;

  const {
    token: {
      paddingSM,
      colorFillQuaternary,
      lineWidth,
      borderRadius,
      colorBorderSecondary,
    },
  } = theme.useToken();

  const diagram = String.raw`
graph TD
  %% Subgraph: User Interaction
  subgraph UI[User Interface]
    A[User Clicks 'Deploy'] --> B[Trigger Action]
  end

  %% Subgraph: Backend Logic
  subgraph BE[Backend System]
    B --> C{Is App Valid?}
    C -- Yes --> D[Prepare Deployment]
    C -- No --> E[Show Error Message]
    D --> F[Write to Database]
    F --> G[Send Webhook]
  end

  %% Subgraph: Deployment Engine
  subgraph Engine[Deployment Engine]
    G --> H[Create Deployment Job]
    H --> I[Queue Job]
    I --> J{Job Status}
    J -- Success --> K[Notify User]
    J -- Failure --> L[Retry or Log]
  end

  %% Styles
  classDef good fill:#d4f4dd,stroke:#1a7f37;
  classDef danger fill:#fddede,stroke:#b91c1c;
  classDef process fill:#e0e7ff,stroke:#3730a3;

  class D,F,G,H,I,K process;
  class E,L danger;

`;

  const tabs = [
    {
      icon: LayoutDashboard,
      label: "Overview",
      href: `/reaktor-ai-engine/${appId}/${reaktorId}/overview`,
    },
    {
      icon: Workflow,
      label: "Diagram",
      href: `/reaktor-ai-engine/${appId}/${reaktorId}/diagram`,
      component: <Diagram chart={diagram} />,
    },
    {
      icon: Settings2,
      label: "Default Settings",
      href: `/reaktor-ai-engine/${appId}/${reaktorId}/default-settings`,
    },
    {
      icon: Rocket,
      label: "Deployments",
      href: `/reaktor-ai-engine/${appId}/${reaktorId}/deployments`,
    },
  ];

  const onTabClick = (key) => {
    const href = tabs[key].href;
    navigate(href);
  };

  const descriptionItems = [
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
      label: "App",
      children: <Link href={`/reaktor-ai-engine/${app.id}`}>{app.name}</Link>,
    },
    {
      key: "4",
      label: "Number of deployments",
      children: deployments.length,
    },
  ];

  return (
    <Flex vertical gap="large">
      <Flex
        vertical
        gap="large"
        style={{
          background: colorFillQuaternary,
          padding: paddingSM,
          border: `${lineWidth}px solid ${colorBorderSecondary}`,
          borderRadius,
        }}
      >
        <Flex vertical>
          <Title level={3}>{label}</Title>
          <Text>{description}</Text>
        </Flex>

        <Descriptions size="small" items={descriptionItems} column={2} />
      </Flex>
      <div>
        <TabNav
          tabs={tabs}
          activeKey={activeKey}
          onTabClick={(key) => onTabClick(key)}
        />
        {tabs[activeKey]?.component}
      </div>
    </Flex>
  );
}
