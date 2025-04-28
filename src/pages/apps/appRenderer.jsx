import React from "react";
import { useRoute, useLocation } from "wouter";
import { apps, frontendMap } from "../reaktor-ai-engine/appDatabase";
import PageHeader from "../../components/pageHeader";
import { Fullscreen } from "lucide-react";
import { Button, Flex } from "antd";

const NotFound = () => {
  return <div>Not Found</div>;
};

const AppRenderer = ({ showPopoutButton }) => {
  const [match1, params1] = useRoute("/reaktor-ai-engine/apps/:appId");
  const [match2, params2] = useRoute("/apps/:appId");

  const match = match1 || match2;
  const params = match1 ? params1 : params2;

  if (!match) return <NotFound />;

  const { appId } = params;
  const FrontendComponent = frontendMap[appId];
  const app = apps.find((app) => app.id === appId);

  if (!FrontendComponent) {
    return <NotFound />;
  }

  return (
    <>
      <Flex justify="space-between">
        <PageHeader title={app.name} subtitle={app.description} />
        {showPopoutButton && (
          <Button
            variant="dashed"
            color="default"
            type="link"
            icon={<Fullscreen size="1em" />}
            href={`/apps/${appId}`}
            rel="noopener noreferrer"
            target="_blank"
          />
        )}
      </Flex>

      <FrontendComponent app={app} />
    </>
  );
};

export default AppRenderer;
