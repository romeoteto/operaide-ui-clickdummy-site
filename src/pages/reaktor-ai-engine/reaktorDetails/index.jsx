import { useParams, useSearchParams } from "wouter";
import { apps } from "../../../database/apps";
import { Workflow, Settings2, Rocket, Info } from "lucide-react";
import TabNav from "../../../components/tabNav";
import Diagram from "./diagram";
import PageHeader from "../../../components/pageHeader";
import ReaktorInfo from "./info";
import Deployments from "./deployments";

export default function ReaktorDetails() {
  const params = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const activeKey = searchParams.get("activeKey") || 0;

  const { "reaktor-id": reaktorId, "app-id": appId } = params;

  const app = apps.find((app) => app.id === appId);
  const blueprint = app?.blueprints?.find((bp) => bp.id === reaktorId);

  const { label, description } = blueprint;

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
      icon: Workflow,
      label: "Diagram",
      component: <Diagram chart={diagram} />,
    },
    {
      icon: Settings2,
      label: "Default Settings",
    },
    {
      icon: Rocket,
      label: "Deployments",
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
