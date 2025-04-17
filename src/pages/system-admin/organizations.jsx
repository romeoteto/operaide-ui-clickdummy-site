import React from "react";
import { Table, Button, Flex } from "antd";
import { Building } from "lucide-react";
import dayjs from "dayjs";

import { organizations, users } from "../../database/database";

import PageHeader from "../../components/pageHeader";

const getOrgUserCount = (users) => {
  const orgUserCount = {};

  users.forEach((user) => {
    user.memberships.forEach(({ orgValue }) => {
      if (!orgUserCount[orgValue]) {
        orgUserCount[orgValue] = new Set();
      }
      orgUserCount[orgValue].add(user.id); // Ensure unique users per org
    });
  });

  // Convert sets to counts
  const result = {};
  for (const org in orgUserCount) {
    result[org] = orgUserCount[org].size;
  }

  return result;
};

const orgUserCount = getOrgUserCount(users);

const tableColumns = [
  { title: "ID", dataIndex: "value", key: "value" },
  { title: "Name", dataIndex: "label", key: "label" },
  {
    title: "Created at",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date) => dayjs(date).format("D MMM YYYY"),
  },
  {
    title: "Created by",
    key: "createdBy",
    render: (_, record) => {
      const user = users.find((user) => user.id === record.creatorId);
      return `${user?.prename} ${user?.surname}`;
    },
  },
  {
    title: "Members",
    key: "members",
    render: (_, record) => orgUserCount[record.value],
  },
];

const Organizations = () => {
  return (
    <>
      <PageHeader
        title="Organizations"
        subtitle="These are all organizations in your Operaide instance. You can edit and create new ones."
      />
      <Flex vertical gap="large">
        <Flex justify="flex-end">
          <Button type="primary" icon={<Building size="1em" />}>
            Create Organization
          </Button>
        </Flex>

        <Table
          size="middle"
          bordered
          columns={tableColumns}
          dataSource={organizations}
          pagination={{
            showSizeChanger: true,
          }}
        />
      </Flex>
    </>
  );
};

export default Organizations;
