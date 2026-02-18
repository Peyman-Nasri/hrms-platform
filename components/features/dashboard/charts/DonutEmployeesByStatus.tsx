"use client";

import {
  employeeStatusDetailData,
  employeeStatusGroupData,
} from "@/server/mocks/dashboardCharts";
import { Pie, PieChart, Tooltip, type TooltipIndex } from "recharts";

export default function EmployeeStatusTwoLevelPie({
  isAnimationActive = true,
  defaultIndex,
}: {
  isAnimationActive?: boolean;
  defaultIndex?: TooltipIndex;
}) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h6 className="mb-0 fw-semibold">Employees by Status</h6>
          <span className="text-muted small">Two-level</span>
        </div>

        <div style={{ width: "100%", height: 260, overflow: "hidden" }}>
          <PieChart
            responsive
            style={{ width: "100%", height: "100%", display: "block" }}
          >
            <Pie
              data={employeeStatusGroupData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius="50%"
              fill="#0d6efd"
              isAnimationActive={isAnimationActive}
            />

            <Pie
              data={employeeStatusDetailData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              fill="#20c997"
              label
              isAnimationActive={isAnimationActive}
            />

            <Tooltip defaultIndex={defaultIndex} />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
