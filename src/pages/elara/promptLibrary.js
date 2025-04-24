import { Building, Calendar, CalendarArrowUp } from "lucide-react";

import orders from "../apps/order-manager/enhanced_dummy_orders.json";

export const prompts = [
  {
    deploymentId: "xqEmaFQs392kh4TQX",
    systemPrompt: `You are an assistant that answers questions about orders based on an order database. You receive the orders as an array. These are the orders: ${JSON.stringify(
      orders
    )}`,
    suggestions: [
      {
        key: "customer",
        icon: Building,
        label: "Orders for customer",
        description: "Show all orders for a specific customer.",
        prompt: "Show me all orders from a specific customer.",
      },
      {
        key: "date",
        icon: Calendar,
        label: "Orders in timeframe",
        description: "Show all orders in a specific timeframe.",
        prompt: "Show me all orders between a specific start and end date.",
      },
      {
        key: "latest",
        icon: CalendarArrowUp,
        label: "Latest Orders",
        description: "Show all orders from the latest day.",
        prompt:
          "Show me all orders that have been placed on the latest day. Return a table with the following columns: order id, customer name, item name, price excluding tax.",
      },
    ],
  },
];
