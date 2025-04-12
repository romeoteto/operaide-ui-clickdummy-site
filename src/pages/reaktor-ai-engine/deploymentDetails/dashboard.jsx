import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Flex,
  DatePicker,
  Form,
  Space,
  Select,
  Descriptions,
  Typography,
  Button,
  Statistic,
} from "antd";
import { ChevronDown, ExternalLink } from "lucide-react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import minMax from "dayjs/plugin/minMax";
import CountUp from "react-countup";
import LineChart from "./lineChart";
import { generateDummyData } from "./dummyHelpers";

dayjs.extend(isBetween);
dayjs.extend(minMax);

const { RangePicker } = DatePicker;

const animationDuration = 800;

const Dashboard = () => {
  const getPresetRange = (key) => {
    const today = dayjs();
    switch (key) {
      case "currentMonth":
        return [today.startOf("month"), today.endOf("month")];
      case "lastMonth":
        return [
          today.subtract(1, "month").startOf("month"),
          today.subtract(1, "month").endOf("month"),
        ];
      case "last3Months":
        return [
          today.subtract(3, "month").startOf("month"),
          today.subtract(1, "month").endOf("month"),
        ];
      case "yearToDate":
        return [today.startOf("year"), today.endOf("day")];
      case "lastYear":
        return [
          today.subtract(1, "year").startOf("year"),
          today.subtract(1, "year").endOf("year"),
        ];
      default:
        return null;
    }
  };

  const [range, setRange] = useState(getPresetRange("currentMonth"));
  const [selectedPreset, setSelectedPreset] = useState("currentMonth");

  const dateFormat = "D MMM YYYY";

  const handleChangeSelect = (value) => {
    setSelectedPreset(value);

    // Only update the range if it's a predefined preset
    if (value !== "custom") {
      const presetRange = getPresetRange(value);
      setRange(presetRange);
    }
  };

  const handleChangeRangePicker = (dates, dateStrings) => {
    setRange(dates);

    // If manual range differs from current preset, switch to "custom"
    if (dates && selectedPreset !== "custom") {
      setSelectedPreset("custom");
    }
  };

  const filterSize = "middle";
  const itemsSize = "small";

  const items = [
    {
      key: "apiEndpoints",
      label: "API Endpoints",
      children: (
        <Button
          icon={<ExternalLink size="1em" />}
          iconPosition="end"
          size={itemsSize}
          color="default"
          variant="text"
          href="https://petstore.swagger.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Swagger
        </Button>
      ),
    },
    {
      key: "openAPI",
      label: "OpenAPI Definition",
      children: (
        <Button
          color="default"
          size={itemsSize}
          variant="text"
          href="https://petstore.swagger.io/v2/swagger.json"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://petstore.swagger.io/v2/swagger.json
        </Button>
      ),
    },
  ];

  // This is the dummy data generation
  const fullData = useMemo(() => generateDummyData(), []);

  const availableDates = useMemo(() => {
    const dates = fullData.map((entry) => dayjs(entry.date));
    return {
      min: dayjs.min(dates),
      max: dayjs.max(dates),
    };
  }, [fullData]);

  const filteredData = range
    ? fullData.filter((entry) =>
        dayjs(entry.date).isBetween(range[0], range[1], "day", "[]")
      )
    : fullData;

  const totals = filteredData.reduce(
    (acc, curr) => {
      acc.total += curr.total;
      acc.successful += curr.successful;
      acc.failed += curr.failed;
      return acc;
    },
    { total: 0, successful: 0, failed: 0 }
  );

  const prevTotals = useRef(totals);

  useEffect(() => {
    prevTotals.current = totals;
  }, [totals]);
  // This is the dummy data generation

  return (
    <Flex vertical gap="large">
      <Flex justify="flex-end">
        <Form>
          <Form.Item
            label="Filter"
            style={{ display: "flex", gap: 16, margin: 0 }}
            colon={false}
          >
            <Space>
              <Select
                value={selectedPreset}
                suffixIcon={<ChevronDown size="1.25em" />}
                variant="filled"
                size={filterSize}
                style={{ width: 180 }}
                onChange={handleChangeSelect}
                options={[
                  { value: "currentMonth", label: "Current Month" },
                  { value: "lastMonth", label: "Last Month" },
                  { value: "last3Months", label: "Last Quarter" },
                  { value: "yearToDate", label: "Year to Date" },
                  { value: "lastYear", label: "Last Year" },
                  { value: "custom", label: "Custom" },
                ]}
              />
              <RangePicker
                variant="filled"
                size={filterSize}
                value={range}
                format={dateFormat}
                onChange={handleChangeRangePicker}
                disabledDate={(current) =>
                  current.isBefore(availableDates.min, "day") ||
                  current.isAfter(availableDates.max, "day")
                }
              />
            </Space>
          </Form.Item>
        </Form>
      </Flex>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card size={itemsSize}>
            <Statistic
              title="Total Executions"
              formatter={() => (
                <CountUp
                  start={prevTotals.current.total}
                  end={totals.total}
                  separator=","
                  duration={animationDuration / 1000}
                />
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={4}>
          <Card size={itemsSize}>
            <Statistic
              title="Successful"
              formatter={() => (
                <CountUp
                  start={prevTotals.current.successful}
                  end={totals.successful}
                  separator=","
                  duration={animationDuration / 1000}
                />
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={4}>
          <Card size={itemsSize}>
            <Statistic
              title="Success Rate"
              formatter={() => (
                <CountUp
                  start={
                    (prevTotals.current.successful / prevTotals.current.total) *
                      100 || 0
                  }
                  end={(totals.successful / totals.total) * 100 || 0}
                  decimals={2}
                  suffix="%"
                  duration={animationDuration / 1000}
                />
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={4}>
          <Card size={itemsSize}>
            <Statistic
              title="Failed"
              formatter={() => (
                <CountUp
                  start={prevTotals.current.failed}
                  end={totals.failed}
                  separator=","
                  duration={animationDuration / 1000}
                />
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={4}>
          <Card size={itemsSize}>
            <Statistic
              title="Failure Rate"
              formatter={() => (
                <CountUp
                  start={
                    (prevTotals.current.failed / prevTotals.current.total) *
                      100 || 0
                  }
                  end={(totals.failed / totals.total) * 100 || 0}
                  decimals={2}
                  suffix="%"
                  duration={animationDuration / 1000}
                />
              )}
            />
          </Card>
        </Col>

        <Col xs={24}>
          <Card size={itemsSize} title="Executions Over Time">
            <LineChart
              data={filteredData}
              animationDuration={animationDuration}
            />
          </Card>
        </Col>
      </Row>
      <Descriptions size={itemsSize} bordered items={items} column={1} />
    </Flex>
  );
};

export default Dashboard;
