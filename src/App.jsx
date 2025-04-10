import React from "react";
import { useSelector } from "react-redux";
import { ConfigProvider, theme } from "antd";
import { Route, Switch, Redirect, useLocation } from "wouter";

import PlatformLayout from "./layouts/platform";
import PageHeader from "./components/pageHeader";
import SystemAdminRedirect from "./components/redirect/SystemAdminRedirect";

import Home from "./pages/home";
import PageAppIndex from "./pages/reaktor-ai-engine/apps";

import PageSettings from "./pages/settings";

import PageDeploymentDetails from "./pages/reaktor-ai-engine/deploymentDetails";
import PageLogin from "./pages/login";
import PageSystemAdmin from "./pages/system-admin";
import EditUser from "./pages/system-admin/edit-user";
import AppStoreLayout from "./appStore/layout";
import PageAppStoreHome from "./appStore/pages/home";
import PageAppStoreCategory from "./appStore/pages/category";
import PageReaktors from "./pages/reaktor-ai-engine/reaktors";
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

              {/** Reaktor AI Engine Index */}
              <Route path="/reaktor-ai-engine/apps" component={PageAppIndex} />
              {/** Reaktor AI Engine Index */}

              {/** Reaktor AI Engine Index */}
              <Route
                path="/reaktor-ai-engine/reaktors"
                component={PageReaktors}
              />
              {/** Reaktor AI Engine Index */}

              {/** Reaktor AI Engine Index */}
              <Route
                path="/reaktor-ai-engine/deployments"
                component={PageAppIndex}
              />
              {/** Reaktor AI Engine Index */}

              {/** Reaktor Details */}
              <Route
                path="/reaktor-ai-engine/:app-id/:reaktor-id/:page"
                component={ReaktorDetails}
              />
              {/** Reaktor Details */}

              {/** Deployment Details */}
              <Route
                path="/reaktor-ai-engine/:app-id/:reaktor-id/:deployment-id/:page"
                component={PageDeploymentDetails}
              />
              {/** Deployment Details */}

              {/** Data Studio */}
              <Route path="/data-studio/:page">
                <PageHeader title="Documents" subtitle="Some text." />
              </Route>
              {/** Data Studio */}

              {/** Integrations */}
              <Route path="/integrations/ai-provider">
                <PageHeader title="AI Provider" subtitle="Some text." />
              </Route>
              <Route path="/integrations/services">
                <PageHeader title="Services" subtitle="Some text." />
              </Route>
              {/** Integrations */}

              {/** Settings */}
              <Route
                path="/settings"
                component={() => <Redirect to="/settings/general" />}
              />
              <Route path="/settings/*" component={() => <PageSettings />} />
              {/** Settings */}

              {/** System Admin */}
              <Route
                path="/system-admin"
                component={() => <SystemAdminRedirect />}
              />
              <Route path="/system-admin/:page" component={PageSystemAdmin} />

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
              {/** System Admin */}
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
