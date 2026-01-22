"use client";

import { useState } from "react";
import TimeReportCreateForm from "./form/TimeReportCreateForm";

export default function TimeReportsHeader() {
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
        <h1 className="mb-0">Time Reports</h1>

        <button
          type="button"
          className="btn btn-primary px-3 d-none d-md-inline-block"
          onClick={toggleForm}
        >
          {showForm ? "Cancel" : "New Time Report"}
        </button>

        <button
          type="button"
          className="btn btn-primary btn-sm d-inline-flex d-md-none align-items-center justify-content-center rounded-circle"
          onClick={toggleForm}
          aria-label={showForm ? "Cancel" : "Add time report"}
          style={{ width: "34px", height: "34px" }}
        >
          <i className={`bi ${showForm ? "bi-x-lg" : "bi-plus-lg"}`} />
        </button>
      </div>

      {showForm && <TimeReportCreateForm onCreated={handleCreated} />}
    </>
  );
}
