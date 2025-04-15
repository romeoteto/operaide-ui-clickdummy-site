import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ConfigProvider, Drawer, theme as antTheme } from "antd";
import { Route, Switch, Redirect, useLocation } from "wouter";

import PlatformLayout from "./layouts/platform";
import PageHeader from "./components/pageHeader";
import SystemAdminRedirect from "./components/redirect/SystemAdminRedirect";

import Home from "./pages/home";
import PageAppsIndex from "./pages/reaktor-ai-engine/apps";
import PageSettings from "./pages/settings";
import PageDeploymentDetails from "./pages/reaktor-ai-engine/deploymentDetails";
import PageLogin from "./pages/login";
import PageSystemAdmin from "./pages/system-admin";
import EditUser from "./pages/system-admin/edit-user";
import PageReaktorsIndex from "./pages/reaktor-ai-engine/reaktors";
import ReaktorDetails from "./pages/reaktor-ai-engine/reaktorDetails";
import PageDeploymentsIndex from "./pages/reaktor-ai-engine/deployments";
import AppFrontends from "./pages/reaktor-ai-engine/apps/appFrontends";

import PageAppStore from "./pages/appStore";

import { currentGlobalTheme } from "./database/database";

// ✅ Import Redux action
import { setResolvedAppearance } from "./state/appSettingsSlice"; // adjust path if needed
import SystemAdminLayout from "./layouts/systemAdmin";
import AppFrontendsExt from "./pages/reaktor-ai-engine/apps/appFrontends/indexExt";
import AppExtLayout from "./layouts/appExt";

// ✅ Custom hook to resolve appearance based on system settings
function useResolvedAppearance(appearanceSetting, onResolve) {
  const getSystemPref = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const [resolved, setResolved] = useState(
    appearanceSetting === "system" ? getSystemPref() : appearanceSetting
  );

  useEffect(() => {
    const update = (newVal) => {
      setResolved(newVal);
      onResolve?.(newVal); // notify Redux
    };

    if (appearanceSetting !== "system") {
      update(appearanceSetting);
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => update(e.matches ? "dark" : "light");

    update(getSystemPref());
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [appearanceSetting, onResolve]);

  return resolved;
}

// ✅ Main App component
export default function App() {
  const [location] = useLocation();
  const dispatch = useDispatch();

  const userIsLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const appearance = useSelector((state) => state.appSettings.appearance); // "light" | "dark" | "system"
  const currentOrgTheme = useSelector(
    (state) => state.user.currentOrganization?.theme
  );

  // Use the hook and sync resolved appearance into Redux
  const resolvedAppearance = useResolvedAppearance(appearance, (resolved) => {
    dispatch(setResolvedAppearance(resolved));
  });

  const isDarkMode = resolvedAppearance === "dark";

  const orgTheme = {
    algorithm: isDarkMode ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
    token: {
      colorPrimary: isDarkMode
        ? currentOrgTheme?.dark.colorPrimary
        : currentOrgTheme?.light.colorPrimary,
      colorInfo: isDarkMode
        ? currentOrgTheme?.dark.colorInfo
        : currentOrgTheme?.light.colorInfo,
      borderRadius: currentOrgTheme?.borderRadius.value,
      logo: isDarkMode
        ? currentOrgTheme?.dark.logo
        : currentOrgTheme?.light.logo,
      signet: isDarkMode
        ? currentOrgTheme?.dark.signet
        : currentOrgTheme?.light.signet,
    },
  };

  // Experimental

  const systemTheme = {
    algorithm: isDarkMode ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
    token: {
      colorPrimary: isDarkMode
        ? currentGlobalTheme.dark.colorPrimary
        : currentGlobalTheme.light.colorPrimary,
      colorInfo: isDarkMode
        ? currentGlobalTheme.dark.colorInfo
        : currentGlobalTheme.light.colorInfo,
      borderRadius: currentGlobalTheme.borderRadius.value,
      logo: isDarkMode
        ? currentGlobalTheme.dark.logo
        : currentGlobalTheme.light.logo,
      signet: isDarkMode
        ? currentGlobalTheme.dark.signet
        : currentGlobalTheme.light.signet,
    },
  };
  // Experimental

  return userIsLoggedIn ? (
    <>
      {location.startsWith("/app/ext") ? (
        <ConfigProvider theme={orgTheme}>
          <AppExtLayout>
            <Switch>
              <Route path={`/app/ext/:app-id`} component={AppFrontendsExt} />
            </Switch>
          </AppExtLayout>
        </ConfigProvider>
      ) : location.startsWith("/system-admin") ? (
        <ConfigProvider theme={systemTheme}>
          <SystemAdminLayout>
            <Switch>
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
            </Switch>
          </SystemAdminLayout>
        </ConfigProvider>
      ) : (
        <ConfigProvider theme={orgTheme}>
          <PlatformLayout>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/store" component={PageAppStore} />
              <Route path="/reaktor-ai-engine/apps" component={PageAppsIndex} />
              <Route
                path="/reaktor-ai-engine/apps/:app-id"
                component={AppFrontends}
              />
              <Route
                path="/reaktor-ai-engine/reaktors"
                component={PageReaktorsIndex}
              />
              <Route
                path="/reaktor-ai-engine/deployments"
                component={PageDeploymentsIndex}
              />
              <Route
                path="/reaktor-ai-engine/:app-id/:reaktor-id"
                component={ReaktorDetails}
              />
              <Route
                path="/reaktor-ai-engine/:app-id/:reaktor-id/:deployment-id"
                component={PageDeploymentDetails}
              />
              <Route path="/data-studio/:page">
                <PageHeader title="Documents" subtitle="Some text." />
              </Route>
              <Route path="/integrations/ai-provider">
                <PageHeader title="AI Provider" subtitle="Some text." />
              </Route>
              <Route path="/integrations/services">
                <PageHeader title="Services" subtitle="Some text." />
              </Route>
              <Route path="/settings" component={PageSettings} />
            </Switch>
          </PlatformLayout>
        </ConfigProvider>
      )}
    </>
  ) : (
    <ConfigProvider theme={systemTheme}>
      <PageLogin />
    </ConfigProvider>
  );
}
