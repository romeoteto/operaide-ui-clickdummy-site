import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ConfigProvider, theme } from "antd";
import { setLogin } from "./state/appSettingsSlice";

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

export default function App() {
  const userIsLoggedIn = useSelector(
    (state) => state.appSettings.userIsLoggedIn
  );

  const accentColorValue = useSelector(
    (state) => state.appSettings.accentColor
  ).value;

  const appearance = useSelector((state) => state.appSettings.appearance);

  const dispatch = useDispatch();

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm:
            appearance === "dark"
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
          token: {
            colorPrimary: accentColorValue,
            colorInfo: accentColorValue,
            colorBgLayout: appearance === "dark" ? "#000000" : "#fafafa",
            reaktorCard: {
              coverHeight: "200px",
              metaHeight: "99px",
              cardWidth: "240px",
            },
            reaktorList: {
              imageHeight: "80px",
              imageWidth: "100px",
            },
          },
        }}
      >
        {userIsLoggedIn ? (
          <AppLayout>
            <Switch>
              <Route path="/">
                <Home />
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
              <Route path="/settings/*" component={() => <PageSettings />} />

              <Route
                path="/system-admin"
                component={() => <Redirect to="/system-admin/organizations" />}
              />
              <Route path="/system-admin/*" component={PageSystemAdmin} />
            </Switch>
          </AppLayout>
        ) : (
          <PageLogin onFinish={() => dispatch(setLogin(true))} />
        )}
      </ConfigProvider>
    </>
  );
}
