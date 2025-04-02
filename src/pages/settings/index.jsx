import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "wouter";

import { Settings2, Users, UserPlus, KeyRound } from "lucide-react";
import PageHeader from "../../components/pageHeader";
import TabNav from "../../components/tabNav";

const tabs = [
  {
    icon: Settings2,
    label: "General",
    href: "/settings/general",
    component: <div>general</div>,
  },
  {
    icon: Users,
    label: "Members",
    href: "/settings/members",
    component: <div>members</div>,
  },
  {
    icon: UserPlus,
    label: "Registration",
    href: "/settings/registration",
  },
  {
    icon: KeyRound,
    label: "API Keys",
    href: "/settings/api-keys",
  },
];

export default function PageSettings() {
  const [activeKey, setActiveKey] = useState(0);
  const [location, navigate] = useLocation();
  const currentOrganization = useSelector(
    (state) => state.user.currentOrganization
  );

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

  const orgName = currentOrganization.label;

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
      {tabs[activeKey]?.component}
    </>
  );
}
