/* import imageKnowledgeChat from "../assets/reaktor-images/undraw_chat_qmyo.svg";
import imageOrderManager from "../assets/reaktor-images/undraw_order-delivered_puaw.svg";
import imageICP from "../assets/reaktor-images/undraw_to-do_06xe.svg";
import imageLeadNurturer from "../assets/reaktor-images/undraw_web-search_9qqc.svg"; */

import operaideLogoLight from "../assets/logo-light.svg";
import operaideLogoDark from "../assets/logo-dark.svg";
import operaideSignetLight from "../assets/signet-light.svg";
import operaideSignetDark from "../assets/signet-dark.svg";

import orgLogoLight from "../assets/org/logo-light.png";
import orgSignetLight from "../assets/org/signet-light.png";
import orgLogoDark from "../assets/org/logo-dark.png";
import orgSignetDark from "../assets/org/signet-dark.png";

import logoGeonica from "../assets/org/logo-geonica.png";
import signetGeonica from "../assets/org/signet-geonica.png";

/* export const blueprints = [
  {
    id: "op.demo.knowledge-chat",
    label: "Knowledge Chat",
    description:
      "A chat-based application that is able to retrieve data from a knowledge base.",
    imageSrc: imageKnowledgeChat,
    official: true,
    type: "Blueprint",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
    group: "Chat",
    version: "v1",
    deployments: [
      {
        id: "95QDRrfaYg7sqHgwP",
        version: "v1",
        label: "Knowledge Chat for Sales",
        description:
          "This deployment is a knowledge chat for sales teams to chat with sales documents.",
        group: "Sales",
        tags: ["demo", "sales"],
        imageSrc: imageKnowledgeChat,
      },
    ],
  },
  {
    id: "op.demo.order-manager",
    label: "Order Manager Agent",
    description: "Automates the processing of customer orders.",
    imageSrc: imageOrderManager,
    official: false,
    type: "Blueprint",
    tags: [],
    group: "Backoffice",
    version: "v1",
    deployments: [],
  },
  {
    id: "op.demo.icp-searcher",
    label: "ICP Identification Agent",
    description:
      "Researches companies and contacts based on your ICP definition.",
    imageSrc: imageICP,
    official: false,
    type: "Blueprint",
    tags: [],
    group: "Sales",
    version: "v1",
    deployments: [],
  },
  {
    id: "op.demo.lead-nurturer",
    label: "Lead-Nurturing Agent",
    description:
      "Researches all relevant data and information about your prospects.",
    imageSrc: imageLeadNurturer,
    official: false,
    type: "Blueprint",
    tags: [],
    group: "Sales",
    version: "v1",
    deployments: [],
  },
  {
    id: "op.demo.sales-contact-listener",
    label: "Sales Contact Listener",
    description:
      "Listens to updates of your contacts and informs you when to reach out.",
    imageSrc: imageKnowledgeChat,
    official: true,
    type: "Blueprint",
    tags: [],
    group: "Sales",
    version: "v1",
    deployments: [],
  },
  {
    id: "op.demo.sales-coach",
    label: "Sales Coach",
    description:
      "Simulates real-life sales situations and improves your skills.",
    imageSrc: imageKnowledgeChat,
    official: true,
    type: "Blueprint",
    tags: [],
    group: "Sales",
    version: "v1",
    deployments: [],
  },
  {
    id: "op.demo.customer-support-agent",
    label: "Customer Support Agent",
    description:
      "Takes care of your customers' questions and increases satisfaction.",
    imageSrc: imageKnowledgeChat,
    official: false,
    type: "Blueprint",
    tags: [],
    group: "Customer Support",
    version: "v1",
    deployments: [],
  },
  {
    id: "op.demo.virtual-accountant",
    label: "Virtual Accountant",
    description:
      "Prevents paying bills twice by checking all your suppliers invoices.",
    imageSrc: imageKnowledgeChat,
    official: true,
    type: "Blueprint",
    tags: [],
    group: "Accounting",
    version: "v1",
    deployments: [],
  },
]; */

export const borderRadiusValues = [
  { id: "square", value: 0, label: "Square" },
  { id: "rounded", value: 8, label: "Rounded" },
];

// Global System Theming
export const globalThemeOperaide = {
  light: {
    logo: operaideLogoLight,
    signet: operaideSignetLight,
    colorPrimary: "#02C4C0",
    colorInfo: "#02C4C0",
  },
  dark: {
    logo: operaideLogoDark,
    signet: operaideSignetDark,
    colorPrimary: "#02C4C0",
    colorInfo: "#02C4C0",
  },
  borderRadius: borderRadiusValues[1],
};

export const globalThemeCustomer = {
  light: {
    logo: orgLogoLight,
    signet: orgSignetLight,
    colorPrimary: "#0000C8",
    colorInfo: "#00E7A1",
  },
  dark: {
    logo: orgLogoDark,
    signet: orgSignetDark,
    colorPrimary: "#00E7A1",
    colorInfo: "#00E7A1",
  },
  borderRadius: borderRadiusValues[1],
};

export const currentGlobalTheme = globalThemeCustomer; //switch between globalThemeOperaide and globalThemeCustomer

// Global System Theming

