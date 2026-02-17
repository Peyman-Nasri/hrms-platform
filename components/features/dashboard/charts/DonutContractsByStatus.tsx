"use client";

import {
  Pie,
  PieChart,
  Tooltip,
  type PieLabelRenderProps,
  type PieSectorShapeProps,
  Sector,
} from "recharts";

import {
  contractsByStatusMock,
  type DonutItem,
} from "@/server/mocks/dashboardCharts";

type Props = {
  title?: string;
  data?: DonutItem[];
  height?: number;
  isAnimationActive?: boolean;
};

const RADIAN = Math.PI / 180;
const COLORS = ["#198754", "#0dcaf0", "#0d6efd", "#dc3545"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

  const ncx = Number(cx);
  const ncy = Number(cy);

  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  if ((percent ?? 0) < 0.05) return null;

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
      style={{ fontSize: 12, fontWeight: 600 }}
    >
      {`${((percent ?? 0) * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomSector = (props: PieSectorShapeProps) => {
  return (
    <Sector {...props} fill={COLORS[(props.index ?? 0) % COLORS.length]} />
  );
};

export default function DonutContractsByStatus({
  title = "Contracts by Status",
  data = contractsByStatusMock,
  height = 260,
  isAnimationActive = true,
}: Props) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="card h-100">
      <div className="card-body p-2">
        <div className="d-flex align-items-center justify-content-between px-2 pt-2">
          <h6 className="mb-0 fw-semibold">{title}</h6>
          <span className="text-muted small">Total: {total}</span>
        </div>

        <div style={{ height, width: "100%", overflow: "hidden" }}>
          <PieChart
            responsive
            style={{ width: "100%", height: "100%", display: "block" }}
          >
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="98%"
              labelLine={false}
              label={renderCustomizedLabel}
              isAnimationActive={isAnimationActive}
              shape={CustomSector}
            />

            <Tooltip
              formatter={(value, name) => {
                const v =
                  typeof value === "number" ? value : Number(value ?? 0);
                const pct = total > 0 ? Math.round((v / total) * 100) : 0;
                return [v, `${String(name)} (${pct}%)`] as const;
              }}
            />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
