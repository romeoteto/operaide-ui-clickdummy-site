import AppFrontendOrderManager from "../pages/apps/order-manager";

export const frontendMap = { "order-manager": AppFrontendOrderManager };

export const apps = [
  {
    id: "knowledge-chat",
    name: "Knowledge Chat",
    version: "1.1",
    description:
      "A chat-based application that is able to retrieve data from a knowledge base.",
    keywords: ["chat", "knowledge"],
    categories: ["Chatbot"],
    official: true,
    expectedOperaideVersion: "^2.0.2",
    blueprints: [
      {
        id: "document-chat",
        label: "Chat with Vector Store",
        enablesElara: true,
        description:
          "A chatbot that is able to chat with documents in a vector store.",
        deployments: [
          {
            id: "Xfk3X34k96x9tSfdc",
            label: "TechDB Chat",
            description: "Answers based on documents from TechDB.",
          },
          {
            id: "xqEmaFQsPEWtq8TQX",
            label: "Product Chat",
            description: "Answers based on product folders.",
          },
        ],
      },
      {
        id: "vecorization-reaktor",
        label: "Document Vectorization Reaktor",
        description:
          "A Reaktor that takes documents and builds a knowledge base for the chat.",
        deployments: [
          {
            id: "PdF3X89096x7sStdc",
            label: "PDF Vectorizer",
            description: "Vectorizes PDF files.",
          },
        ],
      },
    ],
  },
  {
    id: "order-manager",
    name: "Order Manager",
    version: "2.1.3",
    description: "Agents that automate the processing of customer orders.",
    keywords: ["customer service", "erp", "chat", "order management"],
    categories: ["Customer Service", "Administration", "Chatbot"],
    expectedOperaideVersion: "^2.0.2",
    blueprints: [
      {
        id: "analyze-orders",
        label: "Analyzing Orders Agent",
        description:
          "An agent that takes orders from e-mails, extracts data and puts them to an ERP system.",
        deployments: [],
      },
      {
        id: "status-chat",
        label: "Order Status Chat",
        enablesElara: true,
        description:
          "This agent connects to ERP systems and can answer customer questions about order status.",
        deployments: [
          {
            id: "xqEmaFQs392kh4TQX",
            label: "Chat with Order Status",
            description: "Responses with the current status of an order.",
          },
        ],
      },
    ],
  },

  {
    id: "virtual-sdr",
    name: "Virtual SDR",
    version: "3.0",
    description:
      "A virtual sales development representative that boosts your sales activity.",
    keywords: ["sales", "leads", "nurturing", "contact updates"],
    categories: ["Sales"],
    expectedOperaideVersion: "^2.0.2",
    blueprints: [
      {
        id: "icp-searcher",
        label: "ICP Searcher",
        enablesElara: true,
        description:
          "Researches companies and contacts based on your ICP definition.",
        deployments: [
          {
            id: "xqEmaFw93EWtq8TQX",
            label: "ICP Searcher",
            description: "Returns a list of companies that fit your ICP.",
          },
        ],
      },
      {
        id: "lead-nurturer",
        label: "Lead Nurturer",
        description:
          "Researches all relevant data and information about your prospects and enters them into your CRM.",
        deployments: [],
      },
      {
        id: "sales-contact-listener",
        label: "Sales Contact Listener",
        description:
          "Listens to updates of your contacts and informs you when to reach out.",
        deployments: [],
      },
    ],
  },
];
