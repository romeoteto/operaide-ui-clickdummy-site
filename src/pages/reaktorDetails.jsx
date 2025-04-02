import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import { blueprints } from "../database";
import PageHeader from "../components/pageHeader";
import { LayoutDashboard, Workflow, Settings2, Rocket } from "lucide-react";
import TabNav from "../components/tabNav";
import {
  Flex,
  Typography,
  Table,
  Tag,
  Image,
  Input,
  Divider,
  Button,
} from "antd";
import InfoPanel from "../components/infoPanel";

const { Link: AntLink, Text } = Typography;
const { Search } = Input;

export default function ReaktorDetails() {
  const params = useParams();
  const [activeKey, setActiveKey] = useState(0);

  const [location, navigate] = useLocation();

  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.href === location);
    if (index !== -1) {
      setActiveKey(index);
    }
  }, [location]);

  const { "reaktor-id": reaktorId } = params;

  const blueprint = blueprints.find((bp) => bp.id === reaktorId);

  const tabs = [
    {
      icon: LayoutDashboard,
      label: "Overview",
      href: `/reaktor-ai-engine/${reaktorId}/overview`,
    },
    {
      icon: Workflow,
      label: "Diagram",
      href: `/reaktor-ai-engine/${reaktorId}/diagram`,
    },
    {
      icon: Settings2,
      label: "Default Settings",
      href: `/reaktor-ai-engine/${reaktorId}/default-settings`,
    },
    {
      icon: Rocket,
      label: "Deployments",
      href: `/reaktor-ai-engine/${reaktorId}/deployments`,
    },
  ];

  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (deploymentId) => (
        <Text>
          <Link
            href={`/reaktor-ai-engine/${blueprint.id}/${deploymentId}/overview`}
          >
            {deploymentId}
          </Link>
        </Text>
      ),
    },
    { title: "Version", dataIndex: "version", key: "version" },
    { title: "Label", dataIndex: "label", key: "label" },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (str) => (str.length > 30 ? str.slice(0, 30) + "..." : str),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, { imageSrc }) => (
        <Image src={imageSrc} width={50} preview={false} />
      ),
    },
    { title: "Group", dataIndex: "group", key: "group" },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag, index) => {
            return <Tag key={index}>{tag}</Tag>;
          })}
        </>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: () => <AntLink>Delete</AntLink>,
    },
  ];

  const onTabClick = (key) => {
    const href = tabs[key].href;
    navigate(href);
  };

  return (
    <div>
      <PageHeader title={blueprint.label} />
      <TabNav
        tabs={tabs}
        activeKey={activeKey}
        onTabClick={(key) => onTabClick(key)}
      />
      {activeKey === 0 && (
        <Flex vertical gap="middle">
          <InfoPanel
            id={blueprint.id}
            label={blueprint.label}
            description={blueprint.description}
            type={blueprint.type}
            version={blueprint.version}
            group={blueprint.group}
            tags={blueprint.tags}
            imageSrc={blueprint.imageSrc}
          />
        </Flex>
      )}

      {activeKey === 3 && (
        <Flex vertical gap="large">
          <Flex gap="large">
            <Search placeholder="Search deployment" />
            <Button type="primary" icon={<Rocket size="1em" />}>
              Create new deployment
            </Button>
          </Flex>
          <Table
            size="middle"
            columns={tableColumns}
            dataSource={blueprint.deployments}
          />
        </Flex>
      )}
    </div>
  );
}
