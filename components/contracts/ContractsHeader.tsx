"use client";

import { useState } from "react";
import ContractCreateForm from "./form/ContractCreateForm";

export default function ContractsHeader() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleCreated = () => {
    setShowForm(false);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="mb-0">Contracts</h1>

        <button
          type="button"
          className="btn btn-primary px-3 d-none d-md-inline-block"
          onClick={toggleForm}
        >
          {showForm ? "Cancel" : "New Contract"}
        </button>

        <button
          type="button"
          className="btn btn-primary btn-sm d-inline-flex d-md-none align-items-center justify-content-center rounded-circle"
          onClick={toggleForm}
          aria-label={showForm ? "Cancel" : "Add contract"}
          style={{ width: "34px", height: "34px" }}
        >
          <i className={`bi ${showForm ? "bi-x-lg" : "bi-plus-lg"}`} />
        </button>
      </div>

      {showForm && <ContractCreateForm onCreated={handleCreated} />}
    </>
  );
}
