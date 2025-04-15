import React from "react";
import { Table, Typography, Tag, Input, Flex } from "antd";
import { Link } from "wouter";
import { users } from "../../database/database";
import PageHeader from "../../components/pageHeader";

const { Text } = Typography;

const AllUsers = () => {
  const usersWithFullNameAndMembershipCount = users.map((user) => ({
    ...user,
    fullName: `${user.prename} ${user.surname}`,
    membershipCount: user.memberships.length,
    key: user.id,
  }));

  const tableColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (fullName, record) => (
        <Text>
          <Link href={`/system-admin/edit-user/${record.id}/account`}>
            {fullName}
          </Link>
        </Text>
      ),
    },
    { title: "E-Mail", dataIndex: "email", key: "email" },
    {
      title: "Global Role",
      dataIndex: "isSuperAdmin",
      key: "isSuperAdmin",
      render: (isSuperAdmin) =>
        isSuperAdmin ? (
          <Tag color="magenta">Super Admin</Tag>
        ) : (
          <Tag>Member</Tag>
        ),
    },
    { title: "Created at", dataIndex: "createdAt", key: "createdAt" },
    { title: "Last Login", dataIndex: "lastLogin", key: "lastLogin" },
    {
      title: "Number of Organizations",
      dataIndex: "membershipCount",
      key: "membershipCount",
    },
  ];

  return (
    <>
      <PageHeader
        title="All Users"
        subtitle="Here you can see and edit all users in your Operaide instance."
      />{" "}
      <Flex vertical gap="large">
        <Input placeholder="Search user" variant="filled" />
        <Table
          size="middle"
          columns={tableColumns}
          dataSource={usersWithFullNameAndMembershipCount}
        />
      </Flex>
    </>
  );
};

export default AllUsers;
