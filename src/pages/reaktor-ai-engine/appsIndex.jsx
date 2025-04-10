import { useState } from "react";
import PageHeader from "../../components/pageHeader";

import { Input, Flex, Segmented, Select } from "antd";
import { Link } from "wouter";
import { LayoutList, LayoutGrid, ChevronDown } from "lucide-react";

import Card from "../../components/card";

import { apps } from "../../database/apps";
import AppList from "../../components/appList";

export default function PageAppsIndex() {
  const [viewTypeGrid, setViewTypeGrid] = useState(false);
  const [searchString, setSearchString] = useState("");

  /**
   * here needs to go a filter mechanism that filters only those apps that are installed in this org
   */

  return (
    <div>
      <PageHeader
        title="Apps"
        subtitle="Agentic apps cluster one or more Reaktors for a business use case. Here you can find all your installed agentic apps."
      />
      <Flex vertical gap="large">
        <Flex justify="between" gap="large">
          <Input
            placeholder="Search app"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            variant="filled"
          />

          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Filter by category"
            /* onChange={(values) => setSelectedGroups(values)}
            options={groups} */
            suffixIcon={<ChevronDown size="1.25em" />}
            variant="filled"
          />

          <Segmented
            onChange={() => setViewTypeGrid(!viewTypeGrid)}
            options={[
              {
                value: "Cards",
                icon: (
                  <span
                    style={{
                      display: "inline-block",
                      lineHeight: 0, // so the SVG doesn't add extra space
                      verticalAlign: "-0.125em", // "pull" it down a hair
                    }}
                  >
                    <LayoutGrid size="1em" />
                  </span>
                ),
              },
              {
                value: "List",
                icon: (
                  <span
                    style={{
                      display: "inline-block",
                      lineHeight: 0, // so the SVG doesn't add extra space
                      verticalAlign: "-0.125em", // "pull" it down a hair
                    }}
                  >
                    <LayoutList size="1em" />
                  </span>
                ),
              },
            ]}
          />
        </Flex>

        {viewTypeGrid ? (
          <Flex gap="large" wrap>
            {apps.map((app) => (
              <Link href={`/reaktor-ai-engine/${app.id}`}>
                <Card
                  id={app.id}
                  key={app.id}
                  label={app.name}
                  description={app.description}
                  imageSrc={app.imageSrc}
                  official={app.official}
                />
              </Link>
            ))}
          </Flex>
        ) : (
          <AppList />
        )}
      </Flex>
    </div>
  );
}
