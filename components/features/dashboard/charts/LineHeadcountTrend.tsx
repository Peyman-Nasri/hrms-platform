"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  headcountTrendMock,
  type MonthlyMetricItem,
} from "@/server/mocks/dashboardCharts";

type Props = {
  title?: string;
  data?: MonthlyMetricItem[];
  height?: number;
  isAnimationActive?: boolean;
};

type StackedPoint = {
  name: string;
  uv: number;
  pv: number;
  amt: number;
};

function toStacked(data: MonthlyMetricItem[]): StackedPoint[] {
  return data.map((d) => {
    const total = d.value ?? 0;
    const uv = Math.round(total * 0.5);
    const pv = Math.round(total * 0.3);
    const amt = Math.max(0, total - uv - pv);
    return { name: d.month, uv, pv, amt };
  });
}

export default function StackedHeadcountAreaTrend({
  title = "Headcount Trend",
  data = headcountTrendMock,
  height = 260,
  isAnimationActive = true,
}: Props) {
  const latest = data.at(-1)?.value ?? 0;
  const prev = data.at(-2)?.value ?? latest;
  const delta = latest - prev;

  const stacked = toStacked(data);

  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h6 className="mb-0 fw-semibold">{title}</h6>
          <span
            className={`small ${delta >= 0 ? "text-success" : "text-danger"}`}
          >
            {delta >= 0 ? "+" : ""}
            {delta} vs last month
          </span>
        </div>

        <div style={{ width: "100%", height, overflow: "hidden" }}>
          <AreaChart
            responsive
            data={stacked}
            style={{ width: "100%", height: "100%", display: "block" }}
            margin={{ top: 16, right: 8, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis width={32} />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="uv"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
              isAnimationActive={isAnimationActive}
            />
            <Area
              type="monotone"
              dataKey="pv"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
              isAnimationActive={isAnimationActive}
            />
            <Area
              type="monotone"
              dataKey="amt"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
              isAnimationActive={isAnimationActive}
            />
          </AreaChart>
        </div>
      </div>
    </div>
  );
}
