import imageKnowledgeChat from "../assets/reaktor-images/undraw_chat_qmyo.svg";
import imageOrderManager from "../assets/reaktor-images/undraw_order-delivered_puaw.svg";
import imageICP from "../assets/reaktor-images/undraw_to-do_06xe.svg";
import imageLeadNurturer from "../assets/reaktor-images/undraw_web-search_9qqc.svg";

export const blueprints = [
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
];

export const organizations = [
  { value: 1, label: "Auto Weller GmbH & Co. KG" },
  { value: 2, label: "Emil Frey Gruppe" },
  { value: 3, label: "Autohaus S+K GmbH" },
  { value: 4, label: "Toyota Dello GmbH" },
  { value: 5, label: "H. Böger und Sohn" },
  { value: 6, label: "Autohaus Nix GmbH" },
  { value: 7, label: "Autohaus Klee GmbH" },
  { value: 8, label: "Autohaus Mühlbauer" },
  { value: 9, label: "Autohaus Sorg" },
  { value: 10, label: "Autohaus Gehrmann" },
  { value: 11, label: "Autohaus Schubert" },
  { value: 12, label: "Autohaus Köhler" },
  { value: 13, label: "Autohaus Henschel" },
  { value: 14, label: "Autohaus Sander" },
  { value: 15, label: "Autohaus Engel" },
  { value: 16, label: "Autohaus Lutz" },
  { value: 17, label: "Autohaus Weber" },
  { value: 18, label: "Autohaus Grimm" },
  { value: 19, label: "Autohaus Fink" },
  { value: 20, label: "Autohaus Beck" },
  { value: 21, label: "Autohaus Scholz" },
  { value: 22, label: "Autohaus Wagner" },
  { value: 23, label: "Autohaus Meier" },
  { value: 24, label: "Autohaus Lehmann" },
  { value: 25, label: "Autohaus Richter" },
  { value: 26, label: "Autohaus Schäfer" },
  { value: 27, label: "Autohaus Krüger" },
  { value: 28, label: "Autohaus Hofmann" },
  { value: 29, label: "Autohaus Schmitt" },
  { value: 30, label: "Autohaus S+K Toyota" },
  { value: 31, label: "Toyota Zentrum Hamburg" },
  { value: 32, label: "Toyota Zentrum Berlin" },
  { value: 33, label: "Toyota Zentrum München" },
  { value: 34, label: "Toyota Zentrum Stuttgart im Schwobaländle" },
  { value: 35, label: "Toyota Zentrum Frankfurt" },
  { value: 36, label: "Toyota Zentrum Köln" },
  { value: 37, label: "Toyota Zentrum Düsseldorf" },
  { value: 38, label: "Toyota Zentrum Dortmund" },
  { value: 39, label: "objective partner AG" },
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
      },
    },
  },
  {
    value: 2,
    label: "Member",
    permissions: {
      global: { systemAdmin: [] },
      org: { settings: [] },
    },
  },
];

export const users = [
  {
    id: 1,
    prename: "Stefan",
    surname: "Superadmin",
    email: "stefan.superadmin@toyota.de",
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
    email: "oliver.orgadmin@toyota.de",
    isSuperAdmin: false /**replace with new global role */,
    createdAt: "2025-03-11",
    lastLogin: "2025-03-15",
    memberships: [
      { orgValue: 33, roleValue: 1 },
      { orgValue: 37, roleValue: 2 },
    ],
    globalRole: 2,
  },
  {
    id: 3,
    prename: "Anna",
    surname: "Endanwenderin",
    email: "anna.endanwenderin@toyota.de",
    isSuperAdmin: false /**replace with new global role */,
    createdAt: "2025-03-11",
    lastLogin: "2025-03-15",
    memberships: [{ orgValue: 23, roleValue: 2 }],
    globalRole: 2,
  },
];
