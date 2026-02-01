"use client";

import TimeReportCreateForm from "./form/TimeReportCreateForm";
import EntityHeader from "../layout/EntityHeader";
import { TimeReportsHeaderProps } from "@/types/time-reports";

export default function TimeReportsHeader({
  employeesWithContracts,
}: TimeReportsHeaderProps) {
  return (
    <EntityHeader
      title="Time Reports"
      newLabel="New Time Report"
      addLabel="time report"
      renderForm={(onCreated) => (
        <TimeReportCreateForm
          onCreated={onCreated}
          employeesWithContracts={employeesWithContracts}
        />
      )}
    />
  );
}
