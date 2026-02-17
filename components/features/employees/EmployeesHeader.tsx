"use client";

import EntityHeader from "@/components/shared/EntityHeader";
import EmployeeCreateForm from "./form/EmployeeCreateForm";

export default function EmployeesHeader() {
  return (
    <EntityHeader
      title="Employees"
      newLabel="New Employee"
      addLabel="employee"
      renderForm={(onCreated) => <EmployeeCreateForm onCreated={onCreated} />}
    />
  );
}
