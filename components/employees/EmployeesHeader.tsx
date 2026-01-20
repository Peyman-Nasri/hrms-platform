"use client";

import { useState } from "react";
import EmployeeCreateForm from "./form/EmployeeCreateForm";

export default function EmployeesHeader() {
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
        <h1 className="mb-0">Employees</h1>

        <button
          type="button"
          className="btn btn-primary px-3 d-none d-md-inline-block"
          onClick={toggleForm}
        >
          {showForm ? "Cancel" : "New Employee"}
        </button>

        <button
          type="button"
          className="btn btn-primary btn-sm d-inline-flex d-md-none align-items-center justify-content-center rounded-circle"
          onClick={toggleForm}
          aria-label={showForm ? "Cancel" : "Add employee"}
          style={{ width: "34px", height: "34px" }}
        >
          <i className={`bi ${showForm ? "bi-x-lg" : "bi-plus-lg"}`} />
        </button>
      </div>

      {showForm && <EmployeeCreateForm onCreated={handleCreated} />}
    </>
  );
}
