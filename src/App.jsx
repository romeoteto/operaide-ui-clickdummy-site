import React, { useState } from "react";
import AppLayout from "./layout";
import PageHeader from "./components/pageHeader";

import Home from "./pages/home";
import PageReaktorAIEngine from "./pages/reaktorAiEngine";

import { Route, Switch, Redirect } from "wouter";
import PageSettings from "./pages/settings";
import ReaktorDetails from "./pages/reaktorDetails";
import DeploymentDetails from "./pages/deploymentDetails";
import PageLogin from "./pages/login";
import PageSystemAdmin from "./pages/system-admin";

function RedirectToReaktorDashboard() {
  const { "reaktor-id": reaktorId } = useParams();
  return <Redirect to={`/reaktor-ai-engine/${reaktorId}/dashboard`} />;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentOrganization, setCurrentOrganization] = useState(26);

  return (
    <>
      {isLoggedIn ? (
        <AppLayout
          currentOrganization={currentOrganization}
          setCurrentOrganization={(value) => setCurrentOrganization(value)}
        >
          <Switch>
            <Route path="/">
              <Home currentOrganization={currentOrganization} />
            </Route>
            <Route path="/reaktor-ai-engine">
              <PageReaktorAIEngine />
            </Route>
            <Route
              path="/reaktor-ai-engine/:reaktor-id"
              component={ReaktorDetails}
            />

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
            <Route
              path="/settings"
              component={() => <Redirect to="/settings/general" />}
            />
            <Route
              path="/settings/*"
              component={() => (
                <PageSettings currentOrganization={currentOrganization} />
              )}
            />

            <Route
              path="/system-admin"
              component={() => <Redirect to="/system-admin/organizations" />}
            />
            <Route path="/system-admin/*" component={PageSystemAdmin} />
          </Switch>
        </AppLayout>
      ) : (
        <PageLogin onFinish={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}
