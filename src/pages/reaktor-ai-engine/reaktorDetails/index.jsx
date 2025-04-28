import { useParams, useSearchParams } from "wouter";
import { apps } from "../appDatabase";
import { Workflow, Settings2, Rocket, Info, CircleGauge } from "lucide-react";
import TabNav from "../../../components/tabNav";
import Diagram from "./diagram";
import PageHeader from "../../../components/pageHeader";
import ReaktorInfo from "./info";
import Deployments from "./deployments";

import Dashboard from "../deploymentDetails/dashboard";

import { definitions } from "../mermaidDefinitions";

export default function ReaktorDetails() {
  const params = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const activeKey = searchParams.get("activeKey") || 0;

  const { "reaktor-id": reaktorId, "app-id": appId } = params;

  const app = apps.find((app) => app.id === appId);
  const blueprint = app?.blueprints?.find((bp) => bp.id === reaktorId);

  const { label, description } = blueprint;

  const diagram =
    definitions.find((def) => def.blueprintId === reaktorId)?.definition || "";

  const tabs = [
    {
      icon: Workflow,
      label: "Workbench",
      component: (
        <div style={{ height: "100%", overflow: "hidden" }}>
          <Diagram chart={diagram} />
        </div>
      ),
    },
    {
      icon: CircleGauge,
      label: "Metrics",
      component: <Dashboard />,
    },
    {
      icon: Rocket,
      label: "Instances",
      component: <Deployments />,
    },

    {
      icon: Info,
      label: "Info",
      component: <ReaktorInfo blueprint={blueprint} app={app} />,
    },
  ];

  return (
    <>
      <PageHeader title={label} subtitle={description} />

      <div>
        <TabNav
          tabs={tabs}
          activeKey={Number(activeKey)}
          onTabClick={(key) => setSearchParams({ activeKey: key })}
        />
        {tabs[activeKey]?.component}
      </div>
    </>
  );
}
