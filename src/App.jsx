import React, { useState } from "react";
import AppLayout from "./layout";
import PageHeader from "./components/pageHeader";

import Home from "./pages/home";
import PageReaktorAIEngine from "./pages/reaktorAiEngine";

import { Route, Switch } from "wouter";
import PageSettings from "./pages/settings";
import ReaktorDetails from "./pages/reaktorDetails";
import DeploymentDetails from "./pages/deploymentDetails";
import PageLogin from "./pages/login";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <>
      {isLoggedIn ? (
        <AppLayout>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
            <Route path="/reaktor-ai-engine">
              <PageReaktorAIEngine />
            </Route>
            <Route path="/reaktor-ai-engine/:reaktor-id">
              <ReaktorDetails />
            </Route>
            <Route path="/reaktor-ai-engine/:reaktor-id/:deployment-id">
              <DeploymentDetails />
            </Route>
            <Route path="/data-studio/documents">
              <PageHeader title="Documents" subtitle="Some text." />
            </Route>
            <Route path="/data-studio/document-groups">
              <PageHeader title="Document Groups" subtitle="Some text." />
            </Route>
            <Route path="/data-studio/vector-db">
              <PageHeader title="Vector DB" subtitle="Some text." />
            </Route>
            <Route path="/integrations/ai-provider">
              <PageHeader title="AI Provider" subtitle="Some text." />
            </Route>
            <Route path="/integrations/services">
              <PageHeader title="Services" subtitle="Some text." />
            </Route>
            <Route path="/settings">
              <PageSettings />
            </Route>
          </Switch>
        </AppLayout>
      ) : (
        <PageLogin onFinish={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}
