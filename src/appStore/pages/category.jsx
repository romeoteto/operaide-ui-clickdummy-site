import React from "react";
import { Typography, Flex, theme } from "antd";

import { useParams } from "wouter";

const { Title, Text } = Typography;

const PageAppStoreCategory = () => {
  const params = useParams();

  const { "category-id": categoryId } = params;

  const titleNameTable = {
    sales: {
      title: "Sales",
      description:
        "Agentic apps in this category help you with generating leads, nurturing contacts or automated offer generation.",
    },
    "customer-service": {
      title: "Customer Service",
      description:
        "Provides support and assistance to customers before and after purchases.",
    },
    accounting: {
      title: "Accounting",
      description: "Manages financial records, transactions, and compliance.",
    },
    chatbots: {
      title: "Chatbots",
      description:
        "Automated tools for handling customer interactions and inquiries.",
    },
  };

  const { title, description } = titleNameTable[categoryId];
  return (
    <>
      <Flex vertical style={{ maxWidth: "500px" }}>
        <Title level={2}> {title}</Title>
        <Text>{description}</Text>
      </Flex>
    </>
  );
};

export default PageAppStoreCategory;
