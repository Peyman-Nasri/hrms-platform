"use client";

import TimeReportCreateForm from "./form/TimeReportCreateForm";
import EntityHeader from "../layout/EntityHeader";

type EmployeeWithContracts = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contracts: {
    id: string;
    name: string;
  }[];
};

type TimeReportsHeaderProps = {
  employeesWithContracts: EmployeeWithContracts[];
};

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
