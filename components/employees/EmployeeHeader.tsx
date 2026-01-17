"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateEmployeeSchema } from "@/server/employees/employees.schemas";
import { z } from "zod";

type CreateEmployeeInput = z.infer<typeof CreateEmployeeSchema>;

export default function EmployeesHeader() {
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [firstName, setFirstName] =
    useState<CreateEmployeeInput["firstName"]>("");
  const [lastName, setLastName] = useState<CreateEmployeeInput["lastName"]>("");
  const [email, setEmail] = useState<CreateEmployeeInput["email"]>("");
  const [status, setStatus] = useState<CreateEmployeeInput["status"]>("ACTIVE");
  const [workLocation, setWorkLocation] =
    useState<CreateEmployeeInput["workLocation"]>("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleForm = () => {
    setShowForm((prev) => !prev);
    setError(null);
    setErrors({});
    setFirstName("");
    setLastName("");
    setEmail("");
    setStatus("ACTIVE");
    setWorkLocation("");
  };

  function validate() {
    const result = CreateEmployeeSchema.safeParse({
      firstName,
      lastName,
      email,
      status,
      workLocation,
    });

    if (result.success) {
      setErrors({});
      return true;
    }

    const fieldErrors: Record<string, string> = {};

    for (const issue of result.error.issues) {
      const path = issue.path[0];
      if (typeof path === "string" && !fieldErrors[path]) {
        fieldErrors[path] = issue.message;
      }
    }

    setErrors(fieldErrors);
    return false;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setSubmitting(true);

    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          status,
          workLocation,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data?.error || "Failed to create employee. Please try again.",
        );
      }

      setFirstName("");
      setLastName("");
      setEmail("");
      setStatus("ACTIVE");
      setWorkLocation("");
      setShowForm(false);
      setErrors({});

      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="mb-0">Employees</h1>

        <button type="button" className="btn btn-primary" onClick={toggleForm}>
          {showForm ? "Cancel" : "New Employee"}
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-3">Create New Employee</h5>

            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-6">
                <label className="form-label" htmlFor="firstName">
                  First Name
                </label>
                <input
                  id="firstName"
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (errors.firstName)
                      setErrors((p) => ({ ...p, firstName: "" }));
                  }}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  id="lastName"
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    if (errors.lastName)
                      setErrors((p) => ({ ...p, lastName: "" }));
                  }}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((p) => ({ ...p, email: "" }));
                  }}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="col-md-3">
                <label className="form-label" htmlFor="status">
                  Status
                </label>
                <select
                  id="status"
                  className={`form-select ${errors.status ? "is-invalid" : ""}`}
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value as CreateEmployeeInput["status"]);
                    if (errors.status) setErrors((p) => ({ ...p, status: "" }));
                  }}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
                {errors.status && (
                  <div className="invalid-feedback">{errors.status}</div>
                )}
              </div>

              <div className="col-md-3">
                <label className="form-label" htmlFor="workLocation">
                  Work Location
                </label>
                <input
                  id="workLocation"
                  className={`form-control ${
                    errors.workLocation ? "is-invalid" : ""
                  }`}
                  value={workLocation}
                  onChange={(e) => {
                    setWorkLocation(e.target.value);
                    if (errors.workLocation)
                      setErrors((p) => ({ ...p, workLocation: "" }));
                  }}
                  placeholder="e.g. Stockholm"
                />
                {errors.workLocation && (
                  <div className="invalid-feedback">{errors.workLocation}</div>
                )}
              </div>

              {error && (
                <div className="col-12">
                  <div className="alert alert-danger py-2 mb-0">{error}</div>
                </div>
              )}

              <div className="col-12 d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={submitting}
                >
                  {submitting ? "Creating..." : "Create Employee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
