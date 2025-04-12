import React from "react";
import {
  AreaChart as ReChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import dayjs from "dayjs";
import { theme, Typography, Flex } from "antd";

const { Text } = Typography;

const AreaChart = ({ data, animationDuration }) => {
  const {
    token: {
      colorSuccess,
      colorError,
      colorText,
      colorTextSecondary,
      colorSplit,
      colorBgElevated,
      colorBorderSecondary,
      fontSizeSM,
      fontFamily,
      lineWidth,
      paddingSM,
      borderRadius,
      marginXS,
    },
  } = theme.useToken();

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <ReChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={colorSplit} />
          <XAxis
            dataKey="date"
            tickFormatter={(tick) => dayjs(tick).format("D MMM YYYY")}
            interval="preserveStartEnd"
            minTickGap={20}
            stroke={colorTextSecondary}
            tick={{ fill: colorText, fontSize: fontSizeSM, fontFamily }}
            tickLine={false}
          />

          <YAxis
            stroke={colorTextSecondary}
            tick={{ fill: colorText, fontSize: fontSizeSM, fontFamily }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            content={({ label, payload }) => {
              if (!payload || payload.length === 0) return null;

              const successful =
                payload.find((p) => p.dataKey === "successful")?.value || 0;
              const failed =
                payload.find((p) => p.dataKey === "failed")?.value || 0;
              const total = successful + failed;

              return (
                <Flex
                  vertical
                  style={{
                    backgroundColor: colorBgElevated,
                    border: `${lineWidth}px solid ${colorBorderSecondary}`,
                    padding: paddingSM,
                    fontFamily,
                    fontSize: fontSizeSM,
                    color: colorText,
                    borderRadius,
                  }}
                >
                  <Text
                    strong
                    style={{ fontSize: fontSizeSM, marginBottom: marginXS }}
                  >
                    {dayjs(label).format("D MMM YYYY")}
                  </Text>
                  <Text style={{ fontSize: fontSizeSM }}>
                    Successful: {successful}
                  </Text>
                  <Text
                    style={{ fontSize: fontSizeSM, marginBottom: marginXS }}
                  >
                    Failed: {failed}
                  </Text>
                  <Text strong style={{ fontSize: fontSizeSM }}>
                    Total: {total}
                  </Text>
                </Flex>
              );
            }}
          />

          <Legend
            wrapperStyle={{
              color: colorText,
              fontSize: fontSizeSM,
              fontFamily,
            }}
          />
          <Area
            type="monotone"
            dataKey="failed"
            stackId="executions"
            stroke={colorError}
            fill={colorError}
            fillOpacity={0.1}
            name="Failed"
            animationDuration={animationDuration}
          />

          {/* Stacked Areas */}
          <Area
            type="monotone"
            dataKey="successful"
            stackId="executions"
            stroke={colorSuccess}
            fill={colorSuccess}
            fillOpacity={0.05}
            name="Successful"
            animationDuration={animationDuration}
          />
        </ReChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChart;
