import React from "react";
import {
  LineChart as ReChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { theme } from "antd";

const LineChart = ({ data, animationDuration }) => {
  const {
    token: {
      colorPrimary,
      colorError,
      colorText,
      colorTextSecondary,
      colorSplit,
      colorBgElevated,
      colorBorderSecondary,
      fontSizeSM,
      fontFamily,
    },
  } = theme.useToken();

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <ReChart data={data}>
          {/* Grid lines */}
          <CartesianGrid strokeDasharray="3 3" stroke={colorSplit} />

          {/* X Axis */}
          <XAxis
            dataKey="date"
            tickFormatter={(tick) => (data.length <= 10 ? tick : tick.slice(5))}
            interval="preserveStartEnd"
            minTickGap={20}
            stroke={colorTextSecondary}
            tick={{ fill: colorText, fontSize: fontSizeSM, fontFamily }}
            tickLine={false}
          />

          {/* Y Axis */}
          <YAxis
            stroke={colorTextSecondary}
            tick={{ fill: colorText, fontSize: fontSizeSM, fontFamily }}
            axisLine={false}
            tickLine={false}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: colorBgElevated,
              borderColor: colorBorderSecondary,
              fontSize: fontSizeSM,
              fontFamily,
              color: colorText,
            }}
          />

          {/* Legend */}
          <Legend
            wrapperStyle={{
              color: colorText,
              fontSize: fontSizeSM,
              fontFamily,
            }}
          />

          {/* Lines */}
          <Line
            type="monotone"
            dataKey="total"
            stroke={colorPrimary}
            dot={false}
            name="Total"
            animationDuration={animationDuration}
          />
          <Line
            type="monotone"
            dataKey="failed"
            stroke={colorError}
            dot={false}
            name="Failed"
            animationDuration={animationDuration}
          />
        </ReChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
