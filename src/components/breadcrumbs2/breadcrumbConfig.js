export const breadcrumbConfig = {
  "/": {
    org: { show: true, clickable: false },
    breadcrumbs: [],
  },

  "/reaktor-ai-engine": {
    org: { show: true, clickable: true },
    breadcrumbs: [
      { label: "Reaktor AI Engine", clickable: true, hidden: false },
    ],
  },

  "/reaktor-ai-engine/:reaktorId/overview": {
    org: { show: true, clickable: true },
    breadcrumbs: [
      {
        label: "Reaktor AI Engine",
        href: "/reaktor-ai-engine",
        clickable: true,
      },
      {
        label: ({ reaktorId, getReaktorLabel }) => getReaktorLabel(reaktorId),
        href: ({ reaktorId }) => `/reaktor-ai-engine/${reaktorId}`,
        clickable: false,
      },
      { label: "Overview", clickable: true, hidden: true },
    ],
  },

  "/reaktor-ai-engine/:reaktorId/diagram": {
    org: { show: true, clickable: true },
    breadcrumbs: [
      {
        label: "Reaktor AI Engine",
        href: "/reaktor-ai-engine",
        clickable: true,
      },
      {
        label: ({ reaktorId, getReaktorLabel }) => getReaktorLabel(reaktorId),
        href: ({ reaktorId }) => `/reaktor-ai-engine/${reaktorId}`,
        clickable: false,
      },
      { label: "Diagram", clickable: true, hidden: true },
    ],
  },

  "/reaktor-ai-engine/:reaktorId/default-settings": {
    org: { show: true, clickable: true },
    breadcrumbs: [
      {
        label: "Reaktor AI Engine",
        href: "/reaktor-ai-engine",
        clickable: true,
      },
      {
        label: ({ reaktorId, getReaktorLabel }) => getReaktorLabel(reaktorId),
        href: ({ reaktorId }) => `/reaktor-ai-engine/${reaktorId}`,
        clickable: false,
      },
      { label: "Default Settings", clickable: true, hidden: true },
    ],
  },

  "/reaktor-ai-engine/:reaktorId/deployments": {
    org: { show: true, clickable: true },
    breadcrumbs: [
      {
        label: "Reaktor AI Engine",
        href: "/reaktor-ai-engine",
        clickable: true,
      },
      {
        label: ({ reaktorId, getReaktorLabel }) => getReaktorLabel(reaktorId),
        href: ({ reaktorId }) => `/reaktor-ai-engine/${reaktorId}`,
        clickable: false,
      },
      { label: "Deployments", clickable: true, hidden: true },
    ],
  },

  "/reaktor-ai-engine/:reaktorId/:deploymentId/overview": {
    org: { show: true, clickable: true },
    breadcrumbs: [
      {
        label: "Reaktor AI Engine",
        href: "/reaktor-ai-engine",
        clickable: true,
      },
      {
        label: ({ reaktorId, getReaktorLabel }) => getReaktorLabel(reaktorId),
        href: ({ reaktorId }) => `/reaktor-ai-engine/${reaktorId}`,
        clickable: true,
      },
      {
        label: ({ deploymentId }) => deploymentId,
        clickable: false,
      },
      { label: "Overview", clickable: true, hidden: true },
    ],
  },

  "/reaktor-ai-engine/:reaktorId/:deploymentId/metrics": {
    org: { show: true, clickable: true },
    breadcrumbs: [
      {
        label: "Reaktor AI Engine",
        href: "/reaktor-ai-engine",
        clickable: true,
      },
      {
        label: ({ reaktorId, getReaktorLabel }) => getReaktorLabel(reaktorId),
        href: ({ reaktorId }) => `/reaktor-ai-engine/${reaktorId}`,
        clickable: true,
      },
      {
        label: ({ deploymentId }) => deploymentId,
        clickable: false,
      },
      { label: "Metrics", clickable: true, hidden: true },
    ],
  },

  "/reaktor-ai-engine/:reaktorId/:deploymentId/api": {
    org: { show: true, clickable: true },
    breadcrumbs: [
      {
        label: "Reaktor AI Engine",
        href: "/reaktor-ai-engine",
        clickable: true,
      },
      {
        label: ({ reaktorId, getReaktorLabel }) => getReaktorLabel(reaktorId),
        href: ({ reaktorId }) => `/reaktor-ai-engine/${reaktorId}`,
        clickable: true,
      },
      {
        label: ({ deploymentId }) => deploymentId,
        clickable: false,
      },
      { label: "API", clickable: true, hidden: true },
    ],
  },

  "/reaktor-ai-engine/:reaktorId/:deploymentId/settings": {
    org: { show: true, clickable: true },
    breadcrumbs: [
      {
        label: "Reaktor AI Engine",
        href: "/reaktor-ai-engine",
        clickable: true,
      },
      {
        label: ({ reaktorId, getReaktorLabel }) => getReaktorLabel(reaktorId),
        href: ({ reaktorId }) => `/reaktor-ai-engine/${reaktorId}`,
        clickable: true,
      },
      {
        label: ({ deploymentId }) => deploymentId,
        clickable: false,
      },
      { label: "Settings", clickable: true, hidden: true },
    ],
  },

  "/data-studio/documents": {
    org: { show: true, clickable: true },
    breadcrumbs: [
      { label: "Data Studio", href: "/data-studio", clickable: false },
      { label: "Documents", clickable: true, hidden: true },
    ],
  },

  "/data-studio/document-groups": {
    org: { show: true, clickable: true },
    breadcrumbs: [
      { label: "Data Studio", href: "/data-studio", clickable: false },
      { label: "Document Groups", clickable: true, hidden: true },
    ],
  },

  "/data-studio/vector-db": {
    org: { show: true, clickable: true },
    breadcrumbs: [
      { label: "Data Studio", href: "/data-studio", clickable: false },
      { label: "Vector DB", clickable: true, hidden: true },
    ],
  },

  "/integrations/ai-provider": {
    org: { show: true, clickable: true },
    breadcrumbs: [
      { label: "Integrations", href: "/integrations", clickable: false },
      { label: "AI Provider", clickable: true, hidden: true },
    ],
  },

  "/integrations/services": {
    org: { show: true, clickable: true },
    breadcrumbs: [
      { label: "Integrations", href: "/integrations", clickable: false },
      { label: "Services", clickable: true, hidden: true },
    ],
  },

  "/settings/general": {
    org: { show: true, clickable: true },
    breadcrumbs: [
      { label: "Settings", href: "/settings", clickable: false },
      { label: "General", clickable: true, hidden: true },
    ],
  },
  "/settings/members": {
    org: { show: true, clickable: true },
    breadcrumbs: [
      { label: "Settings", href: "/settings", clickable: false },
      { label: "Members", clickable: true, hidden: true },
    ],
  },
  "/settings/registration": {
    org: { show: true, clickable: true },
    breadcrumbs: [
      { label: "Settings", href: "/settings", clickable: false },
      { label: "Registration", clickable: true, hidden: true },
    ],
  },
  "/settings/api-keys": {
    org: { show: true, clickable: true },
    breadcrumbs: [
      { label: "Settings", href: "/settings", clickable: false },
      { label: "API Keys", clickable: true, hidden: true },
    ],
  },

  /* THIS GETS REDIRECTED "/system-admin": {
    org: { show: false },
    breadcrumbs: [{ label: "System Admin", clickable: false }],
  }, */

  "/system-admin/organizations": {
    org: { show: false },
    breadcrumbs: [
      {
        label: "System Admin",
        href: "/system-admin",
        clickable: false,
        hidden: true,
      },
      { label: "Organizations", clickable: false, hidden: true },
    ],
  },

  "/system-admin/all-users": {
    org: { show: false },
    breadcrumbs: [
      {
        label: "System Admin",
        href: "/system-admin",
        clickable: false,
        hidden: true,
      },
      { label: "All Users", clickable: false, hidden: true },
    ],
  },

  "/system-admin/migrations": {
    org: { show: false },
    breadcrumbs: [
      {
        label: "System Admin",
        href: "/system-admin",
        clickable: false,
        hidden: true,
      },
      { label: "Migrations", clickable: false, hidden: true },
    ],
  },

  "/system-admin/permissions": {
    org: { show: false },
    breadcrumbs: [
      {
        label: "System Admin",
        href: "/system-admin",
        clickable: false,
        hidden: true,
      },
      { label: "Permissions", clickable: false, hidden: true },
    ],
  },

  "/system-admin/edit-user/:userId/account": {
    org: { show: false },
    breadcrumbs: [
      { label: "System Admin", href: "/system-admin", clickable: true },
      { label: "Edit User", clickable: false },
    ],
  },

  "/system-admin/edit-user/:userId/security": {
    org: { show: false },
    breadcrumbs: [
      { label: "System Admin", href: "/system-admin", clickable: true },
      { label: "Edit User", clickable: false },
    ],
  },

  "/system-admin/edit-user/:userId/memberships": {
    org: { show: false },
    breadcrumbs: [
      { label: "System Admin", href: "/system-admin", clickable: true },
      { label: "Edit User", clickable: false },
    ],
  },
};
