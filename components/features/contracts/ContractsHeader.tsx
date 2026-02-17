"use client";

import EntityHeader from "@/components/shared/EntityHeader";
import ContractCreateForm from "./form/ContractCreateForm";
import type { ContractsHeaderProps } from "@/types/contracts";

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
