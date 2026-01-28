"use client";

import EmployeeCreateForm from "./form/EmployeeCreateForm";
import EntityHeader from "../layout/EntityHeader";

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
