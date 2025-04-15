import { useSelector } from "react-redux";
import { useSearchParams } from "wouter";

import { Settings2, Users, UserPlus, KeyRound, Palette } from "lucide-react";
import PageHeader from "../../components/pageHeader";
import TabNav from "../../components/tabNav";
import Theme from "./theme";

const tabs = [
  {
    icon: Settings2,
    label: "General",
  },
  {
    icon: Users,
    label: "Members",
  },
  {
    icon: UserPlus,
    label: "Registration",
  },
  {
    icon: KeyRound,
    label: "API Keys",
  },
  {
    icon: Palette,
    label: "Theme",
    component: <Theme />,
  },
];

export default function PageSettings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeKey = searchParams.get("activeKey") || 0;

  const currentOrganization = useSelector(
    (state) => state.user.currentOrganization
  );

  const orgName = currentOrganization.label;

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle={`Here you can manage the settings for the organization "${orgName}".`}
      />
      <TabNav
        tabs={tabs}
        activeKey={Number(activeKey)}
        onTabClick={(key) => setSearchParams({ activeKey: key })}
      />
      {tabs[activeKey]?.component}
    </>
  );
}
