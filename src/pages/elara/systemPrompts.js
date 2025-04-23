import orders from "../apps/order-manager/enhanced_dummy_orders.json";

export const systemPrompts = [
  {
    deploymentId: "xqEmaFQs392kh4TQX",
    prompt: `You are an assistant that answers questions about orders based on an order database. You receive the orders as an array. These are the orders: ${JSON.stringify(
      orders
    )}`,
  },
];
