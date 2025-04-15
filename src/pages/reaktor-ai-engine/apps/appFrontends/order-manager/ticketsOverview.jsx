// OrdersTableWithDrawer.js
import React, { useState } from "react";
import { Table, Button, Drawer, Badge, Tag } from "antd";
import tickets from "./email_support_tickets.json";

import dayjs from "dayjs";
import ChatConversationCard from "./chatConversationCard";

const TicketsOverview = () => {
  const [visible, setVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const showDrawer = (record) => {
    setSelectedData(record);
    setVisible(true);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      defaultSortOrder: "descend",
      render: (date) => dayjs(date).format("MMMM D, YYYY h:mm A"),
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Resolved", value: "resolved" },
        { text: "Waiting for Customer", value: "waiting_for_customer" },
        { text: "Open", value: "open" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (value) =>
        value === "resolved" ? (
          <Badge status="success" text="Resolved" />
        ) : value === "waiting_for_customer" ? (
          <Badge status="warning" text="Waiting for Customer" />
        ) : (
          <Badge status="default" text="Open" />
        ),
    },
    {
      title: "AI Confidence",
      dataIndex: "aiConfidence",
      key: "aiConfidence",
      render: (value) => `${value * 100}%`,
    },
    {
      title: "Handoff to Human",
      dataIndex: "handoffToHuman",
      key: "handoffToHuman",
      render: (bool) => bool && <Tag color="volcano">Yes</Tag>,
    },

    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => showDrawer(record)}>
          Show conversation
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={tickets}
        rowKey="id"
        size="middle"
        pagination={{
          showSizeChanger: true,
        }}
      />
      <Drawer
        title="Conversation"
        placement="right"
        onClose={() => setVisible(false)}
        open={visible}
        width={500}
      >
        <ChatConversationCard conversation={selectedData} />
      </Drawer>
    </>
  );
};

export default TicketsOverview;
