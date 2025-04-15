import { useParams, useSearchParams } from "wouter";
import { apps } from "../../../database/apps";
import PageHeader from "../../../components/pageHeader";
import { Info, CircleGauge, Settings2, Workflow, Play } from "lucide-react";
import TabNav from "../../../components/tabNav";
import { Flex, Typography, Table, Tag, Image, Input, Button } from "antd";
import Dashboard from "./dashboard";

export default function PageDeploymentDetails() {
  const params = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const activeKey = searchParams.get("activeKey") || 0;

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
      component: <Dashboard />,
    },
    {
      icon: Settings2,
      label: "Settings",
    },
    {
      icon: Play,
      label: "Execution",
    },
    {
      icon: Workflow,
      label: "Diagram",
    },
    {
      icon: Info,
      label: "Info",
    },
  ];

  return (
    <div>
      <PageHeader title={deployment.label} subtitle={deployment.description} />
      <TabNav
        tabs={tabs}
        activeKey={Number(activeKey)}
        onTabClick={(key) => setSearchParams({ activeKey: key })}
      />
      {tabs[activeKey]?.component}
    </div>
  );
}
