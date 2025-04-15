import React from "react";
import { useRoute } from "wouter";
import { frontendMap } from "../../../../database/apps";
import { apps } from "../../../../database/apps";
import PageHeader from "../../../../components/pageHeader";

const NotFound = () => {
  return <div>Not Found</div>;
};

const AppFrontends = () => {
  const [match, params] = useRoute("/reaktor-ai-engine/apps/:appId");

  if (!match) return <NotFound />;

  const { appId } = params;
  const FrontendComponent = frontendMap[appId];
  const app = apps.find((app) => app.id === appId);

  if (!FrontendComponent) {
    return <NotFound />;
  }

  return (
    <>
      <PageHeader title={app.name} subtitle={app.description} />
      <FrontendComponent app={app} />
    </>
  );
};

export default AppFrontends;
