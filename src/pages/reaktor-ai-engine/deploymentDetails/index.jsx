import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import { apps } from "../../../database/apps";
import PageHeader from "../../../components/pageHeader";
import { Info, CircleGauge, Settings2, Workflow, Play } from "lucide-react";
import TabNav from "../../../components/tabNav";
import { Flex, Typography, Table, Tag, Image, Input, Button } from "antd";
import Dashboard from "./dashboard";

export default function PageDeploymentDetails() {
  const params = useParams();
  const [activeKey, setActiveKey] = useState(0);

  const [location, navigate] = useLocation();

  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.href === location);
    if (index !== -1) {
      setActiveKey(index);
    }
  }, [location]);

  const {
    "reaktor-id": reaktorId,
    "deployment-id": deploymentId,
    "app-id": appId,
  } = params;

  //** Update here */

  const app = apps.find((app) => app.id === appId);
  const blueprint = app.blueprints.find(
    (blueprint) => blueprint.id === reaktorId
  );
  const deployment = blueprint.deployments.find(
    (deployment) => deployment.id === deploymentId
  );

  //** Update here */

  const tabs = [
    {
      icon: CircleGauge,
      label: "Dashboard",
      href: `/reaktor-ai-engine/${appId}/${reaktorId}/${deploymentId}/dashboard`,
      component: <Dashboard />,
    },
    {
      icon: Settings2,
      label: "Settings",
      href: `/reaktor-ai-engine/${appId}/${reaktorId}/${deploymentId}/settings`,
    },
    {
      icon: Play,
      label: "Execution",
      href: `/reaktor-ai-engine/${appId}/${reaktorId}/${deploymentId}/execution`,
    },
    {
      icon: Workflow,
      label: "Diagram",
      href: `/reaktor-ai-engine/${appId}/${reaktorId}/${deploymentId}/diagram`,
    },
    {
      icon: Info,
      label: "Info",
      href: `/reaktor-ai-engine/${appId}/${reaktorId}/${deploymentId}/info`,
    },
  ];

  const onTabClick = (key) => {
    const href = tabs[key].href;
    navigate(href);
  };

  return (
    <div>
      <PageHeader title={deployment.label} subtitle={deployment.description} />
      <TabNav
        tabs={tabs}
        activeKey={activeKey}
        onTabClick={(key) => onTabClick(key)}
      />
      {tabs[activeKey]?.component}
    </div>
  );
}