export const organizations = [
  {
    value: 4,
    label: "Senseca France",
    createdAt: "2025-03-14",
    creatorId: 1,
    theme: {
      type: "system",
      light: currentGlobalTheme.light,
      dark: currentGlobalTheme.dark,
      borderRadius: currentGlobalTheme.borderRadius,
    },
  },
  {
    value: 1,
    label: "Senseca Germany GmbH",
    createdAt: "2025-03-14",
    creatorId: 1,
    theme: {
      type: "org",
      light: {
        logo: orgLogoLight,
        signet: orgSignetLight,
        colorPrimary: "#00E7A1",
        colorInfo: "#00E7A1",
      },
      dark: {
        logo: orgLogoDark,
        signet: orgSignetDark,
        colorPrimary: "#00E7A1",
        colorInfo: "#00E7A1",
      },
      borderRadius: borderRadiusValues[0],
    },
  },
  {
    value: 2,
    label: "Senseca Italy S.r.l.",
    createdAt: "2025-03-18",
    creatorId: 1,
    theme: {
      type: "org",
      light: {
        logo: orgLogoLight,
        signet: orgSignetLight,
        colorPrimary: "#726DA8",
        colorInfo: "#726DA8",
      },
      dark: {
        logo: orgLogoDark,
        signet: orgSignetDark,
        colorPrimary: "#726DA8",
        colorInfo: "#726DA8",
      },
      borderRadius: borderRadiusValues[1],
    },
  },
  {
    value: 3,
    label: "GEONICA",
    createdAt: "2025-04-05",
    creatorId: 1,
    theme: {
      type: "org",
      light: {
        logo: logoGeonica,
        signet: signetGeonica,
        colorPrimary: "#91B942",
        colorInfo: "#91B942",
      },
      dark: {
        logo: logoGeonica,
        signet: signetGeonica,
        colorPrimary: "#91B942",
        colorInfo: "#91B942",
      },
      borderRadius: borderRadiusValues[0],
    },
  },
];

/** EXPERIMENTAL */
export const accentColors = [
  { label: "Operaide Brand", value: "#02C4C0" },
  { label: "Plum", value: "#C893C7" },
  { label: "Yellow Green", value: "#B6D369" },
];

export const globalRoles = [
  {
    value: 1,
    label: "Super Admin",
    permissions: {
      systemAdmin: [
        "canViewUsers",
        "canViewOrganizations",
        "canViewMigrations",
        "canViewPermissions",
      ],
    },
  },
  { value: 2, label: "Member", permissions: { systemAdmin: [] } },
];

export const newOrgRoles = [
  {
    value: 1,
    label: "Admin",
    permissions: {
      settings: [
        "canViewGeneral",
        "canViewMembers",
        "canViewRegistration",
        "canViewApiKeys",
      ],
    },
  },
  {
    value: 2,
    label: "Member",
    permissions: { settings: [] },
  },
];
/** EXPERIMENTAL */

export const orgRoles = [
  {
    value: 1,
    label: "Admin",
    permissions: {
      global: { systemAdmin: ["canViewUsers"] }, // canViewOrganizations, canViewMigrations, canViewPermissions
      org: {
        settings: [
          "canViewGeneral",
          "canViewMembers",
          "canViewRegistration",
          "canViewApiKeys",
        ],
        apps: ["canViewApps", "canDownloadApps"],
        reaktors: ["canViewReaktors"],
        deployments: ["canViewDeployments"],
        dataStudio: ["canViewDataStudio"],
        integrations: ["canViewIntegrations"],
        appStore: ["canViewAppStore"],
        externalLinks: ["canViewDocumentation", "canViewCommunity"],
        elara: ["canViewElara"],
      },
    },
  },
  {
    value: 2,
    label: "Member",
    permissions: {
      global: { systemAdmin: [] },
      org: {
        settings: [],
        apps: ["canOnlyViewApps"],
        reaktors: [],
        deployments: [],
        dataStudio: [],
        integrations: [],
        appStore: [],
        externalLinks: [],
        elara: ["canViewElara"],
      },
    },
  },
];

export const users = [
  {
    id: 1,
    prename: "Stefan",
    surname: "Superadmin",
    email: "stefan.superadmin@senseca.com",
    isSuperAdmin: true /**replace with new global role */,
    createdAt: "2024-10-03",
    lastLogin: "2025-03-29",
    memberships: organizations.map((org) => ({
      orgValue: org.value,
      roleValue: 1, // Assuming admin role
    })),
    globalRole: 1,
  },
  {
    id: 2,
    prename: "Oliver",
    surname: "Orgadmin",
    email: "oliver.orgadmin@senseca.com",
    isSuperAdmin: false /**replace with new global role */,
    createdAt: "2025-03-11",
    lastLogin: "2025-03-15",
    memberships: [
      { orgValue: 1, roleValue: 1 },
      { orgValue: 2, roleValue: 2 },
    ],
    globalRole: 2,
  },
  {
    id: 3,
    prename: "Anna",
    surname: "Endanwenderin",
    email: "anna.endanwenderin@senseca.com",
    isSuperAdmin: false /**replace with new global role */,
    createdAt: "2025-03-11",
    lastLogin: "2025-03-15",
    memberships: [{ orgValue: 4, roleValue: 2 }],
    globalRole: 2,
  },
];
