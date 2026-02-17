"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  Label,
  type BarShapeProps,
  type LabelProps,
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

const colors = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "red",
  "pink",
  "black",
];

const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props: BarShapeProps) => {
  const { x, y, width, height, index, isActive } = props;
  const color = colors[(index ?? 0) % colors.length];

  return (
    <path
      d={getPath(Number(x), Number(y), Number(width), Number(height))}
      stroke={color}
      fill={color}
      strokeWidth={isActive ? 4 : 0}
      style={{ transition: "stroke-width 0.3s ease-out" }}
    />
  );
};

const CustomColorLabel = (props: LabelProps) => {
  const fill = colors[(props.index ?? 0) % colors.length];
  return <Label {...props} fill={fill} />;
};

export default function HeadcountTrendCustomBar({
  title = "Headcount Trend",
  data = headcountTrendMock,
  height = 260,
  isAnimationActive = true,
}: Props) {
  const latest = data.at(-1)?.value ?? 0;
  const prev = data.at(-2)?.value ?? latest;
  const delta = latest - prev;

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
          <BarChart
            responsive
            data={data}
            style={{ width: "100%", height: "100%", display: "block" }}
            margin={{ top: 16, right: 8, left: 0, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip cursor={{ fillOpacity: 0.15 }} />
            <XAxis dataKey="month" tickMargin={8} />
            <YAxis width={32} />
            <Bar
              dataKey="value"
              shape={TriangleBar}
              isAnimationActive={isAnimationActive}
            >
              <LabelList content={CustomColorLabel} position="top" />
            </Bar>
          </BarChart>
        </div>
      </div>
    </div>
  );
}
