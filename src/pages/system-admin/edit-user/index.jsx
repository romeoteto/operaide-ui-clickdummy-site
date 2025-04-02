import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";

import { User, ShieldUser, Building } from "lucide-react";

import PageHeader from "../../../components/pageHeader";
import TabNav from "../../../components/tabNav";
import { users } from "../../../database";
import Account from "./account";

const EditUser = () => {
  const [activeKey, setActiveKey] = useState(0);
  const [location, navigate] = useLocation();
  const params = useParams();
  const { "user-id": userId } = params;

  const user = users.find((user) => user.id === Number(userId));

  const { prename, surname, email } = user;

  const tabs = [
    {
      icon: User,
      label: "Account",
      href: `/system-admin/edit-user/${userId}/account`,
      component: <Account user={user} />,
    },
    {
      icon: ShieldUser,
      label: "Security",
      href: `/system-admin/edit-user/${userId}/security`,
    },
    {
      icon: Building,
      label: "Memberships",
      href: `/system-admin/edit-user/${userId}/memberships`,
    },
  ];

  const onTabClick = (key) => {
    const href = tabs[key].href;
    navigate(href);
  };

  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.href === location);
    if (index !== -1) {
      setActiveKey(index);
    }
  }, [location, tabs]);

  return (
    <>
      <PageHeader
        title={`${prename} ${surname}`}
        subtitle={`Here you can update the settings of ${prename} ${surname}.`}
      />
      <TabNav
        tabs={tabs}
        activeKey={activeKey}
        onTabClick={(key) => onTabClick(key)}
      />
      {tabs[activeKey]?.component}
    </>
  );
};

export default EditUser;
