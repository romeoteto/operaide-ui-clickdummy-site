import imageKnowledgeChat from "../assets/reaktor-images/undraw_chat_qmyo.svg";
import imageOrderManager from "../assets/reaktor-images/undraw_order-delivered_puaw.svg";
import imageICP from "../assets/reaktor-images/undraw_to-do_06xe.svg";
import imageLeadNurturer from "../assets/reaktor-images/undraw_web-search_9qqc.svg";

export const apps = [
  {
    id: "knowledge-chat",
    name: "Knowledge Chat",
    version: "1.1",
    description:
      "A chat-based application that is able to retrieve data from a knowledge base.",
    keywords: ["chat", "knowledge"],
    categories: ["Chatbot"],
    imageSrc: imageKnowledgeChat,
    official: true,
    expectedOperaideVersion: "^2.0.2",
    blueprints: [
      {
        id: "document-chat",
        version: "1.1",
        label: "Document Chat",
        description:
          "A chatbot that is able to chat with documents in a vector store.",
        deployments: [
          {
            id: "Xfk3X34k96x9tSfdc",
            version: "1.1",
            label: "TechDB Chat",
            description: "Answers based on documents from TechDB.",
          },
          {
            id: "xqEmaFQsPEWtq8TQX",
            version: "1.1",
            label: "Product Chat",
            description: "Answers based on product folders.",
          },
        ],
      },
    ],
  },
  {
    id: "order-manager",
    name: "Order Manager",
    version: "2.1.3",
    description: "Automates the processing of customer orders.",
    keywords: ["customer service", "erp", "chat", "order management"],
    categories: ["Customer Service", "Administration", "Chatbot"],
    imageSrc: imageOrderManager,
    expectedOperaideVersion: "^2.0.2",
    blueprints: [
      {
        id: "analyze-orders",
        version: "2.1.3",
        label: "Analyzing Orders Agent",
        description:
          "An agent that takes orders from e-mails, extracts data and puts them to an ERP system.",
        deployments: [],
      },
      {
        id: "status-chat",
        version: "1.2",
        label: "Order Status Chat",
        description:
          "This agent connects to ERP systems and can answer customer questions about order status.",
        deployments: [],
      },
    ],
  },

  {
    id: "virtual-sdr",
    name: "Virtual SDR",
    version: "3.0",
    description:
      "A virtual sales development representative that identifies and nurtures leads, keeps them updated in your CRM and constantly listens for new updates from your contacts.",
    keywords: ["sales", "leads", "nurturing", "contact updates"],
    categories: ["Sales"],
    imageSrc: imageICP,
    expectedOperaideVersion: "^2.0.2",
    blueprints: [
      {
        id: "icp-searcher",
        version: "3.0",
        label: "ICP Searcher",
        description:
          "Researches companies and contacts based on your ICP definition.",
        deployments: [],
      },
      {
        id: "lead-nurturer",
        version: "2.7",
        label: "Lead Nurturer",
        description:
          "Researches all relevant data and information about your prospects and enters them into your CRM.",
        deployments: [],
      },
      ,
      {
        id: "sales-contact-listener",
        version: "1.0",
        label: "Sales Contact Listener",
        description:
          "Listens to updates of your contacts and informs you when to reach out.",
        deployments: [],
      },
    ],
  },
];
