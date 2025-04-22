export const breadcrumbConfig = [
  {
    patterns: ["/"],
    org: { show: true, clickable: false },
    breadcrumbs: [],
  },
  {
    patterns: ["/store"],
    org: { show: true, clickable: false },
    breadcrumbs: [
      {
        label: "App Store",
      },
    ],
  },

  // EXPERIMENTAL
  {
    patterns: ["/elara"],
    org: { show: true, clickable: false },
    breadcrumbs: [
      {
        label: "Elara",
      },
      {
        label: "TechDB Chat",
      },
    ],
  },
  // EXPERIMENTAL

  {
    patterns: ["/reaktor-ai-engine/apps/:appId"],
    org: { show: true, clickable: false },
    breadcrumbs: [
      {
        label: "Apps",
        clickable: true,
        href: "/reaktor-ai-engine/apps",
      },
      {
        label: ({ appId, getAppLabel }) => getAppLabel(appId),
      },
    ],
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
    patterns: ["/reaktor-ai-engine/:appId/:reaktorId"],
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
    patterns: ["/reaktor-ai-engine/:appId/:reaktorId/:deploymentId"],
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
  {
    patterns: ["/settings"],
    org: { show: true, clickable: false },
    breadcrumbs: [
      {
        label: "Settings",
      },
    ],
  },
  {
    patterns: ["/system-admin/organizations"],
    breadcrumbs: [
      {
        label: "System Administration",
      },
      {
        label: "Organizations",
      },
    ],
  },
  {
    patterns: ["/system-admin/all-users/:userId/edit"],
    breadcrumbs: [
      {
        label: "System Administration",
      },
      {
        label: "Edit User",
      },
      {
        label: ({ userId, getUserName }) => getUserName(userId),
      },
    ],
  },
  {
    patterns: ["/system-admin/all-users"],
    breadcrumbs: [
      {
        label: "System Administration",
      },
      {
        label: "All Users",
      },
    ],
  },
  {
    patterns: ["/system-admin/migrations"],
    breadcrumbs: [
      {
        label: "System Administration",
      },
      {
        label: "Migrations",
      },
    ],
  },
  {
    patterns: ["/system-admin/permissions"],
    breadcrumbs: [
      {
        label: "System Administration",
      },
      {
        label: "Permissions",
      },
    ],
  },
  {
    patterns: ["/system-admin/theme"],
    breadcrumbs: [
      {
        label: "System Administration",
      },
      {
        label: "Global Theme",
      },
    ],
  },
];
