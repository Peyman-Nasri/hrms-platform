"use client";

import ContractCreateForm from "./form/ContractCreateForm";
import EntityHeader from "../layout/EntityHeader";

type EmployeeOption = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type ContractsHeaderProps = {
  employees: EmployeeOption[];
};

export default function ContractsHeader({ employees }: ContractsHeaderProps) {
  return (
    <EntityHeader
      title="Contracts"
      newLabel="New Contract"
      addLabel="contract"
      renderForm={(onCreated) => (
        <ContractCreateForm onCreated={onCreated} employees={employees} />
      )}
    />
  );
}
