import { useEffect, useState } from "react";
import { useLocation } from "wouter";

import { Settings2, Users, UserPlus, KeyRound } from "lucide-react";
import PageHeader from "../../components/pageHeader";
import TabNav from "../../components/tabNav";

import { organizations } from "../../utils";

const tabs = [
  { icon: Settings2, label: "General", href: "/settings/general" },
  { icon: Users, label: "Members", href: "/settings/members" },
  { icon: UserPlus, label: "Registration", href: "/settings/registration" },
  { icon: KeyRound, label: "API Keys", href: "/settings/api-keys" },
];

export default function PageSettings({ currentOrganization }) {
  const [activeKey, setActiveKey] = useState(0);
  const [location, navigate] = useLocation();

  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.href === location);
    if (index !== -1) {
      setActiveKey(index);
    }
  }, [location]);

  const onTabClick = (key) => {
    const href = tabs[key].href;
    navigate(href);
  };

  const orgName = organizations.find(
    (organization) => organization.value === currentOrganization
  ).label;

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle={`Here you can manage the settings for the organization "${orgName}".`}
      />
      <TabNav
        tabs={tabs}
        activeKey={activeKey}
        onTabClick={(key) => onTabClick(key)}
      />
      <div style={{ height: "2000px", backgroundColor: "#f5f5f5" }}>
        Some content here
      </div>
    </>
  );
}
