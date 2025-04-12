export const breadcrumbConfig = [
  {
    patterns: ["/"],
    org: { show: true, clickable: false },
    breadcrumbs: [],
  },
  {
    patterns: ["/reaktor-ai-engine/apps"],
    org: { show: true, clickable: false },
    breadcrumbs: [
      {
        label: "Apps",
      },
    ],
  },
  {
    patterns: ["/reaktor-ai-engine/reaktors"],
    org: { show: true, clickable: false },
    breadcrumbs: [
      {
        label: "Reaktors",
      },
    ],
  },
  {
    patterns: ["/reaktor-ai-engine/deployments"],
    org: { show: true, clickable: false },
    breadcrumbs: [
      {
        label: "Deployments",
      },
    ],
  },
  {
    patterns: [
      "/reaktor-ai-engine/:appId/:reaktorId/diagram",
      "/reaktor-ai-engine/:appId/:reaktorId/default-settings",
      "/reaktor-ai-engine/:appId/:reaktorId/deployments",
      "/reaktor-ai-engine/:appId/:reaktorId/info",
    ],
    org: { show: true, clickable: false },
    breadcrumbs: [
      {
        label: ({ appId, getAppLabel }) => getAppLabel(appId),
      },

      {
        label: ({ appId, reaktorId, getBlueprintLabel }) =>
          getBlueprintLabel(appId, reaktorId),
      },
    ],
  },
  {
    patterns: [
      "/reaktor-ai-engine/:appId/:reaktorId/:deploymentId/dashboard",
      "/reaktor-ai-engine/:appId/:reaktorId/:deploymentId/settings",
      "/reaktor-ai-engine/:appId/:reaktorId/:deploymentId/execution",
      "/reaktor-ai-engine/:appId/:reaktorId/:deploymentId/diagram",
      "/reaktor-ai-engine/:appId/:reaktorId/:deploymentId/info",
    ],
    org: { show: true, clickable: false },
    breadcrumbs: [
      {
        label: ({ appId, getAppLabel }) => getAppLabel(appId),
      },
      {
        label: ({ appId, reaktorId, getBlueprintLabel }) =>
          getBlueprintLabel(appId, reaktorId),
        href: ({ appId, reaktorId }) =>
          `/reaktor-ai-engine/${appId}/${reaktorId}/diagram`,
        clickable: true,
        isBlueprintDrowndown: true,
      },
      {
        label: ({ appId, reaktorId, deploymentId, getDeploymentLabel }) =>
          getDeploymentLabel(appId, reaktorId, deploymentId),
      },
    ],
  },
];
