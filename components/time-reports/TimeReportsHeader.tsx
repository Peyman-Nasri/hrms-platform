"use client";

import TimeReportCreateForm from "./form/TimeReportCreateForm";
import EntityHeader from "../layout/EntityHeader";

export default function TimeReportsHeader() {
  return (
    <EntityHeader
      title="Time Reports"
      newLabel="New Time Report"
      addLabel="time report"
      renderForm={(onCreated) => <TimeReportCreateForm onCreated={onCreated} />}
    />
  );
}
