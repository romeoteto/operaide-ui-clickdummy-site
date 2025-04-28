import React, { useState } from "react";
import {
  Table,
  Button,
  Drawer,
  Form,
  Input,
  Space,
  Tag,
  Descriptions,
  message,
  theme,
  Tabs,
} from "antd";
import { Check, X, RefreshCcw, Send } from "lucide-react";

// Mock Data
const initialOrders = [
  {
    id: "00123",
    customerEmail: "john@company.com",
    status: "Pending Validation",
    erpStatus: "Not Sent",
    lastUpdated: "2m ago",
    extractedData: {
      customerName: "John Doe",
      address: "123 Elm Street",
      items: "2x Widget A, 1x Widget B",
      orderDate: "2024-04-26",
      totalPrice: "$150",
    },
    pdfUrl: "#",
  },
  {
    id: "00124",
    customerEmail: "emily@shop.com",
    status: "Ready",
    erpStatus: "Sent",
    lastUpdated: "10m ago",
    extractedData: {
      customerName: "Emily Stone",
      address: "789 Maple Ave",
      items: "1x Gadget X",
      orderDate: "2024-04-25",
      totalPrice: "$99",
    },
    pdfUrl: "#",
  },
];

const initialLogs = [
  {
    timestamp: "2024-04-26 10:00",
    agent: "Email Validation Agent",
    message: "Validated email from john@company.com.",
  },
  {
    timestamp: "2024-04-26 10:01",
    agent: "PDF OCR Agent",
    message: "OCR completed for attached order.",
  },
  {
    timestamp: "2024-04-26 10:02",
    agent: "Data Validation Agent",
    message: "Extracted data passed validation.",
  },
  {
    timestamp: "2024-04-26 10:03",
    agent: "ERP Integration Agent",
    message: "Order submitted to ERP successfully.",
  },
];

export default function OrderProcessingMonitor() {
  const { token } = theme.useToken();
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [form] = Form.useForm();

  const openOrder = (order) => {
    setSelectedOrder(order);
    form.setFieldsValue(order.extractedData);
    setDrawerVisible(true);
  };

  const handleValidate = () => {
    message.success("Order validated and marked ready for ERP submission.");
    updateOrderStatus("Ready");
    setDrawerVisible(false);
  };

  const handleReject = () => {
    message.error("Order rejected.");
    updateOrderStatus("Rejected");
    setDrawerVisible(false);
  };

  const handlePushERP = () => {
    message.success("Order pushed to ERP.");
    updateOrderERPStatus("Sent");
  };

  const handleResendEmail = () => {
    message.success("Confirmation email resent.");
  };

  const updateOrderStatus = (newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === selectedOrder.id ? { ...order, status: newStatus } : order
      )
    );
  };

  const updateOrderERPStatus = (newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === selectedOrder.id
          ? { ...order, erpStatus: newStatus }
          : order
      )
    );
  };

  const orderColumns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer Email",
      dataIndex: "customerEmail",
      key: "customerEmail",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Tag
          color={
            text === "Ready"
              ? token.colorSuccess
              : text === "Rejected"
              ? token.colorError
              : token.colorWarning
          }
        >
          {text}
        </Tag>
      ),
    },
    {
      title: "ERP Status",
      dataIndex: "erpStatus",
      key: "erpStatus",
      render: (text) => (
        <Tag color={text === "Sent" ? token.colorPrimary : token.colorBorder}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      key: "lastUpdated",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="link" onClick={() => openOrder(record)}>
          View
        </Button>
      ),
    },
  ];

  const logColumns = [
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
    },
    {
      title: "Agent",
      dataIndex: "agent",
      key: "agent",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
  ];

  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Incoming Orders" key="1">
        <Table columns={orderColumns} dataSource={orders} rowKey="id" />

        <Drawer
          width={token.sizeLG * 30}
          title={`Order Details - ${selectedOrder?.id}`}
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          footer={
            <Space>
              <Button
                icon={<Check size={token.fontSizeLG} />}
                type="primary"
                onClick={handleValidate}
              >
                Validate
              </Button>
              <Button
                icon={<X size={token.fontSizeLG} />}
                danger
                onClick={handleReject}
              >
                Reject
              </Button>
              <Button
                icon={<RefreshCcw size={token.fontSizeLG} />}
                onClick={handlePushERP}
              >
                Push to ERP
              </Button>
              <Button
                icon={<Send size={token.fontSizeLG} />}
                onClick={handleResendEmail}
              >
                Resend Email
              </Button>
            </Space>
          }
        >
          {selectedOrder && (
            <>
              <Descriptions bordered column={1} size="small">
                <Descriptions.Item label="Customer Email">
                  {selectedOrder.customerEmail}
                </Descriptions.Item>
                <Descriptions.Item label="Original PDF">
                  <a
                    href={selectedOrder.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF
                  </a>
                </Descriptions.Item>
              </Descriptions>

              <Form
                form={form}
                layout="vertical"
                style={{ marginTop: token.marginMD }}
              >
                <Form.Item label="Customer Name" name="customerName">
                  <Input />
                </Form.Item>
                <Form.Item label="Address" name="address">
                  <Input />
                </Form.Item>
                <Form.Item label="Items" name="items">
                  <Input />
                </Form.Item>
                <Form.Item label="Order Date" name="orderDate">
                  <Input />
                </Form.Item>
                <Form.Item label="Total Price" name="totalPrice">
                  <Input />
                </Form.Item>
              </Form>
            </>
          )}
        </Drawer>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Agent Logs" key="2">
        <Table
          columns={logColumns}
          dataSource={initialLogs}
          rowKey="timestamp"
          pagination={{ pageSize: 5 }}
        />
      </Tabs.TabPane>
    </Tabs>
  );
}
