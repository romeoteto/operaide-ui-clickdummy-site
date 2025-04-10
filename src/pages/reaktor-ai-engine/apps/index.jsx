import { useState } from "react";
import PageHeader from "../../../components/pageHeader";

import { Input, Flex, Segmented } from "antd";

import { LayoutList, LayoutGrid } from "lucide-react";

import AppList from "./appList";
import AppGrid from "./appGrid";

export default function PageAppIndex() {
  const [viewTypeGrid, setViewTypeGrid] = useState(true);
  const [searchString, setSearchString] = useState("");

  /**
   * here needs to go a filter mechanism that filters only those apps that are installed in this org
   */

  return (
    <div>
      <PageHeader
        title="Apps"
        subtitle="Agentic apps are packaged Reaktors for specific business use cases. Here you can find all your installed apps."
      />
      <Flex vertical gap="large">
        <Flex justify="between" gap="large">
          <Input
            placeholder="Search app"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
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

        {viewTypeGrid ? <AppGrid /> : <AppList />}
      </Flex>
    </div>
  );
}
