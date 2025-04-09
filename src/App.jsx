import React from "react";
import { useSelector } from "react-redux";
import { ConfigProvider, theme } from "antd";
import { Route, Switch, Redirect, useLocation } from "wouter";

import PlatformLayout from "./layouts/platform";
import PageHeader from "./components/pageHeader";

import Home from "./pages/home";
import PageReaktorAIEngine from "./pages/reaktor-ai-engine";

import SystemAdminRedirect from "./components/redirect/SystemAdminRedirect";

import PageSettings from "./pages/settings";

import PageDeploymentDetails from "./pages/reaktor-ai-engine/deploymentDetails";
import PageLogin from "./pages/login";
import PageSystemAdmin from "./pages/system-admin";
import EditUser from "./pages/system-admin/edit-user";
import AppStoreLayout from "./appStore/layout";
import PageAppStoreHome from "./appStore/pages/home";
import PageAppStoreCategory from "./appStore/pages/category";

import PageAppDetails from "./pages/reaktor-ai-engine/appDetails";
import ReaktorDetails from "./pages/reaktor-ai-engine/reaktorDetails";

export default function App() {
  const [location] = useLocation();
  const userIsLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const accentColorValue = useSelector(
    (state) => state.appSettings.accentColor
  ).value;
  const appearance = useSelector((state) => state.appSettings.appearance);

  const platformTheme = {
    algorithm:
      appearance === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
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
  };

  const appStoreTheme = {
    algorithm:
      appearance === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: "#02C4C0",
      colorInfo: "#02C4C0",
    },
  };

  return userIsLoggedIn ? (
    <>
      {location.startsWith("/app-store") ? (
        <ConfigProvider theme={appStoreTheme}>
          <AppStoreLayout>
            <Switch>
              <Route path="/app-store" component={PageAppStoreHome} />
              <Route
                path="/app-store/:category-id"
                component={PageAppStoreCategory}
              />
              <Route
                path="/app-store/:app-id"
                component={<div>I am the app details page</div>}
              />
            </Switch>
          </AppStoreLayout>
        </ConfigProvider>
      ) : (
        <ConfigProvider theme={platformTheme}>
          <PlatformLayout>
            <Switch>
              <Route path="/" component={Home} />
              <Route
                path="/reaktor-ai-engine"
                component={PageReaktorAIEngine}
              />

              <Route
                path="/reaktor-ai-engine/:app-id"
                component={PageAppDetails}
              />

              <Route
                path="/reaktor-ai-engine/:app-id/:reaktor-id/overview"
                component={ReaktorDetails}
              />

              <Route
                path="/reaktor-ai-engine/:app-id/:reaktor-id/diagram"
                component={ReaktorDetails}
              />

              <Route
                path="/reaktor-ai-engine/:app-id/:reaktor-id/default-settings"
                component={ReaktorDetails}
              />

              <Route
                path="/reaktor-ai-engine/:app-id/:reaktor-id/deployments"
                component={ReaktorDetails}
              />

              <Route
                path="/reaktor-ai-engine/:app-id/:reaktor-id/:deployment-id/overview"
                component={PageDeploymentDetails}
              />

              {/**This may be deleted */}
              <Route
                path="/reaktor-ai-engine/:app-id/:reaktor-id/overview"
                component={ReaktorDetails}
              />
              <Route
                path="/reaktor-ai-engine/:app-id/:reaktor-id/diagram"
                component={ReaktorDetails}
              />
              <Route
                path="/reaktor-ai-engine/:app-id/:reaktor-id/default-settings"
                component={ReaktorDetails}
              />
              <Route
                path="/reaktor-ai-engine/:app-id/:reaktor-id/deployments"
                component={ReaktorDetails}
              />

              {/*    <Route
                path="/reaktor-ai-engine/:app-id/:reaktor-id/:deployment-id/overview"
                component={DeploymentDetails}
              /> 
              <Route
                path="/reaktor-ai-engine/:app-id/:reaktor-id/:deployment-id/metrics"
                component={DeploymentDetails}
              />
              <Route
                path="/reaktor-ai-engine/:app-id/:reaktor-id/:deployment-id/api"
                component={DeploymentDetails}
              />
              <Route
                path="/reaktor-ai-engine/:app-id/:reaktor-id/:deployment-id/settings"
                component={DeploymentDetails}
              />*/}
              {/**This may be deleted */}

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
                component={() => <SystemAdminRedirect />}
              />
              <Route
                path="/system-admin/organizations"
                component={PageSystemAdmin}
              />
              <Route
                path="/system-admin/all-users"
                component={PageSystemAdmin}
              />
              <Route
                path="/system-admin/migrations"
                component={PageSystemAdmin}
              />
              <Route
                path="/system-admin/permissions"
                component={PageSystemAdmin}
              />
              <Route
                path="/system-admin/edit-user/:user-id/account"
                component={EditUser}
              />
              <Route
                path="/system-admin/edit-user/:user-id/security"
                component={EditUser}
              />
              <Route
                path="/system-admin/edit-user/:user-id/memberships"
                component={EditUser}
              />
            </Switch>
          </PlatformLayout>
        </ConfigProvider>
      )}
    </>
  ) : (
    <ConfigProvider theme={platformTheme}>
      <PageLogin />
    </ConfigProvider>
  );
}
