"use client";

import EntityHeader from "@/components/shared/EntityHeader";
import TimeReportCreateForm from "./form/TimeReportCreateForm";
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
