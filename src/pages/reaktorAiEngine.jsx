import { useState } from "react";
import PageHeader from "../components/pageHeader";

import { Input, Flex, Segmented, Select } from "antd";
import { Link } from "wouter";
import { LayoutList, LayoutGrid, ChevronDown } from "lucide-react";

import ReaktorCard from "../components/reaktorCard2";

import { blueprints } from "../database";
import ReaktorList from "../components/reaktorList";

export default function PageReaktorAIEngine() {
  const [viewTypeGrid, setViewTypeGrid] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [selectedGroups, setSelectedGroups] = useState([]);

  const groups = [...new Set(blueprints.map((b) => b.group))].map(
    (uniqueGroup) => ({
      label: uniqueGroup,
      value: uniqueGroup.toLowerCase(),
    })
  );

  const hasSearch = searchString.trim().length > 0;
  const hasGroups = Array.isArray(selectedGroups) && selectedGroups.length > 0;

  const filteredBlueprints = blueprints.filter((blueprint) => {
    // Only check label/description if search is provided; otherwise default to `true`.
    const matchesSearch = hasSearch
      ? blueprint.label.toLowerCase().includes(searchString.toLowerCase()) ||
        blueprint.description.toLowerCase().includes(searchString.toLowerCase())
      : true;

    // Only check group if groups are provided; otherwise default to `true`.
    const matchesGroup = hasGroups
      ? selectedGroups.includes(blueprint.group.toLowerCase())
      : true;

    // A blueprint must satisfy BOTH filters (i.e., AND).
    return matchesSearch && matchesGroup;
  });

  return (
    <div>
      <PageHeader
        title="Reaktor AI Engine"
        subtitle="Reaktor AI Engine is the home of your agentic applications. Here you can find all your installed Reaktor blueprints."
      />
      <Flex vertical gap="large">
        <Flex justify="between" gap="large">
          <Input
            placeholder="Search blueprint"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />

          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Filter by group"
            onChange={(values) => setSelectedGroups(values)}
            options={groups}
            suffixIcon={<ChevronDown size="1.25em" />}
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

        <Flex gap="large" wrap>
          {viewTypeGrid ? (
            filteredBlueprints.map((blueprint) => (
              <Link href={`/reaktor-ai-engine/${blueprint.id}`}>
                <ReaktorCard
                  id={blueprint.id}
                  key={blueprint.id}
                  label={blueprint.label}
                  description={blueprint.description}
                  imageSrc={blueprint.imageSrc}
                  official={blueprint.official}
                />
              </Link>
            ))
          ) : (
            <ReaktorList items={filteredBlueprints} />
          )}
        </Flex>
      </Flex>
    </div>
  );
}
