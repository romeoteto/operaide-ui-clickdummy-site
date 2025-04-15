// OrdersTableWithDrawer.js
import React, { useState } from "react";
import { Table, Button, Drawer } from "antd";
import orders from "./enhanced_dummy_orders.json";
import dayjs from "dayjs";

const OrdersOverview = () => {
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
      title: "Company Name",
      dataIndex: ["customerData", "companyName"],
      key: "companyName",
    },
    {
      title: "Order Quantity",
      key: "orderQuantity",
      render: (_, record) =>
        record.orderData.reduce((acc, item) => acc + item.itemQuantity, 0),
    },
    {
      title: "Order Total Price",
      key: "orderTotalPrice",
      render: (_, record) => {
        const total = record.orderData.reduce(
          (acc, item) => acc + parseFloat(item.itemTotalPrice),
          0
        );
        return `${total.toFixed(2)} €`;
      },
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => showDrawer(record)}>
          Show extracted data
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        size="middle"
        pagination={{
          showSizeChanger: true,
        }}
      />
      <Drawer
        title="Extracted Data"
        placement="right"
        onClose={() => setVisible(false)}
        open={visible}
        width={500}
      >
        <pre>{JSON.stringify(selectedData, null, 2)}</pre>
      </Drawer>
    </>
  );
};

export default OrdersOverview;
