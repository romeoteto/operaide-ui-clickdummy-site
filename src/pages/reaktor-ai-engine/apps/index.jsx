import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PageHeader from "../../../components/pageHeader";
import { useSearchParams } from "wouter";

import { Input, Flex, Segmented } from "antd";

import { LayoutList, LayoutGrid } from "lucide-react";

import AppList from "./appList";
import AppGrid from "./appGrid";

export default function PageAppsIndex() {
  const [searchString, setSearchString] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPermissions = useSelector(
    (state) => state.user.currentPermissions
  );

  const showSegmented =
    currentPermissions.org.reaktors.includes("canViewReaktors");

  const viewType = searchParams.get("viewType");

  useEffect(() => {
    !viewType && setSearchParams({ viewType: "cards" });
  }, [viewType]);

  /**
   * here needs to go a filter mechanism that filters only those apps that are installed in this org
   */

  const handleViewChange = (value) => {
    setSearchParams({ viewType: value });
  };

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

          {showSegmented && (
            <Segmented
              onChange={(value) => handleViewChange(value)}
              value={viewType}
              options={[
                {
                  value: "cards",
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
                  value: "list",
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
          )}
        </Flex>

        {viewType === "list" ? <AppList /> : <AppGrid />}
      </Flex>
    </div>
  );
}
