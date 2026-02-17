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

        <div style={{ height: 260 }}>
          <PieChart
            style={{
              width: "100%",
              height: "100%",
              maxWidth: "500px",
              maxHeight: "80vh",
              aspectRatio: 1,
              margin: "0 auto",
            }}
            responsive
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

        <div className="text-muted small mt-2">
          Inner = Working/Not Working • Outer = detailed statuses
        </div>
      </div>
    </div>
  );
}
