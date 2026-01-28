"use client";

import ContractCreateForm from "./form/ContractCreateForm";
import EntityHeader from "../layout/EntityHeader";

export default function ContractsHeader() {
  return (
    <EntityHeader
      title="Contracts"
      newLabel="New Contract"
      addLabel="contract"
      renderForm={(onCreated) => <ContractCreateForm onCreated={onCreated} />}
    />
  );
}
